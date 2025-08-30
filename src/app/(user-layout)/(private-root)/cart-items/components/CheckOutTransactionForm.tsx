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
import { format } from 'date-fns';
import { Label } from '@/components/ui/label';

// Define the validation schema
const checkoutSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    email: z.email('Invalid email address').min(1, 'Email is required'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    socialNetwork: z.string().optional(),
    contactMethods: z
        .array(z.string())
        .min(1, 'At least one contact method is required'),
    message: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckOutTransactionFormProps {
    onSubmit: (data: CheckoutFormData) => Promise<void>;
    saveForLater: (data: CheckoutFormData) => Promise<void>;
    isDisableSubmitButton: boolean;
    initialData?: UserProfile | null;
}

export default function CheckOutTransactionForm({
    onSubmit,
    saveForLater,
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
            dateOfBirth: '',
            email: '',
            phoneNumber: '',
            socialNetwork: '',
            contactMethods: [],
            message: '',
        },
    });

    // Auto-fill form when initialData changes
    useEffect(() => {
        if (initialData) {
            form.reset({
                firstName: initialData.firstName || '',
                lastName: initialData.lastName || '',
                dateOfBirth: initialData.dateOfBirth || '',
                email: initialData.email || '',
                phoneNumber: initialData.phoneNumber || '',
                socialNetwork: initialData.socialNetwork || '',
                contactMethods: Array.isArray(initialData.contactMethods)
                    ? initialData.contactMethods
                    : [],
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

    // Function to handle form save
    const handleOnSave = async (data: CheckoutFormData) => {
        setIsSubmitting(true);
        try {
            await saveForLater(data);
        } catch (error) {
            console.error('Save error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6 w-full px-4"
            >
                {/* First Name */}
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <FloatingLabelInput
                                    label="First name (*)"
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
                                    label="Last name (*)"
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
                                    onDateChange={date => {
                                        field.onChange(
                                            date
                                                ? format(date, 'yyyy-MM-dd')
                                                : ''
                                        );
                                    }}
                                    buttonClass={
                                        'w-full dark:bg-transparent dark:hover:bg-transparent' +
                                        ' dark:hover:text-[var(--brand-color)] transition-all! duration-200 ease-in-out'
                                    }
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
                                    label="Email address (*)"
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
                                    type="tel"
                                    label="Phone number (*)"
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
                                How would you like us to contact you? (*)
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
                                                className="border-[var(--brand-grey-foreground)] dark:data-[state=checked]:bg-[var(--brand-color)] data-[state=checked]:text-black data-[state=checked]:border-transparent! transition-all! duration-200 ease-in-out"
                                            />
                                            <label
                                                htmlFor="email"
                                                className={`text-sm font-medium cursor-pointer transition-all! duration-200 ease-in-out ${
                                                    field.value?.includes(
                                                        'email'
                                                    )
                                                        ? 'text-[var(--brand-color)]'
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
                                                className="border-[var(--brand-grey-foreground)] dark:data-[state=checked]:bg-[var(--brand-color)] data-[state=checked]:text-black data-[state=checked]:border-transparent! transition-all! duration-200 ease-in-out"
                                            />
                                            <label
                                                htmlFor="phone"
                                                className={`text-sm font-medium cursor-pointer transition-all! duration-200 ease-in-out ${
                                                    field.value?.includes(
                                                        'phone'
                                                    )
                                                        ? 'text-[var(--brand-color)]'
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
                                                className="border-[var(--brand-grey-foreground)] dark:data-[state=checked]:bg-[var(--brand-color)] data-[state=checked]:text-black data-[state=checked]:border-transparent! transition-all! duration-200 ease-in-out"
                                            />
                                            <label
                                                htmlFor="social-network"
                                                className={`text-sm font-medium cursor-pointer transition-all! duration-200 ease-in-out ${
                                                    field.value?.includes(
                                                        'social-network'
                                                    )
                                                        ? 'text-[var(--brand-color)]'
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
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="relative">
                                    <Textarea
                                        {...field}
                                        id={'message'}
                                        className="peer border focus-visible:ring-0 focus-visible:border-[var(--brand-color)]! dark:bg-transparent! dark:border-[var(--brand-grey)] text-white min-h-24 pt-4 px-3 text-sm focus:text-base transition-all duration-300"
                                    />
                                    <Label
                                        htmlFor="message"
                                        className="peer-focus:secondary peer-focus:dark:secondary absolute start-2 top-6 z-10 origin-[0] -translate-y-4 scale-100 transform! bg-sidebar px-2 text-sm text-[var(--brand-grey-foreground)] font-semibold duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[var(--brand-color)] dark:bg-sidebar rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 cursor-text transition-all!"
                                    >
                                        Your message (optional)
                                    </Label>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Hidden submit button - this allows external control */}
                <input type="submit" className="hidden" />

                <div className="mt-4 flex gap-4">
                    <button
                        type="button"
                        onClick={form.handleSubmit(handleOnSave)}
                        disabled={isSubmitting}
                        className="text-[var(--brand-color)] hover:bg-[var(--brand-color)] cursor-pointer hover:text-black px-6 py-2 rounded-md transition-colors! ease-in-out font-semibold duration-300 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Processing...' : 'Save For Later'}
                    </button>
                    <button
                        type="button"
                        onClick={form.handleSubmit(handleSubmit)}
                        disabled={isSubmitting || isDisableSubmitButton}
                        className="border border-transparent not-disabled:hover:border-[var(--brand-color)] not-disabled:hover:bg-transparent not-disabled:hover:text-[var(--brand-color)] not-disabled:cursor-pointer not-disabled:text-black not-disabled:bg-[var(--brand-color)] px-6 py-2 rounded-md disabled:opacity-75 disabled:text-white transition-all! duration-300 ease-in-out font-semibold"
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
