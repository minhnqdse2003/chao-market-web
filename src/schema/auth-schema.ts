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
        dateOfBirth: z
            .date('Invalid date format')
            .refine(date => date < new Date(), {
                message: 'Date of birth must be in the past',
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
    );

export const otpSchema = z.object({
    email: z.email(),
    otp: z.string().length(6, 'OTP must be 6 characters'),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
