import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Đăng Ký Chao Market - Tạo Tài Khoản | Sign Up for Chao Market',
    description:
        'Tạo tài khoản Chao Market miễn phí tại chaomarket.com/auth/sign-up để truy cập tính năng cá nhân hóa. | Create free Chao Market account for personalized features and exclusive content.',
    keywords: [
        'Chao Market đăng ký',
        'chaomarket.com đăng ký',
        'tạo tài khoản Chao Market',
        'Chao Market sign up',
        'create Chao Market account',
        'join Chao Market',
    ],
    alternates: {
        canonical: 'https://chaomarket.com/auth/sign-up',
    },
    openGraph: {
        title: 'Đăng Ký Chao Market - Tham Gia Ngay | Sign Up for Chao Market',
        description:
            'Tạo tài khoản miễn phí để mở khóa tính năng. | Create free account to unlock features.',
        url: 'https://chaomarket.com/auth/sign-up',
        siteName: 'Chao Market',
        images: [
            {
                url: 'https://chaomarket.com/img/brand-logo.svg',
                width: 1200,
                height: 630,
                alt: 'Chao Market - Đăng Ký / Sign Up',
            },
        ],
        locale: 'vi_VN',
        type: 'website',
    },
    twitter: {
        title: 'Chao Market Đăng Ký | Sign Up',
        description: 'Tham gia ngay hôm nay | Join today with quick signup.',
        card: 'summary_large_image',
        images: ['https://chaomarket.com/img/brand-logo.svg'],
    },
};

export default function SignUpLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
