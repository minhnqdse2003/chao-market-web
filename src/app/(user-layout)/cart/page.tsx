/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCartStore } from '@/stores/cart.store';
import { CART_ACTIONS } from '@/stores/actions/cart.action';
import { Trash2, ShoppingBag, Loader2 } from 'lucide-react';

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useSelectedConsultationServices } from '@/hooks/react-query/consultation/use-consultation-services';
import { formatVND } from '@/utils/price-format';
import { useI18n } from '@/context/i18n/context';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FloatingLabelInput } from '@/components/ui/floating-input';
import { toast } from 'sonner';
import { signIn, useSession } from 'next-auth/react';

export default function CartDetails() {
    const { data, isLoading } = useSelectedConsultationServices();
    const { locale, t } = useI18n();
    const router = useRouter();
    const { dispatch, itemIds } = useCartStore();
    const { status } = useSession();

    const [affiliateCode, setAffiliateCode] = useState('');
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const services = data?.data || [];
    const totalPrice = services.reduce(
        (acc, s) => acc + Number(s.price || 0),
        0
    );

    const onCheckout = async () => {
        try {
            setIsCheckingOut(true);

            // 1. Call the API to create Consultation/Transaction and get the URL
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    serviceIds: itemIds,
                    affiliateCode: affiliateCode,
                }),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message);

            const { checkoutURL, formFields } = result.data;

            // 2. CLEAR THE STORE IMMEDIATELY
            dispatch({ type: CART_ACTIONS.CLEAR_CART });

            // 3. AUTO-SUBMIT POST FORM TO SEPAY
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = checkoutURL;

            // Loop through fields from SePay SDK and add to hidden inputs
            Object.keys(formFields).forEach(key => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = String(formFields[key]);
                form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();
        } catch (error: any) {
            toast.error(error.message);
            setIsCheckingOut(false);
        }
    };

    if (status === 'unauthenticated') {
        return signIn(undefined, {
            callbackUrl: `/cart`,
        });
    }

    // 1. Loading State
    if (isLoading) {
        return (
            <div className="space-y-4 max-w-2xl mx-auto">
                <p className="text-center text-muted-foreground">
                    {t('common.loading')}
                </p>
                {[1, 2].map(i => (
                    <Card key={i} className="flex p-4 items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[100px]" />
                        </div>
                    </Card>
                ))}
            </div>
        );
    }

    // 2. Empty State
    if (services.length === 0) {
        return (
            <div className="text-center py-20 space-y-4">
                <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <ShoppingBag className="text-muted-foreground h-8 w-8" />
                </div>
                <h2 className="text-xl font-semibold">
                    {t('cart.empty.title')}
                </h2>
                <p className="text-muted-foreground">
                    {t('cart.empty.description')}
                </p>
                <Button
                    variant="outline"
                    onClick={() => router.push('/chao-solutions?tab=modular')}
                >
                    {t('cart.empty.button')}
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Card className="shadow-lg border-none bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        {t('cart.title')}
                        <Badge variant="secondary" className="rounded-full">
                            {services.length}
                        </Badge>
                    </CardTitle>
                </CardHeader>

                <CardContent className="grid gap-6">
                    {services.map(service => (
                        <div
                            key={service.id}
                            className="flex items-center justify-between group gap-4"
                        >
                            {service.imageUrl && (
                                <img
                                    src={service.imageUrl}
                                    alt={
                                        (service.name as unknown as any)[locale]
                                    }
                                    className="h-full w-full aspect-16/9 object-cover max-w-16 lg:max-w-40 rounded-md"
                                />
                            )}
                            <div className="flex-1 space-y-1">
                                <p className="font-medium lg:text-sm text-xs leading-none">
                                    {(service.name as unknown as any)[locale]}
                                </p>
                                <p className="text-xs lg:text-sm text-muted-foreground">
                                    {t('cart.itemType')}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <p className="font-bold dark:text-[var(--brand-color)] text-xs lg:text-sm text-brand-text whitespace-nowrap">
                                    {formatVND(service.price || 0)}
                                </p>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted-foreground hover:text-destructive transition-colors"
                                    onClick={() =>
                                        dispatch({
                                            type: CART_ACTIONS.REMOVE_ITEM,
                                            payload: service.id,
                                        })
                                    }
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>

                <Separator />

                <CardFooter className="flex flex-col gap-4 pt-6">
                    <FloatingLabelInput
                        value={affiliateCode}
                        label={'Discount Code'}
                        onChange={e => setAffiliateCode(e.target.value)}
                        className="app-text-input"
                        containerClassName={'w-full bg-sidebar'}
                    />
                    <div className="flex w-full justify-between items-end">
                        <span className="text-muted-foreground font-medium text-xs lg:text-sm">
                            {t('cart.subtotal')}
                        </span>
                        <span className="text-sm lg:text-base dark:text-[var(--brand-color)] text-brand-text font-black tracking-tight">
                            {formatVND(totalPrice)}
                        </span>
                    </div>

                    <Button
                        className="w-full h-12 text-sm lg:text-lg font-semibold text-black bg-[var(--brand-color)] hover:bg-[var(--brand-color)]/80 transition-all shadow-md"
                        onClick={onCheckout}
                        disabled={isCheckingOut}
                    >
                        {isCheckingOut ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {t('cart.checkout')}
                            </>
                        ) : (
                            t('cart.checkout')
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
