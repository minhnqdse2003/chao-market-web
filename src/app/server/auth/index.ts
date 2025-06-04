import { VerifyResponse } from '@/types/user/response/verify-response';

export const sendOtpCode = async (email: string) => {
    return await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email }),
    });
};

export const verifiedEmail = async (email: string): Promise<VerifyResponse> => {
    const res = await fetch(`/api/user/verify?email=${email}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    return res.json();
};

export const verifiedOtpCode = async ({
    email,
    otp,
}: {
    email: string;
    otp: string;
}) => {
    return await fetch('/api/auth/otp', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, otp: otp }),
    });
};
