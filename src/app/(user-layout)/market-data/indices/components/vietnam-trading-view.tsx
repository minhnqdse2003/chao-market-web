'use client';
import React, { useEffect, useRef, memo } from 'react';

function VietNamTradingView() {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (container.current) container.current.innerHTML = '';

        const script = document.createElement('script');
        script.src =
            'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = `
        {
          "colorTheme": "light",
          "locale": "en",
          "largeChartUrl": "",
          "isTransparent": true,
          "showSymbolLogo": true,
          "backgroundColor": "#0F0F0F",
          "support_host": "https://www.tradingview.com",
          "symbolsGroups": [
            {
              "name": "Forex",
              "symbols": [
                {
                  "name": "FX_IDC:USDVND",
                  "displayName": "US Dollar / Vietnamese Dong"
                }
              ]
            }
          ]
        }`;
        if (container.current) container.current.appendChild(script);

        return () => {
            if (container.current) container.current.innerHTML = '';
        };
    }, []);

    return (
        <div className="tradingview-widget-container" ref={container}>
            <div className="tradingview-widget-container__widget"></div>
        </div>
    );
}

export default memo(VietNamTradingView);
