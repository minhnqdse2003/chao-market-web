// app/api/posts/tags/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { tags } from '@/db/schema';
import { withAuth } from '@/lib/api-route-middleware';
import { BaseResponse } from '@/types/base-response';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { ApiError } from 'next/dist/server/api-utils';
import { createTagSchema } from '@/types/tags/request/create-tags';

// GET: Get all tags
export const GET = withAuth(async () => {
    try {
        const allTags = await db.select().from(tags).orderBy(tags.name);

        return NextResponse.json(
            {
                data: allTags,
                message: 'Tags retrieved successfully',
            } as BaseResponse<typeof allTags>,
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching tags:', error);
        throw new ApiError(500, 'Failed to fetch tags');
    }
});

// POST: Create a new tag
export const POST = withAuth(async (request: NextRequest) => {
    try {
        const body = await request.json();
        const parsed = createTagSchema.safeParse(body);

        if (!parsed.success) {
            throw new ApiError(400, 'Invalid tag data');
        }

        const { name } = parsed.data;

        // Check if tag already exists (case insensitive)
        const existingTag = await db
            .select()
            .from(tags)
            .where(eq(tags.name, name.toLowerCase()));

        if (existingTag.length > 0) {
            throw new ApiError(409, 'Tag already exists');
        }

        // Insert new tag
        const [newTag] = await db
            .insert(tags)
            .values({
                name: name.toLowerCase(), // Normalize to lowercase
            })
            .returning();

        return NextResponse.json(
            {
                data: newTag,
                message: 'Tag created successfully',
            } as BaseResponse<typeof newTag>,
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        console.error('Error creating tag:', error);
        throw new ApiError(500, 'Failed to create tag');
    }
});
