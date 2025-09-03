'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
import { useAppMutation } from '@/hooks/react-query/use-custom-mutation';
import { toast } from 'sonner';
import {
    verifyResetPasswordOTP,
    requestResetPassword,
} from '@/app/api/auth/reset-password';

interface ResetPasswordOtpStepProps {
    email: string;
    onNext: (otp: string) => void;
}

export default function ResetPasswordOtpStep({
    email,
    onNext,
}: ResetPasswordOtpStepProps) {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const form = useForm<{ otp: string }>({
        defaultValues: { otp: '' },
    });

    const verifyOTPMutation = useAppMutation({
        mutationFn: async ({ email, otp }: { email: string; otp: string }) => {
            return await verifyResetPasswordOTP(email, otp);
        },
        onSuccessVariables: variables => {
            onNext(variables.otp);
            toast.success('OTP verified successfully');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to verify OTP');
        },
    });

    const resendOTPMutation = useAppMutation({
        mutationFn: async (email: string) => {
            return await requestResetPassword(email);
        },
        onSuccessVariables: () => {
            setSuccess('Verification code resent successfully!');
            toast.success('OTP resent to your email');
        },
        onError: (error: Error) => {
            setError('Failed to resend verification code');
            toast.error(error.message || 'Failed to resend OTP');
        },
    });

    const onSubmit = (data: { otp: string }) => {
        verifyOTPMutation.mutate({ email, otp: data.otp });
    };

    const handleResend = () => {
        resendOTPMutation.mutate(email);
    };

    return (
        <div className="space-y-4 w-full my-auto">
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

            <div className="space-y-12">
                <div>
                    <p className="text-sm text-[var(--brand-grey-foreground)] font-light mb-4">
                        We&apos;ve sent a verification code to{' '}
                        <span className="font-bold text-white">{email}</span>
                    </p>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="otp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <InputOTP maxLength={6} {...field}>
                                                <InputOTPGroup className="flex gap-4 [&>div[data-slot=input-otp-slot]]:rounded-lg [&>div[data-slot=input-otp-slot]]:outline-0 [&>div[data-slot=input-otp-slot]]:ring-[var(--brand-color)] [&>div[data-slot=input-otp-slot]]:size-12 [&>div[data-slot=input-otp-slot]]:text-xl mx-auto [&>div[data-slot=input-otp-slot]]:border-2">
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
                                    disabled={verifyOTPMutation.isPending}
                                    className="w-full bg-[var(--brand-color)] cursor-pointer text-black font-bold py-2 px-4 rounded-3xl disabled:p-0 disabled:bg-transparent mt-4 hover:bg-[var(--brand-color-foreground)] transition-colors! duration-300 ease-in-out text-base"
                                >
                                    {verifyOTPMutation.isPending ? (
                                        <LoadingComponent />
                                    ) : (
                                        'Continue'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>

            <div className="text-center">
                <p className="text-sm text-white">
                    I didn&apos;t receive a code{' '}
                    <button
                        onClick={handleResend}
                        disabled={resendOTPMutation.isPending}
                        className="cursor-pointer text-[var(--brand-color)] font-bold hover:underline"
                    >
                        {resendOTPMutation.isPending
                            ? 'Sending...'
                            : 'Resend OTP'}
                    </button>
                </p>
            </div>
        </div>
    );
}
