'use client';

import LoadingComponent from '@/components/loading-spiner';
import { APP_SERVICES } from '@/constant/app-service';
import Image from 'next/image';
import { ConsultationServices, EmptyCart } from '@image/index';
import CheckOutTransactionForm, {
    CheckoutFormData,
} from '@/app/(user-layout)/book-a-consultation/components/CheckOutTransactionForm';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import React, { use, useCallback, useEffect, useMemo } from 'react';
import { redirect } from 'next/navigation';
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
import {
    addDotsLastSentence,
    capitalizeFirstLetterOnly,
    splitAndTrim,
} from '@/utils/string-parsing';
import Link from 'next/link';
import { useConsultationStore } from '@/stores/consultation.store';
import { CONSULTATION_ACTIONS } from '@/stores/actions/consultation.action';

interface SearchParams {
    selectedItemId?: string;
}

interface PageProps {
    searchParams: SearchParams;
}

export default function CartItemsPage({ searchParams }: PageProps) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { selectedItemId } = use(searchParams);
    const { data: response, isLoading: isConsultationServicesLoading } =
        useConsultationServices();
    const selectedItems = useConsultationStore(state => state.selectedItems);
    console.log(selectedItems);
    const dispatch = useConsultationStore(state => state.dispatch);

    const { open } = useSidebar();
    const { t, locale } = useI18n();

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
        dispatch({
            type: CONSULTATION_ACTIONS.UPDATE_ITEM,
            payload: consultationServiceId,
        });
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
            await requestConsultationMutation.mutateAsync({
                ...data,
                dateOfBirth: formatDob,
                consultationProductIds: selectedItems.filter(
                    item => item !== 'undefined'
                ),
            } as PayloadConsultationRequest);
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

    useEffect(() => {
        if (selectedItemId && !isChecked(selectedItemId)) {
            dispatch({
                type: CONSULTATION_ACTIONS.ADD_NEW_ITEM,
                payload: selectedItemId,
            });
        }
    }, [selectedItemId]);

    if (isLoading || !filteredItem) return <LoadingComponent />;

    return (
        <div
            className={cn(
                'overflow-x-hidden flex flex-col lg:flex-row gap-8 mx-auto w-full',
                `${open ? 'lg:max-w-[calc(100svw-var(--sidebar-width)-7rem)]' : 'lg:max-w-[calc(100svw-var(--sidebar-width)+1rem)]'}`
            )}
        >
            {/* Solutions List Section */}
            <div className="w-full lg:w-1/2 max-w-full lg:max-w-1/2 overflow-hidden">
                <div className="w-full flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-lg lg:text-xl dark:text-[var(--brand-color)] text-black font-bold">
                            {t('ourSolutions.common.title')}:
                        </h1>
                        <p className="text-sm sm:text-base">
                            {t('consultationRequest.describeOurSolution')}
                        </p>
                    </div>
                </div>

                <div className="space-y-4 sm:max-h-[70vh] lg:max-h-[80svh] overflow-y-auto overflow-x-hidden px-4">
                    {filteredItem.map(item => (
                        <div
                            key={item.id}
                            className={cn(
                                'flex flex-col sm:flex-row items-start sm:items-center border rounded-lg bg-[var(--brand-grey)] p-4 shadow-sm' +
                                    ' relative transition-all duration-300 ease-in-out',
                                `${isChecked(item.id) && 'dark:border-[var(--brand-color)] border-brand-text'}`
                            )}
                        >
                            <div className="flex items-center w-full sm:w-auto mb-3 sm:mb-0">
                                <Checkbox
                                    id={`item-${item.id}`}
                                    checked={isChecked(item.id)}
                                    onClick={() => toggleItemSelection(item.id)}
                                    className="mr-4 dark:data-[state=checked]:bg-[var(--brand-color)] dark:data-[state=checked]:border-[var(--brand-color)] dark:data-[state=checked]:text-black cursor-pointer border-[var(--brand-grey-foreground)]"
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
                                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                                            <span className="text-gray-500 text-xs">
                                                No image
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="ml-0 sm:ml-4 flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center min-w-0 mt-3 sm:mt-0">
                                <Link
                                    className={cn(
                                        'font-semibold dark:text-[var(--brand-color)] text-brand-text hover:underline mb-2 sm:mb-0'
                                    )}
                                    href={item.navigationUrl || '#'}
                                >
                                    {
                                        item.name[
                                            (locale as keyof LanguageOptions) ||
                                                'en'
                                        ]
                                    }
                                </Link>
                                <ul className="flex flex-col gap-0.5 min-w-[240px]">
                                    {item?.description
                                        ? splitAndTrim(
                                              item.description[
                                                  (locale as keyof LanguageOptions) ||
                                                      'en'
                                              ],
                                              '/'
                                          ).map((text, index) => (
                                              <li
                                                  key={index}
                                                  className="text-[12px] flex text-[var(--brand-grey-foreground)] items-start"
                                              >
                                                  <span className="mr-2 text-[var(--brand-grey-foreground)]">
                                                      •
                                                  </span>
                                                  <span className="break-words">
                                                      {addDotsLastSentence(
                                                          capitalizeFirstLetterOnly(
                                                              text
                                                          )
                                                      )}
                                                  </span>
                                              </li>
                                          ))
                                        : ''}
                                </ul>
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
                            {t('common.contacts')}{' '}
                            <Button
                                onClick={() => redirect('/chao-solutions')}
                                className="bg-[var(--brand-color)] text-black rounded-3xl font-semibold hover:bg-transparent hover:text-[var(--brand-color)] hover:border-[var(--brand-color)] border border-transparent transition-all duration-300 ease-in-out mt-4"
                            >
                                {t('ourSolutions.common.getStarted')}
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Information Form Section */}
            <div className="w-full lg:w-1/2 max-w-full lg:max-w-1/2 flex flex-col overflow-hidden">
                <div className={'mb-6 w-fit'}>
                    <h1 className="text-lg lg:text-xl text-brand-text dark:text-[var(--brand-color)] font-bold">
                        {t('consultationRequest.yourInformation.title')}
                    </h1>
                    <p className="text-sm lg:text-base">
                        {t('consultationRequest.yourInformation.prompt')}
                    </p>
                </div>
                <CheckOutTransactionForm
                    onSubmit={handleSubmit}
                    isDisableSubmitButton={isConsultationRequest}
                />
            </div>
        </div>
    );
}
