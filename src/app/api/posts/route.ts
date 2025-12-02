'use server';

import { Post, posts, postTags, tags, userInteractions } from '@/db/schema';
import { withAuth } from '@/lib/api-route-middleware';
import { db } from '@/lib/db';
import { BaseResponse } from '@/types/base-response';
import { PaginatedResponse } from '@/types/pagination';
import { createPostSchema } from '@/types/post/request/create-post';
import { postQuerySchema } from '@/types/post/request/post-params';
import { UUID } from 'crypto';
import { and, desc, eq, gte, inArray, sql } from 'drizzle-orm';
import { getToken } from 'next-auth/jwt';
import { ApiError } from 'next/dist/server/api-utils';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createUniqueSlug } from '@/utils/api/slugify';
import { calculateReadingTime } from '@/utils/api/reading-time';

const getAllPosts = async (request: NextRequest) => {
    try {
        const searchParams = Object.fromEntries(
            request.nextUrl.searchParams.entries()
        );

        const parsed = postQuerySchema.safeParse(searchParams);

        if (!parsed.success) {
            throw new ApiError(400, z.prettifyError(parsed.error));
        }

        const {
            pageIndex,
            pageSize,
            createdAt,
            type,
            filterBy,
            mainTag,
            xUid,
        } = parsed.data;
        const conditions = [];

        if (createdAt) conditions.push(gte(posts.createdAt, createdAt));

        if (type) {
            conditions.push(
                Array.isArray(type) && type.length > 0
                    ? inArray(posts.type, type)
                    : eq(posts.type, type)
            );
        }

        const whereClause = conditions.length ? and(...conditions) : undefined;

        const baseQuery = {
            id: posts.id,
            title: posts.title,
            slug: posts.slug,
            description: posts.description,
            content: posts.content,
            likes: posts.likes,
            dislikes: posts.dislikes,
            views: posts.views,
            referenceSource: posts.referenceSource,
            type: posts.type,
            readingTime: posts.readingTime,
            createdAt: posts.createdAt,
            seoTitle: posts.seoTitle,
            seoDescription: posts.seoDescription,
            seoKeywords: posts.seoKeywords,
            ogImage: posts.ogImage,
            canonicalUrl: posts.canonicalUrl,
            robots: posts.robots,
            market: posts.market,
            imageUrl: posts.imageUrl,
        };
        // Build base query
        let query = db.select(baseQuery).from(posts);

        if (xUid) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            query = db
                .select({
                    ...baseQuery,
                    currentInteractionType: userInteractions.type,
                })
                .from(posts)
                .leftJoin(
                    userInteractions,
                    and(
                        eq(posts.id, userInteractions.postId),
                        eq(userInteractions.userId, xUid)
                    )
                );
        }

        // Add join and filter by tag if mainTag is provided
        if (mainTag) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            query = query
                .innerJoin(postTags, eq(posts.id, postTags.postId))
                .innerJoin(tags, eq(postTags.tagId, tags.id))
                .where(and(whereClause, eq(tags.name, mainTag)));
        } else {
            // Apply where clause without tag filtering
            if (whereClause) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                query = query.where(whereClause);
            }
        }

        // Apply ordering based on filterBy
        if (filterBy) {
            switch (filterBy) {
                case 'recommended':
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    query = query.orderBy(desc(posts.likes));
                    break;
                case 'hottest':
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

        const finalItems = items.map(item => ({
            ...item,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            currentInteractionType: item?.currentInteractionType
                ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  item.currentInteractionType
                : null,
        }));

        // Build count query
        let countQuery = db
            .select({ count: sql<number>`count(*)` })
            .from(posts);

        if (mainTag) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            countQuery = countQuery
                .innerJoin(postTags, eq(posts.id, postTags.postId))
                .innerJoin(tags, eq(postTags.tagId, tags.id))
                .where(and(whereClause, eq(tags.name, mainTag)));
        } else {
            if (whereClause) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                countQuery = countQuery.where(whereClause);
            }
        }

        const total = await countQuery;

        return NextResponse.json(
            {
                data: finalItems,
                pageIndex,
                pageSize,
                totalItems: total[0]?.count || 0,
                totalPages: Math.ceil(total[0]?.count / pageSize),
            } as unknown as PaginatedResponse<Post>,
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        throw new ApiError(500, 'Failed to fetch posts');
    }
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
