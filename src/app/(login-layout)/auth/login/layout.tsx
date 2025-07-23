import type { Metadata } from 'next';
import Login from '@/app/(login-layout)/auth/login/page';

export const metadata: Metadata = {
    title: 'Login',
};

export default async function LoginLayout() {
    return <Login />;
}
