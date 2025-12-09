import type { Metadata } from 'next';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Đăng Nhập Chao Market | Login to Chao Market',
    description:
        'Đăng nhập tài khoản Chao Market tại chaomarket.com/auth/login. | Sign in to your Chao Market account for secure access.',
    keywords: [
        'Chao Market đăng nhập',
        'chaomarket.com đăng nhập',
        'đăng nhập Chao Market',
        'Chao Market login',
        'chaomarket.com login',
        'sign in Chao Market',
    ],
    alternates: {
        canonical: 'https://chaomarket.com/auth/login',
    },
    openGraph: {
        title: 'Đăng Nhập Chao Market | Login to Chao Market',
        description: 'Đăng nhập an toàn. | Secure account access.',
        url: 'https://chaomarket.com/auth/login',
        siteName: 'Chao Market',
        images: [
            {
                url: 'https://chaomarket.com/img/brand-logo.svg',
                width: 1200,
                height: 630,
                alt: 'Chao Market Login',
            },
        ],
        locale: 'vi_VN',
        type: 'website',
    },
    twitter: {
        title: 'Chao Market Đăng Nhập | Login',
        description: 'Truy cập nhanh | Quick access',
        card: 'summary_large_image',
        images: ['https://chaomarket.com/img/brand-logo.svg'],
    },
};

// The function has been corrected to accept and render children.
export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense>
            <div className={'w-full h-full'}>{children}</div>
        </Suspense>
    );
}
