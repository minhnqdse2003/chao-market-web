'use client';

import React, { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useAppMutation } from '@/hooks/react-query/use-custom-mutation';
import { cartApis } from '@/app/api/carts';
import { queryClient } from '@/lib/query-client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { APP_QUERY_KEY } from '@/constant';

export interface BlockContentsProps {
    title: string;
    children: ReactNode;
    buttonComp: {
        title: string;
        id: string;
    };
    id: string;
}

const BlockContents = ({
    id,
    title,
    children,
    buttonComp,
}: BlockContentsProps) => {
    const { status } = useSession();
    // Mutation for adding product to cart using server action
    const addToCartMutation = useAppMutation({
        mutationFn: async (productId: string) => {
            // Using your server action
            return await cartApis.AddProductToCartServerAction([
                {
                    productId: productId,
                    quantity: 1,
                },
            ]);
        },
        onSuccess: () => {
            // Invalidate cart summary to update the cart count
            queryClient.invalidateQueries({
                predicate: query => {
                    return query.queryKey.includes(APP_QUERY_KEY.USER_CART);
                },
            });
        },
        onSuccessMessage: 'Product added to cart',
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to add product to cart');
        },
    });

    const handleAddToCart = (id: string) => {
        if (status === 'unauthenticated') {
            toast.error('Please sign in to add products to cart');
            return;
        }
        addToCartMutation.mutate(id);
    };

    return (
        <div
            className="w-full flex flex-col [&>p]:mb-4 min-h-[60svh] [&>p:not(:first-child)]:font-light [&>p:not(:first-child)]:text-lg [&>p:last-child]:mb-0 [&>p:first-child]:mb-6 [&_*_ul]:list-disc [&_*_ul]:list-inside"
            id={id}
        >
            <p className="font-bold text-xl">{title}</p>
            <span className="text-[var(--brand-grey-foreground)] [&>p]:mb-6 tracking-wide leading-relaxed">
                {children}
            </span>
            <Button
                onClick={() => handleAddToCart(buttonComp.id)}
                className="bg-[var(--brand-color)] hover:bg-[var(--brand-color-foreground)] transition-all! duration-300 ease-in-out rounded-3xl px-5 py-2 w-fit uppercase text-brand-text dark:text-black font-semibold mt-4 shadow-lg"
            >
                {buttonComp.title}
            </Button>
        </div>
    );
};

export default BlockContents;
