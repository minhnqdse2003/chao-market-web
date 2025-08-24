import { Eye, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';

interface AppInteractionBlockProps {
    like: number;
    dislike: number;
    views: number;
    containerClass?: string;
}

export default function AppInteractionBlock(item: AppInteractionBlockProps) {
    return (
        <div
            className={
                item.containerClass ?? 'flex gap-4 [&_*_svg]:size-3 text-sm'
            }
        >
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
                {item.views} {'  '}Views
            </div>
        </div>
    );
}
