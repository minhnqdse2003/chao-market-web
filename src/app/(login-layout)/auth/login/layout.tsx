import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Login',
    description:
        'Login to your Chao Market account to access exclusive features and personalized content.',
    keywords: ['login', 'chao market', 'sign in', 'account access'],
    openGraph: {
        title: 'Login',
        description:
            'Login to your Chao Market account to access exclusive features and personalized content.',
    },
    twitter: {
        title: 'Login - Chao Market',
        description:
            'Login to your Chao Market account to access exclusive features and personalized content.',
        card: 'summary_large_image',
    },
};

// The function has been corrected to accept and render children.
export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
