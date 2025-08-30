// components/cart/simple-cart-button.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { useUserCartQuery } from '@/hooks/react-query/carts';
import { useSidebar } from '@/components/ui/sidebar';

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
            <Button
                variant="ghost"
                size="sm"
                asChild
                className="gap-2 flex items-center justify-start mb-2 hover:text-[var(--brand-color)] transition-all! duration-300 ease-in-out font-semibold"
            >
                <Link href="/auth/login">
                    <ShoppingCart className="h-4 w-4" />
                    {open && <span>Cart</span>}
                </Link>
            </Button>
        );
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            asChild
            className="gap-2 flex items-center justify-start mb-2 hover:text-[var(--brand-color)] transition-all! duration-300 ease-in-out font-semibold"
        >
            <Link href="/cart-items">
                <ShoppingCart className="h-4 w-4" />
                {open && <span>Cart</span>}
                {open && itemCount > 0 && (
                    <span className="text-[var(--brand-color)] text-sm leading-relaxed rounded-full flex items-center justify-center">
                        ({itemCount})
                    </span>
                )}
            </Link>
        </Button>
    );
}
