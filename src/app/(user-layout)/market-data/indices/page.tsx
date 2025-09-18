import { TabServerSide } from '@/components/app-tabs-server-side';
import TabNavigation from '@/app/(user-layout)/market-data/components/tab-navigation';
import GlobalComp from '@/app/(user-layout)/market-data/indices/components/globals';
import USAComp from '@/app/(user-layout)/market-data/indices/components/usa';

interface PageProps {
    searchParams: {
        tab?: string;
    };
}

export default function Page({ searchParams }: PageProps) {
    const { tab } = searchParams;
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

    return (
        <>
            <TabNavigation searchParams={searchParams} />
            <TabNavigation searchParams={searchParams} subTabs={SUB_TABS} />

            {(tab === 'global' || !tab) && <GlobalComp />}
            {tab === 'usa' && <USAComp />}
        </>
    );
}
