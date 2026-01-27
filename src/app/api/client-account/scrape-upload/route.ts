/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server';
import {
    clientAccount,
    clientAccountStats,
    clientAccountMetrics,
} from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { db } from '@/lib/db';

// Helper to clean string values ("$1,000" -> "1000")
const cleanNum = (val: string | number | undefined | null): string => {
    if (val === undefined || val === null) return '0';
    if (typeof val === 'number') return val.toString();
    return val.replace(/[$,%]/g, '') || '0';
};

export async function POST(req: Request) {
    try {
        const payload = await req.json();
        const accounts = payload.accounts;

        if (!accounts || !Array.isArray(accounts)) {
            return NextResponse.json(
                { error: 'Invalid payload' },
                { status: 400 }
            );
        }

        let newMetricRowsData = 0;

        for (const acc of accounts) {
            const accountId = acc.account_id;

            await db.transaction(async tx => {
                // 1. Upsert Client Account Metadata
                await tx
                    .insert(clientAccount)
                    .values({
                        id: accountId,
                        name: acc.account_name,
                        url: acc.url,
                        scrapedAt: new Date(acc.scraped_at),
                    })
                    .onConflictDoUpdate({
                        target: clientAccount.id,
                        set: {
                            name: acc.account_name,
                            url: acc.url,
                            scrapedAt: new Date(acc.scraped_at),
                        },
                    });

                // 2. Upsert Account Overview Stats
                await tx
                    .insert(clientAccountStats)
                    .values({
                        accountId: accountId,
                        gain: cleanNum(acc.stats.gain),
                        absGain: cleanNum(acc.stats.abs_gain),
                        daily: cleanNum(acc.stats.daily),
                        monthly: cleanNum(acc.stats.monthly),
                        drawdown: cleanNum(acc.stats.drawdown),
                        balance: cleanNum(acc.stats.balance),
                        equity: cleanNum(acc.stats.equity),
                        profit: cleanNum(acc.stats.profit),
                        depositsTotal: cleanNum(acc.stats.deposits),
                        withdrawalsTotal: cleanNum(acc.stats.withdrawals),
                        updatedAt: new Date(),
                    })
                    .onConflictDoUpdate({
                        target: clientAccountStats.accountId,
                        set: {
                            gain: cleanNum(acc.stats.gain),
                            absGain: cleanNum(acc.stats.abs_gain),
                            daily: cleanNum(acc.stats.daily),
                            monthly: cleanNum(acc.stats.monthly),
                            drawdown: cleanNum(acc.stats.drawdown),
                            balance: cleanNum(acc.stats.balance),
                            equity: cleanNum(acc.stats.equity),
                            profit: cleanNum(acc.stats.profit),
                            depositsTotal: cleanNum(acc.stats.deposits),
                            withdrawalsTotal: cleanNum(acc.stats.withdrawals),
                            updatedAt: new Date(),
                        },
                    });

                // 3. Smart Update Chart Data (Metrics)
                const existingMaxDates = await tx
                    .select({
                        type: clientAccountMetrics.type,
                        maxDate: sql<string>`max(
                        ${clientAccountMetrics.metricDate}
                        )`,
                    })
                    .from(clientAccountMetrics)
                    .where(eq(clientAccountMetrics.accountId, accountId))
                    .groupBy(clientAccountMetrics.type);

                // Convert into a lookup map for easy filtering
                const lastDateMap: Record<string, string | null> = {};
                existingMaxDates.forEach(row => {
                    lastDateMap[row.type] = row.maxDate;
                });

                const newMetricRows: any[] = [];

                // Map incoming keys to our enum types
                const chartMapping = {
                    equity_growth: acc.chart_data.equity_growth,
                    growth: acc.chart_data.growth,
                    deposit: acc.chart_data.deposits,
                    withdrawal: acc.chart_data.withdrawals,
                };

                for (const [type, dataPoints] of Object.entries(chartMapping)) {
                    if (!dataPoints) continue;

                    const lastDateInDb = lastDateMap[type];

                    dataPoints.forEach((p: any) => {
                        // Only add if date is strictly newer than the one in DB
                        if (!lastDateInDb || p.date > lastDateInDb) {
                            newMetricRows.push({
                                accountId: accountId,
                                metricDate: p.date,
                                type: type as any,
                                value: cleanNum(p.value),
                            });
                        }
                    });
                }

                // 4. Batch insert only the new rows
                if (newMetricRows.length > 0) {
                    newMetricRowsData = newMetricRows.length;
                    await tx.insert(clientAccountMetrics).values(newMetricRows);
                }
            });
        }

        return NextResponse.json({
            success: true,
            message: 'Data synchronized',
            data: {
                newMetrics: newMetricRowsData,
            },
        });
    } catch (error: any) {
        console.error('Sync Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
