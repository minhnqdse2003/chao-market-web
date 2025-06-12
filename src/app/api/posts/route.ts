import { Post, posts } from '@/db/schema';
import { withAuth } from '@/lib/api-route-middleware';
import { db } from '@/lib/db';
import { BaseResponse } from '@/types/base-response';
import { PaginatedResponse } from '@/types/pagination';
import { createPostSchema } from '@/types/post/request/create-post';
import { postQuerySchema } from '@/types/post/request/post-params';
import { UUID } from 'crypto';
import { and, gte, sql } from 'drizzle-orm';
import { getToken } from 'next-auth/jwt';
import { ApiError } from 'next/dist/server/api-utils';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';

const getAllPosts = async (request: NextRequest) => {
    const searchParams = Object.fromEntries(
        request.nextUrl.searchParams.entries()
    );
    const parsed = postQuerySchema.safeParse(searchParams);

    if (!parsed.success) {
        throw new ApiError(400, z.prettifyError(parsed.error));
    }

    const { pageIndex, pageSize, createdAt } = parsed.data;
    const conditions = [];
    if (createdAt) conditions.push(gte(posts.createdAt, createdAt));

    const whereClause = conditions.length ? and(...conditions) : undefined;

    const items = await db
        .select()
        .from(posts)
        .where(whereClause)
        .limit(pageSize)
        .offset(pageIndex * pageSize);

    const total = await db
        .select({ count: sql<number>`count(*)` })
        .from(posts)
        .where(whereClause);

    return NextResponse.json(
        {
            data: items,
            pageIndex,
            pageSize,
            totalItems: total[0]?.count || 0,
        } as PaginatedResponse<Post>,
        { status: 200 }
    );
};

const createNewPost = async (request: NextRequest) => {
    const body = await request.json();
    const token = await getToken({ req: request });

    if (!token?.sub) {
        throw new ApiError(401, 'Unauthorized');
    }

    const parsed = createPostSchema.safeParse(body);
    if (!parsed.success) {
        throw new ApiError(400, z.prettifyError(parsed.error));
    }

    const { content, referenceSource } = parsed.data;
    const [result] = await db
        .insert(posts)
        .values({
            userId: token.sub as UUID,
            content,
            referenceSource,
        })
        .returning();

    return NextResponse.json(
        { message: 'Post created', data: result } as BaseResponse<Post>,
        { status: 201 }
    );
};

export const GET = withAuth(getAllPosts);
export const POST = withAuth(createNewPost, ['ADMIN']);
