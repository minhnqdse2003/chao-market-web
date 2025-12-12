'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import LoadingComponent from '@/components/loading-spiner';
import { verifiedOtpCode } from '@/services/auth';
import { sendOtpCode } from '@/services/auth';
import { OtpFormData, otpSchema } from '@/schema/auth-schema';
import TabAuthMode from '@/app/(user-layout)/auth/components/tab-auth-mode';
import Countdown from '@/components/app-countdown';
import { useI18n } from '@/context/i18n/context';
import { TranslationKey } from '@/types/translations';

export interface OtpVerificationFormProps {
    email: string;
    firstName?: string;
    onConfirmOtpSuccess?: () => void;
}

export default function OtpVerificationForm({
    email,
    firstName,
}: OtpVerificationFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();
    const { t } = useI18n();

    const form = useForm<OtpFormData>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            email: email,
            otp: '',
        },
    });

    const onSubmit = async (data: OtpFormData) => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await verifiedOtpCode(data);

            if (response.ok) {
                router.push(`/auth/sign-up/success?firstName=${firstName}`);
            } else {
                const result = await response.json();
                setError(
                    result.error ||
                        ('auth.otpVerificationFailed' as TranslationKey)
                );
            }
        } catch (error: unknown) {
            console.log(error);
            setError('auth.failedToVerifyOtp' as TranslationKey);
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await sendOtpCode(email);
            if (response.ok) {
                setSuccess('auth.otpResentSuccess' as TranslationKey);
            } else {
                setError('auth.failedToResendOtp' as TranslationKey);
            }
        } catch {
            setError('auth.failedToResendOtp' as TranslationKey);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full flex flex-col pt-18 space-y-8 [&_*_h2]:text-3xl [&_*_h2]:font-extrabold [&_*_h2]:text-white">
            <div className={'max-h-[6rem]'}>
                <TabAuthMode />
                <div className="w-full">
                    <p className="mt-2 text-2xl font-bold">
                        {t('auth.verifyEmailTitle')}.
                    </p>
                </div>
            </div>

            <div className="space-y-4 w-full pt-24">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {t(error)}
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                        {t(success)}
                    </div>
                )}

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className={
                            'min-h-[15.375rem] flex flex-col space-y-4 justify-end'
                        }
                    >
                        <p className="text-sm text-[var(--brand-grey-foreground)] font-light">
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: t('auth.weHaveSendOtpToYourEmail'),
                                }}
                            />{' '}
                            <span className="font-bold text-white">
                                {email}.
                            </span>
                        </p>
                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup className="flex gap-4 [&>div[data-slot=input-otp-slot]]:rounded-lg [&>div[data-slot=input-otp-slot]]:outline-0 dark:[&>div[data-slot=input-otp-slot]]:ring-[var(--brand-color)] [&>div[data-slot=input-otp-slot]]:size-12 [&>div[data-slot=input-otp-slot]]:text-xl mx-auto [&>div[data-slot=input-otp-slot]]:border-2 text-brand-text">
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex space-x-2 mt-8">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="flex-1 text-black bg-[var(--brand-color)] my-6 min-h-[2.5rem] cursor-pointer rounded-3xl font-bold py-2 px-4 disabled:bg-transparent disabled:p-0 disabled:opacity-50 hover:bg-[var(--brand-color-foreground)] transition-colors! duration-300 ease-in-out"
                            >
                                {loading ? (
                                    <LoadingComponent />
                                ) : (
                                    t('common.continue')
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>

            <div className="text-center">
                <p className="text-sm text-brand-text">
                    {t('auth.didNotReceiveCode')}{' '}
                    <Countdown
                        initialTime={60}
                        onResend={handleResendOtp}
                        disabled={loading}
                        buttonLabel={t('auth.resendOtp')}
                        autoStart={true}
                    />
                </p>
            </div>
        </div>
    );
}
