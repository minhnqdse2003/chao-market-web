import type { Metadata } from 'next';
import Login from '@/app/(login-layout)/auth/login/page';

export const metadata: Metadata = {
    title: 'Login - Chao Market',
    description:
        'Login to your Chao Market account to access exclusive features and personalized content.',
    keywords: ['login', 'chao market', 'sign in', 'account access'],
    openGraph: {
        title: 'Login - Chao Market',
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

export default async function LoginLayout() {
    return <Login />;
}
