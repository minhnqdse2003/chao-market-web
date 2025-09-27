'use client';
import { TabServerSide } from '@/components/app-tabs-server-side';
import TabNavigation from '@/app/(user-layout)/market-data/components/tab-navigation';
import GlobalComp from '@/app/(user-layout)/market-data/indices/components/globals';
import USAComp from '@/app/(user-layout)/market-data/indices/components/usa';
import VietnamComp from '@/app/(user-layout)/market-data/indices/components/vietnam';
import VietnamTradingView from '@/app/(user-layout)/market-data/indices/components/vietnam-trading-view';
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

    const SUB_TABS: TabServerSide[] = [
        {
            title: 'Global',
            href: '/market-data/indices?tab=global',
        },
        {
            title: 'The United States',
            href: '/market-data/indices?tab=usa',
        },
        {
            title: 'Vietnam',
            href: '/market-data/indices?tab=vi',
        },
    ];

    const unwrappedSearchParams = { tab: tab || '' };

    return (
        <div>
            <TabNavigation searchParams={unwrappedSearchParams} />
            <TabNavigation
                searchParams={unwrappedSearchParams}
                subTabs={SUB_TABS}
            />

            {(tab === 'global' || !tab) && <GlobalComp />}
            {tab === 'usa' && <USAComp />}
            <div
                className={`${tab === 'vi' ? 'flex min-h-svh gap-2 mx-auto w-full' : 'hidden'}`}
            >
                <VietnamTradingView isDivided={true} numberOfSubTabs={1} />
                <VietnamComp numberOfSubTab={1} />
            </div>
        </div>
    );
}
