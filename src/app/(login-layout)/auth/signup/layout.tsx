import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Sign Up',
    description: 'Create an account to get started with Chao Market.',
};

export default function SignUpLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
