import { NewTransaction, transactions } from '@/db/schema';
import { withAuth } from '@/lib/api-route-middleware';
import { db } from '@/lib/db';
import { BaseResponse } from '@/types/base-response';
import { PaginatedResponse } from '@/types/pagination';
import { transactionQuerySchema } from '@/types/transaction/request/transaction-request-params';
import { and, eq, gte, sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';

const getAllTransactions = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams.entries();
    const parsed = transactionQuerySchema.safeParse(
        Object.fromEntries(searchParams)
    );

    if (!parsed.success) {
        return NextResponse.json(
            { message: z.prettifyError(parsed.error) } as BaseResponse,
            { status: 400 }
        );
    }

    const { pageIndex, pageSize, status, totalAmount, createdAt, updatedAt } =
        parsed.data;
    const conditions = [];

    if (status) conditions.push(eq(transactions.status, status));
    if (totalAmount !== undefined)
        conditions.push(eq(transactions.totalAmount, totalAmount));
    if (createdAt) conditions.push(gte(transactions.createdAt, createdAt));
    if (updatedAt) conditions.push(gte(transactions.updatedAt, updatedAt));

    const whereClause = conditions.length ? and(...conditions) : undefined;

    const items = await db
        .select()
        .from(transactions)
        .where(whereClause)
        .limit(pageSize)
        .offset(pageIndex * pageSize);

    const total = await db
        .select({ count: sql<number>`count(*)` })
        .from(transactions)
        .where(whereClause);

    return NextResponse.json(
        {
            data: items,
            pageIndex,
            pageSize,
            totalItems: total[0]?.count || 0,
        } as PaginatedResponse<NewTransaction>,
        { status: 200 }
    );
};

export const GET = withAuth(getAllTransactions);
