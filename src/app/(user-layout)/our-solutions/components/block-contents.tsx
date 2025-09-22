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
}

const BlockContents = ({
    id,
    title,
    children,
    buttonComp,
}: BlockContentsProps) => {
    const router = useRouter();
    return (
        <div
            className="w-full flex flex-col [&>p]:mb-4 min-h-[60svh] [&>p:not(:first-child)]:font-light [&>p:not(:first-child)]:text-lg [&>p:last-child]:mb-0 [&>p:first-child]:mb-6 [&_*_ul]:list-disc [&_*_ul]:list-inside"
            id={id}
        >
            <p className="font-bold text-xl dark:text-[var(--brand-color)]">
                {title}
            </p>
            <span className="dark:text-[var(--brand-grey-foreground)] text-black [&>p]:mb-6 tracking-wide leading-relaxed">
                {children}
            </span>
            <Button
                onClick={() => router.push('/cart-items')}
                className="bg-[var(--brand-color)] hover:bg-[var(--brand-color)] transition-all! duration-300 ease-in-out rounded-3xl px-5 py-2 w-fit text-brand-text dark:text-black font-semibold mt-4 shadow-lg"
            >
                {buttonComp.title}
            </Button>
        </div>
    );
};

export default BlockContents;
