import { withAuth } from '@/lib/api-route-middleware';
import { db } from '@/lib/db';
import { BaseResponse } from '@/types/base-response';
import { NextRequest, NextResponse } from 'next/server';

const getTransactionsByUserId = async (
    req: NextRequest,
    { params }: { params: { userId: string } }
) => {
    const transaction = await db.query.transactions.findMany({
        where: (transaction, { eq }) => eq(transaction.userId, params.userId),
    });
    if (!transaction) {
        return NextResponse.json(
            {
                message: 'No transactions found for this user id',
            } as BaseResponse,
            { status: 400 }
        );
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
