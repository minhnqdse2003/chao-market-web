import Link from 'next/link';
import React, { ReactNode } from 'react';

export interface BlockContentsProps {
    title: string;
    children: ReactNode;
    buttonComp: {
        title: string;
        href: string;
    };
}

const BlockContents = ({ title, children, buttonComp }: BlockContentsProps) => {
    return (
        <div className="w-full flex flex-col [&>p]:mb-4 [&>p:not(:first-child)]:font-light [&>p:not(:first-child)]:text-lg [&>p:last-child]:mb-0 [&>p:first-child]:mb-6 [&>ul]:list-disc [&>ul]:list-inside">
            <p className="font-bold text-3xl">{title}</p>
            {children}
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
