/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { clientAccount } from '@/db/schema';
import { ilike, and, gte, lte, asc, desc, SQL } from 'drizzle-orm';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    // Extract Query Params
    const name = searchParams.get('name');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const sortBy = searchParams.get('sortBy') || 'scrapedAt'; // default sort
    const order = searchParams.get('order') === 'asc' ? asc : desc;

    try {
        // 1. Build Filters (Where clauses)
        const filters: (SQL | undefined)[] = [];

        if (name) filters.push(ilike(clientAccount.name, `%${name}%`));
        if (startDate)
            filters.push(gte(clientAccount.scrapedAt, new Date(startDate)));
        if (endDate)
            filters.push(lte(clientAccount.scrapedAt, new Date(endDate)));

        // 2. Build Dynamic Sort
        const sortColumn =
            sortBy === 'name' ? clientAccount.name : clientAccount.scrapedAt;

        // 3. Execute Query
        const accounts = await db.query.clientAccount.findMany({
            where: and(...filters),
            with: {
                stats: true,
            },
            orderBy: [order(sortColumn)],
        });

        return NextResponse.json(accounts);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
