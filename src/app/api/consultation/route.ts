// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
    consultations,
    consultationServices,
    consultationsProducts,
} from '@/db/schema';
import { z } from 'zod/v4';
import { db } from '@/lib/db';
import { BaseResponse } from '@/types/base-response';
import { ApiError } from 'next/dist/server/api-utils';
import { inArray } from 'drizzle-orm';
import { baseUserInfoSchema } from '@/schema/user-infor-schema';
import { withAuth } from '@/lib/api-route-middleware';

export const consultationRequestSchema = baseUserInfoSchema.extend({
    dateOfBirth: z
        .date('Invalid date format')
        .optional()
        .refine(date => !date || date < new Date(), {
            message: 'Date of birth must be in the past',
        }),
    contactMethods: z.array(z.string()).min(1), // Keep required for checkout
    consultationProductIds: z.array(z.string()).min(1), // Checkout-specific field
});

async function ConsultationRequest(req: NextRequest) {
    try {
        const body = await req.json();
        const validatedData = consultationRequestSchema.parse({
            ...body,
            dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : null,
        });

        // Filter selected items
        const selectedItems = validatedData.consultationProductIds;

        // Check if selected Items is exist in database
        const services = await db.query.consultationServices.findMany({
            where: inArray(consultationServices.id, selectedItems),
        });

        if (services.length !== selectedItems.length) {
            // Some items don't exist
            const foundIds = services.map(service => service.id);
            const missingIds = selectedItems.filter(
                id => !foundIds.includes(id)
            );

            throw new ApiError(
                400,
                `The following consultation services don't exist: ${missingIds.join(', ')}`
            );
        }

        // Create consultation request record
        const consultation = await db.transaction(async tx => {
            // Insert consultation request with user information
            const [newConsultation] = await tx
                .insert(consultations)
                .values({
                    // User information from validated data
                    firstName: validatedData.firstName,
                    lastName: validatedData.lastName,
                    dateOfBirth: validatedData.dateOfBirth
                        ? new Date(validatedData.dateOfBirth)
                        : null,
                    email: validatedData.email,
                    phoneNumber: validatedData.phoneNumber,
                    socialNetwork: validatedData.socialNetwork,
                    contactMethods: validatedData.contactMethods,
                    message: validatedData.message,
                    status: 'pending',
                })
                .returning();

            // Insert consultation request items
            const selectedConsultationsProducts = selectedItems.map(item => ({
                consultationId: newConsultation.id,
                productId: item,
            }));

            await tx
                .insert(consultationsProducts)
                .values(selectedConsultationsProducts);

            return newConsultation;
        });

        return NextResponse.json(
            {
                data: consultation,
                message: 'Request consultation information saved successfully',
            } as BaseResponse<typeof consultation>,
            { status: 201 }
        );
    } catch (error) {
        console.error('Checkout error:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    error: 'Invalid data',
                    message: 'Validation failed',
                    details: z.prettifyError(error),
                } as BaseResponse<null>,
                { status: 400 }
            );
        }

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

export const POST = withAuth(ConsultationRequest);
