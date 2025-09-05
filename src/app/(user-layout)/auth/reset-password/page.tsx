'use client';

import { useState } from 'react';
import TabAuthMode from '@/app/(user-layout)/auth/components/tab-auth-mode';
import Link from 'next/link';
import ResetPasswordEmailStep from '@/app/(user-layout)/auth/reset-password/components/email-step';
import ResetPasswordOtpStep from '@/app/(user-layout)/auth/reset-password/components/otp-step';
import ResetPasswordPasswordStep from '@/app/(user-layout)/auth/reset-password/components/new-password';
import CompletionStep from '@/app/(user-layout)/auth/reset-password/components/complete-step';

const ResetPasswordPage = () => {
    const [step, setStep] = useState<'email' | 'otp' | 'password' | 'complete'>(
        'email'
    );
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    return (
        <div className="flex flex-col w-full h-full [&_*_h2]:text-2xl [&_*_h2]:font-extrabold [&_*_h2]:text-brand-text">
            <div className={'h-fit'}>
                <TabAuthMode />
                <div className="mt-2 w-full">
                    <h2>
                        {step === 'email' && 'Reset your password'}
                        {step === 'otp' && 'Verify your email'}
                        {step === 'password' && 'Set new password'}
                        {step === 'complete' && 'Successfully!'}
                    </h2>
                    <p className="text-[var(--brand-grey-foreground)] mt-2">
                        {step === 'email' &&
                            'You will receive an email to reset your password in a few minutes.'}
                        {step === 'otp' &&
                            'Enter the 6-digit code sent to your email'}
                        {step === 'password' &&
                            'Create a new password for your account'}
                        {step === 'complete' &&
                            'Your password has been changed successfully.'}
                    </p>
                </div>
            </div>

            <div className="h-full w-full flex flex-col pt-4 justify-between">
                {step === 'email' && (
                    <ResetPasswordEmailStep
                        onNext={email => {
                            setEmail(email);
                            setStep('otp');
                        }}
                    />
                )}

                {step === 'otp' && (
                    <ResetPasswordOtpStep
                        email={email}
                        onNext={otp => {
                            setOtp(otp);
                            setStep('password');
                        }}
                    />
                )}

                {step === 'password' && (
                    <ResetPasswordPasswordStep
                        email={email}
                        otp={otp}
                        onBack={() => setStep('otp')}
                        onComplete={() => {
                            setStep('email');
                            setEmail('');
                            setOtp('');
                        }}
                    />
                )}

                {step === 'complete' && <CompletionStep />}

                {step !== 'complete' && (
                    <div className="text-center mt-6">
                        <p className="text-lg text-[var(--brand-grey-foreground)] font-semibold">
                            Remember your password?{' '}
                            <Link
                                href="/auth/login"
                                className="dark:text-[var(--brand-color)] text-black hover:underline"
                            >
                                Log in
                            </Link>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResetPasswordPage;
