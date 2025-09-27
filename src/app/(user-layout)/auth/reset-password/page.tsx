'use client';

import { useState } from 'react';
import TabAuthMode from '@/app/(user-layout)/auth/components/tab-auth-mode';
import Link from 'next/link';
import ResetPasswordEmailStep from '@/app/(user-layout)/auth/reset-password/components/email-step';
import ResetPasswordOtpStep from '@/app/(user-layout)/auth/reset-password/components/otp-step';
import ResetPasswordPasswordStep from '@/app/(user-layout)/auth/reset-password/components/new-password';
import CompletionStep from '@/app/(user-layout)/auth/reset-password/components/complete-step';
import { T } from '@/components/app-translate';

const ResetPasswordPage = () => {
    const [step, setStep] = useState<'email' | 'otp' | 'password' | 'complete'>(
        'email'
    );
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    return (
        <div className="flex flex-col w-full h-full [&_*_h2]:text-2xl [&_*_h2]:font-extrabold [&_*_h2]:text-brand-text">
            <div className={'h-fit min-h-[6rem] max-h-[6rem]'}>
                <TabAuthMode />
                <div className="mt-2 w-full">
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
            </div>

            <div className="h-full [&>*:first-child]:max-h-[15.375rem] [&>*:first-child]:min-h-[15.375rem] [&>*:first-child]:flex [&>*:first-child]:flex-col [&>*:first-child]:justify-end [&>_*_button]:my-6 [&>_*_button]:min-h-[2.5rem] [&>_*_button]:max-h-[2.5rem] [&>*:last-child]:min-h-[8.9375rem] [&>*:last-child]:max-h-[8.9375rem] [&>*:last-child]:mt-0! w-full flex flex-col pt-8 justify-between [&_.completed]:max-h-[15.375rem] [&_.completed]:min-h-[15.375rem] [&_.completed]:justify-center">
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
                        <div className="space-y-4 my-auto h-full w-full">
                            <CompletionStep />
                        </div>
                        <div />
                    </>
                )}
                {step !== 'complete' && (
                    <div className="text-center mt-6">
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
