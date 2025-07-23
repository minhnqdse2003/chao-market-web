import React from 'react';
import { cn } from '@/lib/utils';
import NextAuthSessionProvider from '@/components/provider/session-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';
import { cookies } from 'next/headers';
import { COOKIE_SIDEBAR_STATE_NAME } from '@/app/constants';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export async function AppLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const defaultOpen =
        cookieStore.get(COOKIE_SIDEBAR_STATE_NAME)?.value === 'true';
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    `${geistSans.variable} ${geistMono.variable} antialiased`,
                    'min-h-svh bg-background'
                )}
                suppressHydrationWarning
            >
                <NextAuthSessionProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <SidebarProvider defaultOpen={defaultOpen}>
                            {children}
                        </SidebarProvider>
                    </ThemeProvider>
                </NextAuthSessionProvider>
            </body>
        </html>
    );
}
