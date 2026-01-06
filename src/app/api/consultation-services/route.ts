import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from 'next/dist/server/api-utils';
import { BaseResponse } from '@/types/base-response';
import { withAuth } from '@/lib/api-route-middleware';
import { db } from '@/lib/db';
import { ConsultationServices, consultationServices } from '@/db/schema';
import { eq, not } from 'drizzle-orm';

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

export const GET = withAuth(getAllConsultationServices);
