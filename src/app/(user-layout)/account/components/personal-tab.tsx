'use client';

import { useForm, UseFormReturn, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AppDatePicker } from '@/components/app-date-picker';
import { z } from 'zod';
import { FloatingLabelInput } from '@/components/ui/floating-input';
import { EditEmailDialog } from '@/app/(user-layout)/account/components/edit-email-dialog';
import { UserViewResponse } from '@/types/user/response/view-response';

const ArrayMaleConstant = ['male', 'female', 'other'];

const personalFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }).max(100),
    birthday: z.date(),
    gender: z.enum(ArrayMaleConstant).optional(),
    otherGender: z.string().optional(),
    email: z.email({ message: 'Invalid email address' }),
    phone: z.string().min(1, { message: 'Phone number is required' }),
});

export type PersonalFormData = z.infer<typeof personalFormSchema>;

const BasicInformationSection = ({
    form,
}: {
    form: UseFormReturn<PersonalFormData>;
}) => (
    <Card className={'bg-transparent'}>
        <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
                Update your personal details and profile information.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                            <FormControl>
                                <FloatingLabelInput
                                    label={'Full Name'}
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
                    name="birthday"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <AppDatePicker
                                    onDateChange={field.onChange}
                                    buttonClass="w-full dark:bg-transparent dark:hover:bg-transparent"
                                    label="Birthday"
                                    isFloatingLabel={true}
                                    isMarginVisible={false}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <Label>Gender</Label>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex items-center flex-wrap gap-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="male"
                                            id="male"
                                        />
                                        <Label htmlFor="male">Male</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="female"
                                            id="female"
                                        />
                                        <Label htmlFor="female">Female</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                            value="other"
                                            id="other"
                                        />
                                        <Label htmlFor="other">Other</Label>
                                    </div>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {form.watch('gender') === 'other' && (
                    <FormField
                        control={form.control}
                        name="otherGender"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormControl>
                                    <FloatingLabelInput
                                        label={'Specify Gender'}
                                        className="app-text-input"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
            </div>
        </CardContent>
    </Card>
);

const ContactInformationSection = ({
    form,
}: {
    form: UseFormReturn<PersonalFormData>;
}) => (
    <Card className={'bg-transparent'}>
        <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
                Update your contact details and communication preferences.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className={'relative w-full'}>
                                    <FloatingLabelInput
                                        label={'Email'}
                                        className="app-text-input pointer-events-none"
                                        type="email"
                                        {...field}
                                    />
                                    <EditEmailDialog />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <FloatingLabelInput
                                    label={'Phone Number'}
                                    className="app-text-input"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </CardContent>
    </Card>
);

const PersonalTab = ({ userData }: { userData: UserViewResponse | null }) => {
    const form = useForm<z.infer<typeof personalFormSchema>>({
        resolver: zodResolver(personalFormSchema),
        defaultValues: userData
            ? ({
                  name: userData.name ?? '',
                  birthday: userData.dateOfBirth ?? new Date(), // z.date() requires a Date
                  email: userData.email ?? '',
                  gender:
                      userData.gender &&
                      ArrayMaleConstant.includes(userData.gender)
                          ? (userData.gender as (typeof ArrayMaleConstant)[number])
                          : undefined,
                  otherGender:
                      userData.gender &&
                      !ArrayMaleConstant.includes(userData.gender)
                          ? (userData.gender as (typeof ArrayMaleConstant)[number])
                          : undefined,
                  phone: userData.phone ?? '',
              } as PersonalFormData)
            : {
                  name: 'John Doe',
                  birthday: new Date(),
                  gender: 'male',
                  otherGender: '',
                  email: 'john.doe@example.com',
                  phone: '+1 (555) 123-4567',
              },
    });

    const { isDirty } = useFormState({ control: form.control });

    const onSubmit = async (data: PersonalFormData) => {
        console.log('Updated profile ', JSON.stringify(data, null, 2));

        // In a real application, you would submit to an API here
        // Example:
        // try {
        //   const response = await fetch('/api/profile/update', {
        //     method: 'PUT',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        //   });
        //
        //   if (response.ok) {
        //     console.log('Profile updated successfully');
        //   } else {
        //     console.error('Failed to update profile');
        //   }
        // } catch (error) {
        //   console.error('Error updating profile:', error);
        // }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <BasicInformationSection form={form} />
                <ContactInformationSection form={form} />
                <Button
                    type="submit"
                    disabled={!isDirty}
                    className={
                        'dark:bg-[var(--brand-color)] dark:text-black font-semibold ' +
                        (!isDirty ? 'opacity-50 cursor-not-allowed' : '')
                    }
                >
                    Update Profile
                </Button>
            </form>
        </Form>
    );
};

export default PersonalTab;
