'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { useTheme } from 'next-themes';
import { LIGHT_THEME_CONFIG_ECONOMY_CALENDAR } from '@/app/(user-layout)/market-data/markets/components/stock';

const CalendarComp = () => {
    const container = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    const currentThemeConfig = useMemo(
        () => ({
            ...LIGHT_THEME_CONFIG_ECONOMY_CALENDAR,
            colorTheme: theme === 'dark' ? 'dark' : 'light',
            countryFilter: 'us,eu,jp,gb,ch,au,ca,vn,cn',
            width: '100%',
            height: 650,
            autosize: true,
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

        if (container.current) {
            container.current.appendChild(script);
        }

        // Add additional styling after widget loads
        const styleTimer = setTimeout(() => {
            if (container.current) {
                const styleTag = container.current.querySelector('style');
                if (styleTag) {
                    // Override the existing styles
                    const additionalStyles = `
                        .tradingview-widget-copyright {
                            color: ${theme === 'dark' ? '#94a3b8' : '#64748b'} !important;
                            font-size: 12px !important;
                        }
                        .tradingview-widget-copyright a {
                            color: ${theme === 'dark' ? '#60a5fa' : '#3b82f6'} !important;
                        }
                        .tradingview-widget-copyright a:hover {
                            color: ${theme === 'dark' ? '#3b82f6' : '#2563eb'} !important;
                        }
                        
                        .tv-embed-widget-wrapper{
                            border: 1px solid red;
                        }
                    `;
                    styleTag.innerHTML += additionalStyles;
                }
            }
        }, 1000);

        return () => {
            clearTimeout(styleTimer);
            if (container.current) {
                container.current.innerHTML = '';
            }
        };
    }, [theme]);

    return (
        <div
            className="tradingview-widget-container rounded-xl border overflow-hidden"
            ref={container}
            style={{
                width: '100%',
                height: '50rem',
            }}
            id={'trading-view-widget-container-calendar'}
        >
            <div className="tradingview-widget-container__widget"></div>
        </div>
    );
};

export default CalendarComp;
