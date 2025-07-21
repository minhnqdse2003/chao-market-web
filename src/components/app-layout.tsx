'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { usePathname } from 'next/navigation';
import React from 'react';

const SIDEBAR_VISIBLE_ROUTES = ['/auth/signin', '/auth/signup'];

export function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const shouldSidebarVisible = !SIDEBAR_VISIBLE_ROUTES.includes(pathname);

    return (
        <div className="flex w-full">
            {shouldSidebarVisible && <AppSidebar />}
            <main className="w-full dark:bg-sidebar">{children}</main>
        </div>
    );
}
