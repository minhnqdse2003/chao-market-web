/* eslint-disable @typescript-eslint/no-explicit-any */

'use server';

import { db } from '@/lib/db';
import { userInteractions } from '@/db/schema'; // Your Drizzle schema
import { and, eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/next-auth.config';

type InteractionType = 'LIKE' | 'DISLIKE';

// --- CORE LOGIC HELPER FUNCTION ---
// This centralizes the logic for checking and updating interactions
async function handlePostInteraction(
    userId: string,
    postId: string,
    actionType: InteractionType
) {
    const oppositeType: InteractionType =
        actionType === 'LIKE' ? 'DISLIKE' : 'LIKE';

    // 1. Check for existing interaction
    const [existingInteraction] = await db
        .select()
        .from(userInteractions)
        .where(
            and(
                eq(userInteractions.userId, userId),
                eq(userInteractions.postId, postId)
            )
        )
        .limit(1);

    if (existingInteraction) {
        if (existingInteraction.type === actionType) {
            // Case 1: User is clicking the SAME action again (e.g., Liking an already Liked post)
            // This usually means UNDOING the action (Unliking/Undisliking).
            await db
                .delete(userInteractions)
                .where(
                    and(
                        eq(userInteractions.userId, userId),
                        eq(userInteractions.postId, postId)
                    )
                );
            return { status: `UN-${actionType}` as const }; // e.g., 'UN-LIKE'
        } else if (existingInteraction.type === oppositeType) {
            // Case 2: User is switching actions (e.g., Changing Dislike to Like)
            await db
                .update(userInteractions)
                .set({ type: actionType })
                .where(
                    and(
                        eq(userInteractions.userId, userId),
                        eq(userInteractions.postId, postId)
                    )
                );
            return {
                status: `CHANGED_FROM_${oppositeType}_TO_${actionType}` as const,
            };
        }

        // If the existing interaction is 'VIEW' or another type, we proceed to case 3 (insert)
    }

    // Case 3: No existing interaction, or the existing interaction is neutral/irrelevant.
    await db.insert(userInteractions).values({
        userId,
        postId,
        type: actionType,
    });
    return { status: actionType };
}

// --- PUBLIC SERVER ACTION 1: LIKE ---
export async function togglePostLike(postId: string) {
    try {
        const session = await getServerSession(authOptions);
        const userId = (session?.user as unknown as any)?.id as
            | string
            | undefined;

        if (userId === undefined)
            throw new Error('Authentication required or server error.');

        const result = await handlePostInteraction(userId, postId, 'LIKE');
        return { success: true, ...result };
    } catch (error) {
        console.error('Error toggling like:', error);
        return {
            success: false,
            error: 'Authentication required or server error.',
        };
    }
}

// --- PUBLIC SERVER ACTION 2: DISLIKE ---
export async function togglePostDislike(postId: string) {
    try {
        const session = await getServerSession(authOptions);
        const userId = (session?.user as unknown as any)?.id as
            | string
            | undefined;

        if (userId === undefined)
            throw new Error('Authentication required or server error.');

        const result = await handlePostInteraction(userId, postId, 'DISLIKE');
        return { success: true, ...result };
    } catch (error) {
        console.error('Error toggling dislike:', error);
        return {
            success: false,
            error: 'Authentication required or server error.',
        };
    }
}
