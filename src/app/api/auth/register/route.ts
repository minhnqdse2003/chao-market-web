import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
    try {
        const { email, password, name, gender, dateOfBirth, phoneNumber } =
            await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        if (!name || !gender || !dateOfBirth) {
            return NextResponse.json({
                error: 'Name, gender and date of birth are required',
            });
        }

        // Check if user already exists
        const [existingUser] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const [newUser] = await db
            .insert(users)
            .values({
                email,
                password: hashedPassword,
                name,
                gender,
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
                phone: phoneNumber,
            })
            .returning({
                id: users.id,
                email: users.email,
                name: users.name,
            });

        return NextResponse.json(
            {
                message: 'User created successfully',
                user: newUser,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
