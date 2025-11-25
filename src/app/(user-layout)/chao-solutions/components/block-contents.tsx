'use client';

import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export interface BlockContentsProps {
    title: string;
    children: ReactNode;
    buttonComp: {
        title: string;
        id: string;
    };
    id: string;
    params?: string;
    slug?: string;
}

const BlockContents = ({
    id,
    title,
    children,
    buttonComp,
    params,
    slug,
}: BlockContentsProps) => {
    const router = useRouter();
    return (
        <div
            id={slug ?? id}
            className="w-full flex flex-col [&>p]:mb-4 min-h-[60svh] [&>p:not(:first-child)]:font-light [&>p:not(:first-child)]:text-lg [&>p:last-child]:mb-0 [&>p:first-child]:mb-6 [&_*_ul]:list-disc [&_*_ul]:list-inside"
        >
            <p className="font-bold text-size-22 dark:text-[var(--brand-color)]">
                {title}
            </p>
            <span className="dark:[&>_*_]:text-[var(--brand-grey-foreground)] [&>p]:mb-6 tracking-wide leading-7">
                {children}
            </span>
            <Button
                onClick={() =>
                    router.push(
                        params
                            ? `/book-a-consultation?selectedItemId=${params}`
                            : `/book-a-consultation`
                    )
                }
                className="bg-[var(--brand-color)] hover:bg-[var(--brand-color)] transition-all! duration-300 ease-in-out rounded-3xl px-5 py-2 w-fit text-brand-text dark:text-black font-semibold mt-8 shadow-lg"
            >
                {buttonComp.title}
            </Button>
        </div>
    );
};

export default BlockContents;
