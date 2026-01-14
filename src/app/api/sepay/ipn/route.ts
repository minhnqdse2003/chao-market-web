/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { transactions } from '@/db/schema';
import { eq } from 'drizzle-orm';

type NotificationType = 'ORDER_PAID' | 'TRANSACTION_VOID';

export interface TransactionWebhookResponse {
    timestamp: number;
    notification_type: NotificationType;
    order: Order;
    transaction: Transaction;
    customer: any;
    agreement: any;
}

export interface Order {
    id: string;
    order_id: string;
    order_status: string;
    order_currency: string;
    order_amount: string;
    order_invoice_number: string;
    custom_data: any[];
    user_agent: string;
    ip_address: string;
    order_description: string;
}

export interface Transaction {
    id: string;
    payment_method: string;
    transaction_id: string;
    transaction_type: string;
    transaction_date: string;
    transaction_status: string;
    transaction_amount: string;
    transaction_currency: string;
    authentication_status: string;
    card_number: any;
    card_holder_name: any;
    card_expiry: any;
    card_funding_method: any;
    card_brand: any;
}

export async function POST(req: NextRequest) {
    try {
        const apiKey = req.headers.get('X-Secret-Key');
        if (apiKey !== process.env.SEPAY_SECRET_KEY) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body: TransactionWebhookResponse = await req.json();
        const transactionId = body.order.order_invoice_number;

        await db.transaction(async tx => {
            // 1. Check if transaction exists
            const [existing] = await tx
                .select()
                .from(transactions)
                .where(eq(transactions.id, transactionId))
                .limit(1);

            if (!existing) {
                return {
                    status: 404,
                    message: 'Transaction not found',
                    responseBody: body,
                };
            }

            // 2. Handle ORDER_PAID
            if (body.notification_type === 'ORDER_PAID') {
                // Only update if not already completed (Idempotency)
                if (existing.status === 'COMPLETED') {
                    return {
                        status: 200,
                        message: 'Already processed',
                        responseBody: body,
                    };
                }

                await tx
                    .update(transactions)
                    .set({
                        status: 'COMPLETED',
                        gatewayTransactionId: body.transaction.transaction_id,
                        paymentGateway: 'SEPAY',
                        updatedAt: new Date().toISOString(),
                    })
                    .where(eq(transactions.id, transactionId));

                return {
                    status: 200,
                    message: 'Transaction completed',
                    responseBody: body,
                };
            }

            // 3. Handle TRANSACTION_VOID
            if (body.notification_type === 'TRANSACTION_VOID') {
                await tx
                    .update(transactions)
                    .set({
                        status: 'FAILED',
                        gatewayTransactionId: body.transaction.transaction_id,
                        updatedAt: new Date().toISOString(),
                    })
                    .where(eq(transactions.id, transactionId));

                return {
                    status: 200,
                    message: 'Transaction voided',
                    responseBody: body,
                };
            }

            return {
                status: 200,
                message: 'No action taken',
                responseBody: body,
            };
        });

        return NextResponse.json({ body: body }, { status: 200 });
    } catch (error) {
        console.error('SePay Webhook Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
