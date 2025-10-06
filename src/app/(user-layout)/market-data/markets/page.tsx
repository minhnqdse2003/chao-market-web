'use client';
import { TabServerSide } from '@/components/app-tabs-server-side';
import TabNavigation from '@/app/(user-layout)/market-data/components/tab-navigation';
import StockComp from '@/app/(user-layout)/market-data/markets/components/stock';
import { useI18n } from '@/context/i18n/context';
import { use } from 'react';

interface PageProps {
    searchParams: {
        tab?: string;
    };
}

export default function Page({ searchParams }: PageProps) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { tab } = use(searchParams);
    const { t } = useI18n();

    const SUB_TABS: TabServerSide[] = [
        {
            title: t(
                'marketData.marketData.items.markets.items.usStocks.title'
            ),
            href: '/market-data/markets?tab=us',
        },
        {
            title: t(
                'marketData.marketData.items.markets.items.vietnamStocks.title'
            ),
            href: '/market-data/markets?tab=vi',
        },
        {
            title: t(
                'marketData.marketData.items.markets.items.currencies.title'
            ),
            href: '/market-data/markets?tab=currencies',
        },
        {
            title: t(
                'marketData.marketData.items.markets.items.cryptocurrencies.title'
            ),
            href: '/market-data/markets?tab=crypto',
        },
        {
            title: t(
                'marketData.marketData.items.markets.items.commodities.title'
            ),
            href: '/market-data/markets?tab=commodities',
        },
    ];

    return (
        <>
            <TabNavigation
                searchParams={searchParams}
                currentHref={'/market-data/markets'}
            />
            <TabNavigation searchParams={searchParams} subTabs={SUB_TABS} />
            {(tab === 'us' || !tab) && <StockComp type={'us'} />}
            {tab === 'vi' && <StockComp type={'vi'} />}
            {tab === 'currencies' && <StockComp type={'currencies'} />}
            {tab === 'commodities' && <StockComp type={'commodities'} />}
            {tab === 'crypto' && <StockComp type={'crypto'} />}
        </>
    );
}
