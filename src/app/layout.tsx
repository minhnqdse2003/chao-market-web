import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/config/site.config';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import NextAuthSessionProvider from '@/components/provider/session-provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { getServerSession } from 'next-auth';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
    icons: {
        icon: '/favicon.ico',
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession();
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
                        <SidebarProvider>
                            {session && <AppSidebar />}
                            <main className="w-full px-8 py-4 dark:bg-sidebar">
                                {children}
                            </main>
                        </SidebarProvider>
                    </ThemeProvider>
                </NextAuthSessionProvider>
            </body>
        </html>
    );
}
