'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { UserProfile } from '@/db/schema';
import { FloatingLabelInput } from '@/components/ui/floating-input';
import { AppDatePicker } from '@/components/app-date-picker';
import { Label } from '@/components/ui/label';
import { useI18n } from '@/context/i18n/context';
import { TranslatedFormMessage } from '@/components/app-translation-message-error';
import { isEqual } from 'lodash';
import { SESSION_FORM_BOOK_A_CONSULTATION } from '@/constant/session-form';

const checkoutSchema = z
    .object({
        firstName: z.string().min(1, 'auth.validation.firstNameRequired'),
        lastName: z.string().min(1, 'auth.validation.lastNameRequired'),
        dateOfBirth: z
            .date('auth.validation.dateInvalidFormat')
            .optional()
            .refine(date => !date || date < new Date(), {
                message: 'auth.validation.dobInPast',
            }),
        email: z
            .string()
            .email('validation.invalidEmail')
            .min(1, 'auth.validation.emailRequired'), // Use generic validation key for email format error, specific for required
        phoneNumber: z.string().min(1, 'auth.validation.phoneNumberRequired'), // KHÓA MỚI
        socialNetwork: z.string().optional(),
        contactMethods: z
            .array(z.string())
            .min(1, 'consultationRequest.validation.contactMethodRequired'), // KHÓA MỚI
        message: z.string().optional(),
    })
    .refine(
        data => {
            // If social network is selected as contact method, socialNetwork field is required
            if (data.contactMethods.includes('social-network')) {
                return (
                    data.socialNetwork && data.socialNetwork.trim().length > 0
                );
            }
            return true;
        },
        {
            message:
                'consultationRequest.validation.socialNetworkRequiredWhenSelected', // KHÓA MỚI cho refine error
            path: ['socialNetwork'],
        }
    );

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckOutTransactionFormProps {
    onSubmit: (data: CheckoutFormData) => Promise<void>;
    isDisableSubmitButton: boolean;
    initialData?: UserProfile | null;
}

export default function CheckOutTransactionForm({
    onSubmit,
    isDisableSubmitButton,
    initialData,
}: CheckOutTransactionFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { t } = useI18n();

    const baseFormData = {
        firstName: '',
        lastName: '',
        dateOfBirth: undefined,
        email: '',
        phoneNumber: '',
        socialNetwork: '',
        contactMethods: [],
        message: '',
    };
    // Create form instance with Zod resolver
    const form = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: baseFormData,
    });

    const setCheckoutToSessionStorage = (formData: CheckoutFormData) => {
        const newFormData = {
            ...formData,
            dateOfBirth: formData.dateOfBirth
                ? formData.dateOfBirth.toISOString()
                : null,
        };

        if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem(
                SESSION_FORM_BOOK_A_CONSULTATION,
                JSON.stringify(newFormData)
            );
        }
    };

    const extractCheckoutFromSessionStorage = (): Partial<CheckoutFormData> => {
        if (typeof sessionStorage !== 'undefined') {
            const storedValue = sessionStorage.getItem(
                SESSION_FORM_BOOK_A_CONSULTATION
            );
            if (storedValue) {
                const parsed = JSON.parse(storedValue);
                return {
                    ...parsed,
                    dateOfBirth: parsed.dateOfBirth
                        ? new Date(parsed.dateOfBirth)
                        : undefined,
                };
            }
        }

        return baseFormData;
    };

    const checkoutFormDataListener = form.watch();

    useEffect(() => {
        const storedData = extractCheckoutFromSessionStorage();
        form.reset(storedData);
    }, []);

    useEffect(() => {
        const baseCheckoutData = {
            firstName: '',
            lastName: '',
            dateOfBirth: undefined,
            email: '',
            phoneNumber: '',
            socialNetwork: '',
            contactMethods: [],
            message: '',
        };

        if (!isEqual(checkoutFormDataListener, baseCheckoutData)) {
            setCheckoutToSessionStorage(checkoutFormDataListener);
        }
    }, [checkoutFormDataListener]);

    useEffect(() => {
        if (initialData) {
            form.reset({
                firstName: initialData.firstName || '',
                lastName: initialData.lastName || '',
                dateOfBirth: initialData.dateOfBirth
                    ? new Date(initialData.dateOfBirth)
                    : undefined,
                email: initialData.email || '',
                phoneNumber: initialData.phoneNumber || '',
                socialNetwork: initialData.socialNetwork || '',
                contactMethods: Array.isArray(initialData.contactMethods)
                    ? initialData.contactMethods
                    : ['email'],
                message: initialData.message || '',
            });
        }
    }, [initialData, form]);

    // Function to handle form submission
    const handleSubmit = async (data: CheckoutFormData) => {
        setIsSubmitting(true);
        try {
            await onSubmit(data);
            form.reset();
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6 px-4"
            >
                {/* First Name */}
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormControl>
                                <FloatingLabelInput
                                    label={
                                        t('common.firstName') + ' ' ||
                                        'First name '
                                    }
                                    {...field}
                                    className="app-text-input"
                                />
                            </FormControl>
                            <TranslatedFormMessage
                                message={fieldState.error?.message}
                            />
                        </FormItem>
                    )}
                />

                {/* Last Name */}
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormControl>
                                <FloatingLabelInput
                                    label={
                                        t('common.lastName') + ' ' ||
                                        'Last name '
                                    }
                                    {...field}
                                    className="app-text-input"
                                />
                            </FormControl>
                            <TranslatedFormMessage
                                message={fieldState.error?.message}
                            />
                        </FormItem>
                    )}
                />

                {/* Date of Birth */}
                <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormControl>
                                <AppDatePicker
                                    onDateChange={field.onChange}
                                    buttonClass={
                                        'w-full dark:bg-transparent dark:hover:bg-transparent'
                                    }
                                    label={
                                        t('common.dateOfBirth') ||
                                        'Birthday (optional)'
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

                {/* Email Address */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormControl>
                                <FloatingLabelInput
                                    type="email"
                                    label={
                                        t('common.emailAddress') + ' ' ||
                                        'Email address '
                                    }
                                    {...field}
                                    className="app-text-input"
                                />
                            </FormControl>
                            <TranslatedFormMessage
                                message={fieldState.error?.message}
                            />
                        </FormItem>
                    )}
                />

                {/* Phone Number */}
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormControl>
                                <FloatingLabelInput
                                    type="number"
                                    label={
                                        t('common.phoneNumber') + ' ' ||
                                        'Phone number '
                                    }
                                    {...field}
                                    className="app-text-input"
                                />
                            </FormControl>
                            <TranslatedFormMessage
                                message={fieldState.error?.message}
                            />
                        </FormItem>
                    )}
                />

                {/* Social Network */}
                <FormField
                    control={form.control}
                    name="socialNetwork"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormControl>
                                <FloatingLabelInput
                                    label={
                                        t('common.socialNetwork ') ||
                                        'Social network (optional)'
                                    }
                                    {...field}
                                    className="app-text-input"
                                />
                            </FormControl>
                            <TranslatedFormMessage
                                message={fieldState.error?.message}
                            />
                        </FormItem>
                    )}
                />

                {/* Contact Methods */}
                <FormField
                    control={form.control}
                    name="contactMethods"
                    render={({ field, fieldState }) => (
                        <FormItem className="space-y-2">
                            <div className="text-sm font-bold text-[var(--brand-grey-foreground)]/50">
                                {t(
                                    'consultationRequest.contactMethod.prompt'
                                ) || 'How would you like us to contact you?'}
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <FormField
                                    control={form.control}
                                    name="contactMethods"
                                    render={() => (
                                        <FormItem className="flex items-center space-x-2">
                                            <Checkbox
                                                id="email"
                                                checked={field.value?.includes(
                                                    'email'
                                                )}
                                                onCheckedChange={checked => {
                                                    if (checked) {
                                                        field.onChange([
                                                            ...(field.value ||
                                                                []),
                                                            'email',
                                                        ]);
                                                    } else {
                                                        field.onChange(
                                                            field.value?.filter(
                                                                v =>
                                                                    v !==
                                                                    'email'
                                                            ) || []
                                                        );
                                                    }
                                                }}
                                                className="border-[var(--brand-grey-foreground)]/50 dark:data-[state=checked]:text-black data-[state=checked]:border-transparent! transition-all! duration-200 ease-in-out"
                                            />
                                            <Label
                                                htmlFor="email"
                                                className={`font-bold cursor-pointer transition-all! duration-200 ease-in-out ${
                                                    field.value?.includes(
                                                        'email'
                                                    )
                                                        ? 'text-brand-text'
                                                        : 'text-[var(--brand-grey-foreground)]/50'
                                                }`}
                                            >
                                                {t(
                                                    'consultationRequest.contactMethod.email'
                                                ) || 'Email'}
                                            </Label>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="contactMethods"
                                    render={() => (
                                        <FormItem className="flex items-center space-x-2">
                                            <Checkbox
                                                id="phone"
                                                checked={field.value?.includes(
                                                    'phone'
                                                )}
                                                onCheckedChange={checked => {
                                                    if (checked) {
                                                        field.onChange([
                                                            ...(field.value ||
                                                                []),
                                                            'phone',
                                                        ]);
                                                    } else {
                                                        field.onChange(
                                                            field.value?.filter(
                                                                v =>
                                                                    v !==
                                                                    'phone'
                                                            ) || []
                                                        );
                                                    }
                                                }}
                                                className="border-[var(--brand-grey-foreground)]/50 dark:data-[state=checked]:text-black data-[state=checked]:border-transparent! transition-all! duration-200 ease-in-out"
                                            />
                                            <Label
                                                htmlFor="phone"
                                                className={`font-bold cursor-pointer transition-all! duration-200 ease-in-out ${
                                                    field.value?.includes(
                                                        'phone'
                                                    )
                                                        ? 'text-brand-text'
                                                        : 'text-[var(--brand-grey-foreground)]/50'
                                                }`}
                                            >
                                                {t(
                                                    'consultationRequest.contactMethod.phone'
                                                ) || 'Phone'}
                                            </Label>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="contactMethods"
                                    render={() => (
                                        <FormItem className="flex items-center space-x-2">
                                            <Checkbox
                                                id="social-network"
                                                checked={field.value?.includes(
                                                    'social-network'
                                                )}
                                                onCheckedChange={checked => {
                                                    if (checked) {
                                                        field.onChange([
                                                            ...(field.value ||
                                                                []),
                                                            'social-network',
                                                        ]);
                                                    } else {
                                                        field.onChange(
                                                            field.value?.filter(
                                                                v =>
                                                                    v !==
                                                                    'social-network'
                                                            ) || []
                                                        );
                                                    }
                                                }}
                                                className="border-[var(--brand-grey-foreground)]/50 dark:data-[state=checked]:text-black data-[state=checked]:border-transparent! transition-all! duration-200 ease-in-out"
                                            />
                                            <Label
                                                htmlFor="social-network"
                                                className={`font-bold cursor-pointer transition-all! duration-200 ease-in-out ${
                                                    field.value?.includes(
                                                        'social-network'
                                                    )
                                                        ? 'text-brand-text'
                                                        : 'text-[var(--brand-grey-foreground)]/50'
                                                }`}
                                            >
                                                {t(
                                                    'consultationRequest.contactMethod.socialNetwork'
                                                ) || 'Social network'}
                                            </Label>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <TranslatedFormMessage
                                message={fieldState.error?.message}
                            />
                        </FormItem>
                    )}
                />

                {/* Message */}
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field, fieldState }) => {
                        const hasValue = Boolean(field.value);

                        return (
                            <FormItem>
                                <FormControl>
                                    <div className="relative">
                                        <Textarea
                                            {...field}
                                            id={'message'}
                                            className="peer border focus-visible:ring-0 focus-visible:border-black! dark:focus-visible:border-[var(--brand-color)]! dark:bg-transparent! dark:border-[var(--brand-grey)] text-brand-text min-h-24 pt-4 px-3 text-sm focus:text-base transition-all duration-300"
                                        />
                                        <Label
                                            htmlFor="message"
                                            className={`
                                absolute start-2 z-10 origin-[0] bg-white px-2 text-sm text-[var(--brand-grey-foreground)]/50 font-semibold duration-300 dark:bg-sidebar rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 cursor-text transition-all! dark:peer-focus:text-[var(--brand-color)] peer-focus:text-black 
                                ${
                                    hasValue
                                        ? 'top-2 -translate-y-4 scale-75'
                                        : 'top-6 -translate-y-1/2 peer-placeholder-shown:top-6 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2'
                                }
                                ${field.value ? 'peer-focus:secondary peer-focus:dark:secondary' : ''}
                            `}
                                        >
                                            {t(
                                                'consultationRequest.yourMessage.label'
                                            ) || 'Your message (optional)'}
                                        </Label>
                                    </div>
                                </FormControl>
                                <TranslatedFormMessage
                                    message={fieldState.error?.message}
                                />
                            </FormItem>
                        );
                    }}
                />

                {/* Hidden submit button - this allows external control */}
                <input type="submit" className="hidden" />

                <div className="mt-4 flex justify-center items-center">
                    <button
                        type="button"
                        onClick={form.handleSubmit(handleSubmit)}
                        disabled={isSubmitting || isDisableSubmitButton}
                        className="dark:bg-[var(--brand-color)] px-6 py-2 rounded-md disabled:opacity-75 disabled:text-[var(--brand-color)] transition-all! duration-300 ease-in-out font-semibold text-brand-text hover:bg-[var(--brand-color)] not-disabled:cursor-pointer dark:text-black bg-[var(--brand-color)]"
                    >
                        {isSubmitting
                            ? t('common.sending')
                            : t('consultationRequest.requestButton') ||
                              'Request A Consultation'}
                    </button>
                </div>
            </form>
        </Form>
    );
}
