'use client';

import LoadingComponent from '@/components/loading-spiner';
import { APP_SERVICES } from '@/constant/app-service';
import Image from 'next/image';
import { EmptyCart, ProductServiceImg } from '@image/index';
import CheckOutTransactionForm, {
    CheckoutFormData,
} from '@/app/(user-layout)/(private-root)/cart-items/components/CheckOutTransactionForm';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useUserProfile } from '@/hooks/react-query/user';
import {
    useUserRemoveCartItem,
    useUserCheckout,
    useUserCartQuery,
} from '@/hooks/react-query/carts';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useI18n } from '@/context/i18n/context';

export default function CartItemsPage() {
    const { data: response, isLoading: isCartLoading } = useUserCartQuery();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const { open } = useSidebar();
    const { t } = useI18n();
    const router = useRouter();

    // Profile hooks
    const { saveProfileAsync, isSaving, profile, isProfileLoading } =
        useUserProfile();

    // Cart hooks
    const removeCartItemMutation = useUserRemoveCartItem();
    const checkoutMutation = useUserCheckout();

    const filteredItem = response?.data?.items.map(item => {
        return {
            ...item,
            url: APP_SERVICES.find(service => service.id === item.productId)
                ?.url,
            navigationUrl: APP_SERVICES.find(
                service => service.id === item.productId
            )?.navigationUrl,
        };
    });

    // Auto-fill form when profile loads
    useEffect(() => {
        // The form will handle the initial data via props
    }, [profile]);

    // Toggle selection of a single item
    const toggleItemSelection = (productId: string) => {
        setSelectedItems(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    // Toggle selection of all items
    const toggleSelectAll = () => {
        if (selectedItems.length === filteredItem!.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(filteredItem!.map(item => item.productId));
        }
    };

    // Remove selected items from cart
    const removeSelectedItems = async () => {
        if (selectedItems.length === 0) return;

        try {
            await removeCartItemMutation.mutateAsync(selectedItems);
        } catch (error) {
            console.error('Error removing items:', error);
        }
    };

    const handleSubmit = async (data: CheckoutFormData) => {
        try {
            if (isDisableSubmitButton) {
                toast.error(t('cartItems.validation.productNotSelected'));
                return;
            }

            const formatDob = data.dateOfBirth
                ? new Date(data.dateOfBirth)
                : undefined;
            const result = await checkoutMutation.mutateAsync({
                ...data,
                dateOfBirth: formatDob,
                cartItemIds: selectedItems,
            });

            if (result.data) {
                console.log('Checkout successful:', result.data);
                router.push('/cart-items/complete');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleOnSave = async (data: CheckoutFormData) => {
        try {
            await saveProfileAsync(data);
            console.log('Profile saved successfully');
        } catch (error) {
            console.error('Error saving form:', error);
        }
    };

    const isDisableSubmitButton = useMemo(() => {
        return selectedItems.length === 0;
    }, [selectedItems]);

    // Loading states
    const isRemoving = removeCartItemMutation.isPending;
    const isCheckingOut = checkoutMutation.isPending;
    const isLoading = isCartLoading || isProfileLoading;

    // Is items selected
    const isChecked = useCallback(
        (productId: string) => {
            return selectedItems.includes(productId);
        },
        [selectedItems]
    );

    // On Navigate
    const handleOnClickDetails = (url: string) => {
        router.push(url);
    };

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
                            Your Cart:
                        </h1>
                        <p>
                            You have{' '}
                            <span
                                className={
                                    'dark:text-[var(--brand-color)] text-black'
                                }
                            >
                                {filteredItem.length}
                            </span>{' '}
                            items in your cart.
                        </p>
                    </div>

                    <Button
                        size="sm"
                        onClick={removeSelectedItems}
                        disabled={isDisableSubmitButton || isRemoving}
                        className="bg-transparent border border-black dark:border-[var(--brand-color)] dark:text-[var(--brand-color)] dark:hover:bg-[var(--brand-color)] dark:hover:text-black text-brand-text hover:bg-[var(--brand-grey)] transition-colors! duration-300 ease-in-out"
                    >
                        {isRemoving ? (
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Trash2 className="h-4 w-4" />
                        )}
                    </Button>
                </div>

                {filteredItem.length > 0 && (
                    <div className="flex items-center mb-4">
                        <Checkbox
                            id="select-all"
                            checked={
                                selectedItems.length === filteredItem.length &&
                                filteredItem.length > 0
                            }
                            onCheckedChange={toggleSelectAll}
                            className="mr-2 dark:data-[state=checked]:bg-[var(--brand-color)] dark:data-[state=checked]:border-[var(--brand-color)] dark:data-[state=checked]:text-black"
                        />
                        <label
                            htmlFor="select-all"
                            className="text-sm text-[var(--brand-grey-foreground)] font-medium cursor-pointer"
                        >
                            Select All
                        </label>
                    </div>
                )}

                <div className="space-y-4 max-h-[80svh] overflow-y-auto overflow-x-hidden px-4">
                    {filteredItem.map(item => (
                        <div
                            key={item.productId}
                            className="flex items-center border rounded-lg bg-[var(--brand-grey)] p-4 shadow-sm relative transition-all duration-300 ease-in-out"
                        >
                            <Checkbox
                                id={`item-${item.productId}`}
                                checked={isChecked(item.productId)}
                                onClick={() =>
                                    toggleItemSelection(item.productId)
                                }
                                className="mr-4 dark:data-[state=checked]:bg-[var(--brand-color)] dark:data-[state=checked]:border-[var(--brand-color)] dark:data-[state=checked]:text-black cursor-pointer"
                            />

                            <div className="shrink-0">
                                {item.url ? (
                                    <Image
                                        src={
                                            ProductServiceImg[
                                                item.url as keyof typeof ProductServiceImg
                                            ]
                                        }
                                        alt={item.product.name}
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
                                        `${isChecked(item.productId) ? 'dark:text-[var(--brand-color)]' : 'dark:text-brand-text'}`
                                    )}
                                >
                                    {item.product.name}
                                </h3>
                                <p className="text-xs max-w-2/3 truncate">
                                    {item.product.description}
                                </p>
                            </div>
                            <Button
                                className={
                                    'shrink-0 shadow-none ml-2 dark:text-[var(--brand-color)] hover:text-brand-text' +
                                    ' dark:hover:text-black transition-colors! duration-300' +
                                    ' ease-in-out' +
                                    ' dark:hover:bg-[var(--brand-color)] dark:bg-transparent rounded-md px-4 py-2' +
                                    ' text-sm' +
                                    ' text-black hover:bg-[var(--brand-color)] bg-transparent font-semibold'
                                }
                                onClick={() =>
                                    handleOnClickDetails(
                                        item.navigationUrl || '#'
                                    )
                                }
                            >
                                Details
                            </Button>
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
                    saveForLater={handleOnSave}
                    isDisableSubmitButton={isCheckingOut || isSaving}
                    initialData={profile}
                />
            </div>
        </div>
    );
}
