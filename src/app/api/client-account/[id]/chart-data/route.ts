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
            SELECT type,
                   json_agg(
                       json_build_object('date', metric_date, 'value', value) ORDER BY metric_date ASC
                   ) as data
            FROM sampled_data
            WHERE (
                type IN ('equity_growth', 'growth')
                    AND row_idx % ${interval > 0 ? interval : 1} = 0
                )
               OR (
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
