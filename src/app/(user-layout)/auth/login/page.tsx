'use client';

import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { sendOtpCode, verifiedEmail, verifiedOtpCode } from '@/services/auth';
import { BaseResponse } from '@/types/base-response';
import { VerifyEmail } from '@/types/user/response/verify-response';
import React from 'react';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import TabAuthMode from '@/app/(user-layout)/auth/components/tab-auth-mode';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { Facebook, Google } from '@image/index';
import LoadingComponent from '@/components/loading-spiner';

export default function Login() {
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

    // Login with credential if email is verified
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
                router.push('/client-account');
            }
        } catch {
            setError('An error occurred during sign in');
        } finally {
            setLoading(false);
        }
    };

    // Check email verified
    const handleEmailVerify = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await verifiedEmail(email);
            const result: BaseResponse<VerifyEmail> = await response.json();

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

    // Login with SSO
    const handleSocialLogin = (provider: string) => {
        signIn(provider, { callbackUrl: '/client-account' });
    };

    // Send otp to api
    const handleSendOtp = async () => {
        try {
            await sendOtpCode(email);
        } catch {
            console.error('Failed to send OTP');
        }
    };

    // Verified otp
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
        <div className="flex flex-col w-5/6">
            {/* Tab container */}
            <TabAuthMode />

            <div className="h-full w-full flex items-center justify-center">
                <div className="w-full space-y-8 ">
                    <h2 className="mt-6 text-2xl font-bold text-white">
                        Hello there, welcome back
                    </h2>

                    <div className="space-y-4">
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}

                        {/* Email container */}
                        {isEmailConfirmed === null && (
                            <div>
                                <Label
                                    htmlFor="email-input"
                                    className="text-lg"
                                >
                                    Email
                                </Label>

                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    id="email-input"
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full focus-visible:ring-0 focus-visible:outline-0 placeholder:text-[var(--brand-grey-foreground)] border-b p-4 border-[var(--brand-grey-foreground)]"
                                    required
                                />

                                <button
                                    onClick={handleEmailVerify}
                                    disabled={loading}
                                    className="w-full mb-6 mt-12 flex-1 bg-[var(--brand-color)] disabled:bg-transparent disabled:m-0 cursor-pointer text-black font-bold py-2 px-4 rounded-3xl disabled:opacity-50"
                                >
                                    {loading ? (
                                        <LoadingComponent />
                                    ) : (
                                        'Continue'
                                    )}
                                </button>

                                <div className="mb-4 mt-4 relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-[var(--brand-grey-foreground)]" />
                                    </div>
                                    <div className="relative flex w-fit mx-auto px-2 justify-center text-sm bg-[var(--brand-black-bg)]">
                                        <span className="px-2 text-white">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>

                                <div className="space-x-6 mx-auto w-fit">
                                    <button
                                        onClick={() =>
                                            handleSocialLogin('facebook')
                                        }
                                        className="cursor-pointer"
                                    >
                                        <Image
                                            width={1920}
                                            height={1080}
                                            className="size-12"
                                            src={Facebook}
                                            alt="facebook-icon"
                                        />
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleSocialLogin('google')
                                        }
                                        className="cursor-pointer"
                                    >
                                        <Image
                                            width={1920}
                                            height={1080}
                                            className="size-12"
                                            src={Google}
                                            alt="facebook-icon"
                                        />
                                    </button>
                                </div>

                                <div className="text-center">
                                    <Link
                                        href="/auth/signup"
                                        className="text-white font-medium"
                                    >
                                        Don&apos;t have an account? Sign up
                                    </Link>
                                </div>
                            </div>
                        )}

                        {isEmailConfirmed === false && (
                            <>
                                <div className="space-y-12">
                                    <div>
                                        <p className="text-sm text-white font-light mb-4">
                                            We&apos;ve sent a verification code
                                            to{' '}
                                            <span className="font-bold">
                                                {email}
                                            </span>
                                        </p>
                                        <InputOTP
                                            maxLength={6}
                                            value={otp}
                                            onChange={value => setOtp(value)}
                                        >
                                            <InputOTPGroup className="flex gap-4 [&>div[data-slot=input-otp-slot]]:rounded-lg [&>div[data-slot=input-otp-slot]]:outline-0 [&>div[data-slot=input-otp-slot]]:ring-[var(--brand-color)] [&>div[data-slot=input-otp-slot]]:size-12 [&>div[data-slot=input-otp-slot]]:text-xl mx-auto [&>div[data-slot=input-otp-slot]]:border-2">
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            onClick={handleVerifyOtp}
                                            disabled={loading}
                                            className="flex-1 text-black bg-[var(--brand-color)] disabled:bg-transparent disabled:p-0 cursor-pointer rounded-3xl font-bold py-2 px-4 disabled:opacity-50"
                                        >
                                            {loading ? (
                                                <LoadingComponent />
                                            ) : (
                                                'Continue'
                                            )}
                                        </button>
                                    </div>
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
                                    className="app-text-input"
                                />
                                <div className="flex space-x-2 mt-4">
                                    <button
                                        onClick={handleCredentialsLogin}
                                        disabled={loading}
                                        className="bg-[var(--brand-color)] cursor-pointer disabled:bg-transparent disabled:p-0 text-black font-bold py-2 px-4 rounded-3xl disabled:opacity-50 w-full mt-6"
                                    >
                                        {loading ? (
                                            <LoadingComponent />
                                        ) : (
                                            'Log In'
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
