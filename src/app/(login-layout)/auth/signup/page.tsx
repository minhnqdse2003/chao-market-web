'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { sendOtpCode, verifiedOtpCode } from '@/services/auth';
import TabAuthMode from '@/app/(login-layout)/auth/components/tab-auth-mode';

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [otp, setOtp] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

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

    const handleSendOtp = async () => {
        try {
            const response = await sendOtpCode(formData.email);

            if (response.ok) {
                setShowOtp(true);
            }
        } catch {
            console.error('Failed to send OTP');
        }
    };

    const handleVerifyOtp = async () => {
        setLoading(true);
        try {
            const response = await verifiedOtpCode({
                email: formData.email,
                otp,
            });

            if (response.ok) {
                setSuccess(
                    'Email verified successfully! Redirecting to sign in...'
                );
                setTimeout(() => router.push('/auth/login'), 2000);
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
        <div className="w-full space-y-8 [&_*_h2]:text-3xl [&_*_h2]:font-extrabold [&_*_h2]:text-white">
            <TabAuthMode />
            <div>
                <h2 className="mt-6 ">Create your account</h2>
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
                                className="app-text-input"
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
                                className="app-text-input"
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
                                className="app-text-input"
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
                                className="app-text-input"
                                required
                            />
                        </div>

                        <button
                            onClick={handleRegister}
                            disabled={loading}
                            className="w-full bg-[var(--brand-color)] cursor-pointer text-black font-bold py-2 px-4 rounded-3xl disabled:opacity-50]"
                        >
                            {loading ? 'Creating account...' : 'Sign Up'}
                        </button>
                    </>
                ) : (
                    <>
                        <div>
                            <p className="text-sm text-white font-light mb-4">
                                We&apos;ve sent a verification code to{' '}
                                <span className="font-bold">
                                    {formData.email}
                                </span>
                            </p>
                            <input
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={e => setOtp(e.target.value)}
                                className="app-text-input"
                                maxLength={6}
                            />
                        </div>

                        <div className="flex space-x-2">
                            <button
                                onClick={handleVerifyOtp}
                                disabled={loading}
                                className="flex-1  text-black bg-[var(--brand-color)] cursor-pointer rounded-3xl font-bold py-2 px-4 disabled:opacity-50"
                            >
                                {loading ? 'Continue...' : 'Continue'}
                            </button>
                        </div>
                    </>
                )}
            </div>

            <div className="text-center">
                <p className="text-sm text-white">
                    {!showOtp ? (
                        <>
                            Already have an account?{' '}
                            <Link
                                href="/auth/login"
                                className="text-[var(--brand-color)] hover:underline"
                            >
                                Sign In
                            </Link>
                        </>
                    ) : (
                        <>
                            I didn’t receive a code{' '}
                            <button
                                onClick={handleSendOtp}
                                disabled={loading}
                                className="cursor-pointer text-[var(--brand-color)] font-bold hover:underline"
                            >
                                Resend OTP
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}
