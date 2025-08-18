import { Cart, CartItem, carts, Product } from '@/db/schema';
import { withAuth } from '@/lib/api-route-middleware';
import { db } from '@/lib/db';
import { BaseResponse } from '@/types/base-response';
import { ApiError } from 'next/dist/server/api-utils';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export type CartWithItemsAndProducts = Cart & {
    items: CartItemWithProduct[];
};

export type CartItemWithProduct = CartItem & {
    product: Product;
};

// Update your hook return type if needed
export type CartResponse = BaseResponse<CartWithItemsAndProducts>;

const getUserCartById = async (req: NextRequest) => {
    const token = await getToken({
        req,
    });

    if (!token || token.sub === undefined)
        throw new ApiError(401, 'Unauthorized');

    // Try to find existing cart
    let cart = await db.query.carts.findFirst({
        where: (cart, { eq }) => eq(cart.userId, token.sub!),
        with: {
            items: {
                with: {
                    product: true,
                },
            },
        },
    });

    // If no cart exists, create a new one
    if (!cart) {
        try {
            const [newCart] = await db
                .insert(carts)
                .values({
                    userId: token.sub!,
                    isCheckedOut: false,
                })
                .returning();

            // Return the new cart with empty items array
            cart = {
                ...newCart,
                items: [],
            };
        } catch (error) {
            console.error('Error creating new cart:', error);
            throw new ApiError(500, 'Failed to create cart');
        }
    }

    return NextResponse.json(
        {
            data: cart,
            message: 'Cart retrieved successfully',
        } as BaseResponse<
            Cart & {
                items: (CartItem & { product: Product })[];
            }
        >,
        { status: 200 }
    );
};

export const GET = withAuth(getUserCartById);
