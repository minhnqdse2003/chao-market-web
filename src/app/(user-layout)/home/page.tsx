'use client';

import AppCarousel, { CarouselItemProps } from '@/components/app-carousel';
import AppLoader from '@/components/app-loader';
import { useI18n } from '@/context/i18n/context';
import { useMetaData } from '@/hooks/use-meta-data';
import { useMemo } from 'react';

export default function HomePage() {
    const { data: config, isLoading } = useMetaData();
    const { locale } = useI18n();

    const carouselItems: CarouselItemProps[] =
        useMemo((): CarouselItemProps[] => {
            if (!config?.homeBanner) return [];

            return config.homeBanner.map((item, idx) => {
                const localized = item[locale as 'en' | 'vi'];
                return {
                    id: `${locale}-${idx}`,
                    imageUrl: localized?.imgUrl || '',
                    description: localized?.description || '',
                    link: localized?.link || '',
                    title: localized?.title || '',
                    alt: `Banner ${idx + 1}: ${localized?.title || ''}`,
                } as CarouselItemProps;
            });
        }, [config, locale]);

    if (isLoading) {
        return <AppLoader />;
    }

    return (
        <div className="h-[calc(100svh-4rem)] m-auto">
            <AppCarousel
                keyValue={locale}
                items={carouselItems}
                autoPlay={true}
                autoPlayDelay={2000}
                showIndicators={true}
                showNavigation={true}
                imageClassName="rounded-xl"
                className="h-full"
                indicatorClassName="w-2 h-2"
            />
        </div>
    );
}
