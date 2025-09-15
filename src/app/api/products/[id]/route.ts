import { ConsultationServices, consultationServices } from '@/db/schema';
import { withAuth } from '@/lib/api-route-middleware';
import { db } from '@/lib/db';
import { BaseResponse } from '@/types/base-response';
import {
    CreateNewProduct,
    newProductSchema,
} from '@/types/product/request/create-product';
import { updateProductSchema } from '@/types/product/request/update-product';
import { eq } from 'drizzle-orm';
import { ApiError } from 'next/dist/server/api-utils';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';

const getProductById = async (
    _: NextRequest,
    { params }: { params: { id: string } }
) => {
    const product = await db.query.products.findFirst({
        where: (p, { eq }) => eq(p.id, params.id),
    });
    if (!product)
        return NextResponse.json(
            { message: 'Product not found' } as BaseResponse,
            { status: 404 }
        );
    return NextResponse.json(
        {
            data: product,
            message: 'Product retrieved successfully',
        } as BaseResponse<ConsultationServices>,
        { status: 200 }
    );
};

const updateProduct = async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;
    const body = await request.json();
    const parsedRequestData = newProductSchema.safeParse(body);

    if (!parsedRequestData.success) {
        throw new ApiError(400, z.prettifyError(parsedRequestData.error));
    }

    const updatedProduct: CreateNewProduct = parsedRequestData.data;
    const [result] = await db
        .update(consultationServices)
        .set(updatedProduct)
        .where(eq(consultationServices.id, id))
        .returning();

    if (!result) {
        return NextResponse.json(
            { message: 'Product not found' } as BaseResponse,
            { status: 404 }
        );
    }

    return NextResponse.json(
        {
            data: result,
            message: 'Product updated successfully',
        } as BaseResponse<ConsultationServices>,
        { status: 200 }
    );
};

const patchProduct = async (
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    const { id } = await params;
    const body = await request.json();
    const parsedRequestData = updateProductSchema.safeParse(body);

    if (!parsedRequestData.success) {
        throw new ApiError(400, z.prettifyError(parsedRequestData.error));
    }

    const updatedProduct = parsedRequestData.data;
    const [result] = await db
        .update(consultationServices)
        .set(updatedProduct)
        .where(eq(consultationServices.id, id))
        .returning();

    if (!result) {
        throw new ApiError(400, 'Product not found');
    }

    return NextResponse.json(
        {
            data: result,
            message: 'Product partially updated successfully',
        } as BaseResponse<ConsultationServices>,
        { status: 200 }
    );
};

export const GET = withAuth(getProductById);
export const PUT = withAuth(updateProduct);
export const PATCH = withAuth(patchProduct);
