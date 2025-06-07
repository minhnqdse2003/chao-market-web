import { Transaction } from '@/db/schema';
import { withAuth } from '@/lib/api-route-middleware';
import { db } from '@/lib/db';
import { BaseResponse } from '@/types/base-response';
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
        return NextResponse.json(
            { message: `Transaction(${params.id}) not found` } as BaseResponse,
            { status: 400 }
        );
    }
    return NextResponse.json({
        data: transaction,
        message: 'Transaction retrieved successfully',
    } as BaseResponse<Transaction>);
};

export const GET = withAuth(getTransactionById);
