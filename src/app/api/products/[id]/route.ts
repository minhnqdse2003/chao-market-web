import { Product } from '@/db/schema';
import { withAuth } from '@/lib/api-route-middleware';
import { db } from '@/lib/db';
import { BaseResponse } from '@/types/base-response';
import { NextRequest, NextResponse } from 'next/server';

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
        } as BaseResponse<Product>,
        { status: 200 }
    );
};

export const GET = withAuth(getProductById);
