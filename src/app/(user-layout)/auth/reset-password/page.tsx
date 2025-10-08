'use client';

import { useState } from 'react';
import TabAuthMode from '@/app/(user-layout)/auth/components/tab-auth-mode';
import Link from 'next/link';
import ResetPasswordEmailStep from '@/app/(user-layout)/auth/reset-password/components/email-step';
import ResetPasswordOtpStep from '@/app/(user-layout)/auth/reset-password/components/otp-step';
import ResetPasswordPasswordStep from '@/app/(user-layout)/auth/reset-password/components/new-password';
import CompletionStep from '@/app/(user-layout)/auth/reset-password/components/complete-step';
import { T } from '@/components/app-translate';
import { cn } from '@/lib/utils';

const ResetPasswordPage = () => {
    const [step, setStep] = useState<'email' | 'otp' | 'password' | 'complete'>(
        'email'
    );
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    return (
        <div className="flex flex-col w-full h-full [&_*_h2]:text-2xl [&_*_h2]:font-extrabold [&_*_h2]:text-brand-text">
            <div className="h-full w-full flex flex-col justify-evenly [&>.form-container]:min-h-[15.375rem] [&>.form-container]:max-h-[15.375rem]  [&>.form-container]:my-0 [&>.form-container]:flex [&>.form-container]:flex-col [&>.form-container]:justify-end pt-8">
                <TabAuthMode />
                <div className={cn('w-full max-h-[32px] mt-2')}>
                    <h2>
                        {step === 'email' && (
                            <T keyName="auth.resetPassword.title" />
                        )}
                        {step === 'otp' && (
                            <T keyName="auth.verifyEmailTitle" />
                        )}
                        {step === 'password' && (
                            <T keyName="auth.resetPassword.setNewPasswordTitle" />
                        )}
                        {step === 'complete' && (
                            <T keyName="auth.resetPassword.completeTitle" />
                        )}
                        {step !== 'complete' && <>{'.'}</>}
                    </h2>
                    <p className="text-[var(--brand-grey-foreground)] mt-2">
                        {step === 'email' && (
                            <T keyName="auth.resetPassword.emailSubtitle" />
                        )}
                        {step === 'otp' && (
                            <T keyName="auth.resetPassword.otpSubtitle" />
                        )}
                        {step === 'password' && (
                            <T keyName="auth.resetPassword.newPasswordSubtitle" />
                        )}
                        {step === 'complete' && (
                            <T keyName="auth.resetPassword.completeSubtitle" />
                        )}
                    </p>
                </div>
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

                {step === 'complete' && (
                    <>
                        <CompletionStep />
                        <div />
                    </>
                )}

                {step !== 'complete' && (
                    <div className="text-center min-h-[11rem] max-h-[11rem]">
                        <p className="text-lg text-[var(--brand-grey-foreground)] font-semibold">
                            <T keyName="auth.resetPassword.rememberPassword" />{' '}
                            <Link
                                href="/auth/login"
                                className="dark:text-[var(--brand-color)] text-black hover:underline"
                            >
                                <T keyName="auth.login" />
                            </Link>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResetPasswordPage;
