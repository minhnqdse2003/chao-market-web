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
                'gap-2 flex items-center justify-center  font-semibold w-full'
            )}
        >
            <CalendarPlus className="h-4 w-4" />
            {open && <span>{t('bookConsultation.bookConsultation')}</span>}
        </Link>
    );
}
