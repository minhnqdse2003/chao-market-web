'use client';

import Image from 'next/image';
import { ShareIcon } from '@image/index';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AppShareButtonProps {
    slug?: string;
}

export default function AppShareButton({ slug }: AppShareButtonProps) {
    const handleShare = async () => {
        try {
            const currentPath =
                window.location.origin + window.location.pathname;
            const shareUrl =
                slug === undefined ? currentPath : `${currentPath}/${slug}`;

            await navigator.clipboard.writeText(shareUrl);

            toast.info('Link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <Button
            className="dark:bg-[var(--brand-grey-foreground)] dark:text-white rounded-3xl text-xs font-normal"
            onClick={handleShare}
        >
            <Image
                src={ShareIcon}
                alt={'share-icon'}
                width={100}
                height={100}
                className="size-3"
            />
            Share
        </Button>
    );
}
