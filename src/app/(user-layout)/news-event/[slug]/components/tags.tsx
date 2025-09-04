import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

interface TagProps {
    label: string;
    onClick?: () => void;
    className?: string;
    clickable?: boolean;
}

interface TagsAccordionProps {
    tags: Array<{
        id: string;
        name: string;
    }> | null;
}

function Tag({ label, onClick, className = '', clickable = false }: TagProps) {
    const baseStyles =
        'inline-block px-4 py-2 rounded-full mb-3 text-sm font-medium cursor-default select-none text-center ' +
        'bg-[var(--brand-grey)] text-white';

    const clickableStyles =
        'hover:bg-gray-300 active:bg-gray-400 cursor-pointer';

    if (clickable) {
        return (
            <button
                type="button"
                onClick={onClick}
                className={`${baseStyles} ${clickableStyles} ${className}`}
            >
                {label}
            </button>
        );
    }

    return <span className={`${baseStyles} ${className}`}>{label}</span>;
}

export default function TagsAccordion({ tags }: TagsAccordionProps) {
    // Fallback tags
    const fallbackTags = [
        { id: '1', name: 'tỷlệ' },
        { id: '2', name: 'kinhtê' },
        { id: '3', name: 'chính sách' },
        { id: '4', name: 'xuấtkhẩu' },
        { id: '5', name: 'vàngbạc' },
        { id: '6', name: 'lợinhuận' },
        { id: '7', name: 'niêmyết' },
    ];

    const displayTags = tags && tags.length > 0 ? tags : fallbackTags;

    return (
        <Accordion
            type="single"
            className="bg-[var(--brand-black-bg)] w-full rounded-2xl px-6 py-1 overflow-hidden"
            collapsible
            defaultValue={'item-1'}
        >
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg cursor-pointer font-semibold">
                    Tags
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                    <div className="flex flex-wrap gap-2">
                        {displayTags.map(tag => (
                            <Tag
                                key={tag.id}
                                label={`#${tag.name}`}
                                className={
                                    'dark:text-[var(--brand-grey-foreground)] font-semibold'
                                }
                            />
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
