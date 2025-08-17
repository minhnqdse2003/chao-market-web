import { Cart, CartItem, Product } from '@/db/schema';
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

    const cart = await db.query.carts.findFirst({
        where: (cart, { eq }) => eq(cart.userId, token.sub!),
        with: {
            items: {
                with: {
                    product: true,
                },
            },
        },
    });

    if (!cart) {
        throw new ApiError(400, 'Cart not found');
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
