import { ConsultationServices, consultationServices } from '@/db/schema';
import { withAuth } from '@/lib/api-route-middleware';
import { db } from '@/lib/db';
import { BaseResponse } from '@/types/base-response';
import { PaginatedResponse } from '@/types/pagination';
import {
    CreateNewProduct,
    newProductSchema,
} from '@/types/product/request/create-product';
import { productQuerySchema } from '@/types/product/request/product-request-params';
import { and, eq, like, sql } from 'drizzle-orm';
import { ApiError } from 'next/dist/server/api-utils';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';

const getAllProducts = async (request: NextRequest) => {
    const searchParams = Object.fromEntries(
        request.nextUrl.searchParams.entries()
    );
    const parsed = productQuerySchema.safeParse(searchParams);

    if (!parsed.success) {
        throw new ApiError(400, z.prettifyError(parsed.error));
    }

    const { name, price, pageIndex, pageSize } = parsed.data;
    const conditions = [];
    if (name) conditions.push(like(consultationServices.name, `%${name}%`));
    if (price)
        conditions.push(eq(consultationServices.price, parseFloat(price)));

    const whereClause = conditions.length ? and(...conditions) : undefined;

    const items = await db
        .select()
        .from(consultationServices)
        .where(whereClause)
        .limit(pageSize)
        .offset(pageIndex * pageSize);

    const total = await db
        .select({ count: sql<number>`count(*)` })
        .from(consultationServices)
        .where(whereClause);

    return NextResponse.json(
        {
            data: items,
            pageIndex,
            pageSize,
            totalItems: total[0]?.count || 0,
        } as PaginatedResponse<ConsultationServices>,
        { status: 200 }
    );
};

const createNewProduct = async (request: NextRequest) => {
    const data = await request.json();
    const parsedRequestData = newProductSchema.safeParse(data);

    if (!parsedRequestData.success) {
        throw new ApiError(400, z.prettifyError(parsedRequestData.error));
    }
    const newUser: CreateNewProduct = parsedRequestData.data;
    const [result] = await db
        .insert(consultationServices)
        .values(newUser)
        .returning();

    return NextResponse.json(
        {
            data: result,
            message: 'Add product successfully',
        } as BaseResponse<ConsultationServices>,
        { status: 200 }
    );
};

export const GET = withAuth(getAllProducts);
export const POST = withAuth(createNewProduct);
