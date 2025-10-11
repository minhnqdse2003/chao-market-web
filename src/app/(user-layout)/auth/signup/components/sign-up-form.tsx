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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import LoadingComponent from '@/components/loading-spiner';
import TabAuthMode from '@/app/(user-layout)/auth/components/tab-auth-mode';
import { sendOtpCode } from '@/services/auth';
import { SignUpFormData, signUpSchema } from '@/schema/auth-schema';
import { OtpVerificationFormProps } from '@/app/(user-layout)/auth/components/otp-verification-form';
import { Checkbox } from '@/components/ui/checkbox';
import { FloatingLabelInput } from '@/components/ui/floating-input';
import SocialLogin from '@/app/(user-layout)/auth/components/social-login';
import { AppDatePicker } from '@/components/app-date-picker';
import { cn } from '@/lib/utils';
import { T } from '@/components/app-translate';
import { TranslationKey } from '@/types/translations';
import { TranslatedFormMessage } from '@/components/app-translation-message-error';
import { useI18n } from '@/context/i18n/context';

interface SignUpFormProps {
    onSignUpSuccess: (user: OtpVerificationFormProps) => void;
}

export default function SignUpForm({ onSignUpSuccess }: SignUpFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(''); // For general errors like terms not accepted or server errors
    const [success, setSuccess] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const { locale } = useI18n();

    const form = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            gender: undefined,
            otherGender: '',
            dateOfBirth: undefined,
            phoneNumber: '',
        },
    });

    const genderValue = form.watch('gender');

    // onSubmit now receives validated data from handleSubmit
    const onSubmit = async (data: SignUpFormData) => {
        setLoading(true);
        setError(''); // Clear previous errors (including terms error)
        setSuccess('');

        // 1. Check if terms are accepted first (inside the handleSubmit flow)
        if (!termsAccepted) {
            setError('auth.termsNotAccepted');
            setLoading(false);
            return; // Stop execution
        }

        try {
            const fullName = `${data.firstName} ${data.lastName}`;
            const formattedDob = data.dateOfBirth
                ? new Date(data.dateOfBirth).toISOString()
                : null;
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
                    phoneNumber: data.phoneNumber,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess('auth.signupSuccessMessage');
                await handleSendOtp(data.email);
                onSignUpSuccess({
                    email: data.email,
                    firstName: data.firstName,
                });
            } else {
                // Handle server-side errors
                setError(result.error || 'auth.registrationFailed');
            }
        } catch (err) {
            console.error('Signup error:', err);
            setError('auth.registrationError');
        } finally {
            setLoading(false);
        }
    };

    const handleSendOtp = async (email: string) => {
        try {
            const response = await sendOtpCode(email);
            if (!response.ok) {
                setError('auth.failedToSendOtp');
            }
        } catch (err) {
            console.error('OTP send error:', err);
            setError('auth.failedToSendOtp');
        }
    };

    return (
        <div className="flex flex-col w-full h-full [&_*_h2]:text-2xl [&_*_h2]:font-extrabold [&_*_h2]:text-brand-text">
            <div className={'h-fit'}>
                <TabAuthMode />
                <div className="mt-2 w-full">
                    <h2>
                        <T keyName="auth.createAccountTitle" />
                    </h2>
                </div>
            </div>

            <div className="h-full w-full flex flex-col pt-4">
                {/* Display general errors (e.g., terms not accepted, server errors) */}
                {error && (
                    <div className="bg-red-100 border text-sm border-red-400 text-red-700 px-2 py-1 mb-2 rounded">
                        <T keyName={error as TranslationKey} />
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                        <T keyName={success as TranslationKey} />
                    </div>
                )}

                <Form {...form}>
                    {/* Use handleSubmit to let react-hook-form manage validation */}
                    <form
                        onSubmit={form.handleSubmit(onSubmit)} // Use handleSubmit here
                        className="h-fit my-auto space-y-4"
                    >
                        <div className="flex space-x-2">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field, fieldState }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <FloatingLabelInput
                                                label={
                                                    <T keyName="common.firstName" />
                                                }
                                                className="app-text-input"
                                                {...field}
                                            />
                                        </FormControl>
                                        <TranslatedFormMessage
                                            message={fieldState.error?.message}
                                        />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field, fieldState }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <FloatingLabelInput
                                                label={
                                                    <T keyName="common.lastName" />
                                                }
                                                className="app-text-input"
                                                {...field}
                                            />
                                        </FormControl>
                                        <TranslatedFormMessage
                                            message={fieldState.error?.message}
                                        />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field, fieldState }) => (
                                <FormItem className="space-y-1">
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex items-center flex-wrap"
                                        >
                                            <FormItem className="flex items-center space-x-1 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        className="data-[state=checked]:border-brand-text cursor-pointer dark:[&_*_svg]:fill-brand-text dark:[&_*_svg]:stroke-brand-text"
                                                        value="male"
                                                    />
                                                </FormControl>
                                                <FormLabel
                                                    className={cn(
                                                        'font-normal transition-colors!',
                                                        `${genderValue === 'male' ? 'text-brand-text' : 'text-[var(--brand-grey-foreground)]'}`
                                                    )}
                                                >
                                                    <T keyName="common.gender.male" />
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-1 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        className="data-[state=checked]:border-brand-text cursor-pointer dark:[&_*_svg]:fill-brand-text dark:[&_*_svg]:stroke-brand-text"
                                                        value="female"
                                                    />
                                                </FormControl>
                                                <FormLabel
                                                    className={cn(
                                                        'font-normal transition-colors!',
                                                        `${genderValue === 'female' ? 'text-brand-text' : 'text-[var(--brand-grey-foreground)]'}`
                                                    )}
                                                >
                                                    <T keyName="common.gender.female" />
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-1 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        className="data-[state=checked]:border-brand-text cursor-pointer dark:[&_*_svg]:fill-brand-text dark:[&_*_svg]:stroke-brand-text"
                                                        value="other"
                                                    />
                                                </FormControl>
                                                <FormLabel
                                                    className={cn(
                                                        'font-normal transition-colors!',
                                                        `${genderValue === 'other' ? 'text-brand-text' : 'text-[var(--brand-grey-foreground)]'}`
                                                    )}
                                                >
                                                    <T keyName="common.gender.other" />
                                                </FormLabel>
                                            </FormItem>

                                            <FormField
                                                control={form.control}
                                                name="otherGender"
                                                disabled={
                                                    genderValue !== 'other'
                                                }
                                                render={({ field }) => (
                                                    <FormItem className="ml-4 flex-1 min-w-[150px]">
                                                        <FormControl>
                                                            <FloatingLabelInput
                                                                label={
                                                                    <T keyName="common.gender.selfDescribe" />
                                                                }
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
                                    <TranslatedFormMessage
                                        message={fieldState.error?.message}
                                    />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dateOfBirth"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormControl>
                                        <AppDatePicker
                                            onDateChange={field.onChange}
                                            buttonClass="w-full dark:bg-transparent dark:hover:bg-transparent"
                                            label={
                                                <T keyName="common.dateOfBirth" />
                                            }
                                            isFloatingLabel={true}
                                            isMarginVisible={false}
                                            {...field}
                                        />
                                    </FormControl>
                                    <TranslatedFormMessage
                                        message={fieldState.error?.message}
                                    />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormControl>
                                        <FloatingLabelInput
                                            type="email"
                                            label={
                                                <T keyName="common.emailAddress" />
                                            }
                                            className="app-text-input"
                                            {...field}
                                        />
                                    </FormControl>
                                    <TranslatedFormMessage
                                        message={fieldState.error?.message}
                                    />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormControl>
                                        <FloatingLabelInput
                                            label={
                                                <T keyName="common.phoneNumber" />
                                            }
                                            type={'number'}
                                            className="app-text-input"
                                            {...field}
                                        />
                                    </FormControl>
                                    <TranslatedFormMessage
                                        message={fieldState.error?.message}
                                    />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormControl>
                                        <FloatingLabelInput
                                            type="password"
                                            label={
                                                <T keyName="common.password" />
                                            }
                                            className="app-text-input"
                                            {...field}
                                        />
                                    </FormControl>
                                    <TranslatedFormMessage
                                        message={fieldState.error?.message}
                                    />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormControl>
                                        <FloatingLabelInput
                                            type="password"
                                            label={
                                                <T keyName="common.confirmPassword" />
                                            }
                                            className="app-text-input"
                                            {...field}
                                        />
                                    </FormControl>
                                    <TranslatedFormMessage
                                        message={fieldState.error?.message}
                                    />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-start space-x-3 mt-4">
                            <Checkbox
                                id="terms"
                                checked={termsAccepted}
                                onCheckedChange={checked => {
                                    setTermsAccepted(checked as boolean);
                                    if (
                                        checked &&
                                        error === 'auth.termsNotAccepted'
                                    ) {
                                        setError('');
                                    }
                                }}
                                className="mt-1 rounded-full dark:data-[state=checked]:bg-[var(--brand-color)] dark:border-none"
                            />
                            <label
                                htmlFor="terms"
                                className="text-sm cursor-pointer text-[var(--brand-grey-foreground)] dark:text-white"
                            >
                                <T keyName="auth.termsAgreement.start" />
                                <br />
                                <T
                                    keyName={'auth.termsAgreement.startNewLine'}
                                />{' '}
                                <Link
                                    href="/terms-of-use"
                                    className="dark:text-[var(--brand-color)] text-black font-medium hover:underline"
                                >
                                    <T keyName="auth.termsAgreement.termsOfUse" />
                                </Link>{' '}
                                <T keyName="auth.termsAgreement.and" />{' '}
                                <Link
                                    href="/privacy-policy"
                                    className="dark:text-[var(--brand-color)] text-black font-medium hover:underline"
                                >
                                    <T keyName="auth.termsAgreement.privacyNotice" />
                                </Link>
                                {locale === 'vi' && ' của website'}.
                            </label>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className={cn(
                                'w-full bg-[var(--brand-color)] cursor-pointer text-black font-bold py-2' +
                                    ' px-4 rounded-3xl disabled:p-0  mt-4 hover:bg-[var(--brand-color-foreground)]' +
                                    ' transition-colors! duration-300 ease-in-out text-base',
                                `${loading ? 'disabled:bg-transparent' : ''}`
                            )}
                        >
                            {loading ? (
                                <LoadingComponent />
                            ) : (
                                <T keyName="auth.signup" />
                            )}
                        </Button>
                    </form>
                </Form>
                <div className="text-center mt-4">
                    <SocialLogin />
                    <p className="text-lg text-brand-text font-medium">
                        <T keyName="auth.alreadyHaveAccount" />{' '}
                        <Link
                            href="/auth/login"
                            className="dark:text-[var(--brand-color)] font-semibold text-black hover:underline"
                        >
                            <T keyName="auth.login" />
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
