'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { UserProfile } from '@/db/schema';

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
                            <FormLabel className="font-medium">
                                First name (*)
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Your given name"
                                    {...field}
                                    className="bg-gray-700 border-none focus-visible:ring-0 border-gray-600 text-white"
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
                            <FormLabel className="font-medium">
                                Last name (*)
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Your family name"
                                    {...field}
                                    className="bg-gray-700 border-none focus-visible:ring-0 border-gray-600 text-white"
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
                            <FormLabel className="font-medium">
                                Date of birth (*)
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="date"
                                    placeholder="Your birthday"
                                    {...field}
                                    className="bg-gray-700 border-none focus-visible:ring-0 border-gray-600 text-white [&::-webkit-datetime-edit]:text-[var(--brand-grey-foreground)] [&::-webkit-datetime-edit-text]:text-white [&::-webkit-datetime-edit-year-field]:text-white [&::-webkit-datetime-edit-month-field]:text-white [&::-webkit-datetime-edit-day-field]:text-white"
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
                            <FormLabel className="font-medium">
                                Email address (*)
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Your email"
                                    {...field}
                                    className="bg-gray-700 border-none focus-visible:ring-0 border-gray-600 text-white"
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
                            <FormLabel className="font-medium">
                                Phone number (*)
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="tel"
                                    placeholder="Your phone number"
                                    {...field}
                                    className="bg-gray-700 border-none focus-visible:ring-0 border-gray-600 text-white"
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
                            <FormLabel className="font-medium">
                                Social network (optional)
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Your link"
                                    {...field}
                                    className="bg-gray-700 border-none focus-visible:ring-0 border-gray-600 text-white"
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
                            <FormLabel className="font-medium">
                                How would you like us to contact you? (*)
                            </FormLabel>
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
                                                className="border-gray-600 bg-gray-700 data-checked:bg-yellow-500"
                                            />
                                            <label
                                                htmlFor="email"
                                                className={`text-sm font-medium cursor-pointer ${
                                                    field.value?.includes(
                                                        'email'
                                                    )
                                                        ? 'text-white'
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
                                                className="border-gray-600 bg-gray-700 data-checked:bg-yellow-500"
                                            />
                                            <label
                                                htmlFor="phone"
                                                className={`text-sm font-medium cursor-pointer ${
                                                    field.value?.includes(
                                                        'phone'
                                                    )
                                                        ? 'text-white'
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
                                                className="border-gray-600 bg-gray-700 data-checked:bg-yellow-500"
                                            />
                                            <label
                                                htmlFor="social-network"
                                                className={`text-sm font-medium cursor-pointer ${
                                                    field.value?.includes(
                                                        'social-network'
                                                    )
                                                        ? 'text-white'
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
                            <FormLabel className="font-medium">
                                Your message:
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Your special requests"
                                    {...field}
                                    className="bg-gray-700 border-none focus-visible:ring-0 border-gray-600 text-white"
                                />
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
                        className="not-disabled:hover:bg-[var(--brand-color)] not-disabled:hover:text-black not-disabled:cursor-pointer text-[var(--brand-color)] px-6 py-2 rounded-md disabled:opacity-50 transition-all! duration-300 ease-in-out font-semibold"
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
