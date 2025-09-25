'use client';
import React, { useEffect, useRef } from 'react';
import { calculateAdjustedHeight } from '@/utils/height-utils';
import { useTheme } from 'next-themes';

function VietNamTradingView() {
    const container = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        if (!container.current) return;

        // Clear before injecting
        container.current.innerHTML = '';

        const script = document.createElement('script');
        script.src =
            'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
            colorTheme: theme === 'dark' ? 'dark' : 'light',
            locale: 'en',
            isTransparent: false,
            showSymbolLogo: true,
            backgroundColor: theme === 'dark' ? '#252525' : '#ffffff',
            support_host: 'https://www.tradingview.com',
            symbolsGroups: [
                {
                    name: 'Forex',
                    symbols: [
                        {
                            name: 'FX_IDC:USDVND',
                            displayName: 'US Dollar / Vietnamese Dong',
                        },
                    ],
                },
            ],
            width: `${calculateAdjustedHeight() + 250}`,
            height: 100,
        });

        container.current.appendChild(script);

        return () => {
            // Don't touch innerHTML — just remove the script safely
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, [theme]);

    return <div ref={container} className="tradingview-widget-container" />;
}

export default React.memo(VietNamTradingView);
