'use client';

import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { sendOtpCode, verifiedEmail, verifiedOtpCode } from '@/services/auth';
import { BaseResponse } from '@/types/base-response';
import { VerifyEmail } from '@/types/user/response/verify-response';
import React from 'react';

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

    const modeParam = searchParams.get('mode');

    // Default to 'signup' if mode is 'signup', otherwise 'signin'
    const [mode] = useState<'signin' | 'signup'>( // setMode
        modeParam === 'signup' ? 'signup' : 'signin'
    );

    // Sign up

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showOtp] = useState(false); //setShowOtp
    const [success, setSuccess] = useState('');

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async () => {
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(
                    'Account created successfully! Please verify your email.'
                );
                // Send OTP for email verification
                await handleSendOtp();
            } else {
                setError(data.error || 'Registration failed');
            }
        } catch {
            setError('An error occurred during registration');
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
        <>
            {mode === 'signin' && (
                <div className="min-h-screen flex items-center justify-center bg-[var(--brand-grey)]">
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
                                            onClick={() =>
                                                handleSocialLogin('google')
                                            }
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
                                            We&apos;ve sent a verification code
                                            to{' '}
                                            <span className="font-bold">
                                                {email}
                                            </span>
                                        </p>
                                        <input
                                            type="text"
                                            placeholder="Enter 6-digit OTP"
                                            value={otp}
                                            onChange={e =>
                                                setOtp(e.target.value)
                                            }
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
                                            {loading
                                                ? 'Verifying...'
                                                : 'Verify OTP'}
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
                                        onChange={e =>
                                            setPassword(e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <div className="flex space-x-2 mt-4">
                                        <button
                                            onClick={handleCredentialsLogin}
                                            disabled={loading}
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                        >
                                            {loading
                                                ? 'Logging in...'
                                                : 'Log In'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {mode === 'signup' && (
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="max-w-lg w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                        <div>
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Create your account
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                                    {success}
                                </div>
                            )}

                            {!showOtp ? (
                                <>
                                    <div>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Full name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email address"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Confirm password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <button
                                        onClick={handleRegister}
                                        disabled={loading}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                    >
                                        {loading
                                            ? 'Creating account...'
                                            : 'Sign Up'}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-4">
                                            We&apos;ve sent a verification code
                                            to{' '}
                                            <span className="font-bold">
                                                {formData.email}
                                            </span>
                                        </p>
                                        <input
                                            type="text"
                                            placeholder="Enter 6-digit OTP"
                                            value={otp}
                                            onChange={e =>
                                                setOtp(e.target.value)
                                            }
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
                                            {loading
                                                ? 'Verifying...'
                                                : 'Verify OTP'}
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
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link
                                    href="/auth/login"
                                    className="text-blue-600 hover:underline"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
