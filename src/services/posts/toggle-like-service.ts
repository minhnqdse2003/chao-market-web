/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { db } from '@/lib/db';
import { userInteractions } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/next-auth.config';
import { cookies } from 'next/headers';

type InteractionType = 'LIKE' | 'DISLIKE';

// --- CORE LOGIC HELPER FUNCTION (UPDATED FOR GUESTS) ---
async function handlePostInteraction(
    identifier: string,
    isGuest: boolean,
    postId: string,
    actionType: InteractionType
) {
    const oppositeType: InteractionType =
        actionType === 'LIKE' ? 'DISLIKE' : 'LIKE';

    // Build query condition for this user/guest
    const identifierCondition = isGuest
        ? eq(userInteractions.guestIdentifier, identifier)
        : eq(userInteractions.userId, identifier);

    // 1. Check for existing interaction
    const [existingInteraction] = await db
        .select()
        .from(userInteractions)
        .where(and(eq(userInteractions.postId, postId), identifierCondition))
        .limit(1);

    if (existingInteraction) {
        if (existingInteraction.type === actionType) {
            // Case 1: UNDO (Unliking already liked post)
            await db
                .delete(userInteractions)
                .where(
                    and(
                        eq(userInteractions.postId, postId),
                        identifierCondition
                    )
                );
            return { status: `UN-${actionType}` as const };
        } else if (existingInteraction.type === oppositeType) {
            // Case 2: Switch (Dislike → Like)
            await db
                .update(userInteractions)
                .set({ type: actionType })
                .where(
                    and(
                        eq(userInteractions.postId, postId),
                        identifierCondition
                    )
                );
            return {
                status: `CHANGED_FROM_${oppositeType}_TO_${actionType}` as const,
            };
        }
    }

    // Case 3: New interaction (delete old if exists, insert new)
    await db
        .delete(userInteractions)
        .where(and(eq(userInteractions.postId, postId), identifierCondition));

    await db.insert(userInteractions).values({
        userId: isGuest ? null : identifier,
        guestIdentifier: isGuest ? identifier : null,
        postId,
        type: actionType,
    });

    return { status: actionType };
}

// --- PUBLIC SERVER ACTION 1: LIKE (NO AUTH REQUIRED) ---
export async function togglePostLike(postId: string) {
    try {
        const session = await getServerSession(authOptions);
        const cookieStore = await cookies();

        // Determine identifier
        let identifier: string;
        let isGuest = false;

        if ((session?.user as unknown as any)?.id) {
            identifier = (session?.user as unknown as any).id as string;
        } else {
            // Guest: use cookie or generate from headers
            identifier = cookieStore.get('guestId')?.value as unknown as any;
            isGuest = true;
        }

        const result = await handlePostInteraction(
            identifier,
            isGuest,
            postId,
            'LIKE'
        );
        return { success: true, ...result };
    } catch (error) {
        console.error('Error toggling like:', error);
        return {
            success: false,
            error: 'Failed to toggle like.',
        };
    }
}

// --- PUBLIC SERVER ACTION 2: DISLIKE (NO AUTH REQUIRED) ---
export async function togglePostDislike(postId: string) {
    try {
        const session = await getServerSession(authOptions);
        const cookieStore = await cookies();

        // Same identifier logic
        let identifier: string;
        let isGuest = false;

        if ((session?.user as unknown as any)?.id) {
            identifier = (session?.user as unknown as any).id as string;
        } else {
            identifier = cookieStore.get('guestId')?.value as unknown as any;
            isGuest = true;
        }

        const result = await handlePostInteraction(
            identifier,
            isGuest,
            postId,
            'DISLIKE'
        );
        return { success: true, ...result };
    } catch (error) {
        console.error('Error toggling dislike:', error);
        return {
            success: false,
            error: 'Failed to toggle dislike.',
        };
    }
}
