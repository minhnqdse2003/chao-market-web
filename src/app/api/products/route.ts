import { Product, products } from '@/db/schema';
import { withAuth } from '@/lib/api-route-middleware';
import { db } from '@/lib/db';
import { BaseResponse } from '@/types/base-response';
import { PaginatedResponse } from '@/types/pagination';
import { productQuerySchema } from '@/types/product/request/product-request-params';
import { and, eq, like, sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';

const getAllProducts = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams.entries();
    const parsed = productQuerySchema.safeParse(searchParams);

    if (!parsed.success) {
        return NextResponse.json(
            { message: z.prettifyError(parsed.error) } as BaseResponse,
            { status: 400 }
        );
    }
    const { name, price, pageIndex, pageSize } = parsed.data;
    const conditions = [];

    if (name) conditions.push(like(products.name, `%${name}%`));
    if (price) conditions.push(eq(products.price, parseFloat(price)));

    const whereClause = conditions.length ? and(...conditions) : undefined;

    const items = await db
        .select()
        .from(products)
        .where(whereClause)
        .limit(pageSize)
        .offset(pageIndex * pageSize);

    const total = await db
        .select({ count: sql<number>`count(*)` })
        .from(products)
        .where(whereClause);

    return NextResponse.json(
        {
            data: items,
            pageIndex,
            pageSize,
            totalItems: total[0]?.count || 0,
        } as PaginatedResponse<Product>,
        { status: 200 }
    );
};

export const GET = withAuth(getAllProducts);
