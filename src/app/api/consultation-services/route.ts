import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from 'next/dist/server/api-utils';
import { BaseResponse } from '@/types/base-response';
import { withAuth } from '@/lib/api-route-middleware';
import { db } from '@/lib/db';
import { ConsultationServices, consultationServices } from '@/db/schema';
import { eq, inArray, not } from 'drizzle-orm';

async function getAllConsultationServices(request: NextRequest) {
    try {
        const searchParams = Object.fromEntries(
            request.nextUrl.searchParams.entries()
        );

        const { type } = searchParams;

        const whereClause = type
            ? not(eq(consultationServices.type, 'Holistic'))
            : eq(consultationServices.type, 'Holistic');

        const services = await db
            .select()
            .from(consultationServices)
            .where(whereClause)
            .orderBy(consultationServices.createdAt);

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
