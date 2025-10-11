// src/schema/auth-schema.ts

import { z } from 'zod';
import { TranslationKey } from '@/types/translations';

export const signUpSchema = z
    .object({
        firstName: z
            .string()
            .min(1, { message: 'auth.validation.firstNameRequired' })
            .regex(/^[a-zA-Z\s]+$/, {
                message: 'auth.validation.firstNameInvalid',
            }),
        lastName: z
            .string()
            .min(1, { message: 'auth.validation.lastNameRequired' })
            .regex(/^[a-zA-Z\s]+$/, {
                message: 'auth.validation.lastNameInvalid',
            }),
        email: z.email({ message: 'auth.validation.emailInvalid' }),
        password: z
            .string()
            .min(6, { message: 'auth.validation.passwordTooShort' }),
        confirmPassword: z
            .string()
            .min(6, { message: 'auth.validation.passwordTooShort' }),
        gender: z.enum(['male', 'female', 'other'], {
            error: () => {
                return `auth.validation.genderRequired` as TranslationKey;
            },
        }),
        otherGender: z.string().optional(),
        dateOfBirth: z
            .date('auth.validation.dobRequired' as TranslationKey)
            .refine(date => !date || date < new Date(), {
                message: 'auth.validation.dobInPast',
            })
            .refine(
                date => {
                    // If the date is not provided (it's optional), pass the validation.
                    if (!date) return true;
                    // Calculate the date 18 years ago from today
                    const today = new Date();
                    const eighteenYearsAgo = new Date(
                        today.getFullYear() - 18,
                        today.getMonth(),
                        today.getDate()
                    );
                    // The user's birthdate must be on or before the date 18 years ago
                    return date <= eighteenYearsAgo;
                },
                {
                    message: 'auth.validation.ageRequirement',
                }
            ),
        phoneNumber: z.string().optional(),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'auth.validation.passwordsDoNotMatch',
        path: ['confirmPassword'],
    })
    .refine(
        data => {
            if (data.gender === 'other') {
                return !!data.otherGender && data.otherGender.trim().length > 0;
            }
            return true;
        },
        {
            message: 'auth.validation.genderOtherRequired',
            path: ['otherGender'],
        }
    );

export const otpSchema = z.object({
    email: z.email(),
    otp: z.string().length(6, 'OTP must be 6 characters'), // You can internationalize this too if needed
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
