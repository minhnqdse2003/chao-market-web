import { SePayPgClient } from 'sepay-pg-node';

export const sepayClient = new SePayPgClient({
    env: 'sandbox',
    merchant_id: process.env.SEPAY_MERCHANT_ID!,
    secret_key: process.env.SEPAY_SECRET_KEY!,
});
