'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { sendOtpCode, verifiedEmail, verifiedOtpCode } from '@/services/auth';
import { BaseResponse } from '@/types/base-response';
import { VerifyEmail } from '@/types/user/response/verify-response';
import TabAuthMode from '@/app/(user-layout)/auth/components/tab-auth-mode';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
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
import { Eye, EyeOff } from 'lucide-react';
import { FloatingLabelInput } from '@/components/ui/floating-input';
import { T } from '@/components/app-translate';
import SocialLogin from '@/app/(user-layout)/auth/components/social-login';

// Validation schemas
const loginSchema = z.object({
    email: z.email({ message: 'Invalid email address' }),
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
        <div className="space-y-8 flex flex-col justify-end h-[15.375rem]">
            <div className={'w-full'}>
                <p className="text-sm dark:text-white text-[var(--brand-grey-foreground)] font-light mb-4">
                    <T keyName="auth.otpSentToEmail" />{' '}
                    <span className="font-bold text-black dark:text-white">
                        {email}
                    </span>
                </p>

                <div className="flex flex-col items-center w-full">
                    <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={value => {
                            setOtp(value);
                        }}
                    >
                        <InputOTPGroup className="flex gap-4 [&>div[data-slot=input-otp-slot]]:rounded-lg [&>div[data-slot=input-otp-slot]]:outline-0 dark:[&>div[data-slot=input-otp-slot]]:ring-[var(--brand-color)] [&>div[data-slot=input-otp-slot]]:size-12 [&>div[data-slot=input-otp-slot]]:text-xl mx-auto [&>div[data-slot=input-otp-slot]]:border-2 text-brand-text">
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
                    className="flex-1 text-black min-h-[40px] bg-[var(--brand-color)] disabled:bg-transparent disabled:p-0 cursor-pointer rounded-3xl font-bold py-2 px-4 disabled:opacity-50 my-6"
                >
                    {loading ? <LoadingComponent /> : 'Continue'}
                </button>
            </div>
        </div>
    );
}

// Main login component
export default function Login() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [emailVerified, setEmailVerified] = useState<boolean | null>(null);
    const [loginData, setLoginData] = useState<{
        email: string;
        password: string;
    } | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // Clear error when form fields change
    useEffect(() => {
        const subscription = form.watch(() => {
            if (error) {
                setError('');
            }
        });
        return () => subscription.unsubscribe();
    }, [form, error]);

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
                // Email verify - proceed with login
                const signInResult = await signIn('credentials', {
                    email: data.email,
                    password: data.password,
                    redirect: false,
                });

                if (!signInResult?.ok) {
                    setError('Invalid credentials');
                } else {
                    router.push('/performance-statistics');
                }
            } else {
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
                router.push('/performance-statistics');
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
            <div className="h-full w-full flex flex-col justify-evenly pt-8">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                <TabAuthMode />
                <h2 className="mt-2 text-2xl font-bold text-brand-text">
                    <T keyName="auth.welcomeBack" />
                </h2>
                {emailVerified === false && loginData ? (
                    <EmailVerificationStep
                        email={loginData?.email || 'heheh'}
                        onVerificationComplete={handleOtpVerificationComplete}
                    />
                ) : (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleCredentialsLogin)}
                            className="h-fit min-h-[15.375rem] space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <FloatingLabelInput
                                                label={
                                                    <T keyName="common.email" />
                                                }
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
                                        <div className="relative">
                                            <FormControl>
                                                <FloatingLabelInput
                                                    type={
                                                        showPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    label="Password"
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
                            <FormItem>
                                <FormLabel
                                    className={
                                        'dark:text-[var(--brand-color)] text-brand-text hover:underline transition-all!' +
                                        ' duration-300' +
                                        ' ease-in-out cursor-pointer'
                                    }
                                    onClick={() =>
                                        router.push('/auth/reset-password')
                                    }
                                >
                                    <T keyName={'auth.forgotPassword'} />{' '}
                                </FormLabel>
                            </FormItem>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full my-6 flex-1 bg-[var(--brand-color)] disabled:bg-transparent disabled:m-0 cursor-pointer text-black font-bold py-2 px-4 rounded-3xl disabled:opacity-50"
                            >
                                {loading ? (
                                    <LoadingComponent />
                                ) : (
                                    <T keyName={'auth.login'} />
                                )}
                            </button>
                        </form>
                    </Form>
                )}

                <div className="text-center text-brand-text font-medium text-lg flex flex-col gap-4 w-full">
                    <SocialLogin />
                    <p>
                        <T keyName="auth.noAccountPrompt" />{' '}
                        <Link href="/auth/signup">
                            <span
                                className={
                                    'dark:text-[var(--brand-color)] text-black font-semibold hover:underline' +
                                    ' dark:hover:text-[var(--brand-color-foreground)] transition-all!' +
                                    ' duration-300 ease-in-out'
                                }
                            >
                                <T keyName={'auth.signup'} />
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
