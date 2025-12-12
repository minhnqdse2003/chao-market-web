import { Post, posts, postTags, tags, userInteractions } from '@/db/schema';
import { withAuth } from '@/lib/api-route-middleware';
import { db } from '@/lib/db';
import { BaseResponse } from '@/types/base-response';
import { UpdatePost, updatePostSchema } from '@/types/post/request/update-post';
import { and, eq, getTableColumns } from 'drizzle-orm';
import { getToken } from 'next-auth/jwt';
import { ApiError } from 'next/dist/server/api-utils';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';

const getPostByIdOrSlug = async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {
    const { id } = params;
    const searchParams = Object.fromEntries(
        request.nextUrl.searchParams.entries()
    );

    if (!id) {
        throw new ApiError(400, 'Post ID or slug is required');
    }

    // Check if it's a valid UUID
    const isUuid = z.string().uuid().safeParse(id).success;

    let post;

    if (searchParams?.xUid) {
        [post] = await db
            .select({
                ...getTableColumns(posts),
                currentInteractionType: userInteractions.type,
            })
            .from(posts)
            .leftJoin(
                userInteractions,
                and(
                    eq(posts.id, userInteractions.postId),
                    eq(userInteractions.userId, searchParams.xUid)
                )
            )
            .where(isUuid ? eq(posts.id, id) : eq(posts.slug, id))
            .limit(1);
    } else if (searchParams?.xGuestId) {
        [post] = await db
            .select({
                ...getTableColumns(posts),
                currentInteractionType: userInteractions.type,
            })
            .from(posts)
            .leftJoin(
                userInteractions,
                and(
                    eq(posts.id, userInteractions.postId),
                    eq(userInteractions.guestIdentifier, searchParams.xGuestId)
                )
            )
            .where(isUuid ? eq(posts.id, id) : eq(posts.slug, id))
            .limit(1);
    } else if (isUuid) {
        // Fetch by ID
        [post] = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
    } else {
        // Fetch by slug
        [post] = await db
            .select()
            .from(posts)
            .where(eq(posts.slug, id))
            .limit(1);
    }

    if (!post) {
        throw new ApiError(404, 'Post not found');
    }

    // Fetch associated tags
    const tagRelatedPost = await db
        .select({
            id: tags.id,
            name: tags.name,
        })
        .from(postTags)
        .innerJoin(tags, eq(postTags.tagId, tags.id))
        .where(eq(postTags.postId, post.id));

    const postWithTags = {
        ...post,
        tags: tagRelatedPost,
    };

    // Increment view count (only for slug requests to avoid double counting)
    if (!isUuid) {
        await db
            .update(posts)
            .set({ views: post.views + 1 })
            .where(eq(posts.id, post.id));
    }

    return NextResponse.json(
        { data: postWithTags } as BaseResponse<typeof postWithTags>,
        {
            status: 200,
        }
    );
};

const updatePost = async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {
    const { id } = params;
    const token = await getToken({ req: request });

    if (!token?.sub) {
        throw new ApiError(401, 'Unauthorized');
    }

    if (!z.uuid().safeParse(id).success) {
        throw new ApiError(400, 'Invalid post ID');
    }

    const body = await request.json();
    const parsed = updatePostSchema.safeParse(body);
    if (!parsed.success) {
        throw new ApiError(400, z.prettifyError(parsed.error));
    }

    const [post] = await db
        .select()
        .from(posts)
        .where(eq(posts.id, id))
        .limit(1);
    if (!post) {
        throw new ApiError(404, 'Post not found');
    }

    if (post.userId !== token.sub) {
        throw new ApiError(
            403,
            'Forbidden: You can only update your own posts'
        );
    }

    const updates: Partial<UpdatePost> = {};
    if (parsed.data.content) updates.content = parsed.data.content;
    if (parsed.data.referenceSource)
        updates.referenceSource = parsed.data.referenceSource;

    if (Object.keys(updates).length === 0) {
        throw new ApiError(400, 'No updates provided');
    }

    const [updatedPost] = await db
        .update(posts)
        .set(updates)
        .where(eq(posts.id, id))
        .returning();

    return NextResponse.json(
        { message: 'Post updated', data: updatedPost } as BaseResponse<Post>,
        { status: 200 }
    );
};

const deletePost = async (
    request: NextRequest,
    { params }: { params: { id: string } }
) => {
    const { id } = params;
    const token = await getToken({ req: request });

    if (!token?.sub) {
        throw new ApiError(401, 'Unauthorized');
    }

    if (!z.uuid().safeParse(id).success) {
        throw new ApiError(400, 'Invalid post ID');
    }

    const [post] = await db
        .select()
        .from(posts)
        .where(eq(posts.id, id))
        .limit(1);
    if (!post) {
        throw new ApiError(404, 'Post not found');
    }

    if (post.userId !== token.sub) {
        throw new ApiError(
            403,
            'Forbidden: You can only delete your own posts'
        );
    }

    await db.delete(posts).where(eq(posts.id, id));

    return NextResponse.json(
        { message: 'Post deleted' } as BaseResponse<null>,
        { status: 200 }
    );
};

export const GET = withAuth(getPostByIdOrSlug);
export const PUT = withAuth(updatePost, ['ADMIN']);
export const DELETE = withAuth(deletePost, ['ADMIN']);
