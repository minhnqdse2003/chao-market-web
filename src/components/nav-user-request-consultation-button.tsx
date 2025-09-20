// components/cart/simple-cart-button.tsx
'use client';

import Link from 'next/link';
import { CalendarPlus } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { useI18n } from '@/context/i18n/context';

export default function ConsultationButton() {
    const { open } = useSidebar();
    const { t } = useI18n();

    return (
        <Link
            href="/consultation-request"
            className={cn(
                'gap-2 flex items-center justify-center dark:hover:text-[var(--brand-color)]' +
                    ' hover:text-brand-text hover:bg-[var(--brand-grey)] transition-all! duration-300 ease-in-out' +
                    ' font-semibold w-full dark:hover:bg-transparent '
            )}
        >
            <CalendarPlus className="h-4 w-4" />
            {open && <span>{t('bookConsultation.bookConsultation')}</span>}
        </Link>
    );
}
