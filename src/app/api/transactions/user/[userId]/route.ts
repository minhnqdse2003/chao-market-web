import { withAuth } from '@/lib/api-route-middleware';
import { db } from '@/lib/db';
import { BaseResponse } from '@/types/base-response';
import { ApiError } from 'next/dist/server/api-utils';
import { NextRequest, NextResponse } from 'next/server';

const getTransactionsByUserId = async (
    req: NextRequest,
    { params }: { params: { userId: string } }
) => {
    const transaction = await db.query.transactions.findMany({
        where: (transaction, { eq }) => eq(transaction.userId, params.userId),
    });
    if (!transaction) {
        throw new ApiError(400, `No transactions found for this user id`);
    }
    return NextResponse.json(
        {
            data: transaction,
            message: 'Transactions retrieved successfully',
        } as BaseResponse<typeof transaction>,
        { status: 200 }
    );
};

export const GET = withAuth(getTransactionsByUserId);
