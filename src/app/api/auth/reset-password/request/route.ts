import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, otpCodes } from '@/db/schema';
import { eq } from 'drizzle-orm';
import nodemailer from 'nodemailer';
import { generateId } from '@/utils/generate-id';
import { BaseResponse } from '@/types/base-response';
import {
    RESET_PASSWORD_ACTION,
    OTP_TYPE,
} from '@/app/api/auth/reset-password/constants';

// Generate random 6-digit OTP
function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Email transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
});

// Response types
export interface RequestResetPasswordData {
    action:
        | typeof RESET_PASSWORD_ACTION.EMAIL_VERIFY
        | typeof RESET_PASSWORD_ACTION.RESET_PASSWORD;
}

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json<BaseResponse>(
                { message: 'Email is required' },
                { status: 400 }
            );
        }

        // Find user
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        // Case 3: Email doesn't exist
        if (!user) {
            return NextResponse.json<BaseResponse>(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        // Generate OTP
        const otpCode = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Case 1: Email exists but not confirmed
        if (user.emailVerified === null) {
            // Save email verification OTP
            await db.insert(otpCodes).values({
                id: generateId(),
                userId: user.id,
                code: otpCode,
                type: OTP_TYPE.EMAIL,
                expires: expiresAt,
                verified: false,
                createdAt: new Date(),
            });

            // Send email verification OTP
            await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: email,
                subject: 'Email Verification OTP',
                html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Email Verification Required</h2>
            <p>Your account is not verified. Please use this OTP to verify your email:</p>
            <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
              ${otpCode}
            </div>
            <p>This code will expire in 10 minutes.</p>
          </div>
        `,
            });

            return NextResponse.json<BaseResponse<RequestResetPasswordData>>(
                {
                    message:
                        'Email verification OTP sent. Please verify your email first.',
                    data: { action: RESET_PASSWORD_ACTION.EMAIL_VERIFY },
                },
                { status: 200 }
            );
        }

        // Case 2: Email exists and is confirmed
        // Save reset password OTP
        await db.insert(otpCodes).values({
            id: generateId(),
            userId: user.id,
            code: otpCode,
            type: OTP_TYPE.RESET_PASSWORD,
            expires: expiresAt,
            verified: false,
            createdAt: new Date(),
        });

        // Send reset password OTP
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Password Reset OTP',
            html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Password Reset Request</h2>
            <p>You have requested to reset your password. Your one-time password is:</p>
            <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
              ${otpCode}
            </div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
          </div>
        `,
        });

        return NextResponse.json<BaseResponse<RequestResetPasswordData>>(
            {
                message: 'Password reset OTP sent successfully',
                data: { action: RESET_PASSWORD_ACTION.RESET_PASSWORD },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Reset password request error:', error);
        return NextResponse.json<BaseResponse>(
            { message: 'Failed to process request' },
            { status: 500 }
        );
    }
}
