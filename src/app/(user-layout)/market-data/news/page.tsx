'use client';

import TabNavigation from '@/app/(user-layout)/market-data/components/tab-navigation';
import { VietNamStockMarketNewsFeed } from '@/app/(user-layout)/market-data/markets/components/stock';
import { AppTabs, TabItem } from '@/components/app-tabs';
import { useI18n } from '@/context/i18n/context';
import CombinedNewsFeed from '@/app/(user-layout)/market-data/markets/components/vietnam-stock-market-news';

type MARKET_TYPES = 'global' | 'vietnam';

function NewsComp({ type }: { type: MARKET_TYPES }) {
    const { locale } = useI18n();
    return locale === 'vi' ? (
        <CombinedNewsFeed type={'B01-market-fin-news-global-vn'} key={type} />
    ) : (
        <CombinedNewsFeed type={'B02-market-fin-news--global-en'} key={type} />
    );
}

export default function Page() {
    const { t } = useI18n();
    const tabsList: TabItem[] = [
        {
            title: t('marketData.marketData.items.indices.items.global.title'),
            value: 'global',
            renderContent: () => Promise.resolve(<NewsComp type={'global'} />),
        },
        {
            title: t('marketData.marketData.items.indices.items.vietnam.title'),
            value: 'vietnam',
            renderContent: () =>
                Promise.resolve(<VietNamStockMarketNewsFeed />),
        },
    ];
    return (
        <div className={'w-full flex flex-col gap-4'}>
            <TabNavigation
                searchParams={{}}
                currentHref={'/market-data/news'}
            />
            <AppTabs tabsList={tabsList} size={1} />
        </div>
    );
}
