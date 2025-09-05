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
            toast.success('Password updated successfully');
            onComplete();
        },
        onError: (error: Error) => {
            setError(error.message || 'Failed to change password');
            toast.error(error.message || 'Failed to change password');
        },
    });

    const onSubmit = (data: { password: string; confirmPassword: string }) => {
        if (data.password !== data.confirmPassword) {
            setError('Passwords do not match');
            toast.error('Passwords do not match');
            return;
        }

        changePasswordMutation.mutate({ email, password: data.password, otp });
    };

    return (
        <div className="space-y-4 my-auto w-full">
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
                                        label="New Password *"
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
                                        label="Confirm New Password *"
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
                                    className="flex-1 dark:border-[var(--brand-color)] dark:text-[var(--brand-color)] hover:bg-[var(--brand-grey)] dark:hover:text-[var(--brand-color)] dark:bg-transparent text-brand-text rounded-3xl py-2 px-4 transition-all! duration-300 ease-in-out"
                                >
                                    Back
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={changePasswordMutation.isPending}
                                    className="flex-1 bg-[var(--brand-color)] cursor-pointer text-black font-bold py-2 px-4 rounded-3xl disabled:p-0 disabled:bg-transparent hover:bg-[var(--brand-color-foreground)] transition-colors! duration-300 ease-in-out text-base"
                                >
                                    Update Password
                                </Button>
                            </>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    );
}
