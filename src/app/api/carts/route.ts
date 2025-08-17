/* eslint-disable  @typescript-eslint/no-explicit-any */

import { Cart, CartItem, cartItems, carts, products } from '@/db/schema';
import { withAuth } from '@/lib/api-route-middleware';
import { db } from '@/lib/db';
import { BaseResponse } from '@/types/base-response';
import { addProductsToCartSchema } from '@/types/cart/request/add-products-to-cart';
import { cartQuerySchema } from '@/types/cart/request/cart-request-params';
import { PaginatedResponse } from '@/types/pagination';
import { UUID } from 'crypto';
import { and, eq, gte, inArray, sql } from 'drizzle-orm';
import { getToken } from 'next-auth/jwt';
import { ApiError } from 'next/dist/server/api-utils';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';

const getAllCarts = async (request: NextRequest) => {
    const searchParams = Object.fromEntries(
        request.nextUrl.searchParams.entries()
    );
    const parsed = cartQuerySchema.safeParse(searchParams);

    if (!parsed.success) {
        throw new ApiError(400, z.prettifyError(parsed.error));
    }
    const { pageIndex, pageSize, createdAt, isCheckedOut, updatedAt } =
        parsed.data;

    const conditions = [];

    if (isCheckedOut !== undefined)
        conditions.push(eq(carts.isCheckedOut, isCheckedOut));
    if (createdAt) conditions.push(gte(carts.createdAt, createdAt));
    if (updatedAt) conditions.push(gte(carts.updatedAt, updatedAt));

    const whereClause = conditions.length ? and(...conditions) : undefined;

    const items = await db
        .select()
        .from(carts)
        .where(whereClause)
        .limit(pageSize)
        .offset(pageIndex * pageSize);

    const total = await db
        .select({ count: sql<number>`count(*)` })
        .from(carts)
        .where(whereClause);

    return NextResponse.json(
        {
            data: items,
            pageIndex,
            pageSize,
            totalItems: total[0]?.count || 0,
        } as PaginatedResponse<Cart>,
        { status: 200 }
    );
};

const addProductToCart = async (request: NextRequest) => {
    try {
        console.log('=== Starting addProductToCart ===');

        const body = await request.json();
        console.log('Request body:', JSON.stringify(body, null, 2));

        const token = await getToken({ req: request });
        console.log('User token:', token?.sub ? 'Present' : 'Missing');

        const parsedRequestData = addProductsToCartSchema.safeParse(body);
        console.log('Parsed request ', parsedRequestData);

        if (!token?.sub) {
            console.error('Unauthorized: No user token found');
            throw new ApiError(401, 'Unauthorized');
        }

        if (!parsedRequestData.success) {
            console.error('Validation error:', parsedRequestData.error);
            throw new ApiError(400, z.prettifyError(parsedRequestData.error));
        }

        // Check if the product exists and is available
        const productIds = parsedRequestData.data.map(item => item.productId);
        console.log('Product IDs to add:', productIds);

        // Start transaction
        const result = await db.transaction(async tx => {
            console.log('=== Starting database transaction ===');

            // Check if all products exist
            console.log('Checking product existence...');
            const existingProducts = await tx
                .select({
                    id: products.id,
                    stock: products.stock,
                    imageUrl: products.imageUrl,
                })
                .from(products)
                .where(inArray(products.id, productIds));

            console.log('Existing products:', existingProducts);

            const foundProductIds = new Set(existingProducts.map(p => p.id));
            const missingProductIds = productIds.filter(
                p => !foundProductIds.has(p)
            );

            if (missingProductIds.length > 0) {
                const errorMsg = `Products not found: [${missingProductIds.join(', ')}]`;
                console.error(errorMsg);
                throw new ApiError(400, errorMsg);
            }

            // Check product's stock
            console.log('Checking product stock...');
            for (const requestProduct of parsedRequestData.data) {
                const product = existingProducts.find(
                    p => p.id === requestProduct.productId
                );
                console.log(`Product ${requestProduct.productId}:`, product);

                // Check stock (regardless of imageUrl)
                if (
                    product &&
                    product.stock !== null &&
                    product.stock < requestProduct.quantity
                ) {
                    const errorMsg = `Insufficient stock for product ${requestProduct.productId}. Requested: ${requestProduct.quantity}, Available: ${product.stock}`;
                    console.error(errorMsg);
                    throw new ApiError(400, errorMsg);
                }
            }

            // Check user current cart
            console.log('Checking user carts...');

            // First, get the user's active cart
            const userCarts = await tx
                .select()
                .from(carts)
                .where(
                    and(
                        eq(carts.userId, token.sub as UUID),
                        eq(carts.isCheckedOut, false)
                    )
                );

            console.log('User carts found:', userCarts.length);

            if (userCarts.length > 1) {
                const errorMsg = 'Multiple carts found for the user';
                console.error(errorMsg);
                throw new ApiError(400, errorMsg);
            }

            let cartId: string;

            if (userCarts.length === 0) {
                console.log('No existing cart found, creating new cart...');
                // Cart not found, create a new cart
                const [newCart] = await tx
                    .insert(carts)
                    .values({
                        userId: token.sub as UUID,
                    })
                    .returning();

                console.log('New cart created:', newCart);
                cartId = newCart.id;
            } else {
                console.log('Using existing cart...');
                cartId = userCarts[0].id;

                // Get existing cart items
                const existingCartItems = await tx
                    .select()
                    .from(cartItems)
                    .where(eq(cartItems.cartId, cartId));

                console.log('Existing cart items:', existingCartItems);

                // Process each product to add
                for (const requestProduct of parsedRequestData.data) {
                    const existingCartItem = existingCartItems.find(
                        item => item.productId === requestProduct.productId
                    );
                    console.log(
                        `Checking product ${requestProduct.productId} in cart:`,
                        existingCartItem
                    );

                    const productInfo = existingProducts.find(
                        p => p.id === requestProduct.productId
                    );

                    if (existingCartItem) {
                        // Existing in cart: NOT UPDATE if doesn't have image url
                        if (productInfo && productInfo.imageUrl) {
                            console.log(
                                `Updating quantity for existing item (has imageUrl):`,
                                {
                                    cartId: cartId,
                                    productId: requestProduct.productId,
                                    newQuantity:
                                        existingCartItem.quantity +
                                        requestProduct.quantity,
                                }
                            );
                            await tx
                                .update(cartItems)
                                .set({
                                    quantity:
                                        existingCartItem.quantity +
                                        requestProduct.quantity,
                                })
                                .where(
                                    and(
                                        eq(cartItems.cartId, cartId),
                                        eq(
                                            cartItems.productId,
                                            requestProduct.productId
                                        )
                                    )
                                );
                        } else {
                            console.log(
                                `NOT updating quantity for existing item (no imageUrl):`,
                                {
                                    productId: requestProduct.productId,
                                }
                            );
                            // Do nothing - don't update
                        }
                    } else {
                        // Not existing in cart: ADD NEW ONE regardless of imageUrl
                        console.log(
                            `Adding new item to cart (regardless of imageUrl):`,
                            {
                                cartId: cartId,
                                productId: requestProduct.productId,
                                quantity: requestProduct.quantity,
                            }
                        );
                        await tx.insert(cartItems).values({
                            cartId: cartId,
                            productId: requestProduct.productId,
                            quantity: requestProduct.quantity,
                        });
                    }
                }
            }

            // If we created a new cart, add all items
            if (userCarts.length === 0) {
                const newCartItems: CartItem[] = parsedRequestData.data.map(
                    p => ({
                        cartId: cartId,
                        productId: p.productId,
                        quantity: p.quantity,
                    })
                );

                console.log('Inserting cart items:', newCartItems);
                await tx.insert(cartItems).values(newCartItems);
                console.log('Cart items inserted successfully');

                return {
                    message: 'Products added to a new cart',
                    cartId,
                } as BaseResponse<UUID>;
            } else {
                return {
                    message: 'Products processed for existing cart',
                    cartId,
                } as BaseResponse<UUID>;
            }
        });

        console.log('=== Transaction completed successfully ===');
        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        console.error('=== UNEXPECTED ERROR IN addProductToCart ===');
        console.error('Error type:', typeof error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        console.error('========================================');

        // Return detailed error for development
        if (process.env.NODE_ENV === 'development') {
            return NextResponse.json(
                {
                    error: 'Internal Server Error',
                    message: error.message || 'Unknown error',
                    stack: error.stack,
                },
                { status: 500 }
            );
        }

        // Return generic error for production
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
};

export const GET = withAuth(getAllCarts);
export const POST = withAuth(addProductToCart, ['USER']);
