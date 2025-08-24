'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { sendOtpCode, verifiedEmail, verifiedOtpCode } from '@/services/auth';
import { BaseResponse } from '@/types/base-response';
import { VerifyEmail } from '@/types/user/response/verify-response';
import Image from 'next/image';
import TabAuthMode from '@/app/(user-layout)/auth/components/tab-auth-mode';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { Facebook, Google } from '@image/index';
import LoadingComponent from '@/components/loading-spiner';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

// Validation schemas
const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(1, { message: 'Password is required' }),
});

type LoginFormData = z.infer<typeof loginSchema>;

// Email verification component
function EmailVerificationStep({
    email,
    onVerificationComplete,
}: {
    email: string;
    onVerificationComplete: () => void;
}) {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleVerifyOtp = async () => {
        if (otp.length !== 6) {
            // setError('OTP must be 6 digits');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await verifiedOtpCode({
                email,
                otp,
            });

            if (response.ok) {
                onVerificationComplete();
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

    return (
        <div className="space-y-8 mt-24 h-full">
            <div className={'w-full'}>
                <p className="text-sm text-white font-light mb-4">
                    We&apos;ve sent a verification code to{' '}
                    <span className="font-bold">{email}</span>
                </p>

                <div className="flex flex-col items-center w-full">
                    <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={value => {
                            setOtp(value);
                        }}
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
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <div className="flex space-x-2 w-full">
                <button
                    onClick={handleVerifyOtp}
                    disabled={loading}
                    className="flex-1 text-black bg-[var(--brand-color)] disabled:bg-transparent disabled:p-0 cursor-pointer rounded-3xl font-bold py-2 px-4 disabled:opacity-50"
                >
                    {loading ? <LoadingComponent /> : 'Continue'}
                </button>
            </div>
        </div>
    );
}

// Main login component
export default function Login() {
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [emailVerified, setEmailVerified] = useState<boolean | null>(null);
    const [loginData, setLoginData] = useState<{
        email: string;
        password: string;
    } | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // Handle credentials login
    const handleCredentialsLogin = async (data: LoginFormData) => {
        setLoading(true);
        setError('');

        try {
            const response = await verifiedEmail(data.email);
            const result: BaseResponse<VerifyEmail> = await response.json();

            if (!response.ok) {
                throw new Error(result.message);
            }

            if (result.data?.emailVerified) {
                // Email verified - proceed with login
                const signInResult = await signIn('credentials', {
                    email: data.email,
                    password: data.password,
                    redirect: false,
                });

                if (signInResult?.error) {
                    setError('Invalid credentials');
                } else {
                    router.push('/client-account');
                }
            } else {
                // Email not verified - save data and show OTP
                setLoginData(data);
                await sendOtpCode(data.email);
                setEmailVerified(false);
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    // Handle social login
    const handleSocialLogin = (provider: string) => {
        signIn(provider, { callbackUrl: '/client-account' });
    };

    // Handle successful OTP verification
    const handleOtpVerificationComplete = async () => {
        if (!loginData) return;

        setLoading(true);
        setError('');

        try {
            const result = await signIn('credentials', {
                email: loginData.email,
                password: loginData.password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid credentials');
                setEmailVerified(true);
            } else {
                router.push('/client-account');
            }
        } catch {
            setError('An error occurred during sign in');
        } finally {
            setLoading(false);
        }
    };

    // Check for OAuth errors
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
        <div className="flex flex-col w-full h-full">
            <div>
                <TabAuthMode />
                <h2 className="mt-6 text-2xl font-bold text-white">
                    Hello there! Welcome back.
                </h2>
            </div>

            <div className="h-full w-full flex flex-col pt-8">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                {emailVerified === false && loginData ? (
                    <EmailVerificationStep
                        email={loginData.email}
                        onVerificationComplete={handleOtpVerificationComplete}
                    />
                ) : (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleCredentialsLogin)}
                            className="h-full space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your email address"
                                                {...field}
                                                className="app-text-input"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg">
                                            Password
                                        </FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input
                                                    type={
                                                        showPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    placeholder="Password"
                                                    {...field}
                                                    className="app-text-input pr-10"
                                                />
                                            </FormControl>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                className="absolute inset-y-0 right-0 pr-3 cursor-pointer flex items-center"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5 text-[var(--brand-grey-foreground)]" />
                                                ) : (
                                                    <Eye className="h-5 w-5 text-[var(--brand-grey-foreground)]" />
                                                )}
                                            </button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full my-6 flex-1 bg-[var(--brand-color)] disabled:bg-transparent disabled:m-0 cursor-pointer text-black font-bold py-2 px-4 rounded-3xl disabled:opacity-50"
                            >
                                {loading ? <LoadingComponent /> : 'Log in'}
                            </button>
                        </form>
                    </Form>
                )}

                {emailVerified !== false && (
                    <>
                        <div className="mb-4 mt-4 relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[var(--brand-grey-foreground)]" />
                            </div>
                            <div className="relative flex w-fit mx-auto px-2 justify-center text-sm bg-sidebar">
                                <span className="px-2 text-white">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="space-x-6 mx-auto w-fit">
                            <button
                                onClick={() => handleSocialLogin('facebook')}
                                className="cursor-pointer"
                            >
                                <Image
                                    width={1920}
                                    height={1080}
                                    className="size-10"
                                    src={Facebook}
                                    alt="facebook-icon"
                                />
                            </button>

                            <button
                                onClick={() => handleSocialLogin('google')}
                                className="cursor-pointer"
                            >
                                <Image
                                    width={1920}
                                    height={1080}
                                    className="size-10"
                                    src={Google}
                                    alt="google-icon"
                                />
                            </button>
                        </div>

                        <div className="text-center text-sm">
                            <Link
                                href="/auth/signup"
                                className="text-white font-semibold"
                            >
                                Don&apos;t have an account?{' '}
                                <span
                                    className={
                                        'text-[var(--brand-color)] hover:underline' +
                                        ' hover:text-[var(--brand-color-foreground)] transition-all! duration-300 ease-in-out'
                                    }
                                >
                                    Sign up
                                </span>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
