'use client';
import TabNavigation from '@/app/(user-layout)/market-data/components/tab-navigation';
import React, { useEffect, useMemo, useRef } from 'react';
import { useTheme } from 'next-themes';
import { LIGHT_THEME_CONFIG_ECONOMY_CALENDAR } from '@/app/(user-layout)/market-data/markets/components/stock';

function CalendarComp() {
    const container = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    const currentThemeConfig = useMemo(
        () => ({
            ...LIGHT_THEME_CONFIG_ECONOMY_CALENDAR,
            colorTheme: theme === 'dark' ? 'dark' : 'light',
            countryFilter: 'us,vn',
        }),
        [theme]
    );

    useEffect(() => {
        if (container.current) {
            container.current.innerHTML = '';
        }

        const script = document.createElement('script');
        script.src =
            'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = JSON.stringify(currentThemeConfig);
        if (container.current) container.current.appendChild(script);
        return () => {
            if (container.current) {
                container.current.innerHTML = '';
            }
        };
    }, [theme]);

    return (
        <div
            className="tradingview-widget-container"
            ref={container}
            style={{ width: '100%', height: '50rem' }}
            id={'trading-view-widget-container-calendar'}
        >
            <div className="tradingview-widget-container__widget"></div>
        </div>
    );
}

export default function Page() {
    return (
        <div className={'w-full flex flex-col gap-4'}>
            <TabNavigation
                searchParams={{}}
                currentHref={'/market-data/economic-calendar'}
            />
            <CalendarComp />
        </div>
    );
}
