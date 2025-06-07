import { CartItem, Product } from '@/db/schema';
import { withAuth } from '@/lib/api-route-middleware';
import { db } from '@/lib/db';
import { BaseResponse } from '@/types/base-response';
import { NextRequest, NextResponse } from 'next/server';

const getCartItemsByCartId = async (
    _: NextRequest,
    { params }: { params: { id: string } }
) => {
    const items = await db.query.cartItems.findMany({
        where: (ci, { eq }) => eq(ci.cartId, params.id),
        with: { product: true },
    });
    return NextResponse.json(
        {
            data: items,
            message: 'Cart items retrieved successfully',
        } as BaseResponse<Array<CartItem & { product: Product }>>,
        { status: 200 }
    );
};

export const GET = withAuth(getCartItemsByCartId);
