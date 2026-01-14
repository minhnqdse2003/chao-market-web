/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { db } from '@/lib/db';
import {
    users,
    consultations,
    consultationsProducts,
    transactions,
    consultationServices,
    affiliateCodes,
} from '@/db/schema';
import { inArray, eq, and, isNotNull } from 'drizzle-orm';
import { authOptions } from '@/lib/next-auth.config';
import { getSePayClient } from '@/lib/sepay-client';

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!(session?.user as unknown as any)?.id)
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );

        const { serviceIds, affiliateCode } = await request.json();

        // START TRANSACTION
        const result = await db.transaction(async tx => {
            // 1. Get User Data
            const [userData] = await tx
                .select()
                .from(users)
                .where(
                    and(
                        eq(users.id, (session?.user as unknown as any).id),
                        isNotNull(users.emailVerified)
                    )
                );

            if (!userData) {
                throw new Error('User not found or email not verified');
            }

            // 2. Fetch services to get REAL prices
            const selectedServices = await tx
                .select()
                .from(consultationServices)
                .where(inArray(consultationServices.id, serviceIds));

            const subtotal = selectedServices.reduce(
                (sum, s) => sum + Number(s.price),
                0
            );

            // 3. Validate Affiliate Code (IF PROVIDED)
            let discountAmount = 0;

            if (affiliateCode) {
                const [codeData] = await tx
                    .select()
                    .from(affiliateCodes)
                    .where(
                        and(
                            eq(affiliateCodes.code, affiliateCode),
                            eq(affiliateCodes.isActive, true)
                        )
                    );

                // Check if code is valid and not expired
                if (
                    codeData &&
                    (!codeData.expiresAt ||
                        new Date(codeData.expiresAt) > new Date())
                ) {
                    discountAmount =
                        (subtotal * codeData.discountPercent) / 100;
                }
            }

            const finalTotal = subtotal - discountAmount;

            // 4. Create Consultation
            const [newConsultation] = await tx
                .insert(consultations)
                .values({
                    firstName: userData.name?.split(' ')[0] || 'User',
                    lastName:
                        userData.name?.split(' ').slice(1).join(' ') || '',
                    email: userData.email,
                    phoneNumber: userData.phone || 'N/A',
                    status: 'pending',
                    contactMethods: ['email'],
                })
                .returning();

            // 5. Link Products
            const productInserts = selectedServices.map(s => ({
                consultationId: newConsultation.id,
                productId: s.id,
                purchasedName: s.name,
                purchasedPrice: Math.round(
                    Number(s.price) - discountAmount
                ).toString(),
                originalPrice: s.price,
                wasDiscounted: discountAmount > 0,
            }));
            await tx.insert(consultationsProducts).values(productInserts);

            // 6. Create Transaction with CALCULATED amount
            const [newTransaction] = await tx
                .insert(transactions)
                .values({
                    consultationId: newConsultation.id,
                    userId: (session?.user as unknown as any)?.id,
                    amount: finalTotal.toFixed(4),
                    currency: 'VND',
                    status: 'PENDING',
                    paymentGateway: 'SEPAY',
                })
                .returning();

            const sepayClient = getSePayClient();
            const checkoutURL = sepayClient.checkout.initCheckoutUrl();
            const formFields = sepayClient.checkout.initOneTimePaymentFields({
                payment_method: 'BANK_TRANSFER',
                order_invoice_number: newTransaction.id,
                order_amount: finalTotal,
                currency: 'VND',
                order_description: `Thanh toan dich vu ${newConsultation.id.slice(0, 8)}`,
                success_url: `${process.env.NEXTAUTH_URL}/payment/success`,
                error_url: `${process.env.NEXTAUTH_URL}/payment/error`,
                cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
            });

            return { checkoutURL, formFields };
        });

        return NextResponse.json({ data: result }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
