import { Transaction } from '@/db/schema';
import { withAuth } from '@/lib/api-route-middleware';
import { db } from '@/lib/db';
import { BaseResponse } from '@/types/base-response';
import { ApiError } from 'next/dist/server/api-utils';
import { NextRequest, NextResponse } from 'next/server';

const getTransactionById = async (
    _: NextRequest,
    { params }: { params: { id: string } }
) => {
    const transaction = await db.query.transactions.findFirst({
        where: (transaction, { eq }) => eq(transaction.id, params.id),
        with: { user: true },
    });
    if (!transaction) {
        throw new ApiError(400, `Transaction(${params.id}) not found`);
    }
    return NextResponse.json({
        data: transaction,
        message: 'Transaction retrieved successfully',
    } as BaseResponse<Transaction>);
};

export const GET = withAuth(getTransactionById);
