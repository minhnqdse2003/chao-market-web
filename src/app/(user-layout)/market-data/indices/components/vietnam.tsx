'use client';
import { useEffect } from 'react';
import { calculateAdjustedHeight } from '@/utils/height-utils';

// Declare the FireAnt types
declare global {
    interface Window {
        FireAnt: {
            MarketsWidget: new (config: {
                container_id: string;
                locale: string;
                price_line_color: string;
                grid_color: string;
                label_color: string;
                width: string;
                height: string;
            }) => void;
        };
    }
}

const VietnamComp = () => {
    useEffect(() => {
        const initializeWidget = () => {
            if (window.FireAnt && window.FireAnt.MarketsWidget) {
                // Clear the container first
                const container = document.getElementById('fan-quote-995');
                if (container) {
                    container.innerHTML = '';
                }

                new window.FireAnt.MarketsWidget({
                    container_id: 'fan-quote-995',
                    locale: 'vi',
                    price_line_color: '#71BDDF',
                    grid_color: '#999999',
                    label_color: '#999999',
                    width: `100%`,
                    height: `${calculateAdjustedHeight()}px`,
                });
            }
        };

        if (typeof window.FireAnt !== 'undefined') {
            initializeWidget();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://www.fireant.vn/Scripts/web/widgets.js';
        script.async = true;

        script.onload = () => {
            initializeWidget();
        };

        document.head.appendChild(script);
    }, []);

    return <div id="fan-quote-995" className={'h-svh'}></div>;
};

export default VietnamComp;
