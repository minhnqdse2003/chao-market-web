import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/db/schema';
import { and, eq, isNotNull } from 'drizzle-orm';
import { BaseResponse } from '@/types/base-response';
import { withAuth } from '@/lib/api-route-middleware';
import { VerifyEmailResponse } from '@/types/user/response/verify-response';

async function verifyEmail(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json(
                { message: 'Missing email' } as BaseResponse,
                { status: 400 }
            );
        }

        const user = await db.query.users.findFirst({
            where: and(eq(users.email, email), isNotNull(users.password)),
        });

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' } as BaseResponse,
                { status: 404 }
            );
        }

        const result: BaseResponse<VerifyEmailResponse> = {
            data: {
                email: user.email,
                emailVerified: !!user.emailVerified,
            },
            message: 'Email verification successful',
        };

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('Verification Check Error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' } as BaseResponse,
            { status: 500 }
        );
    }
}

export const GET = withAuth(verifyEmail);
