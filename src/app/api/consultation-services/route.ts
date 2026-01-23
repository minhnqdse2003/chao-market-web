/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from 'next/dist/server/api-utils';
import { BaseResponse } from '@/types/base-response';
import { withAuth } from '@/lib/api-route-middleware';
import { db } from '@/lib/db';
import { ConsultationServices, consultationServices } from '@/db/schema';
import { and, eq, inArray, like, not, sql, or, asc, desc } from 'drizzle-orm';

async function getAllConsultationServices(request: NextRequest) {
    try {
        const searchParams = Object.fromEntries(
            request.nextUrl.searchParams.entries()
        );

        const {
            type,
            searchValue,
            market,
            mainType,
            priceSort,
            viewSort,
            dateSort,
        } = searchParams;

        const conditions = new Array<any>();

        if (mainType) {
            conditions.push(
                type
                    ? eq(consultationServices.type, type)
                    : not(eq(consultationServices.type, 'Holistic'))
            );
        } else {
            conditions.push(eq(consultationServices.type, 'Holistic'));
        }

        if (searchValue)
            conditions.push(
                or(
                    // Search in English name
                    like(
                        sql`${consultationServices.name}
                        ->>'en'`,
                        `%${searchValue}%`
                    ),
                    // Search in Vietnamese name
                    like(
                        sql`${consultationServices.name}
                        ->>'vi'`,
                        `%${searchValue}%`
                    )
                )
            );

        if (market)
            conditions.push(eq(consultationServices.marketType, market));

        const whereClause = conditions.length ? and(...conditions) : undefined;

        const orderClause: any[] = [];

        if (priceSort) {
            orderClause.push(
                priceSort === 'asc'
                    ? asc(consultationServices.price)
                    : desc(consultationServices.price)
            );
        } else if (viewSort) {
            orderClause.push(
                viewSort === 'asc'
                    ? asc(consultationServices.views)
                    : desc(consultationServices.views)
            );
        } else if (dateSort) {
            orderClause.push(
                dateSort === 'asc'
                    ? asc(consultationServices.createdAt)
                    : desc(consultationServices.createdAt)
            );
        } else {
            orderClause.push(desc(consultationServices.createdAt));
        }

        const services = await db
            .select()
            .from(consultationServices)
            .where(whereClause)
            .orderBy(...orderClause);

        return NextResponse.json(
            {
                data: services,
                message: 'Consultation Services retrieved successfully',
            } as BaseResponse<Array<ConsultationServices>>,
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof ApiError) {
            return NextResponse.json(
                {
                    error: error.message,
                    message: error.message,
                } as BaseResponse<null>,
                { status: error.statusCode }
            );
        }

        return NextResponse.json(
            {
                error: 'Internal server error',
                message: 'Something went wrong',
            } as BaseResponse<null>,
            { status: 500 }
        );
    }
}

async function getConsultationServicesByIds(request: NextRequest) {
    try {
        // 1. Parse IDs from the JSON body
        const body = await request.json();
        const { ids } = body as { ids: string[] };

        // 2. Handle empty or invalid state
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json(
                {
                    data: [],
                    message: 'No service IDs provided',
                } as BaseResponse<Array<ConsultationServices>>,
                { status: 200 }
            );
        }

        // 3. Query using inArray
        const services = await db
            .select()
            .from(consultationServices)
            .where(inArray(consultationServices.id, ids));

        return NextResponse.json(
            {
                data: services,
                message: 'Consultation Services retrieved successfully',
            } as BaseResponse<Array<ConsultationServices>>,
            { status: 200 }
        );
    } catch (error) {
        // Handle JSON parsing errors or DB errors
        return NextResponse.json(
            {
                error: 'Internal server error',
                message:
                    error instanceof Error
                        ? error.message
                        : 'Something went wrong',
            } as BaseResponse<null>,
            { status: 500 }
        );
    }
}

export const GET = withAuth(getAllConsultationServices);
export const POST = withAuth(getConsultationServicesByIds);
