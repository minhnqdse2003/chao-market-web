'use client';

import TabNavigation from '@/app/(user-layout)/market-data/components/tab-navigation';
import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { VietNamStockMarketNewsFeed } from '@/app/(user-layout)/market-data/markets/components/stock';
import { AppTabs, TabItem } from '@/components/app-tabs';

function NewsComp() {
    const container = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        if (container.current) {
            container.current.innerHTML = '';
        }
        const script = document.createElement('script');
        script.src =
            'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = `
        {
          "displayMode": "regular",
          "feedMode": "all_symbols",
          "colorTheme": ${theme === 'dark' ? '"dark"' : '"light"'},
          "isTransparent": false,
          "locale": "en",
          "width": "100%",
          "height": 650
        }`;
        if (container.current) container.current.appendChild(script);
        return () => {
            if (container.current) {
                container.current.innerHTML = '';
            }
        };
    }, [theme]);

    return (
        <div className="tradingview-widget-container" ref={container}>
            <div className="tradingview-widget-container__widget"></div>
        </div>
    );
}

export default function Page() {
    const tabsList: TabItem[] = [
        {
            title: 'Global',
            value: 'global',
            renderContent: () => Promise.resolve(<NewsComp />),
        },
        {
            title: 'Việt Nam',
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
