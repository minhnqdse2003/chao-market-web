import { TabServerSide } from '@/components/app-tabs-server-side';
import TabNavigation from '@/app/(user-layout)/market-data/components/tab-navigation';
import StockComp from '@/app/(user-layout)/market-data/markets/components/stock';

interface PageProps {
    searchParams: {
        tab?: string;
    };
}

export default function Page({ searchParams }: PageProps) {
    const { tab } = searchParams;
    const SUB_TABS: TabServerSide[] = [
        {
            title: 'U.S. Stocks',
            href: '/market-data/markets?tab=us',
        },
        {
            title: 'Vietnamese Stocks',
            href: '/market-data/markets?tab=vi',
        },
        {
            title: 'Currencies',
            href: '/market-data/markets?tab=currencies',
        },
        {
            title: 'Commodities',
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
            {tab === 'currencies' && <StockComp type={'currencies'} />}
            {tab === 'commodities' && <StockComp type={'commodities'} />}
        </>
    );
}
