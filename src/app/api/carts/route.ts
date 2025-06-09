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
    const body = await request.json();
    const token = await getToken({ req: request });

    const parsedRequestData = addProductsToCartSchema.safeParse(body);

    if (!token?.sub) {
        throw new ApiError(401, 'Unauthorized');
    }

    if (!parsedRequestData.success) {
        throw new ApiError(400, z.prettifyError(parsedRequestData.error));
    }

    // Check if the product exists and is available
    const productIds = parsedRequestData.data.map(item => item.productId);

    // Start transaction
    const result = await db.transaction(async tx => {
        // Check if all products exist
        const existingProducts = await tx
            .select({ id: products.id, stock: products.stock })
            .from(products)
            .where(inArray(products.id, productIds));

        const foundProductIds = new Set(existingProducts.map(p => p.id));
        const missingProductIds = productIds.filter(
            p => !foundProductIds.has(p)
        );
        if (missingProductIds.length > 0) {
            throw new ApiError(
                400,
                `Products not found: [${missingProductIds.join(', ')}]`
            );
        }
        // Check product's stock
        for (const requestProducts of parsedRequestData.data) {
            const product = existingProducts.find(
                p => p.id === requestProducts.productId
            );
            if (
                product &&
                product.stock !== null &&
                product.stock < requestProducts.quantity
            ) {
                throw new ApiError(
                    400,
                    `Insufficient stock for product ${requestProducts.productId}`
                );
            }
        }

        // Check user current cart
        const existingUserCarts = await tx
            .select({
                cart: carts,
                items: cartItems,
            })
            .from(carts)
            .leftJoin(cartItems, eq(cartItems.cartId, carts.id))
            .where(
                and(
                    eq(carts.userId, token.sub as UUID),
                    eq(carts.isCheckedOut, false)
                )
            );

        if (existingUserCarts.length > 1) {
            throw new ApiError(400, 'Multiple carts found for the user');
        }

        if (existingUserCarts.length === 0) {
            // Cart not found, create a new cart and add items
            const [newCart] = await tx
                .insert(carts)
                .values({
                    userId: token.sub as UUID,
                })
                .returning();

            const newCartItems: CartItem[] = parsedRequestData.data.map(p => ({
                cartId: newCart.id,
                productId: p.productId,
                quantity: p.quantity,
            }));

            await tx.insert(cartItems).values(newCartItems);

            return {
                message: 'Products added to a new cart',
                data: newCart.id,
            } as BaseResponse<UUID>;
        } else {
            const userCart = existingUserCarts[0];
            const existingCartItems = userCart.items || [];
            for (const requestProduct of parsedRequestData.data) {
                const existingCartItem = (existingCartItems as CartItem[]).find(
                    item => item.productId === requestProduct.productId
                );

                if (existingCartItem) {
                    // Update quantity if product exists in cart
                    await tx
                        .update(cartItems)
                        .set({
                            quantity: requestProduct.quantity,
                        })
                        .where(eq(cartItems.cartId, existingCartItem.cartId));
                } else {
                    // Add new product to cart
                    await tx.insert(cartItems).values({
                        cartId: userCart.cart.id,
                        productId: requestProduct.productId,
                        quantity: requestProduct.quantity,
                    });
                }
            }

            return {
                message: 'Products added to a new cart',
                data: userCart.cart.id,
            } as BaseResponse<UUID>;
        }
    });

    return NextResponse.json(result, { status: 200 });
};

export const GET = withAuth(getAllCarts);
export const POST = withAuth(addProductToCart, ['USER']);
