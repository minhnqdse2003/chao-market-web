import { Cart, carts } from '@/db/schema';
import { withAuth } from '@/lib/api-route-middleware';
import { db } from '@/lib/db';
import { BaseResponse } from '@/types/base-response';
import { cartQuerySchema } from '@/types/cart/request/cart-request-params';
import { PaginatedResponse } from '@/types/pagination';
import { and, eq, gte, sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';

const getAllCarts = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams.entries();
    const parsed = cartQuerySchema.safeParse(searchParams);

    if (!parsed.success) {
        return NextResponse.json(
            { message: z.prettifyError(parsed.error) } as BaseResponse,
            { status: 400 }
        );
    }
    const { pageIndex, pageSize, createdAt, isCheckedOut, updatedAt } =
        parsed.data;

    const conditions = [];

    if (isCheckedOut !== undefined)
        conditions.push(eq(carts.isCheckedOut, isCheckedOut));
    if (createdAt) conditions.push(gte(carts.createdAt, createdAt));
    if (updatedAt) conditions.push(gte(carts.updatedAt, updatedAt));

    const whereClause = conditions.length ? and(...conditions) : undefined;

    const items = await db
        .select()
        .from(carts)
        .where(whereClause)
        .limit(pageSize)
        .offset(pageIndex * pageSize);

    const total = await db
        .select({ count: sql<number>`count(*)` })
        .from(carts)
        .where(whereClause);

    return NextResponse.json(
        {
            data: items,
            pageIndex,
            pageSize,
            totalItems: total[0]?.count || 0,
        } as PaginatedResponse<Cart>,
        { status: 200 }
    );
};

export const GET = withAuth(getAllCarts);
