import Link from 'next/link';
import React, { ReactNode } from 'react';

export interface BlockContentsProps {
    title: string;
    children: ReactNode;
    buttonComp: {
        title: string;
        href: string;
    };
    id: string;
}

const BlockContents = ({
    id,
    title,
    children,
    buttonComp,
}: BlockContentsProps) => {
    return (
        <div
            className="w-full flex flex-col [&>p]:mb-4 min-h-[50svh] pt-5 [&>p:not(:first-child)]:font-light [&>p:not(:first-child)]:text-lg [&>p:last-child]:mb-0 [&>p:first-child]:mb-6 [&_*_ul]:list-disc [&_*_ul]:list-inside"
            id={id}
        >
            <p className="font-bold text-3xl">{title}</p>
            <span className="text-[var(--brand-grey-foreground)] [&>p]:mb-6 tracking-wide leading-relaxed">
                {children}
            </span>
            <Link
                href={buttonComp.href}
                className="bg-[var(--brand-color)] rounded-3xl px-5 py-2 w-fit uppercase dark:text-black font-semibold mt-4"
            >
                {buttonComp.title}
            </Link>
        </div>
    );
};

export default BlockContents;
