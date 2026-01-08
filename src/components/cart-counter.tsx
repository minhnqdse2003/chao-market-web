'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/stores/cart.store';
import Link from 'next/link';
import { ClassValue } from 'clsx';
import { cn } from '@/lib/utils';

export default function CartCounter({ className }: { className?: ClassValue }) {
    const [isMounted, setIsMounted] = useState(false);
    const itemIds = useCartStore(state => state.itemIds);

    // Prevent Hydration Mismatch
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <Button
                variant="ghost"
                size="icon"
                className={cn(
                    'relative bg-[var(--brand-color)] hover:bg-[var(--brand-color)]/80' +
                        ' dark:text-[var(--brand-color)] dark:border-[var(--brand-color)] h-8',
                    className
                )}
            >
                <ShoppingCart className="h-4 w-4" />
            </Button>
        );
    }

    return (
        <Link href="/cart">
            <Button
                variant="outline"
                size="icon"
                className={cn(
                    'relative bg-[var(--brand-color)] hover:bg-[var(--brand-color)]/80' +
                        ' dark:text-[var(--brand-color)] dark:border-[var(--brand-color)] h-8',
                    className
                )}
            >
                <ShoppingCart className="h-4 w-4" />

                {itemIds.length > 0 && (
                    <Badge
                        variant="destructive"
                        className="absolute bg-brand-red dark:bg-brand-red -top-1 -right-2 h-4 w-4 flex items-center justify-center rounded-full p-0 text-[10px]"
                    >
                        {itemIds.length}
                    </Badge>
                )}
            </Button>
        </Link>
    );
}
