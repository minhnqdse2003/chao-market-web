import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { FloatingLabelInput } from '@/components/ui/floating-input';
// Assuming you have a form setup (e.g., using react-hook-form)
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Edit } from 'lucide-react';

// Define validation schema for email
const emailSchema = z
    .object({
        newEmail: z.email('Please enter a valid email address.'),
        confirmNewEmail: z.email('Please enter a valid email address.'),
    })
    .refine(data => data.newEmail === data.confirmNewEmail, {
        message: 'Email addresses do not match.',
        path: ['confirmNewEmail'], // Error will appear on the confirmNewEmail field
    });

type EmailFormValues = z.infer<typeof emailSchema>;

// Placeholder function for form submission
const onSubmit = (data: EmailFormValues) => {
    console.log('Form submitted with:', data);
    // Add your actual submission logic here (API call, state update, etc.)
    // Example: await updateEmail(data.newEmail);
};

export const EditEmailDialog = () => {
    // Initialize the form using react-hook-form and zodResolver
    const form = useForm<EmailFormValues>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            newEmail: '',
            confirmNewEmail: '',
        },
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className={
                        'absolute right-3 flex justify-center items-center gap-1 text-sm' +
                        ' bottom-1/2' +
                        ' transform' +
                        ' translate-y-1/2 dark:bg-[var(--brand-color)] dark:text-black' +
                        ' rounded-sm py-0.5 px-1'
                    }
                >
                    <Edit />
                    Verify
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-sidebar">
                <DialogHeader>
                    <DialogTitle>Change Email</DialogTitle>
                    <DialogDescription>
                        Please enter your new email address and confirm it.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="newEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <FloatingLabelInput
                                            label={'New Email'}
                                            className="app-text-input"
                                            type="email" // Use email type for better mobile keyboard
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmNewEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <FloatingLabelInput
                                            label={'Confirm New Email'}
                                            className="app-text-input"
                                            type="email" // Use email type for better mobile keyboard
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
                                disabled={form.formState.isSubmitting} // Optional: disable during submission
                            >
                                {form.formState.isSubmitting
                                    ? 'Updating...'
                                    : 'Update Email'}{' '}
                                {/* Optional: loading state text */}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
