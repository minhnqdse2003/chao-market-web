import { Cart, CartItem } from '@/db/schema';
import { withAuth } from '@/lib/api-route-middleware';
import { db } from '@/lib/db';
import { BaseResponse } from '@/types/base-response';
import { ApiError } from 'next/dist/server/api-utils';
import { NextRequest, NextResponse } from 'next/server';

const getUserCartById = async (
    _: NextRequest,
    { params }: { params: { userId: string } }
) => {
    const cart = await db.query.carts.findFirst({
        where: (cart, { eq }) => eq(cart.userId, params.userId),
        with: { items: true },
    });
    if (!cart) {
        throw new ApiError(400, 'Cart not found');
    }
    return NextResponse.json(
        {
            data: cart,
            message: 'Cart retrieved successfully',
        } as BaseResponse<Cart & { items: CartItem[] }>,
        { status: 200 }
    );
};

export const GET = withAuth(getUserCartById);
