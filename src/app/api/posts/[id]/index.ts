'use server';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Post, Tag } from '@/db/schema';
import { BaseResponse } from '@/types/base-response';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/next-auth.config';
import { cookies } from 'next/headers';

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
        guestIdentifier = cookieStore.get('guestId')?.value;
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
