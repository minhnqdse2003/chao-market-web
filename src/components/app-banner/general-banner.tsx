'use client';
import Image from 'next/image';
import { HomeBanner } from '@image/index';
import React from 'react';
import NavSeparator from '@/components/nav-separator';
import { useI18n } from '@/context/i18n/context';

export default function GeneralBanner() {
    const { t } = useI18n();
    return (
        <div className="relative w-full">
            <Image
                src={HomeBanner}
                alt={'Home banner'}
                width={1920}
                height={1080}
                className="w-full h-auto max-h-[150px] object-cover"
            />
            <h2
                className="absolute left-1/20 top-1/2 tranform -translate-y-1/2 text-brand-text text-lg lg:text-3xl tracking-wider font-bold"
                dangerouslySetInnerHTML={{ __html: t('brandSlogan.general') }}
            />
            <NavSeparator isTrigger={false} />
        </div>
    );
}
