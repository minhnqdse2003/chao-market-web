import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/db/schema';
import { and, eq, isNotNull } from 'drizzle-orm';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json(
                { error: 'Missing email' },
                { status: 400 }
            );
        }

        const user = await db.query.users.findFirst({
            where: and(eq(users.email, email), isNotNull(users.password)),
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            email: user.email,
            emailVerified: !!user.emailVerified,
        });
    } catch (error) {
        console.error('Verification Check Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
