/* eslint-disable @typescript-eslint/no-explicit-any */
import { Post } from '@/db/schema';
import { PostRequestParams } from '@/types/post/request/post-params';
import { buildURLSearchParams } from '@/utils/api/query-params-build';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/next-auth.config';
import { cookies } from 'next/headers';
import { createHash } from 'crypto';

export async function getPosts(requestParams: PostRequestParams) {
    'use server';
    const transformParams = buildURLSearchParams(requestParams);
    transformParams.delete('type');

    if (Array.isArray(requestParams.type)) {
        requestParams.type.forEach(item =>
            transformParams.append('type', item)
        );
    }

    // Get identifier (user OR guest) - same logic as getPost/togglePostLike
    const session = await getServerSession(authOptions);
    const cookieStore = await cookies();

    let currentUserId: string | undefined;
    let guestIdentifier: string | undefined;

    if ((session?.user as unknown as any)?.id) {
        // Registered user
        currentUserId = (session?.user as unknown as any)?.id as string;
    } else {
        // Guest: get or generate identifier
        let guestId = cookieStore.get('guestId')?.value;
        if (!guestId) {
            const headersList = new Headers();
            const ip = headersList.get('x-forwarded-for') || 'unknown';
            const userAgent = headersList.get('user-agent') || 'unknown';
            guestId = createHash('sha256')
                .update(ip + userAgent)
                .digest('hex')
                .slice(0, 32);
            cookieStore.set('guestId', guestId, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 365,
                secure: process.env.NODE_ENV === 'production',
            });
        }
        guestIdentifier = guestId;
    }

    // Add identifier params
    if (currentUserId) {
        transformParams.append('xUid', currentUserId);
    }
    if (guestIdentifier) {
        transformParams.append('xGuestId', guestIdentifier);
    }

    const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/posts?${transformParams}`
    );

    if (!response.ok) {
        console.error('Failed to fetch posts:', JSON.stringify(response));
        throw new Error('Failed to fetch posts');
    }

    return response.json();
}

export async function createPost(data: Partial<Post>) {
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to create post');
    }

    return response.json();
}
