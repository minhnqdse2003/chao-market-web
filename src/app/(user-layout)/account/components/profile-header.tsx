'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Calendar, Mail, MapPin } from 'lucide-react';
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

type PasswordFormData = z.infer<typeof passwordFormSchema>;

export default function ProfileHeader() {
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

    return (
        <Card className={'bg-[var(--brand-grey)]/30'}>
            <CardContent className="p-6 dark:bg-transparent bg-transparent">
                <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                    <div className="relative">
                        <Avatar className="h-24 w-24">
                            <AvatarImage
                                src="https://bundui-images.netlify.app/avatars/08.png  "
                                alt="Profile"
                            />
                            <AvatarFallback className="text-2xl">
                                JD
                            </AvatarFallback>
                        </Avatar>
                        <Button
                            size="icon"
                            variant="outline"
                            className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full"
                        >
                            <Camera />
                        </Button>
                    </div>
                    <div className="flex-1 space-y-2">
                        <h1 className="text-2xl font-bold">John Doe</h1>
                        <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-1">
                                <Mail className="size-4" />
                                john.doe@example.com
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin className="size-4" />
                                San Francisco, CA
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="size-4" />
                                Joined March 2023
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
                                Change Password
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md bg-sidebar">
                            <DialogHeader>
                                <DialogTitle>Change Password</DialogTitle>
                                <DialogDescription>
                                    Please enter your current password and new
                                    password.
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
                                                        label={
                                                            'Current Password'
                                                        }
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
                                                        label={'New Password'}
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
                                                        label={
                                                            'Confirm New Password'
                                                        }
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
                                            Update Password
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
