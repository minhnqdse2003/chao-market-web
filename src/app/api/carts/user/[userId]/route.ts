import { Cart, CartItem } from '@/db/schema';
import { withAuth } from '@/lib/api-route-middleware';
import { db } from '@/lib/db';
import { BaseResponse } from '@/types/base-response';
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
        return NextResponse.json(
            {
                message: 'Cart not found',
            } as BaseResponse,
            { status: 400 }
        );
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
