'use client';

import TabNavigation from '@/app/(user-layout)/market-data/components/tab-navigation';
import { VietNamStockMarketNewsFeed } from '@/app/(user-layout)/market-data/markets/components/stock';
import { AppTabs, TabItem } from '@/components/app-tabs';
import { useI18n } from '@/context/i18n/context';
import CombinedNewsFeed, {
    NewsSourceType,
} from '@/app/(user-layout)/market-data/markets/components/vietnam-stock-market-news';

type MARKET_TYPES = 'global' | 'vietnam';

function NewsComp({ type }: { type: MARKET_TYPES }) {
    const { locale } = useI18n();
    const data: Record<MARKET_TYPES, Record<string, NewsSourceType[]>> = {
        global: {
            en: ['us-stock-news-en'],
            vi: ['us-stock-news-vi'],
        },
        vietnam: {
            en: ['vietnam-stock-news-en', 'commodities-news-en'],
            vi: [
                'tuoitre-news',
                'vietnam-stock-news-vi',
                'commodities-news-vn',
            ],
        },
    };

    const key = data[type][locale];

    return key.map(item => <CombinedNewsFeed key={item} type={item} />);
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
            <AppTabs tabsList={tabsList} />
        </div>
    );
}
