import type { Metadata } from 'next';
import SignUp from '@/app/(login-layout)/auth/signup/page';

export const metadata: Metadata = {
    title: 'Sign Up',
};

export default async function LoginLayout() {
    return <SignUp />;
}
