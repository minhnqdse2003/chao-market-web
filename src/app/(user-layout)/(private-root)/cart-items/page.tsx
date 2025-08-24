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
import { useMemo, useState, useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useUserProfile } from '@/hooks/react-query/user';
import {
    useUserRemoveCartItem,
    useUserCheckout,
    useUserCartQuery,
} from '@/hooks/react-query/carts';

export default function CartItemsPage() {
    const { data: response, isLoading: isCartLoading } = useUserCartQuery();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
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
            const result = await checkoutMutation.mutateAsync({
                ...data,
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

    if (isLoading || !filteredItem) return <LoadingComponent />;

    return (
        <div className="container flex gap-6">
            <div className="w-3/5">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-xl text-[var(--brand-color)] font-bold">
                            Your cart
                        </h1>
                        <p>You have {filteredItem.length} items in your cart</p>
                    </div>

                    <Button
                        size="sm"
                        onClick={removeSelectedItems}
                        disabled={isDisableSubmitButton || isRemoving}
                        className="bg-transparent border border-[var(--brand-color)] text-[var(--brand-color)] hover:bg-[var(--brand-color)] hover:text-black"
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
                            className="text-sm text-gray-300 cursor-pointer"
                        >
                            Select All
                        </label>
                    </div>
                )}

                <div className="space-y-4 max-h-[80svh] overflow-y-auto overflow-x-hidden px-4">
                    {filteredItem.map(item => (
                        <div
                            key={item.productId}
                            className="flex items-center border rounded-lg bg-[var(--brand-grey)] p-4 shadow-sm relative cursor-pointer hover:bg-[var(--brand-grey-foreground)] transition-all duration-300 ease-in-out"
                            onClick={() => toggleItemSelection(item.productId)}
                        >
                            <Checkbox
                                id={`item-${item.productId}`}
                                checked={selectedItems.includes(item.productId)}
                                className="mr-4 dark:data-[state=checked]:bg-[var(--brand-color)] dark:data-[state=checked]:border-[var(--brand-color)] dark:data-[state=checked]:text-black"
                            />

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

                            <div className="ml-4 w-full flex-1">
                                <h3 className="font-medium text-[var(--brand-color)]">
                                    {item.product.name}
                                </h3>
                                <p className="text-xs max-w-2/3 truncate">
                                    {item.product.description}
                                </p>
                            </div>
                        </div>
                    ))}

                    {filteredItem.length === 0 && (
                        <div className="text-center flex flex-col gap-4 items-center justify-center py-8 text-gray-500">
                            <Image
                                src={EmptyCart}
                                alt={'empty-cart'}
                                width={1920}
                                height={1080}
                                className="object-contain w-full max-w-3/10 h-[12rem]"
                            />
                            Your cart is empty
                            <Button
                                onClick={() => redirect('/products')}
                                className="bg-[var(--brand-color)] text-black rounded-3xl font-semibold hover:bg-transparent hover:text-[var(--brand-color)] hover:border-[var(--brand-color)] border border-transparent transition-all! duration-300 ease-in-out"
                            >
                                Continue to Your Services
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full">
                <div className={'mb-6'}>
                    <h1 className="text-xl text-[var(--brand-color)] font-bold">
                        Your Information
                    </h1>
                    <p>Please tell us about yourself</p>
                </div>
                <CheckOutTransactionForm
                    onSubmit={handleSubmit}
                    saveForLater={handleOnSave}
                    isDisableSubmitButton={
                        isDisableSubmitButton || isCheckingOut || isSaving
                    }
                    initialData={profile}
                />
            </div>
        </div>
    );
}
