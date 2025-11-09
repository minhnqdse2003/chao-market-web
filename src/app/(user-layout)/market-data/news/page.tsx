'use client';

import TabNavigation from '@/app/(user-layout)/market-data/components/tab-navigation';
import { AppTabs, TabItem } from '@/components/app-tabs';
import { useI18n } from '@/context/i18n/context';
import CombinedNewsFeed from '@/app/(user-layout)/market-data/markets/components/vietnam-stock-market-news';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useMetaData } from '@/hooks/use-meta-data';
import { getRssLink } from '@/lib/get-rss-link-from-meta-data';
import AppLoader from '@/components/app-loader';

interface PageProps {
    searchParams: {
        tab?: string;
    };
}

export default function Page({ searchParams }: PageProps) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { tab } = use(searchParams);
    const router = useRouter();
    const { data: config, isLoading } = useMetaData();
    const { locale } = useI18n();

    const tabsList: TabItem[] =
        config?.market.financialNews.map(item => {
            const localized = item.localized[locale as 'en' | 'vi'];

            const href = getRssLink({
                key: 'financialNews',
                locale,
                type: item.type,
                config,
            });

            return {
                title: localized.title,
                value: item.type,
                renderContent: () =>
                    Promise.resolve(
                        <CombinedNewsFeed
                            type="B01-market-fin-news-global-vn"
                            href={href}
                        />
                    ),
            };
        }) ?? [];

    if (isLoading) {
        return <AppLoader />;
    }

    return (
        <div className={'w-full flex flex-col gap-4'}>
            <TabNavigation
                searchParams={{}}
                currentHref={'/market-data/news'}
            />
            <AppTabs
                tabsList={tabsList}
                size={1}
                defaultValue={tab}
                onValueChange={(value: string) => {
                    if (value) router.push(`/market-data/news?tab=${value}`);
                }}
            />
        </div>
    );
}
