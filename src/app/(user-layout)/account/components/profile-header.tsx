/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Mail } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { FloatingLabelInput } from '@/components/ui/floating-input';
import { useForm } from 'react-hook-form';
import { UserViewResponse } from '@/types/user/response/view-response';
import AvatarUpload from '@/components/avatar-upload';
import { toast } from 'sonner';
import { FileWithPreview } from '@/hooks/use-file-upload';
import { updateUserAvatar } from '@/services/user/update-user-avatar';
import { getJoinedText } from '@/utils/date-time-format';
import { useI18n } from '@/context/i18n/context';
import { uploadImage } from '@/services/minio';
import { processFinalUrl } from '@/utils/minio/process-final-url';

// Schema
const passwordFormSchema = z
    .object({
        currentPassword: z
            .string()
            .min(1, { message: 'Current password is required' }),
        newPassword: z
            .string()
            .min(8, { message: 'New password must be at least 8 characters' }),
        confirmNewPassword: z
            .string()
            .min(8, { message: 'Please confirm your new password' }),
    })
    .refine(data => data.newPassword === data.confirmNewPassword, {
        message: "Passwords don't match",
        path: ['confirmNewPassword'],
    });

// Types
type PasswordFormData = z.infer<typeof passwordFormSchema>;
type DisplayDataType = {
    name: string;
    email: string;
    joinedText: string;
    avatar: string | null;
};

export default function ProfileHeader({
    userData,
}: {
    userData: UserViewResponse;
}) {
    const { t, locale } = useI18n();

    const displayData: DisplayDataType = {
        avatar: userData.image,
        email: userData.email,
        joinedText: `${t('common.joined')} ${getJoinedText(userData.createdAt, locale)}`,
        name: userData.name as string,
    };

    const form = useForm<PasswordFormData>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
    });

    const onSubmit = async (data: PasswordFormData) => {
        console.log('Password change data:', data);

        // In a real application, you would submit to an API here
        // Example:
        // try {
        //   const response = await fetch('/api/change-password', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        //   });
        //
        //   if (response.ok) {
        //     console.log('Password changed successfully');
        //   } else {
        //     console.error('Failed to change password');
        //   }
        // } catch (error) {
        //   console.error('Error changing password:', error);
        // }
    };

    const handleUpload = async (file: FileWithPreview | null) => {
        if (!file) {
            return;
        }
        try {
            const result = await uploadImage(file.file as File, 'AVATAR');
            if (result.success) {
                await updateUserAvatar(result.path);
                toast.success('Update avatar successfully');
            }
        } catch (e: any) {
            toast.error(e.message || 'Update avatar failed');
        }
    };

    return (
        <Card className={'bg-[var(--brand-grey)]/30'}>
            <CardContent className="p-6 dark:bg-transparent bg-transparent">
                <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                    <AvatarUpload
                        defaultAvatar={
                            displayData.avatar
                                ? processFinalUrl(displayData.avatar)
                                : undefined
                        }
                        onFileChange={handleUpload}
                    />
                    <div className="flex-1 space-y-2">
                        <h1 className="text-size-22 font-bold">
                            {displayData.name}
                        </h1>
                        <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-1">
                                <Mail className="size-4" />
                                {displayData.email}
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="size-4" />
                                {displayData.joinedText}
                            </div>
                        </div>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                className={
                                    'dark:bg-[var(--brand-color)] dark:text-black font-semibold'
                                }
                            >
                                {t('common.changePassword')}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md bg-sidebar">
                            <DialogHeader>
                                <DialogTitle>
                                    {t('common.changePassword')}
                                </DialogTitle>
                                <DialogDescription>
                                    {t('common.changePasswordSubtitle')}
                                </DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-4"
                                >
                                    <FormField
                                        control={form.control}
                                        name="currentPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <FloatingLabelInput
                                                        label={t(
                                                            'common.currentPassword'
                                                        )}
                                                        className="app-text-input"
                                                        type="password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <FloatingLabelInput
                                                        label={t(
                                                            'common.newPassword'
                                                        )}
                                                        className="app-text-input"
                                                        type="password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="confirmNewPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <FloatingLabelInput
                                                        label={t(
                                                            'common.confirmNewPassword'
                                                        )}
                                                        className="app-text-input"
                                                        type="password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex justify-end gap-2 pt-4">
                                        <Button
                                            type="submit"
                                            className="dark:bg-[var(--brand-color)] dark:text-black font-semibold"
                                        >
                                            {t('common.changePassword')}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardContent>
        </Card>
    );
}
