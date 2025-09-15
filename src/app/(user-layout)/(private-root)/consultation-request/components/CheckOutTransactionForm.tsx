'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { UserProfile } from '@/db/schema';
import { FloatingLabelInput } from '@/components/ui/floating-input';
import { AppDatePicker } from '@/components/app-date-picker';
import { Label } from '@/components/ui/label';

// Define the validation schema
const checkoutSchema = z
    .object({
        firstName: z.string().min(1, 'First name is required'),
        lastName: z.string().min(1, 'Last name is required'),
        dateOfBirth: z
            .date('Invalid date format')
            .optional()
            .refine(date => !date || date < new Date(), {
                message: 'Date of birth must be in the past',
            }),
        email: z.email('Invalid email address').min(1, 'Email is required'),
        phoneNumber: z.string().min(1, 'Phone number is required'),
        socialNetwork: z.string().optional(),
        contactMethods: z
            .array(z.string())
            .min(1, 'At least one contact method is required'),
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
                'Social network is required when selected as contact method',
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

    // Create form instance with Zod resolver
    const form = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            dateOfBirth: undefined,
            email: '',
            phoneNumber: '',
            socialNetwork: '',
            contactMethods: ['email'],
            message: '',
        },
    });

    // Auto-fill form when initialData changes
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
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <FloatingLabelInput
                                    label="First name "
                                    {...field}
                                    className="app-text-input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Last Name */}
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <FloatingLabelInput
                                    label="Last name "
                                    {...field}
                                    className="app-text-input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Date of Birth */}
                <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <AppDatePicker
                                    onDateChange={field.onChange}
                                    buttonClass={
                                        'w-full dark:bg-transparent dark:hover:bg-transparent'
                                    }
                                    label={'Birthday (optional)'}
                                    isFloatingLabel={true}
                                    isMarginVisible={false}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Email Address */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <FloatingLabelInput
                                    type="email"
                                    label="Email address "
                                    {...field}
                                    className="app-text-input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Phone Number */}
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <FloatingLabelInput
                                    type="number"
                                    label="Phone number "
                                    {...field}
                                    className="app-text-input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Social Network */}
                <FormField
                    control={form.control}
                    name="socialNetwork"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <FloatingLabelInput
                                    label="Social network (optional)"
                                    {...field}
                                    className="app-text-input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Contact Methods */}
                <FormField
                    control={form.control}
                    name="contactMethods"
                    render={() => (
                        <FormItem className="space-y-2">
                            <div className="text-sm font-medium">
                                How would you like us to contact you?
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <FormField
                                    control={form.control}
                                    name="contactMethods"
                                    render={({ field }) => (
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
                                                className="border-[var(--brand-grey-foreground)] dark:data-[state=checked]:text-black data-[state=checked]:border-transparent! transition-all! duration-200 ease-in-out"
                                            />
                                            <label
                                                htmlFor="email"
                                                className={`text-sm font-medium cursor-pointer transition-all! duration-200 ease-in-out ${
                                                    field.value?.includes(
                                                        'email'
                                                    )
                                                        ? 'text-brand-text'
                                                        : 'text-[var(--brand-grey-foreground)]'
                                                }`}
                                            >
                                                Email
                                            </label>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="contactMethods"
                                    render={({ field }) => (
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
                                                className="border-[var(--brand-grey-foreground)] dark:data-[state=checked]:text-black data-[state=checked]:border-transparent! transition-all! duration-200 ease-in-out"
                                            />
                                            <label
                                                htmlFor="phone"
                                                className={`text-sm font-medium cursor-pointer transition-all! duration-200 ease-in-out ${
                                                    field.value?.includes(
                                                        'phone'
                                                    )
                                                        ? 'text-brand-text'
                                                        : 'text-[var(--brand-grey-foreground)]'
                                                }`}
                                            >
                                                Phone
                                            </label>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="contactMethods"
                                    render={({ field }) => (
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
                                                className="border-[var(--brand-grey-foreground)] dark:data-[state=checked]:text-black data-[state=checked]:border-transparent! transition-all! duration-200 ease-in-out"
                                            />
                                            <label
                                                htmlFor="social-network"
                                                className={`text-sm font-medium cursor-pointer transition-all! duration-200 ease-in-out ${
                                                    field.value?.includes(
                                                        'social-network'
                                                    )
                                                        ? 'text-brand-text'
                                                        : 'text-[var(--brand-grey-foreground)]'
                                                }`}
                                            >
                                                Social network
                                            </label>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Message */}
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => {
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
                                absolute start-2 z-10 origin-[0] bg-white px-2 text-sm text-[var(--brand-grey-foreground)] font-semibold duration-300 dark:bg-sidebar rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 cursor-text transition-all! dark:peer-focus:text-[var(--brand-color)] peer-focus:text-black 
                                ${
                                    hasValue
                                        ? 'top-2 -translate-y-4 scale-75'
                                        : 'top-6 -translate-y-1/2 peer-placeholder-shown:top-6 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2'
                                }
                                ${field.value ? 'peer-focus:secondary peer-focus:dark:secondary' : ''}
                            `}
                                        >
                                            Your message (optional)
                                        </Label>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />

                {/* Hidden submit button - this allows external control */}
                <input type="submit" className="hidden" />

                <div className="mt-4 flex gap-4">
                    <button
                        type="button"
                        onClick={form.handleSubmit(handleSubmit)}
                        disabled={isSubmitting || isDisableSubmitButton}
                        className="border border-transparent not-disabled:hover:border-[var(--brand-color)] dark:not-disabled:text-[var(--brand-color)] not-disabled:hover:text-black not-disabled:cursor-pointer dark:not-disabled:hover:bg-[var(--brand-color)] px-6 py-2 rounded-md disabled:opacity-75 disabled:text-[var(--brand-color)] transition-all! duration-300 ease-in-out font-semibold text-brand-text hover:bg-[var(--brand-color)] dark:hover:text-black"
                    >
                        {isSubmitting
                            ? 'Processing...'
                            : 'Request A Consultation'}
                    </button>
                </div>
            </form>
        </Form>
    );
}
