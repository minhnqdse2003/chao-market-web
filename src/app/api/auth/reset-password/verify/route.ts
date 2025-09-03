import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, otpCodes } from '@/db/schema';
import { eq, and, gt } from 'drizzle-orm';
import { BaseResponse } from '@/types/base-response';
import { OTP_TYPE } from '@/app/api/auth/reset-password/constants';

// Response types
export interface VerifyResetPasswordData {
    emailVerified?: boolean;
}

export async function POST(request: NextRequest) {
    try {
        const { email, otp } = await request.json();

        if (!email || !otp) {
            return NextResponse.json<BaseResponse>(
                { message: 'Email and OTP are required' },
                { status: 400 }
            );
        }

        // Find user
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (!user) {
            return NextResponse.json<BaseResponse>(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        // Case 1: Email not verified - verify email with OTP
        if (user.emailVerified === null) {
            const [otpRecord] = await db
                .select()
                .from(otpCodes)
                .where(
                    and(
                        eq(otpCodes.userId, user.id),
                        eq(otpCodes.code, otp),
                        eq(otpCodes.type, OTP_TYPE.EMAIL),
                        eq(otpCodes.verified, false),
                        gt(otpCodes.expires, new Date())
                    )
                )
                .limit(1);

            if (!otpRecord) {
                return NextResponse.json<BaseResponse>(
                    { message: 'Invalid or expired OTP' },
                    { status: 400 }
                );
            }

            // Mark OTP as verified and update email verification
            await db
                .update(otpCodes)
                .set({ verified: true })
                .where(eq(otpCodes.id, otpRecord.id));

            await db
                .update(users)
                .set({ emailVerified: new Date() })
                .where(eq(users.id, user.id));

            return NextResponse.json<BaseResponse<VerifyResetPasswordData>>(
                {
                    message: 'Email verified successfully',
                    data: { emailVerified: true },
                },
                { status: 200 }
            );
        }

        // Case 2: Email verified - verify reset password OTP
        const [otpRecord] = await db
            .select()
            .from(otpCodes)
            .where(
                and(
                    eq(otpCodes.userId, user.id),
                    eq(otpCodes.code, otp),
                    eq(otpCodes.type, OTP_TYPE.RESET_PASSWORD),
                    eq(otpCodes.verified, false),
                    gt(otpCodes.expires, new Date())
                )
            )
            .limit(1);

        if (!otpRecord) {
            return NextResponse.json<BaseResponse>(
                { message: 'Invalid or expired OTP' },
                { status: 400 }
            );
        }

        // Mark OTP as verified
        await db
            .update(otpCodes)
            .set({ verified: true })
            .where(eq(otpCodes.id, otpRecord.id));

        return NextResponse.json<BaseResponse<VerifyResetPasswordData>>(
            {
                message: 'OTP verified successfully',
                data: { emailVerified: true },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('OTP verification error:', error);
        return NextResponse.json<BaseResponse>(
            { message: 'Failed to verify OTP' },
            { status: 500 }
        );
    }
}
