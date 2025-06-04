import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, otpCodes } from '@/db/schema';
import { eq, and, gt } from 'drizzle-orm';
import nodemailer from 'nodemailer';
import { generateId } from '@/utils/generate-id';

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

export async function POST(request: NextRequest) {
    try {
        const { email, type = 'email' } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
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
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Generate OTP
        const otpCode = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Save OTP to database
        await db.insert(otpCodes).values({
            id: generateId(),
            userId: user.id,
            code: otpCode,
            type,
            expires: expiresAt,
            verified: false,
            createdAt: new Date(),
        });

        // Send OTP via email
        if (type === 'email') {
            await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: email,
                subject: 'Your OTP Code',
                html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Your OTP Code</h2>
            <p>Your one-time password is:</p>
            <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
              ${otpCode}
            </div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
          </div>
        `,
            });
        }

        return NextResponse.json(
            { message: 'OTP sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('OTP generation error:', error);
        return NextResponse.json(
            { error: 'Failed to send OTP' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const { email, otp } = await request.json();

        if (!email || !otp) {
            return NextResponse.json(
                { error: 'Email and OTP are required' },
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
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Verify OTP
        const [otpRecord] = await db
            .select()
            .from(otpCodes)
            .where(
                and(
                    eq(otpCodes.userId, user.id),
                    eq(otpCodes.code, otp),
                    eq(otpCodes.verified, false),
                    gt(otpCodes.expires, new Date())
                )
            )
            .limit(1);

        if (!otpRecord) {
            return NextResponse.json(
                { error: 'Invalid or expired OTP' },
                { status: 400 }
            );
        }

        // Mark OTP as verified
        await db
            .update(otpCodes)
            .set({ verified: true })
            .where(eq(otpCodes.id, otpRecord.id));

        // Update user verification status
        await db
            .update(users)
            .set({ emailVerified: new Date() })
            .where(eq(users.id, user.id));

        return NextResponse.json(
            { message: 'OTP verified successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('OTP verification error:', error);
        return NextResponse.json(
            { error: 'Failed to verify OTP' },
            { status: 500 }
        );
    }
}
