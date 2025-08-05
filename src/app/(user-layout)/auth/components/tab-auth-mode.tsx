import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { LogoBrand } from '@image/index';
import Image from 'next/image';

export default function TabAuthMode() {
    const modeParam = usePathname().startsWith('/auth/signup')
        ? 'signup'
        : 'signin';

    // Default to 'signup' if mode is 'signup', otherwise 'signin'
    const [mode] = useState<'signin' | 'signup'>( // setMode
        modeParam === 'signup' ? 'signup' : 'signin'
    );

    return (
        <>
            <div className="flex items-center justify-center gap-4">
                <Image
                    width={1920}
                    height={1080}
                    src={LogoBrand}
                    alt="Chao market logo"
                    className="size-18"
                />
                <h1 className="text-[var(--brand-color)] text-4xl font-bold">
                    Chào Market
                </h1>
            </div>
            <div className="flex my-6 w-2/3 mx-auto rounded-4xl overflow-hidden p-1 border border-[var(--brand-grey-foreground)] [&>a]:rounded-4xl [&>a]:text-center [&>a]:text-sm [&>a]:px-8 [&>a]:py-2 [&>a[data-state=active]]:bg-[var(--brand-grey-foreground)] [&>a[data-state=active]]:text-[var(--brand-color)] [&>a[data-state=active]]:font-bold">
                <Link
                    className="w-full signin-link-button"
                    data-state={mode === 'signin' ? 'active' : 'inactive'}
                    href="/auth/login"
                >
                    Sign In
                </Link>
                <Link
                    className="w-full signup-link-button"
                    data-state={mode === 'signup' ? 'active' : 'inactive'}
                    href="/auth/signup"
                >
                    Sign Up
                </Link>
            </div>
        </>
    );
}
