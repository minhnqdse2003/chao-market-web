// components/PostInteractionManager.tsx
'use client';

import { Eye, ThumbsUpIcon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { formatNumberOfViews } from '@/utils/number-parsing';
import { useSession } from 'next-auth/react'; // Import useSession
import { useRouter } from 'next/navigation';
import { togglePostLike } from '@/services/posts/toggle-like-service';
import { toast } from 'sonner'; // Import useRouter for client-side navigation

interface PostInteractionManagerProps {
    postId: string;
    initialLike: number;
    initialDislike: number;
    initialViews: number;
    initialInteractionType: 'LIKE' | 'DISLIKE' | null;
    containerClass?: string;
}

export default function PostInteractionManager({
    postId,
    initialLike,
    initialViews,
    initialInteractionType,
    containerClass,
}: PostInteractionManagerProps) {
    // --- Authentication and Navigation Hooks ---
    const { data: session, status } = useSession();
    const router = useRouter();

    // Global state for this specific post's interactions
    const [likeCount, setLikeCount] = useState(initialLike);
    const [currentInteraction, setCurrentInteraction] = useState(
        initialInteractionType
    );

    const [isPending, startTransition] = useTransition();

    const checkAuth = () => {
        if (status === 'loading') {
            return false;
        }
        if (!session) {
            router.push('/auth/login');
            return false;
        }
        return true;
    };

    const handleLike = () => {
        if (!checkAuth() || isPending) return; // Check auth first

        startTransition(async () => {
            const result = await togglePostLike(postId);

            if (result.success) {
                switch (result?.status) {
                    case 'LIKE':
                        setLikeCount(prev => prev + 1);
                        setCurrentInteraction('LIKE');
                        break;
                    case 'UN-LIKE':
                        setLikeCount(prev => prev - 1);
                        setCurrentInteraction(null);
                        break;
                    case 'CHANGED_FROM_DISLIKE_TO_LIKE':
                        setLikeCount(prev => prev + 1);
                        setCurrentInteraction('LIKE');
                        break;
                }
            } else {
                // Check if the server action failed due to auth (although checkAuth should catch this)
                if (result.error?.includes('Authentication')) {
                    // router.push('/auth/login');
                } else {
                    toast.error(result.error);
                }
            }
        });
    };

    // --- Dislike Handler ---
    const isLiked = currentInteraction === 'LIKE';

    // Disable buttons if a transition is pending OR if the session is still loading
    const actionDisabled = isPending || status === 'loading';

    return (
        <div
            className={containerClass ?? 'flex gap-4 [&_*_svg]:size-3 text-sm'}
        >
            {/* --- Like Button --- */}
            <button
                onClick={handleLike}
                disabled={actionDisabled}
                className={`flex items-center gap-1 not-disabled:hover:cursor-pointer not-disabled:hover:text-[var(--brand-color)] duration-300 ease-in-out transition-colors! ${isLiked ? 'text-[var(--brand-color)]' : 'text-gray-500'} ${actionDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <div>
                    <ThumbsUpIcon
                        className={
                            isLiked ? 'fill-[var(--brand-color)]' : 'fill-none'
                        }
                    />
                </div>
                {likeCount}
            </button>

            {/* Views (Non-interactive) */}
            <div className="flex items-center gap-1 text-gray-500">
                <div>
                    <Eye />
                </div>
                {formatNumberOfViews(initialViews)}
            </div>
        </div>
    );
}
