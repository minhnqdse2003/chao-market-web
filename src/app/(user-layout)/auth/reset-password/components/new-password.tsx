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
import LoadingComponent from '@/components/loading-spiner';
import { FloatingLabelInput } from '@/components/ui/floating-input';
import { useAppMutation } from '@/hooks/react-query/use-custom-mutation';
import { toast } from 'sonner';
import { changeResetPassword } from '@/app/api/auth/reset-password';
import { useI18n } from '@/context/i18n/context';
import { T } from '@/components/app-translate';

interface ResetPasswordPasswordStepProps {
    email: string;
    otp: string;
    onBack: () => void;
    onComplete: () => void;
}

export default function ResetPasswordPasswordStep({
    email,
    otp,
    onBack,
    onComplete,
}: ResetPasswordPasswordStepProps) {
    const [error, setError] = useState('');

    const form = useForm<{ password: string; confirmPassword: string }>({
        defaultValues: { password: '', confirmPassword: '' },
    });

    const { t } = useI18n();

    const changePasswordMutation = useAppMutation({
        mutationFn: async ({
            email,
            password,
            otp,
        }: {
            email: string;
            password: string;
            otp: string;
        }) => {
            return await changeResetPassword(email, password, otp);
        },
        onSuccessVariables: () => {
            toast.success(t('auth.resetPassword.updateSuccess'));
            onComplete();
        },
        onError: (error: Error) => {
            setError(error.message || t('auth.resetPassword.updateFailed'));
            toast.error(error.message || t('auth.resetPassword.updateFailed'));
        },
    });

    const onSubmit = (data: { password: string; confirmPassword: string }) => {
        if (data.password !== data.confirmPassword) {
            setError(t('auth.resetPassword.passwordsDoNotMatch'));
            toast.error(t('auth.resetPassword.passwordsDoNotMatch'));
            return;
        }

        changePasswordMutation.mutate({ email, password: data.password, otp });
    };

    return (
        <div className="space-y-4 my-auto w-full form-container">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <FloatingLabelInput
                                        type="password"
                                        label={
                                            <T keyName="common.newPassword" />
                                        }
                                        className="app-text-input"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <FloatingLabelInput
                                        type="password"
                                        label={
                                            <T keyName="common.confirmNewPassword" />
                                        }
                                        className="app-text-input"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex items-center justify-center space-x-4">
                        {changePasswordMutation.isPending ? (
                            <LoadingComponent />
                        ) : (
                            <>
                                <Button
                                    type="button"
                                    onClick={onBack}
                                    disabled={changePasswordMutation.isPending}
                                    variant="outline"
                                    className="flex-1 min-h-[40px] my-6 dark:border-[var(--brand-color)] dark:text-[var(--brand-color)] hover:bg-[var(--brand-grey)] dark:hover:text-[var(--brand-color)] dark:bg-transparent text-brand-text rounded-3xl py-2 px-4 transition-all! duration-300 ease-in-out"
                                >
                                    <T keyName="common.back" />
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={changePasswordMutation.isPending}
                                    className="flex-1 min-h-[40px] my-6 bg-[var(--brand-color)] cursor-pointer text-black font-bold py-2 px-4 rounded-3xl disabled:p-0 disabled:bg-transparent hover:bg-[var(--brand-color-foreground)] transition-colors! duration-300 ease-in-out text-base"
                                >
                                    <T keyName="auth.resetPassword.updatePassword" />
                                </Button>
                            </>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    );
}
