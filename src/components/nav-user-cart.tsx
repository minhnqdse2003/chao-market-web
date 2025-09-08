// components/cart/simple-cart-button.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { useUserCartQuery } from '@/hooks/react-query/carts';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export default function SimpleCartButton() {
    const { data, SessionStatus: status } = useUserCartQuery();
    const { open } = useSidebar();

    // Calculate total items in cart
    const itemCount =
        data?.data?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

    if (status === 'loading') {
        return (
            <Button variant="ghost" size="sm" disabled className="gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {open && <span>Cart</span>}
            </Button>
        );
    }

    if (status === 'unauthenticated') {
        return (
            <Link
                href="/auth/login"
                className={cn(
                    'gap-2 flex items-center justify-start dark:hover:text-[var(--brand-color)]' +
                        ' hover:text-brand-text w-full dark:hover:bg-transparent hover:bg-[var(--brand-grey)] transition-all!' +
                        ' duration-300' +
                        ' ease-in-out' +
                        ' font-semibold'
                )}
            >
                <ShoppingCart className="h-4 w-4" />
                {open && <span>Cart</span>}
            </Link>
        );
    }

    return (
        <Link
            href="/cart-items"
            className={cn(
                'gap-2 flex items-center justify-start dark:hover:text-[var(--brand-color)]' +
                    ' hover:text-brand-text hover:bg-[var(--brand-grey)] transition-all! duration-300 ease-in-out' +
                    ' font-semibold w-full dark:hover:bg-transparent '
            )}
        >
            <ShoppingCart className="h-4 w-4" />
            {open && <span>Cart</span>}
            {open && itemCount > 0 && (
                <span className="dark:text-[var(--brand-color)] text-black font-bold text-sm leading-relaxed rounded-full flex items-center justify-center">
                    ({itemCount})
                </span>
            )}
        </Link>
    );
}
