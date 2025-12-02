/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { Post, Tag } from '@/db/schema';
import { BaseResponse } from '@/types/base-response';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/next-auth.config';

export const getPost = async (
    postId: string
): Promise<BaseResponse<Post & { tags: Tag[] }>> => {
    const session = await getServerSession(authOptions);
    const currentUserId = (session?.user as unknown as any)?.id as
        | string
        | undefined;

    const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/posts/${postId}${currentUserId ? `?xUid=${currentUserId}` : ''}`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch post');
    }

    return response.json();
};
