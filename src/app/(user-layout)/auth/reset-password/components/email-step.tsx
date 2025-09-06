'use client';

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
import { requestResetPassword } from '@/app/api/auth/reset-password';
import { useI18n } from '@/context/i18n/context';
import { T } from '@/components/app-translate';

interface ResetPasswordEmailStepProps {
    onNext: (email: string) => void;
}

export default function ResetPasswordEmailStep({
    onNext,
}: ResetPasswordEmailStepProps) {
    const form = useForm<{ email: string }>({
        defaultValues: { email: '' },
    });

    const { t } = useI18n();

    const requestResetMutation = useAppMutation({
        mutationFn: async (email: string) => {
            return await requestResetPassword(email);
        },
        onSuccessVariables: data => {
            onNext(data);
            toast.success(t('auth.resetPassword.otpSentSuccess'));
        },
        onError: (error: Error) => {
            toast.error(error.message || t('auth.resetPassword.requestFailed'));
        },
    });

    const onSubmit = (data: { email: string }) => {
        requestResetMutation.mutate(data.email);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="h-fit my-auto space-y-4"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <FloatingLabelInput
                                    type="email"
                                    label={<T keyName="common.emailAddress" />}
                                    className="app-text-input"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    disabled={requestResetMutation.isPending}
                    className="w-full bg-[var(--brand-color)] cursor-pointer text-black font-bold py-2 px-4 rounded-3xl disabled:p-0 disabled:bg-transparent mt-4 hover:bg-[var(--brand-color-foreground)] transition-colors! duration-300 ease-in-out text-base"
                >
                    {requestResetMutation.isPending ? (
                        <LoadingComponent />
                    ) : (
                        <T keyName="auth.resetPassword.sendResetCode" />
                    )}
                </Button>
            </form>
        </Form>
    );
}
