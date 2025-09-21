'use client';

import LoadingComponent from '@/components/loading-spiner';
import { APP_SERVICES } from '@/constant/app-service';
import Image from 'next/image';
import { EmptyCart, ConsultationServices } from '@image/index';
import CheckOutTransactionForm, {
    CheckoutFormData,
} from '@/app/(user-layout)/consultation-request/components/CheckOutTransactionForm';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useMemo, useState, useCallback } from 'react';
import { redirect, useRouter } from 'next/navigation';
import {
    useConsultationRequest,
    useConsultationServices,
} from '@/hooks/react-query/consultation';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useI18n } from '@/context/i18n/context';
import { PayloadConsultationRequest } from '@/app/api/consultation';
import { LanguageOptions } from '@/components/language-toggle';

export default function CartItemsPage() {
    const { data: response, isLoading: isConsultationServicesLoading } =
        useConsultationServices();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const { open } = useSidebar();
    const { t, locale } = useI18n();
    const router = useRouter();

    // Cart hooks
    const requestConsultationMutation = useConsultationRequest();

    const filteredItem = response?.data?.map(item => {
        return {
            ...item,
            url: APP_SERVICES.find(service => service.id === item.id)?.url,
            navigationUrl: APP_SERVICES.find(service => service.id === item.id)
                ?.navigationUrl,
        };
    });

    // Toggle selection of a single item
    const toggleItemSelection = (consultationServiceId: string) => {
        setSelectedItems(prev =>
            prev.includes(consultationServiceId)
                ? prev.filter(id => id !== consultationServiceId)
                : [...prev, consultationServiceId]
        );
    };

    const handleSubmit = async (data: CheckoutFormData) => {
        try {
            if (isDisableSubmitButton) {
                toast.error(
                    t('consultationRequest.validation.productNotSelected')
                );
                return;
            }

            const formatDob = data.dateOfBirth
                ? new Date(data.dateOfBirth)
                : undefined;
            const result = await requestConsultationMutation.mutateAsync({
                ...data,
                dateOfBirth: formatDob,
                consultationProductIds: selectedItems,
            } as PayloadConsultationRequest);

            if (result.data) {
                console.log('Checkout successful:', result.data);
                router.push('/cart-items/complete');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const isDisableSubmitButton = useMemo(() => {
        return selectedItems.length === 0;
    }, [selectedItems]);

    // Loading states
    const isConsultationRequest = requestConsultationMutation.isPending;
    const isLoading = isConsultationServicesLoading;

    // Is items selected
    const isChecked = useCallback(
        (productId: string) => {
            return selectedItems.includes(productId);
        },
        [selectedItems]
    );

    if (isLoading || !filteredItem) return <LoadingComponent />;

    return (
        <div
            className={cn(
                'overflow-x-hidden flex gap-8 mx-auto',
                `${open ? 'w-[calc(100svw-var(--sidebar-width)-7rem)]' : 'w-[calc(100svw-var(--sidebar-width)+1rem)]'}`
            )}
        >
            <div className="w-1/2 max-w-1/2 overflow-hidden">
                <div className="w-full flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-xl dark:text-[var(--brand-color)] text-black font-bold">
                            Our Solutions:
                        </h1>
                        <p>
                            Please select the solutions you would like to be
                            consulted on.{' '}
                        </p>
                    </div>
                </div>

                <div className="space-y-4 max-h-[80svh] overflow-y-auto overflow-x-hidden px-4">
                    {filteredItem.map(item => (
                        <div
                            key={item.id}
                            className="flex items-center border rounded-lg bg-[var(--brand-grey)] p-4 shadow-sm relative transition-all duration-300 ease-in-out"
                        >
                            <Checkbox
                                id={`item-${item.id}`}
                                checked={isChecked(item.id)}
                                onClick={() => toggleItemSelection(item.id)}
                                className="mr-4 dark:data-[state=checked]:bg-[var(--brand-color)] dark:data-[state=checked]:border-[var(--brand-color)] dark:data-[state=checked]:text-black cursor-pointer"
                            />

                            <div className="shrink-0">
                                {item.url ? (
                                    <Image
                                        src={
                                            ConsultationServices[
                                                item.url as keyof typeof ConsultationServices
                                            ]
                                        }
                                        alt={item.id + 'image'}
                                        width={64}
                                        height={64}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                ) : (
                                    <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center mr-4">
                                        <span className="text-gray-500 text-xs">
                                            No image
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="ml-4 flex-1 min-w-0">
                                <h3
                                    className={cn(
                                        'font-semibold',
                                        `${isChecked(item.id) ? 'dark:text-[var(--brand-color)]' : 'dark:text-brand-text'}`
                                    )}
                                >
                                    {
                                        item.name[
                                            (locale as keyof LanguageOptions) ||
                                                'en'
                                        ]
                                    }
                                </h3>
                                <p className="text-xs max-w-2/3">
                                    {item?.description
                                        ? item.description[
                                              (locale as keyof LanguageOptions) ||
                                                  'en'
                                          ]
                                        : ''}
                                </p>
                            </div>
                        </div>
                    ))}

                    {filteredItem.length === 0 && (
                        <div className="text-center flex flex-col gap-4 items-center justify-center py-8 text-[var(--brand-grey-foreground)]">
                            <Image
                                src={EmptyCart}
                                alt={'empty-cart'}
                                width={1920}
                                height={1080}
                                className="object-contain w-full max-w-3/10 h-[12rem]"
                            />
                            Your cart is empty
                            <Button
                                onClick={() => redirect('/our-solutions')}
                                className="bg-[var(--brand-color)] text-black rounded-3xl font-semibold hover:bg-transparent hover:text-[var(--brand-color)] hover:border-[var(--brand-color)] border border-transparent transition-all! duration-300 ease-in-out"
                            >
                                Continue to Your Services
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-1/2 max-w-1/2 flex flex-col overflow-hidden">
                <div className={'mb-6 w-fit'}>
                    <h1 className="text-xl text-brand-text dark:text-[var(--brand-color)] font-bold">
                        Your Information:
                    </h1>
                    <p>Please tell us about yourself.</p>
                </div>
                <CheckOutTransactionForm
                    onSubmit={handleSubmit}
                    isDisableSubmitButton={isConsultationRequest}
                />
            </div>
        </div>
    );
}
