import { AppLayout } from '@/components/app-layout';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    // themeColor: [
    //     { media: '(prefers-color-scheme: light)', color: 'black' },
    //     { media: '(prefers-color-scheme: dark)', color: 'white' },
    // ],
    icons: {
        icon: '/favicon.ico',
    },
    // other: {
    //     'google-site-verification':
    //         'rrSHqLDbd4l1mddFBwIoXTV-XmI0ClyITWrHq1sMklk',
    // },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <AppLayout>{children}</AppLayout>;
}
