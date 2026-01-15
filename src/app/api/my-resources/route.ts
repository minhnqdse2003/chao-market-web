/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { db } from '@/lib/db';
import { transactions } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { authOptions } from '@/lib/next-auth.config';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        const userId = (session?.user as any)?.id;

        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Fetch ONLY completed transactions for this user
        const paidTransactions = await db.query.transactions.findMany({
            where: and(
                eq(transactions.userId, userId),
                eq(transactions.status, 'COMPLETED')
            ),
            orderBy: [desc(transactions.createdAt)],
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

        // Flatten the data: One transaction -> multiple products
        const resources = paidTransactions.map(tx => ({
            transactionId: tx.id,
            paidAt: tx.updatedAt,
            items: tx.consultation.consultationsProducts.map(p => ({
                name: p.purchasedName,
                imageUrl: p.consultationService?.imageUrl,
                driveLink: p.consultationService?.driveLink,
                type: p.consultationService?.type,
            })),
        }));

        return NextResponse.json(resources);
    } catch (error: any) {
        console.error('Fetch Resources Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
