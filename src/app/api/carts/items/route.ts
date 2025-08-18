// app/api/cart/items/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { db } from '@/lib/db';
import { withAuth } from '@/lib/api-route-middleware';
import { BaseResponse } from '@/types/base-response';
import { ApiError } from 'next/dist/server/api-utils';
import { cartItems } from '@/db/schema';
import { and, eq, inArray } from 'drizzle-orm';
import { z } from 'zod';

const deleteItemsSchema = z.object({
    productIds: z.array(z.string()).min(1),
});

export type DeleteItemsData = z.infer<typeof deleteItemsSchema>;

async function deleteCartItems(req: NextRequest) {
    try {
        const token = await getToken({ req });

        if (!token || !token.sub) {
            throw new ApiError(401, 'Unauthorized');
        }

        const body = await req.json();
        const validatedData = deleteItemsSchema.parse(body);

        // Get user's cart
        const cart = await db.query.carts.findFirst({
            where: (cart, { eq }) => eq(cart.userId, token.sub!),
        });

        if (!cart) {
            throw new ApiError(404, 'Cart not found');
        }

        // Delete specified items from cart
        await db
            .delete(cartItems)
            .where(
                and(
                    eq(cartItems.cartId, cart.id),
                    inArray(cartItems.productId, validatedData.productIds)
                )
            );

        return NextResponse.json(
            {
                data: null,
                message: 'Items removed from cart successfully',
            } as BaseResponse<null>,
            { status: 200 }
        );
    } catch (error) {
        console.error('Delete cart items error:', error);

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

export const DELETE = withAuth(deleteCartItems);
