'use client';
import TabNavigation from '@/app/(user-layout)/market-data/components/tab-navigation';
import React, { useEffect, useState } from 'react';
import CalendarComp from '@/app/(user-layout)/market-data/economic-calendar/components/CalendarComp';
import { cn } from '@/lib/utils';
import { calculateAdjustedHeight } from '@/utils/height-utils';
import { useI18n } from '@/context/i18n/context';

export default function Page() {
    const [height, setHeight] = useState(600);
    const { locale } = useI18n();

    useEffect(() => {
        setHeight(calculateAdjustedHeight());
    }, []);

    return (
        <div className={'w-full flex flex-col gap-4'}>
            <TabNavigation
                searchParams={{}}
                currentHref={'/market-data/economic-calendar'}
            />
            <div className={'flex flex-col md:flex-row justify-between gap-4'}>
                <CalendarComp />
                <div className="flex w-full rounded-md overflow-hidden items-center">
                    {locale === 'vi' ? (
                        <iframe
                            src="https://sslecal2.investing.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&features=datepicker,timezone&countries=33,14,4,34,38,32,6,11,51,5,39,72,60,110,43,35,71,22,36,26,12,9,37,25,178,10,17&calType=day&timeZone=27&lang=52"
                            height={height + 120}
                            className={cn(
                                'w-full border-0',
                                `h-[${height + 120}px]`
                            )}
                            title="Economic Calendar"
                        />
                    ) : (
                        <iframe
                            src="https://sslecal2.investing.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&features=datepicker,timezone&countries=33,14,4,34,38,32,6,11,51,5,39,72,60,110,43,35,71,22,36,26,12,9,37,25,178,10,17&calType=day&timeZone=27&lang=1"
                            height={height + 120}
                            className={cn(
                                'w-full border-0',
                                `h-[${height + 120}px]`
                            )}
                            title="Economic Calendar"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
