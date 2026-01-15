/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { transactions } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { google } from 'googleapis';

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

function extractDriveId(urlInput: string): string | null {
    try {
        const url = new URL(urlInput);
        const pathParts = url.pathname.split('/');
        const dIndex = pathParts.indexOf('d');
        const folderIndex = pathParts.indexOf('folders');
        if (dIndex !== -1 && pathParts[dIndex + 1])
            return pathParts[dIndex + 1];
        if (folderIndex !== -1 && pathParts[folderIndex + 1])
            return pathParts[folderIndex + 1];
        return url.searchParams.get('id');
    } catch {
        return null;
    }
}

async function grantDriveAccess(email: string, driveLink: string) {
    const driveId = extractDriveId(driveLink);
    if (!driveId) return;

    const auth = new google.auth.JWT({
        email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/drive'],
    });

    const drive = google.drive({ version: 'v3', auth });

    await drive.permissions.create({
        fileId: driveId,
        requestBody: { role: 'reader', type: 'user', emailAddress: email },
    });
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
            const existing = await tx.query.transactions.findFirst({
                where: eq(transactions.id, transactionId),
                with: {
                    consultation: {
                        with: {
                            consultationsProducts: {
                                with: {
                                    consultationService: true,
                                },
                            },
                        },
                    },
                },
            });

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

                const userEmail = existing.consultation?.email;
                const products =
                    existing.consultation?.consultationsProducts || [];

                if (userEmail && products.length > 0) {
                    let allSuccessful = true;
                    let errorLog = '';

                    for (const item of products) {
                        const driveLink = item.consultationService?.driveLink;
                        if (driveLink) {
                            try {
                                await grantDriveAccess(userEmail, driveLink);
                            } catch (driveErr: any) {
                                allSuccessful = false;
                                errorLog += `[Product ${item.productId}]: ${driveErr.message}; `;
                            }
                        }
                    }

                    // Record the result of the access attempt
                    await tx
                        .update(transactions)
                        .set({
                            accessGrantedAt: allSuccessful
                                ? new Date().toISOString()
                                : null,
                            accessError: allSuccessful ? null : errorLog,
                            updatedAt: new Date().toISOString(),
                        })
                        .where(eq(transactions.id, transactionId));
                }

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
