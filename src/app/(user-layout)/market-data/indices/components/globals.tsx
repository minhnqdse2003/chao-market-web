'use client';
import React, { useEffect, useRef, memo } from 'react';
import { useTheme } from 'next-themes';
import { MARKET_SYMBOL, TMarketSymbolKey } from '@/constant/market-query';

const GLOBAL_SYMBOL_KEYS: TMarketSymbolKey[] = [
    'CAPITAL_VIX',
    'INDEX_DXY',
    'OANDA_XAUUSD',
    'BINANCE_BTCUSD',
    'ICE_USDVND',
    'BLACKBULL_WTI',
    'SPREADEX_SPX',
    'SPREADEX_DJI',
    'XETR_DAX',
    'GOMARKETS_FTSE100',
    'NIKKEI_NIKKEI225',
    'ASX_XJO',
    'BSE_SENSEX',
    'BSE_SNXN30',
    'SSE_000001',
    'SSE_000300',
    'HSI_HSI',
];

const GLOBAL_SYMBOLS = GLOBAL_SYMBOL_KEYS.map(key => ({
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
            symbols: GLOBAL_SYMBOLS,
        },
    ],
};

const DARK_THEME_CONFIG = {
    ...LIGHT_THEME_CONFIG,
    backgroundColor: '#252525',
    colorTheme: 'dark',
};

function GlobalComp() {
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
                height: '42rem',
            }}
        >
            <div className="tradingview-widget-container__widget"></div>
        </div>
    );
}

export default memo(GlobalComp);
