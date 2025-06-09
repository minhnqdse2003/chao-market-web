import { withAuth } from '@/lib/api-route-middleware';
import { db } from '@/lib/db';
import { BaseResponse } from '@/types/base-response';
import { ApiError } from 'next/dist/server/api-utils';
import { NextRequest, NextResponse } from 'next/server';

const getTransactionByCartId = async (
    _: NextRequest,
    { params }: { params: { cartId: string } }
) => {
    const transaction = await db.query.transactions.findFirst({
        where: (transaction, { eq }) => eq(transaction.cartId, params.cartId),
        with: { cart: { with: { items: true } } },
    });
    if (!transaction) {
        throw new ApiError(400, `Transaction not found for this cart id`);
    }
    return NextResponse.json(
        {
            data: transaction,
            message: 'Transaction retrieved successfully',
        } as BaseResponse<typeof transaction>,
        { status: 200 }
    );
};

export const GET = withAuth(getTransactionByCartId);
