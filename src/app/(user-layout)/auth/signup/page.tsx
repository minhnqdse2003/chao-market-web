'use client';

import { useState } from 'react';
import OtpVerificationForm, {
    OtpVerificationFormProps,
} from '@/app/(user-layout)/auth/components/otp-verification-form';
import { SignUpForm } from '@/app/(user-layout)/auth/signup/components/sign-up-form';

export default function SignUpPage() {
    const [showOtp, setShowOtp] = useState(false);
    const [user, setUser] = useState<OtpVerificationFormProps | null>(null);

    const handleSignUpSuccess = (user: OtpVerificationFormProps) => {
        setUser(user);
        setShowOtp(true);
    };

    return showOtp && user ? (
        <OtpVerificationForm email={user.email} firstName={user.firstName} />
    ) : (
        <SignUpForm onSignUpSuccess={handleSignUpSuccess} />
    );
}
