'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import LoadingComponent from '@/components/loading-spiner';
import TabAuthMode from '@/app/(user-layout)/auth/components/tab-auth-mode';
import { sendOtpCode } from '@/services/auth';
import { SignUpFormData, signUpSchema } from '@/schema/auth-schema';
import { OtpVerificationFormProps } from '@/app/(user-layout)/auth/components/otp-verification-form';
import { Checkbox } from '@/components/ui/checkbox';

interface SignUpFormProps {
    onSignUpSuccess: (user: OtpVerificationFormProps) => void;
}

export default function SignUpForm({ onSignUpSuccess }: SignUpFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const form = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            gender: 'male',
            otherGender: '',
            dateOfBirth: {
                day: '',
                month: '',
                year: '',
            },
        },
    });

    const genderValue = form.watch('gender');

    const onSubmit = async (data: SignUpFormData) => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Combine first and last name to fullName
            const fullName = `${data.firstName} ${data.lastName}`;

            // Format date of birth for API
            const formattedDob = `${data.dateOfBirth.year}-${data.dateOfBirth.month.padStart(2, '0')}-${data.dateOfBirth.day.padStart(2, '0')}`;
            const genderValue =
                data.gender === 'other' ? data.otherGender : data.gender;

            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: fullName,
                    email: data.email,
                    password: data.password,
                    gender: genderValue,
                    dateOfBirth: formattedDob,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess(
                    'Account created successfully! Please verify your email.'
                );
                // Send OTP for email verification
                await handleSendOtp(data.email);
                onSignUpSuccess({
                    email: data.email,
                    firstName: data.firstName,
                });
            } else {
                setError(result.error || 'Registration failed');
            }
        } catch {
            setError('An error occurred during registration');
        } finally {
            setLoading(false);
        }
    };

    const handleSendOtp = async (email: string) => {
        try {
            const response = await sendOtpCode(email);
            if (!response.ok) {
                setError('Failed to send verification code');
            }
        } catch {
            setError('Failed to send verification code');
        }
    };

    return (
        <div className="flex flex-col w-full h-full [&_*_h2]:text-2xl [&_*_h2]:font-extrabold [&_*_h2]:text-white">
            <div className={'h-fit'}>
                <TabAuthMode />
                <div className="w-full">
                    <h2>Create your account.</h2>
                </div>
            </div>

            <div className="h-full w-full flex flex-col pt-4">
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

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="h-full space-y-4"
                    >
                        <div className="flex space-x-2">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-white font-semibold">
                                            First Name *
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your first name"
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
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-white font-semibold">
                                            Last Name *
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your last name"
                                                className="app-text-input"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel className="text-white font-semibold">
                                        Gender *
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex items-center"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="male" />
                                                </FormControl>
                                                <FormLabel className="font-normal text-white">
                                                    Male
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="female" />
                                                </FormControl>
                                                <FormLabel className="font-normal text-white">
                                                    Female
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="other" />
                                                </FormControl>
                                                <FormLabel className="font-normal text-white">
                                                    Other
                                                </FormLabel>
                                            </FormItem>

                                            <FormField
                                                control={form.control}
                                                name="otherGender"
                                                disabled={
                                                    genderValue !== 'other'
                                                }
                                                render={({ field }) => (
                                                    <FormItem className="ml-4">
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Prefer to self-describe"
                                                                className="app-text-input"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-2">
                            <FormLabel className="text-white font-semibold">
                                Date of Birth *
                            </FormLabel>
                            <div className="flex space-x-2 px-4">
                                <FormField
                                    control={form.control}
                                    name="dateOfBirth.day"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <div className="flex items-center space-x-2">
                                                <FormLabel className="text-white whitespace-nowrap">
                                                    Day
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="dd"
                                                        className="app-text-input"
                                                        {...field}
                                                        maxLength={2}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="dateOfBirth.month"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <div className="flex items-center space-x-2">
                                                <FormLabel className="text-white whitespace-nowrap">
                                                    Month
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="mm"
                                                        className="app-text-input"
                                                        {...field}
                                                        maxLength={2}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="dateOfBirth.year"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <div className="flex items-center space-x-2">
                                                <FormLabel className="text-white whitespace-nowrap">
                                                    Year
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="yyyy"
                                                        className="app-text-input"
                                                        {...field}
                                                        maxLength={4}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white font-semibold">
                                        Email Address *
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
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
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white font-semibold">
                                        Password *
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter your password"
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
                                    <FormLabel className="text-white font-semibold">
                                        Confirm Password *
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter your confirm password"
                                            className="app-text-input"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-start space-x-3 mt-4">
                            <Checkbox
                                id="terms"
                                checked={termsAccepted}
                                onCheckedChange={checked =>
                                    setTermsAccepted(checked as boolean)
                                }
                                className="mt-1 rounded-full dark:data-[state=checked]:bg-[var(--brand-color)] border-none"
                            />
                            <label
                                htmlFor="terms"
                                className="text-sm text-white cursor-pointer"
                            >
                                By creating an account, I agree to{' '}
                                <Link
                                    href="#"
                                    className="text-[var(--brand-color)] hover:underline"
                                >
                                    Privacy notice
                                </Link>{' '}
                                and{' '}
                                <Link
                                    href="#"
                                    className="text-[var(--brand-color)] hover:underline"
                                >
                                    Term of use
                                </Link>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading || !termsAccepted}
                            className="w-full bg-[var(--brand-color)] cursor-pointer text-black font-bold py-2 px-4 rounded-3xl disabled:p-0 disabled:opacity-50 mt-4 hover:bg-[var(--brand-color-foreground)] transition-colors! duration-300 ease-in-out"
                        >
                            {loading ? <LoadingComponent /> : 'Sign Up'}
                        </Button>
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <p className="text-sm text-white font-semibold">
                        Already have an account?{' '}
                        <Link
                            href="/auth/login"
                            className="text-[var(--brand-color)] hover:underline"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
