import React from 'react';
import { cn } from '@/lib/utils';
import NextAuthSessionProvider from '@/components/provider/session-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import '@/app/globals.css';
import { cookies } from 'next/headers';
import { APP_THEME_STATE_NAME, COOKIE_SIDEBAR_STATE_NAME } from '@/constant';
import { Providers } from '@/context/provider/query-client';
import '@fontsource/barlow';

export async function AppLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const defaultOpen =
        cookieStore.get(COOKIE_SIDEBAR_STATE_NAME)?.value === 'true';
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(`antialiased`, 'min-h-svh bg-background')}
                suppressHydrationWarning
            >
                <NextAuthSessionProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        storageKey={APP_THEME_STATE_NAME}
                    >
                        <Providers>
                            <SidebarProvider defaultOpen={defaultOpen}>
                                {children}
                            </SidebarProvider>
                        </Providers>
                    </ThemeProvider>
                </NextAuthSessionProvider>
            </body>
        </html>
    );
}
