import { Eye, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { formatNumberOfViews } from '@/utils/number-parsing';
import AppShareButton from '@/components/app-share-button';

interface AppInteractionBlockProps {
    like: number;
    dislike: number;
    views: number;
    containerClass?: string;
    isShareButtonVisible?: boolean;
}

export default function AppInteractionBlock(item: AppInteractionBlockProps) {
    return (
        <div
            className={
                item.containerClass ?? 'flex gap-4 [&_*_svg]:size-3 text-sm'
            }
        >
            {/* Share Button */}
            {item.isShareButtonVisible && <AppShareButton />}

            {/* Like */}
            <div className="flex items-center gap-1">
                <div>
                    <ThumbsUpIcon />
                </div>
                {item.like}
            </div>
            {/* Dislike */}
            <div className="flex items-center gap-1">
                <div>
                    <ThumbsDownIcon />
                </div>
                {item.dislike}
            </div>
            {/* Views */}
            <div className="flex items-center gap-1">
                <div>
                    <Eye />
                </div>
                {formatNumberOfViews(item.views)}
            </div>
        </div>
    );
}
