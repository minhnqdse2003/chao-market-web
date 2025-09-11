// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { cartItems, transactionItems, transactions } from '@/db/schema';
import { z } from 'zod/v4';
import { db } from '@/lib/db';
import { withAuth } from '@/lib/api-route-middleware';
import { BaseResponse } from '@/types/base-response';
import { ApiError } from 'next/dist/server/api-utils';
import { and, eq, inArray } from 'drizzle-orm';
import { baseUserInfoSchema } from '@/schema/user-infor-schema';

export const checkoutSchema = baseUserInfoSchema.extend({
    dateOfBirth: z
        .date('Invalid date format')
        .optional()
        .refine(date => !date || date < new Date(), {
            message: 'Date of birth must be in the past',
        }),
    contactMethods: z.array(z.string()).min(1), // Keep required for checkout
    cartItemIds: z.array(z.string()).min(1), // Checkout-specific field
});

export type CheckoutData = z.infer<typeof checkoutSchema>;

async function UserCheckout(req: NextRequest) {
    try {
        const token = await getToken({ req });

        if (!token || !token.sub) {
            throw new ApiError(401, 'Unauthorized');
        }

        const body = await req.json();
        const validatedData = checkoutSchema.parse(body);

        // Get user's cart with items and products
        const cart = await db.query.carts.findFirst({
            where: (cart, { eq }) => eq(cart.userId, token.sub!),
            with: {
                items: {
                    with: {
                        product: true,
                    },
                },
            },
        });

        if (!cart) {
            throw new ApiError(404, 'Cart not found');
        }

        // Filter selected items
        const selectedItems = cart.items.filter(item =>
            validatedData.cartItemIds.includes(item.productId)
        );

        if (selectedItems.length === 0) {
            throw new ApiError(400, 'No items selected for checkout');
        }

        // Calculate total amount
        const totalAmount = selectedItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
        );

        // Create transaction record
        const transaction = await db.transaction(async tx => {
            // Insert transaction with user information
            const [newTransaction] = await tx
                .insert(transactions)
                .values({
                    cartId: cart.id,
                    userId: token.sub!,
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
                    totalAmount,
                    status: 'pending',
                })
                .returning();

            // Insert transaction items
            const transactionItemsData = selectedItems.map(item => ({
                transactionId: newTransaction.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.product.price, // Store current price
            }));

            await tx.insert(transactionItems).values(transactionItemsData);
            await tx
                .delete(cartItems)
                .where(
                    and(
                        eq(cartItems.cartId, cart.id),
                        inArray(cartItems.productId, validatedData.cartItemIds)
                    )
                );

            return newTransaction;
        });

        return NextResponse.json(
            {
                data: transaction,
                message: 'Checkout information saved successfully',
            } as BaseResponse<typeof transaction>,
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

export const POST = withAuth(UserCheckout);
