'use client';
import React, { useEffect, useRef, memo } from 'react';
import { useTheme } from 'next-themes';

const LIGHT_THEME_CONFIG = {
    symbols: [
        {
            proName: 'CAPITALCOM:VIX',
            title: 'CBOE Volatility Index',
        },
        {
            proName: 'INDEX:DXY',
            title: 'US Dollar Index',
        },
        {
            proName: 'SPREADEX:SPX',
            title: 'S&P 500 Index',
        },
        {
            proName: 'NASDAQ:NDX',
            title: 'Nasdaq 100 Index',
        },
        {
            proName: 'FX_IDC:USDVND',
            title: 'US Dollar / Vietnamese Dong',
        },
        {
            proName: 'OANDA:XAUUSD',
            title: 'Gold Spot / US Dollar',
        },
        {
            proName: 'BINANCE:BTCUSD',
            title: 'Bitcoin / US Dollar',
        },
    ],
    colorTheme: 'light',
    locale: 'en',
    largeChartUrl: '',
    isTransparent: false,
    showSymbolLogo: true,
    displayMode: 'adaptive',
};

const DARK_THEME_CONFIG = {
    ...LIGHT_THEME_CONFIG,
    colorTheme: 'dark',
};

function TickerTape() {
    const container = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        // Clean up any existing scripts/widgets
        if (container.current) {
            container.current.innerHTML = '';
        }

        const script = document.createElement('script');
        script.src =
            'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = JSON.stringify(
            theme == 'dark' ? DARK_THEME_CONFIG : LIGHT_THEME_CONFIG
        );
        script.setAttribute(
            'data-symbol',
            'BINANCE:BTCUSD,OANDA:XAUUSD,FX_IDC:USDVND,NASDAQ:NDX,SPREADEX:SPX,INDEX:DXY,CAPITALCOM:VIX'
        );

        container.current?.appendChild(script);

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

export default memo(TickerTape);
