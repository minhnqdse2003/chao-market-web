export const dynamic = 'force-dynamic';

import { getSePayClient } from '@/lib/sepay-client';

export default function PaymentPage() {
    const sepayClient = getSePayClient();
    const checkoutURL = sepayClient.checkout.initCheckoutUrl();

    const checkoutFormfields = sepayClient.checkout.initOneTimePaymentFields({
        payment_method: 'BANK_TRANSFER',
        order_invoice_number: 'DH1234',
        order_amount: 10000,
        currency: 'VND',
        order_description: 'Thanh toan don hang DH123',
        success_url: 'https://example.com/order/DH123?payment=success',
        error_url: 'https://example.com/order/DH123?payment=error',
        cancel_url: 'https://example.com/order/DH123?payment=cancel',
    });

    return (
        <form action={checkoutURL} method="POST">
            {Object.keys(checkoutFormfields).map(field => (
                <input
                    type="hidden"
                    name={field}
                    key={field}
                    value={
                        checkoutFormfields[
                            field as keyof typeof checkoutFormfields
                        ]
                    }
                />
            ))}
            <button type="submit">Pay now</button>
        </form>
    );
}
