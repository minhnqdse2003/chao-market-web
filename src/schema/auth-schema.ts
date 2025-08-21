import { z } from 'zod';

export const signUpSchema = z
    .object({
        firstName: z.string().min(1, 'First name is required'),
        lastName: z.string().min(1, 'Last name is required'),
        email: z.email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: z.string(),
        gender: z.enum(['male', 'female', 'other']),
        otherGender: z.string().optional(),
        dateOfBirth: z.object({
            day: z.string().min(1, 'Day is required').max(2),
            month: z.string().min(1, 'Month is required').max(2),
            year: z.string().min(4, 'Year must be 4 digits').max(4),
        }),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    })
    .refine(
        data => {
            // If gender is 'other', otherGender is required
            if (data.gender === 'other') {
                return !!data.otherGender && data.otherGender.trim().length > 0;
            }
            return true;
        },
        {
            message: 'Please specify your gender',
            path: ['otherGender'],
        }
    )
    .refine(
        data => {
            // Validate date of birth
            const day = parseInt(data.dateOfBirth.day);
            const month = parseInt(data.dateOfBirth.month);
            const year = parseInt(data.dateOfBirth.year);

            if (isNaN(day) || isNaN(month) || isNaN(year)) {
                return false;
            }

            if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900) {
                return false;
            }

            const date = new Date(year, month - 1, day);
            return (
                date.getDate() === day &&
                date.getMonth() === month - 1 &&
                date.getFullYear() === year &&
                date <= new Date()
            ); // Must be in the past
        },
        {
            message: 'Please enter a valid date of birth',
            path: ['dateOfBirth'],
        }
    );

export const otpSchema = z.object({
    email: z.email(),
    otp: z.string().length(6, 'OTP must be 6 characters'),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
