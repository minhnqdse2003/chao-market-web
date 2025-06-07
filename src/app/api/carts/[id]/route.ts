import { Cart } from '@/db/schema';
import { withAuth } from '@/lib/api-route-middleware';
import { db } from '@/lib/db';
import { BaseResponse } from '@/types/base-response';
import { NextRequest, NextResponse } from 'next/server';

const getCartById = async (
    _: NextRequest,
    { params }: { params: { id: string } }
) => {
    const cart = await db.query.carts.findFirst({
        where: (carts, { eq }) => eq(carts.id, params.id),
    });
    if (!cart) {
        return NextResponse.json(
            { message: `Cart(${params.id}) not found` } as BaseResponse,
            { status: 404 }
        );
    }
    return NextResponse.json(
        {
            data: cart,
            message: 'Cart retrieved successfully',
        } as BaseResponse<Cart>,
        { status: 200 }
    );
};

export const GET = withAuth(getCartById);
