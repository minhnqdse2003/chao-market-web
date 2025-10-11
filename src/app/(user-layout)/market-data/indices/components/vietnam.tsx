'use client';
import { useCallback, useEffect, useRef } from 'react';
import { calculateAdjustedHeight, processHeight } from '@/utils/height-utils';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

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
                height: string;
                width: string;
            }) => void;

            QuoteWidget: new (config: {
                container_id: string;
                symbols: string;
                locale: string;
                price_line_color: string;
                grid_color: string;
                label_color: string;
                width?: string;
                height: string;
            }) => void;
        };
    }
}

const VietnamComp = ({
    isSingle = true,
    numberOfSubTab,
    type = 'dnse',
    containerClassName = 'w-1/2',
}: {
    isSingle?: boolean;
    numberOfSubTab?: number;
    type?: 'quote' | 'dnse' | 'market';
    containerClassName?: string;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        switch (type) {
            case 'dnse':
                if (containerRef.current) {
                    containerRef.current.innerHTML = `
                        <div id="dnse-market-index" class="dnse-market-index w-full">
                            <iframe 
                                src="https://widget.dnse.com.vn/index-widget?theme=${theme}&amp;indexes=VNINDEX%2CVN30%2CHNX30%2CHNX%2CUPCOM&amp;utm_source=dev.banggia-test.dnse.com.vn&amp;utm_medium=widget" 
                                width="100%" 
                                height="${calculateAdjustedHeight()}px">
                            </iframe>
                        </div>
                    `;
                }
                break;

            case 'market':
                const initMarketWidget = () => {
                    if (window.FireAnt?.MarketsWidget && containerRef.current) {
                        containerRef.current.innerHTML = '';
                        new window.FireAnt.MarketsWidget({
                            container_id: containerRef.current.id,
                            locale: 'vi',
                            price_line_color: '#71BDDF',
                            grid_color: '#999999',
                            label_color: '#999999',
                            width: `${calculateAdjustedHeight() + 250}px`,
                            height: `${isSingle ? processHeight(numberOfSubTab) - 347 : calculateAdjustedHeight() - 420}px`,
                        });
                    }
                };

                if (window.FireAnt) {
                    initMarketWidget();
                    return;
                }

                const marketScript = document.createElement('script');
                marketScript.src =
                    'https://www.fireant.vn/Scripts/web/widgets.js';
                marketScript.async = true;
                marketScript.onload = initMarketWidget;
                document.head.appendChild(marketScript);

                return () => {
                    if (document.head.contains(marketScript)) {
                        document.head.removeChild(marketScript);
                    }
                };

            case 'quote':
                const initQuoteWidget = () => {
                    if (window.FireAnt?.QuoteWidget && containerRef.current) {
                        containerRef.current.innerHTML = '';
                        new window.FireAnt.QuoteWidget({
                            container_id: containerRef.current.id,
                            locale: 'vi',
                            symbols: 'FPT',
                            price_line_color: '#71BDDF',
                            grid_color: '#999999',
                            label_color: '#999999',
                            // width: `${calculateAdjustedHeight() + 200}px`,
                            height: `${isSingle ? processHeight(numberOfSubTab) - 328 : calculateAdjustedHeight() + 120}px`,
                        });
                    }
                };

                if (window.FireAnt) {
                    initQuoteWidget();
                    return;
                }

                const quoteScript = document.createElement('script');
                quoteScript.src =
                    'https://www.fireant.vn/Scripts/web/widgets.js';
                quoteScript.async = true;
                quoteScript.onload = initQuoteWidget;
                document.head.appendChild(quoteScript);

                return () => {
                    if (document.head.contains(quoteScript)) {
                        document.head.removeChild(quoteScript);
                    }
                };
        }
    }, [type, isSingle, numberOfSubTab, theme]);

    const getWidgetId = useCallback(() => {
        switch (type) {
            case 'dnse':
                return 'dnse-market-index';
            case 'market':
                return 'fan-quote-995';
            case 'quote':
                return 'fan-quote-262';
        }
    }, [type, theme]);

    return (
        <div
            ref={containerRef}
            id={getWidgetId()}
            className={cn('h-fit', containerClassName)}
        />
    );
};

export default VietnamComp;
