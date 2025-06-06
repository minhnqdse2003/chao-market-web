'use client';

import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { sendOtpCode, verifiedEmail, verifiedOtpCode } from '@/services/auth';
import { BaseResponse } from '@/types/base-response';
import { VerifyEmailResponse } from '@/types/user/response/verify-response';

export default function SignIn() {
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isEmailConfirmed, setIsEmailConfirmed] = useState<boolean | null>(
        null
    );
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleCredentialsLogin = async () => {
        setLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                email,
                password,
                otp: undefined,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid credentials');
            } else {
                router.push('/dashboard');
            }
        } catch {
            setError('An error occurred during sign in');
        } finally {
            setLoading(false);
        }
    };

    const handleEmailVerify = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await verifiedEmail(email);
            const result: BaseResponse<VerifyEmailResponse> =
                await response.json();

            if (!response.ok) {
                throw new Error(result.message);
            }

            if (result.data?.emailVerified) {
                setIsEmailConfirmed(true);
            } else {
                await handleSendOtp();
                setIsEmailConfirmed(false);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(
                err.message || 'An error occurred during email verification'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = (provider: string) => {
        signIn(provider, { callbackUrl: '/dashboard' });
    };

    const handleSendOtp = async () => {
        try {
            await sendOtpCode(email);
        } catch {
            console.error('Failed to send OTP');
        }
    };

    const handleVerifyOtp = async () => {
        setLoading(true);
        try {
            const response = await verifiedOtpCode({
                email,
                otp,
            });

            if (response.ok) {
                setIsEmailConfirmed(true);
            } else {
                const data = await response.json();
                setError(data.error || 'OTP verification failed');
            }
        } catch {
            setError('Failed to verify OTP');
        } finally {
            setLoading(false);
        }
    };

    // Check next-auth's callback errors
    useEffect(() => {
        const errorParam = searchParams.get('error');

        if (errorParam) {
            let message = 'An unknown error occurred.';

            switch (errorParam) {
                case 'OAuthAccountNotLinked':
                    message =
                        'This email is already associated with a different sign-in method.';
                    break;
                case 'CredentialsSignin':
                    message = 'Invalid credentials. Please try again.';
                    break;
                case 'AccessDenied':
                    message = 'Access denied.';
                    break;
            }

            setError(message);
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-lg w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="space-y-4">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    {/* Email container */}
                    {isEmailConfirmed === null && (
                        <div>
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                            <button
                                onClick={handleEmailVerify}
                                disabled={loading}
                                className="w-full my-4 flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                            >
                                {loading ? 'Continue...' : 'Continue'}
                            </button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <button
                                    onClick={() => handleSocialLogin('google')}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Sign in with Google
                                </button>

                                <button
                                    onClick={() =>
                                        handleSocialLogin('facebook')
                                    }
                                    className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
                                >
                                    Sign in with Facebook
                                </button>
                            </div>

                            <div className="text-center">
                                <Link
                                    href="/auth/signup"
                                    className="text-blue-600 hover:text-blue-500"
                                >
                                    Don&apos;t have an account? Sign up
                                </Link>
                            </div>
                        </div>
                    )}

                    {isEmailConfirmed === false && (
                        <>
                            <div>
                                <p className="text-sm text-gray-600 mb-4">
                                    We&apos;ve sent a verification code to{' '}
                                    <span className="font-bold">{email}</span>
                                </p>
                                <input
                                    type="text"
                                    placeholder="Enter 6-digit OTP"
                                    value={otp}
                                    onChange={e => setOtp(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    maxLength={6}
                                />
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={handleVerifyOtp}
                                    disabled={loading}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px
                                    4 rounded disabled:opacity-50"
                                >
                                    {loading ? 'Verifying...' : 'Verify OTP'}
                                </button>
                                <button
                                    onClick={handleSendOtp}
                                    disabled={loading}
                                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                >
                                    Resend OTP
                                </button>
                            </div>
                        </>
                    )}

                    {isEmailConfirmed === true && (
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="flex space-x-2 mt-4">
                                <button
                                    onClick={handleCredentialsLogin}
                                    disabled={loading}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                >
                                    {loading ? 'Signing in...' : 'Sign In'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
