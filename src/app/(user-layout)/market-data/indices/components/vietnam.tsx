'use client';
import { useEffect, useRef } from 'react';
import { calculateAdjustedHeight, processHeight } from '@/utils/height-utils';

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
        };
    }
}

const VietnamComp = ({
    isSingle = true,
    numberOfSubTab,
    useDnse = true,
}: {
    isSingle?: boolean;
    numberOfSubTab?: number;
    useDnse?: boolean;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (useDnse) {
            // Embed DNSE widget HTML directly
            if (containerRef.current) {
                containerRef.current.innerHTML = `
                           <div id="dnse-market-index" className="dnse-market-index w-full">
                <iframe src="https://widget.dnse.com.vn/index-widget?theme=light&amp;indexes=VNINDEX%2CVN30%2CHNX30%2CHNX%2CUPCOM&amp;utm_source=dev.banggia-test.dnse.com.vn&amp;utm_medium=widget" width="100%" height="${calculateAdjustedHeight() + 250}px"></iframe>
            </div>
                `;
            }
        } else {
            // Initialize FireAnt widget
            const initWidget = () => {
                if (window.FireAnt?.MarketsWidget && containerRef.current) {
                    containerRef.current.innerHTML = '';
                    new window.FireAnt.MarketsWidget({
                        container_id: containerRef.current.id,
                        locale: 'vi',
                        price_line_color: '#71BDDF',
                        grid_color: '#999999',
                        label_color: '#999999',
                        width: `${calculateAdjustedHeight() + 250}px`,
                        height: `${isSingle ? processHeight(numberOfSubTab) - 328 : calculateAdjustedHeight() - 420}px`,
                    });
                }
            };

            if (window.FireAnt) {
                initWidget();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://www.fireant.vn/Scripts/web/widgets.js';
            script.async = true;
            script.onload = initWidget;

            document.head.appendChild(script);
        }
    }, [useDnse, isSingle, numberOfSubTab]);

    return (
        <div
            ref={containerRef}
            id={useDnse ? 'dnse-market-index' : 'fan-quote-995'}
            className="h-svh w-1/2"
        />
    );
};

export default VietnamComp;
