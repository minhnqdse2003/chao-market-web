'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { PiShareFat } from 'react-icons/pi';
import { T } from './app-translate';

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
            className="bg-[var(--brand-grey)] hover:bg-[var(--brand-grey)] shadow-sm border-[var(--brand-grey)] border text-brand-text transition-all! duration-300 ease-in-out rounded-3xl text-xs font-normal gap-2"
            onClick={handleShare}
        >
            <PiShareFat className={'size-3'} />
            <T keyName={'common.share'} />
        </Button>
    );
}
