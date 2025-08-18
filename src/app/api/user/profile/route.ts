import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { db } from '@/lib/db';
import { BaseResponse } from '@/types/base-response';
import { ApiError } from 'next/dist/server/api-utils';
import { userProfiles } from '@/db/schema';
import { z } from 'zod/v4';
import { withAuth } from '@/lib/api-route-middleware';
import { eq } from 'drizzle-orm';
import { baseUserInfoSchema } from '@/schema/user-infor-schema';

// Schema for profile data
export const userProfileSchema = baseUserInfoSchema.extend({
    dateOfBirth: z.string().optional(), // Make optional for profile
    contactMethods: z.array(z.string()).optional(), // Make optional for profile
});

export type UserProfileData = z.infer<typeof userProfileSchema>;

// GET - Retrieve user profile
async function getUserProfile(req: NextRequest) {
    try {
        const token = await getToken({ req });

        if (!token || !token.sub) {
            throw new ApiError(401, 'Unauthorized');
        }

        const profile = await db.query.userProfiles.findFirst({
            where: (profile, { eq }) => eq(profile.userId, token.sub!),
        });

        return NextResponse.json({
            data: profile,
            message: profile
                ? 'Profile retrieved successfully'
                : 'No profile found',
        } as BaseResponse<typeof profile>);
    } catch (error) {
        console.error('Get user profile error:', error);

        if (error instanceof ApiError) {
            return NextResponse.json(
                {
                    error: error.message,
                    message: error.message,
                } as BaseResponse<null>,
                { status: error.statusCode }
            );
        }

        return NextResponse.json(
            {
                error: 'Internal server error',
                message: 'Something went wrong',
            } as BaseResponse<null>,
            { status: 500 }
        );
    }
}

// PATCH - Create or update user profile
async function upsertUserProfile(req: NextRequest) {
    try {
        const token = await getToken({ req });

        if (!token || !token.sub) {
            throw new ApiError(401, 'Unauthorized');
        }

        const body = await req.json();
        const validatedData = userProfileSchema.parse(body);

        // Check if profile already exists
        const existingProfile = await db.query.userProfiles.findFirst({
            where: (profile, { eq }) => eq(profile.userId, token.sub!),
        });

        let profile;
        if (existingProfile) {
            // Update existing profile (PATCH behavior)
            [profile] = await db
                .update(userProfiles)
                .set({
                    ...validatedData,
                    updatedAt: new Date(),
                })
                .where(eq(userProfiles.userId, token.sub!))
                .returning();
        } else {
            // Create new profile (PATCH can also create)
            [profile] = await db
                .insert(userProfiles)
                .values({
                    userId: token.sub,
                    ...validatedData,
                })
                .returning();
        }

        return NextResponse.json(
            {
                data: profile,
                message: 'Profile saved successfully',
            } as BaseResponse<typeof profile>,
            { status: 200 }
        ); // 200 for successful update/create
    } catch (error) {
        console.error('Save user profile error:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    error: 'Invalid data',
                    message: 'Validation failed',
                    details: z.prettifyError(error),
                } as BaseResponse<null>,
                { status: 400 }
            );
        }

        if (error instanceof ApiError) {
            return NextResponse.json(
                {
                    error: error.message,
                    message: error.message,
                } as BaseResponse<null>,
                { status: error.statusCode }
            );
        }

        return NextResponse.json(
            {
                error: 'Internal server error',
                message: 'Something went wrong',
            } as BaseResponse<null>,
            { status: 500 }
        );
    }
}

// Export handlers with authentication middleware
export const GET = withAuth(getUserProfile);
export const PATCH = withAuth(upsertUserProfile);
