import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, otpCodes } from '@/db/schema';
import { eq, and, gt } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { BaseResponse } from '@/types/base-response';

export async function POST(request: NextRequest) {
    try {
        const { email, password, otp } = await request.json();

        if (!email || !password || !otp) {
            return NextResponse.json<BaseResponse>(
                { message: 'Email, password, and OTP are required' },
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

        // Verify OTP is valid and verified
        const [otpRecord] = await db
            .select()
            .from(otpCodes)
            .where(
                and(
                    eq(otpCodes.userId, user.id),
                    eq(otpCodes.code, otp),
                    eq(otpCodes.verified, true),
                    gt(otpCodes.expires, new Date())
                )
            )
            .limit(1);

        if (!otpRecord) {
            return NextResponse.json<BaseResponse>(
                { message: 'Invalid or expired OTP verification' },
                { status: 400 }
            );
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Update user password
        await db
            .update(users)
            .set({ password: hashedPassword })
            .where(eq(users.id, user.id));

        // Invalidate used OTP
        await db
            .update(otpCodes)
            .set({ expires: new Date(Date.now() - 1000) }) // Expire immediately
            .where(eq(otpCodes.id, otpRecord.id));

        return NextResponse.json<BaseResponse>(
            { message: 'Password updated successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Password change error:', error);
        return NextResponse.json<BaseResponse>(
            { message: 'Failed to update password' },
            { status: 500 }
        );
    }
}
