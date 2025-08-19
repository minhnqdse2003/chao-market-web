// app/api/posts/route.ts (or wherever your route handler is)
import { Post, posts, postTags } from '@/db/schema';
import { withAuth } from '@/lib/api-route-middleware';
import { db } from '@/lib/db';
import { BaseResponse } from '@/types/base-response';
import { PaginatedResponse } from '@/types/pagination';
import { createPostSchema } from '@/types/post/request/create-post';
import { postQuerySchema } from '@/types/post/request/post-params';
import { UUID } from 'crypto';
import { and, desc, eq, gte, sql } from 'drizzle-orm';
import { getToken } from 'next-auth/jwt';
import { ApiError } from 'next/dist/server/api-utils';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createUniqueSlug } from '@/utils/api/slugify';
import { calculateReadingTime } from '@/utils/api/reading-time';

const getAllPosts = async (request: NextRequest) => {
    const searchParams = Object.fromEntries(
        request.nextUrl.searchParams.entries()
    );
    const parsed = postQuerySchema.safeParse(searchParams);

    if (!parsed.success) {
        throw new ApiError(400, z.prettifyError(parsed.error));
    }

    const { pageIndex, pageSize, createdAt, type, filterBy } = parsed.data;
    const conditions = [];

    if (createdAt) conditions.push(gte(posts.createdAt, createdAt));
    if (type) conditions.push(eq(posts.type, type));

    const whereClause = conditions.length ? and(...conditions) : undefined;

    // Build query with ordering to maintain proper type
    let query = db.select().from(posts).where(whereClause);

    // Apply ordering based on filterBy
    if (filterBy) {
        switch (filterBy) {
            case 'recommended':
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                query = query.orderBy(desc(posts.likes));
                break;
            case 'hottest':
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                query = query.orderBy(desc(posts.views));
                break;
            case 'mostViewed':
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                query = query.orderBy(desc(posts.views));
                break;
            case 'topRated':
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                query = query.orderBy(desc(posts.likes));
                break;
            default:
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                query = query.orderBy(desc(posts.createdAt));
        }
    } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        query = query.orderBy(desc(posts.createdAt));
    }

    // Execute the query with pagination
    const items = await query.limit(pageSize).offset(pageIndex * pageSize);

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
            totalPages: Math.ceil(total[0]?.count / pageSize),
        } as PaginatedResponse<Post>,
        { status: 200 }
    );
};

const createNewPost = async (request: NextRequest) => {
    console.log('=== CREATE POST DEBUG START ===');

    try {
        const body = await request.json();

        const token = await getToken({ req: request });

        if (!token?.sub) {
            throw new ApiError(401, 'Unauthorized');
        }

        const parsed = createPostSchema.safeParse(body);
        if (!parsed.success) {
            throw new ApiError(400, z.prettifyError(parsed.error));
        }
        console.log('✅ Schema validation passed:', parsed.data);

        const {
            content,
            referenceSource,
            title,
            description,
            type,
            slug,
            tagIds,
            seoKeywords,
        } = parsed.data;

        const readingTime = calculateReadingTime(content);

        const finalSlug = slug
            ? await createUniqueSlug(slug)
            : await createUniqueSlug(title);

        const result = await db.transaction(async tx => {
            console.log('📝 Inserting post...');
            const [newPost] = await tx
                .insert(posts)
                .values({
                    userId: token.sub as UUID,
                    content,
                    referenceSource,
                    title,
                    description,
                    type,
                    slug: finalSlug,
                    readingTime,
                    seoKeywords:
                        seoKeywords && seoKeywords.length > 0
                            ? seoKeywords
                            : undefined,
                })
                .returning();

            // Associate tags if provided
            if (tagIds && tagIds.length > 0) {
                const tagAssociations = tagIds.map(tagId => ({
                    postId: newPost.id,
                    tagId,
                }));

                await tx
                    .insert(postTags)
                    .values(tagAssociations)
                    .onConflictDoNothing(); // Prevent duplicates
            } else {
                console.log('⏭️ No tags to associate');
            }

            return newPost;
        });

        return NextResponse.json(
            { message: 'Post created', data: result } as BaseResponse<Post>,
            { status: 201 }
        );
    } catch (error) {
        console.error('💥 ERROR in createNewPost:', error);
        console.error(
            '💥 ERROR STACK:',
            error instanceof Error ? error.stack : 'No stack trace'
        );
        console.log('=== CREATE POST DEBUG END WITH ERROR ===');

        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, 'Failed to create post');
    }
};

export const GET = withAuth(getAllPosts);
export const POST = withAuth(createNewPost, ['USER']);
