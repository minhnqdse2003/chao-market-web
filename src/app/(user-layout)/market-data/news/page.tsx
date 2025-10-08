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
    const data: Array<{
        title: string;
        en: NewsSourceType;
        vi: NewsSourceType;
    }> = [
        {
            title: 'Vietstock.vn',
            en: 'us-stock-news-en',
            vi: 'us-stock-news-vi',
        },
        {
            title: 'Investing.com',
            en: 'currencies-news-en',
            vi: 'currencies-news-vi',
        },
    ];

    const tabsList: TabItem[] = data.map(item => ({
        title: item.title,
        value: item.title + `-global-${locale}`,
        renderContent: () =>
            Promise.resolve(
                <CombinedNewsFeed
                    type={item[locale as 'en' | 'vi']}
                    key={type}
                />
            ),
    }));

    return (
        locale && <AppTabs tabsList={tabsList} shouldBorderVisible={false} />
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
            <AppTabs tabsList={tabsList} />
        </div>
    );
}
