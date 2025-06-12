import { Post, posts } from '@/db/schema';
import { withAuth } from '@/lib/api-route-middleware';
import { db } from '@/lib/db';
import { BaseResponse } from '@/types/base-response';
import { eq, sql } from 'drizzle-orm';
import { ApiError } from 'next/dist/server/api-utils';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';

const likePost = async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {
    const { id } = params;
    if (!z.uuid().safeParse(id).success) {
        throw new ApiError(400, 'Invalid post ID');
    }

    const [result] = await db
        .update(posts)
        .set({ likes: sql`${posts.likes} + 1` })
        .where(eq(posts.id, id))
        .returning();

    return NextResponse.json(
        { message: 'Post liked', data: result } as BaseResponse<Post>,
        { status: 200 }
    );
};

export const POST = withAuth(likePost);
