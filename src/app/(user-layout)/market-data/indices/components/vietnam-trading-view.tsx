'use client';
import React, { useEffect, useRef } from 'react';
import { calculateAdjustedHeight } from '@/utils/height-utils';
import { useTheme } from 'next-themes';
import { MARKET_SYMBOL, TMarketSymbolKey } from '@/constant/market-query';
import { LIGHT_THEME_CONFIG_OVERVIEW } from '@/app/(user-layout)/market-data/markets/components/stock';

interface PageProps {
    isDivided?: boolean;
}

const DISPLAY_SYMBOLS: TMarketSymbolKey[] = ['ICE_USDVND', 'INDEX_DXY'];

function VietNamTradingView({ isDivided = false }: PageProps) {
    const container = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        if (!container.current) return;

        // Clear before injecting
        container.current.innerHTML = '';

        const script = document.createElement('script');
        script.src =
            'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
            ...LIGHT_THEME_CONFIG_OVERVIEW,
            colorTheme: theme === 'dark' ? 'dark' : 'light',
            scaleFontColor:
                theme === 'dark'
                    ? '#F1F1F1'
                    : LIGHT_THEME_CONFIG_OVERVIEW.scaleFontColor,
            tabs: [
                {
                    title: 'Forex',
                    symbols: DISPLAY_SYMBOLS.map(key => ({
                        s: MARKET_SYMBOL[key].name,
                        d: MARKET_SYMBOL[key].description,
                        'currency-logoid': MARKET_SYMBOL[key]?.currencyLogoId,
                        'base-currency-logoid':
                            MARKET_SYMBOL[key]?.baseCurrencyLogoId,
                        logoid: MARKET_SYMBOL[key]?.logoId,
                    })),
                    originalTitle: 'Forex',
                },
            ],
            width: `${isDivided ? '50%' : calculateAdjustedHeight() + 250}`,
            height: `${isDivided ? calculateAdjustedHeight() : 100}`,
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
