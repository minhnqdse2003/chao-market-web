'use client';
import { TabServerSide } from '@/components/app-tabs-server-side';
import TabNavigation from '@/app/(user-layout)/market-data/components/tab-navigation';
import StockComp from '@/app/(user-layout)/market-data/markets/components/stock';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { useMetaData } from '@/hooks/use-meta-data';
import AppLoader from '@/components/app-loader';
import { useI18n } from '@/context/i18n/context';

export default function Page() {
    const searchParams = useSearchParams();

    const tab = searchParams.get('tab') ?? 'us';
    const subTab = searchParams.get('sub') ?? 'overview';

    const { data: metaData, isLoading } = useMetaData();
    const { locale } = useI18n();

    const SUB_TABS = useMemo(() => {
        if (!metaData?.market) return [];
        return metaData.market.tabs.map(item => ({
            title: item.localized[locale as 'en' | 'vi']?.title ?? '',
            href: `/market-data/markets?tab=${item.type}`,
        })) satisfies TabServerSide[];
    }, [metaData, locale]);

    if (isLoading) {
        return <AppLoader />;
    }

    return (
        <>
            <TabNavigation
                searchParams={{ tab }} // or pass `tab` directly if needed
                currentHref={'/market-data/markets'}
            />
            <TabNavigation searchParams={{ tab }} subTabs={SUB_TABS} />
            {metaData?.market.tabs
                .filter(item => item.type === tab)
                .map(item => (
                    <StockComp
                        key={item.type}
                        type={item.type}
                        config={metaData}
                        activeTab={subTab}
                    />
                ))}
        </>
    );
}
