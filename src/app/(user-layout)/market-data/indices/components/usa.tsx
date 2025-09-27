'use client';
import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { MARKET_SYMBOL, TMarketSymbolKey } from '@/constant/market-query';

// Define which symbols should be displayed in the USA component
const USA_SYMBOL_KEYS: TMarketSymbolKey[] = [
    'INDEX_DXY',
    'CAPITAL_VIX',
    'SPREADEX_SPX',
    'SPREADEX_DJI',
    'NASDAQ_NDX',
];

// Create the symbols array dynamically from the selected keys
const USA_SYMBOLS = USA_SYMBOL_KEYS.map(key => ({
    name: MARKET_SYMBOL[key].name,
    displayName: MARKET_SYMBOL[key].description,
}));

const LIGHT_THEME_CONFIG = {
    colorTheme: 'light',
    locale: 'en',
    largeChartUrl: '',
    isTransparent: false,
    showSymbolLogo: true,
    backgroundColor: '#F1F1F1',
    support_host: 'https://www.tradingview.com',
    autosize: true,
    symbolsGroups: [
        {
            name: 'Global',
            symbols: USA_SYMBOLS,
        },
    ],
};

const DARK_THEME_CONFIG = {
    ...LIGHT_THEME_CONFIG,
    backgroundColor: '#252525',
    colorTheme: 'dark',
};

export default function USAComp() {
    const container = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        // Clean up any existing script or widget content to prevent duplication
        if (container.current) {
            container.current.innerHTML = '';
        }

        const script = document.createElement('script');
        // Removed extra spaces from the script URL
        script.src =
            'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
        script.type = 'text/javascript';
        script.async = true;
        // Removed extra spaces from the support_host URL
        script.innerHTML = JSON.stringify(
            theme === 'dark' ? DARK_THEME_CONFIG : LIGHT_THEME_CONFIG
        );
        container.current?.appendChild(script);

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
            style={{
                width: `100%`,
                height: '14.75rem',
            }}
        >
            <div className="tradingview-widget-container__widget"></div>
        </div>
    );
}
