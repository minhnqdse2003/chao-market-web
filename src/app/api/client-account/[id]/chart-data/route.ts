/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const accountId = params.id;
    const { searchParams } = new URL(req.url);

    const interval = parseInt(searchParams.get('interval') || '1');
    const startDate = searchParams.get('startDate');

    try {
        const result = await db.execute(sql`
            WITH sampled_data AS (SELECT type,
                                         metric_date,
                                         value,
                                         ROW_NUMBER() OVER(PARTITION BY type ORDER BY metric_date ASC) as row_idx
                                  FROM client_account_metrics
                                  WHERE account_id = ${accountId}
                ${
                    startDate
                        ? sql`AND metric_date >=
                        ${startDate}`
                        : sql``
                }
                )
               , flagged_data AS (
            SELECT
                *,
                -- This flag is 1 for ALL rows of a specific date if ANY row on that date 
                -- is a deposit or withdrawal with a non-zero value.
                MAX (CASE WHEN type IN ('deposit', 'withdrawal') AND value != 0 THEN 1 ELSE 0 END)
                OVER(PARTITION BY metric_date) as is_transaction_day
            FROM sampled_data
                )
            SELECT type,
                   json_agg(
                       json_build_object('date', metric_date, 'value', value) ORDER BY metric_date ASC
                   ) as data
            FROM flagged_data
            WHERE (
                -- Condition for growth metrics:
                -- 1. Take the sampled interval (e.g., every 14th day)
                -- 2. OR take the day if a transaction happened (is_transaction_day = 1)
                type IN ('equity_growth', 'growth')
                    AND (row_idx % ${interval > 0 ? interval : 1} = 0 OR is_transaction_day = 1)
                )
               OR (
                -- Condition for financial metrics:
                -- Only include the actual deposits/withdrawals if they are not zero
                type IN ('deposit', 'withdrawal')
                    AND value != 0
                )
            GROUP BY type
        `);

        const chartData = (result.rows as any[]).reduce((acc, row) => {
            acc[row.type] = row.data;
            return acc;
        }, {});

        return new NextResponse(JSON.stringify(chartData), {
            status: 200,
            headers: {
                'Cache-Control':
                    'public, s-maxage=3600, stale-while-revalidate=59',
                'Content-Type': 'application/json',
            },
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
