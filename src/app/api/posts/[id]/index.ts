'use server';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Post, Tag } from '@/db/schema';
import { BaseResponse } from '@/types/base-response';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/next-auth.config';
import { cookies } from 'next/headers';
import { createHash } from 'crypto';

export const getPost = async (
    postId: string
): Promise<
    BaseResponse<
        Post & {
            tags: Tag[];
            currentUserInteraction: 'LIKE' | 'DISLIKE' | null;
            likeCount: number;
            dislikeCount: number;
        }
    >
> => {
    const session = await getServerSession(authOptions);
    const cookieStore = await cookies();

    // Determine identifier (user OR guest)
    let currentUserId: string | undefined;
    let guestIdentifier: string | undefined;

    if ((session?.user as unknown as any)?.id) {
        // Registered user
        currentUserId = (session?.user as unknown as any)?.id as string;
    } else {
        // Guest: get or generate identifier
        let guestId = cookieStore.get('guestId')?.value;
        if (!guestId) {
            // Generate from headers (same logic as togglePostLike)
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

    const requestUrl =
        `${process.env.NEXTAUTH_URL}/api/posts/${postId}?` +
        new URLSearchParams({
            ...(currentUserId && { xUid: currentUserId }),
            ...(guestIdentifier && { xGuestId: guestIdentifier }),
        }).toString();

    const response = await fetch(requestUrl);

    if (!response.ok) {
        throw new Error('Failed to fetch post');
    }

    return response.json();
};
