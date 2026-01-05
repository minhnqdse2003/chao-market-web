import { SePayPgClient } from 'sepay-pg-node';

export const getSePayClient = () => {
    const merchantId = process.env.SEPAY_MERCHANT_ID;
    const secretKey = process.env.SEPAY_SECRET_KEY;

    if (!merchantId || !secretKey) {
        // If we are building, we don't want to crash.
        // We only throw error if we are actually trying to process a payment at runtime.
        if (
            process.env.NODE_ENV === 'production' &&
            typeof window === 'undefined'
        ) {
            console.warn('SePay keys missing during build/server-init');
        }
    }

    return new SePayPgClient({
        env: 'production',
        merchant_id: process.env.SEPAY_MERCHANT_ID ?? '',
        secret_key: process.env.SEPAY_SECRET_KEY! ?? '',
    });
};
