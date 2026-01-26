'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { EyeIcon, Info } from 'lucide-react';
import React, { use, useState } from 'react';
import NavSeparator from '@/components/nav-separator';
import AppDropdown, { DropdownOption } from '@/components/app-dropdown';
import ClientAccountFilterDialog from './components/filter-dialog';
import AppTooltips from '@/components/app-tooltips';
import { Button } from '@/components/ui/button';
import { ClientAccountBanner } from '@/components/app-banner';
import { AppTabs, TabItem } from '@/components/app-tabs';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
    formatToTwoDecimals,
    percentageFormat,
    priceFormat,
} from '@/utils/number-parsing';
import { capitalizeWords } from '@/utils/string-parsing';
import { seedData } from '@/app/(user-layout)/performance-statistics/components/account-chart';
import { AccountChartWithDialog } from '@/app/(user-layout)/performance-statistics/components/account-chart-with-dialog';
import { GuestPerformanceNoticeDialog } from '@/app/(user-layout)/performance-statistics/components/guest-performance-notice-dialog';
import { useI18n } from '@/context/i18n/context';
import Link from 'next/link';
import { T } from '@/components/app-translate';
import { usePerformanceStatisticStore } from '@/stores/performance-statistic.store';
import { PERFORMANCE_STATISTIC_DIALOG_ACTIONS } from '@/stores/actions/performance-statistic.action';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const dataList = [
    {
        avatar: {
            src: 'https://i.pravatar.cc/150?img=1',
            alt: 'user1',
            fallback: 'JD',
        },
        market: 'STOCKS',
        account: {
            name: 'John Doe',
            startDate: '01-01-2024',
            deposit: '5,000.00 USD',
            profit: '5.0',
            link: '#',
        },
        progress: 80,
        views: 150,
        isIndependentVerification: { value: true, link: '#' },
    },
    {
        avatar: {
            src: 'https://i.pravatar.cc/150?img=1',
            alt: 'user1',
            fallback: 'JD',
        },
        market: 'STOCKS',
        account: {
            name: 'John Doe',
            startDate: '01-01-2024',
            deposit: '5,000.00 USD',
            profit: '5.0',
            link: '#',
        },
        progress: 80,
        views: 150,
        isIndependentVerification: { value: false, link: '#' },
    },
    {
        avatar: {
            src: 'https://i.pravatar.cc/150?img=1',
            alt: 'user1',
            fallback: 'JD',
        },
        market: 'STOCKS',
        account: {
            name: 'John Doe',
            startDate: '01-01-2024',
            deposit: '5,000.00 USD',
            profit: '5.0',
            link: '#',
        },
        progress: 80,
        views: 150,
        isIndependentVerification: { value: true, link: '#' },
    },
    {
        avatar: {
            src: 'https://i.pravatar.cc/150?img=1',
            alt: 'user1',
            fallback: 'JD',
        },
        market: 'STOCKS',
        account: {
            name: 'John Doe',
            startDate: '01-01-2024',
            deposit: '5,000.00 USD',
            profit: '5.0',
            link: '#',
        },
        progress: 80,
        views: 150,
        isIndependentVerification: { value: false, link: '#' },
    },
    {
        avatar: {
            src: 'https://i.pravatar.cc/150?img=2',
            alt: 'user2',
            fallback: 'JS',
        },
        market: 'CRYPTOCURRENCIES',
        account: {
            name: 'Jane Smith',
            startDate: '15-03-2024',
            deposit: '7,500.00 USD',
            profit: '7.5',
            link: '#',
        },
        progress: 65,
        views: 200,
        isIndependentVerification: { value: false, link: '#' },
    },
    {
        avatar: {
            src: 'https://i.pravatar.cc/150?img=3',
            alt: 'user3',
            fallback: 'AJ',
        },
        market: 'CURRENCIES',
        account: {
            name: 'Alex Johnson',
            startDate: '10-06-2024',
            deposit: '3,000.00 USD',
            profit: '4.2',
            link: '#',
        },
        progress: 90,
        views: 300,
        isIndependentVerification: { value: false, link: '#' },
    },
    {
        avatar: {
            src: 'https://i.pravatar.cc/150?img=4',
            alt: 'user4',
            fallback: 'EB',
        },
        market: 'COMMODITIES',
        account: {
            name: 'Emma Brown',
            startDate: '20-08-2024',
            deposit: '4,200.00 USD',
            profit: '6.1',
            link: '#',
        },
        progress: 75,
        views: 250,
        isIndependentVerification: { value: false, link: '#' },
    },
    {
        avatar: {
            src: 'https://i.pravatar.cc/150?img=5',
            alt: 'user5',
            fallback: 'MC',
        },
        market: 'STOCKS',
        account: {
            name: 'Michael Chen',
            startDate: '05-10-2024',
            deposit: '6,800.00 USD',
            profit: '8.0',
            link: '#',
        },
        progress: 85,
        views: 400,
        isIndependentVerification: { value: false, link: '#' },
    },
    {
        avatar: {
            src: 'https://i.pravatar.cc/150?img=6',
            alt: 'user6',
            fallback: 'SL',
        },
        market: 'CRYPTOCURRENCIES',
        account: {
            name: 'Sarah Lee',
            startDate: '12-12-2024',
            deposit: '5,500.00 USD',
            profit: '5.8',
            link: '#',
        },
        progress: 70,
        views: 180,
        isIndependentVerification: { value: false, link: '#' },
    },
];

const tabsList: TabItem[] = [
    { title: 'All', value: 'all', renderContent: () => <></> },
    { title: '$0 - $1,000', value: '1000', renderContent: () => <></> },
    { title: '$1,000 - $3,000', value: '3000', renderContent: () => <></> },
    { title: '$3,000 - $5,000', value: '5000', renderContent: () => <></> },
    { title: '$5,000+', value: '5001', renderContent: () => <></> },
];

interface PageProps {
    searchParams: { tab?: string };
}

export default function Page({ searchParams }: PageProps) {
    const [activeCard, setActiveCard] = useState<number | null>(null);
    const { t } = useI18n();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { tab } = use(searchParams);
    const router = useRouter();
    const { dispatch } = usePerformanceStatisticStore();

    const handleCardClick = (index: number) => {
        setActiveCard(index);
    };

    const handleOnOpenPerformanceStatisticDialog = () => {
        dispatch({ type: PERFORMANCE_STATISTIC_DIALOG_ACTIONS.OPEN_DIALOG });
    };

    const SORT_BY_OPTIONS_NEWS_EVENT_TRANSLATED: DropdownOption[] = [
        {
            value: 'date_desc',
            label: t('common.dateSort.newestFirst'),
            group: t('common.dateSort.label'),
        },
        {
            value: 'date_asc',
            label: t('common.dateSort.oldestFirst'),
            group: t('common.dateSort.label'),
        },
        {
            value: 'name_desc',
            label: 'Z-A',
            group: t('common.name'),
        },
        {
            value: 'name_asc',
            label: 'A-Z',
            group: t('common.name'),
        },
    ];

    const selectedData = activeCard !== null ? dataList[activeCard] : null;
    const unwrappedSearchParams = { tab: tab || '' };

    return (
        <>
            <div className="w-full">
                <ClientAccountBanner />
                <AppTabs
                    tabsList={tabsList}
                    defaultValue={unwrappedSearchParams.tab || undefined}
                    onValueChange={activeTab => {
                        router.push(`/performance-statistics?tab=${activeTab}`);
                    }}
                />

                <div className="max-h-[4svh] mb-2 flex items-center justify-between w-full">
                    <ClientAccountFilterDialog
                        onApply={(value: unknown) => console.log(value)}
                    />
                    <button
                        className="text-brand-text lg:text-sm text-xs truncate font-bold dark:hover:text-[var(--brand-color)] cursor-pointer"
                        onClick={() => handleOnOpenPerformanceStatisticDialog()}
                    >
                        <T keyName={'performanceNotice.member.reminderText'} />
                    </button>
                    <AppDropdown
                        options={SORT_BY_OPTIONS_NEWS_EVENT_TRANSLATED}
                        defaultValue="date_desc"
                        buttonClassName="max-h-[20px] font-medium text-sm"
                        contentClassName="w-44"
                        onValueChange={value =>
                            console.log(`Selected: ${value}`)
                        }
                    />
                </div>

                {/* GRID VIEW */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
                    {dataList.map((data, index) => (
                        <Card
                            key={index}
                            onClick={() => handleCardClick(index)}
                            className={cn(
                                'h-fit dark:border-[var(--brand-grey)] py-4 cursor-pointer' +
                                    ' transition-all! dark:bg-[var(--brand-black-bg)] bg-[var(--brand-grey)]' +
                                    ' duration-300 ease-in-out hover:border-[var(--brand-color)]',
                                activeCard === index &&
                                    'dark:border-[var(--brand-color)] border-black'
                            )}
                        >
                            <CardHeader className="flex justify-between h-fit w-full mb-2 items-center">
                                <div className="flex items-center justify-center gap-2 w-fit">
                                    <Avatar className="rounded-sm">
                                        <AvatarImage
                                            src={data.avatar.src}
                                            alt={data.avatar.alt}
                                        />
                                        <AvatarFallback>
                                            {data.avatar.fallback}
                                        </AvatarFallback>
                                    </Avatar>
                                    <CardTitle className="text-sm">
                                        {capitalizeWords(data.account.name)}
                                    </CardTitle>
                                </div>
                                {data.isIndependentVerification.value && (
                                    <span className="text-[10px] font-semibold text-brand-text">
                                        {t(
                                            'performanceNotice.mainSection.independentVerification'
                                        )}
                                    </span>
                                )}
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between text-xs mb-1.5 [&>p]:text-[var(--brand-grey-foreground)]">
                                    <p>
                                        <T keyName={'common.startDate'} />:
                                    </p>
                                    <strong>{data.account.startDate}</strong>
                                </div>
                                <div className="flex justify-between text-xs mb-1.5 [&>p]:text-[var(--brand-grey-foreground)]">
                                    <p>
                                        <T keyName={'common.market'} />:
                                    </p>
                                    <strong className="rounded-sm border border-black dark:border-white px-2 py-0.5 font-semibold text-[10px]">
                                        {capitalizeWords(data.market)}
                                    </strong>
                                </div>
                                <div className="flex justify-between text-xs mb-1.5 text-brand-green">
                                    <p>
                                        <T keyName={'common.deposit'} />:
                                    </p>
                                    <strong className="font-semibold">
                                        {data.account.deposit}
                                    </strong>
                                </div>
                                <div className="flex justify-between text-xs text-brand-green mb-1.5">
                                    <p>
                                        <T keyName={'common.profit'} />:
                                    </p>
                                    <strong className="font-semibold">
                                        {formatToTwoDecimals(
                                            data.account.profit
                                        )}
                                        %/
                                        <T
                                            keyName={'common.month'}
                                            options="lowercase-full"
                                        />
                                    </strong>
                                </div>
                                <div className="text-[10px] font-semibold flex justify-between items-center mb-2 gap-2">
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: t('common.algoTrading'),
                                        }}
                                    />
                                    <Progress
                                        isValueVisible={true}
                                        value={data.progress}
                                        className="flex-1 min-h-[14px] bg-white [&>div]:bg-blue-500"
                                    />
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: t('common.manualTrading'),
                                        }}
                                    />
                                </div>
                                <div className="flex justify-center items-center text-xs gap-2 border-t pt-2">
                                    <EyeIcon size={14} />
                                    {data.views}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* DETAIL DIALOG */}
                <Dialog
                    open={activeCard !== null}
                    onOpenChange={open => !open && setActiveCard(null)}
                >
                    <DialogContent
                        autoFocus={false}
                        className="max-w-[90svw] lg:max-w-xl max-h-[90svh] overflow-y-auto p-0 border-none bg-transparent"
                        onOpenAutoFocus={e => e.preventDefault()}
                    >
                        {selectedData && (
                            <Card className="w-full border-[var(--brand-grey)] dark:bg-[var(--brand-black-bg)] bg-[var(--brand-grey)] text-xs p-0 overflow-hidden shadow-2xl">
                                <CardHeader className="flex relative flex-row items-center justify-between p-6 pb-2">
                                    <div className="flex flex-col gap-2">
                                        <h2 className="font-semibold text-xl dark:text-[var(--brand-color)]">
                                            {selectedData.account.name}
                                        </h2>
                                        {selectedData.isIndependentVerification
                                            .value && (
                                            <Link
                                                href={
                                                    selectedData
                                                        .isIndependentVerification
                                                        .link
                                                }
                                                className="text-xs font-semibold hover:underline text-[var(--brand-grey-foreground)] dark:hover:text-[var(--brand-color)]"
                                            >
                                                {t(
                                                    'performanceNotice.mainSection.independentVerification'
                                                )}
                                            </Link>
                                        )}
                                    </div>
                                </CardHeader>

                                <CardContent className="p-6 space-y-1">
                                    {/* SECTION 1: BASIC INFO */}
                                    <div className="flex flex-col space-y-1.5">
                                        <div className="flex justify-between items-center">
                                            <p className="text-brand-text">
                                                <T keyName={'common.market'} />:
                                            </p>
                                            <strong className="rounded-sm border border-black dark:border-white px-2 py-0.5 font-semibold text-[10px]">
                                                {capitalizeWords(
                                                    selectedData.market
                                                )}
                                            </strong>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-brand-text">
                                                <T
                                                    keyName={'common.startDate'}
                                                />
                                                :
                                            </p>
                                            <strong>
                                                {selectedData.account.startDate}
                                            </strong>
                                        </div>
                                        <div className="flex justify-between text-brand-green">
                                            <p>
                                                <T keyName={'common.deposit'} />
                                                :
                                            </p>
                                            <strong>
                                                {selectedData.account.deposit}
                                            </strong>
                                        </div>
                                        <div className="flex justify-between text-brand-red">
                                            <p>
                                                <T
                                                    keyName={'common.withdraw'}
                                                />
                                                :
                                            </p>
                                            <strong>
                                                {priceFormat(-2000)} $
                                            </strong>
                                        </div>
                                    </div>

                                    <NavSeparator
                                        isTrigger={false}
                                        className="my-2"
                                    />

                                    {/* SECTION 2: PERFORMANCE GAINS */}
                                    <div className="flex flex-col space-y-1.5">
                                        <div className="flex justify-between items-center">
                                            <div className="text-brand-green flex flex-row items-center">
                                                <T keyName={'common.gain'} />:
                                                <AppTooltips
                                                    contents={
                                                        <div className="max-w-[32.5rem] leading-5 flex flex-col gap-2">
                                                            <strong className="font-bold">
                                                                <T
                                                                    keyName={
                                                                        'common.gainTooltipTitle'
                                                                    }
                                                                />
                                                            </strong>
                                                            <p
                                                                className="font-thin text-wrap"
                                                                dangerouslySetInnerHTML={{
                                                                    __html:
                                                                        t(
                                                                            'common.gainTooltip'
                                                                        ) + '.',
                                                                }}
                                                            />
                                                        </div>
                                                    }
                                                    trigger={
                                                        <Button
                                                            variant="ghost"
                                                            className="h-6 w-6 p-0 ml-1 dark:hover:text-[var(--brand-color)]"
                                                        >
                                                            <Info className="size-3" />
                                                        </Button>
                                                    }
                                                />
                                            </div>
                                            <strong className="text-brand-green text-sm">
                                                +52.82%
                                            </strong>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="text-brand-green flex flex-row items-center">
                                                <T
                                                    keyName={
                                                        'common.absoluteGain'
                                                    }
                                                />
                                                :
                                                <AppTooltips
                                                    contents={
                                                        <div className="max-w-[32.5rem] leading-5 flex flex-col gap-2">
                                                            <strong className="font-bold">
                                                                <T
                                                                    keyName={
                                                                        'common.absoluteGainTitleTooltip'
                                                                    }
                                                                />
                                                            </strong>
                                                            <p
                                                                className="font-thin text-wrap"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: t(
                                                                        'common.absoluteGainTooltipContent'
                                                                    ),
                                                                }}
                                                            />
                                                        </div>
                                                    }
                                                    trigger={
                                                        <Button
                                                            variant="ghost"
                                                            className="h-6 w-6 p-0 ml-1 dark:hover:text-[var(--brand-color)]"
                                                        >
                                                            <Info className="size-3" />
                                                        </Button>
                                                    }
                                                />
                                            </div>
                                            <strong className="text-brand-green text-sm">
                                                +46.94%
                                            </strong>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-brand-text">
                                                <T keyName={'common.daily'} />:
                                            </p>
                                            <strong>0.14%</strong>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-brand-text">
                                                <T keyName={'common.monthly'} />
                                                :
                                            </p>
                                            <strong>4.18%</strong>
                                        </div>
                                        <div className="flex justify-between text-brand-red">
                                            <p>
                                                <T
                                                    keyName={'common.drawdown'}
                                                />
                                                :
                                            </p>
                                            <strong>
                                                {percentageFormat(-62.95)}
                                            </strong>
                                        </div>
                                    </div>

                                    <NavSeparator
                                        isTrigger={false}
                                        className="my-2"
                                    />

                                    {/* SECTION 3: BALANCE & EQUITY */}
                                    <div className="flex flex-col space-y-1.5">
                                        <div className="flex justify-between">
                                            <p className="text-brand-text">
                                                <T keyName={'common.balance'} />
                                                :
                                            </p>
                                            <strong>156,176.88 USD</strong>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-brand-text">
                                                <T keyName={'common.equity'} />:
                                            </p>
                                            <strong>
                                                140,810.40 USD (90.16%)
                                            </strong>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-brand-text">
                                                <T keyName={'common.highest'} />
                                                :
                                            </p>
                                            <strong>
                                                156,176.88 USD (Apr 16, 2025)
                                            </strong>
                                        </div>
                                        <div className="flex justify-between text-brand-green">
                                            <p>
                                                <T keyName={'common.profit'} />:
                                            </p>
                                            <strong className="font-bold">
                                                54,245.75 USD
                                            </strong>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="text-brand-red flex items-center">
                                                <span>
                                                    <T
                                                        keyName={
                                                            'common.financingCost'
                                                        }
                                                    />
                                                    :
                                                </span>
                                                <AppTooltips
                                                    contents={
                                                        <div className="max-w-[18rem] leading-5 flex flex-col gap-2">
                                                            <strong className="font-bold">
                                                                <T
                                                                    keyName={
                                                                        'common.financingCost'
                                                                    }
                                                                />
                                                            </strong>
                                                            <p
                                                                className="font-thin text-wrap"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: t(
                                                                        'common.financingCostTooltip'
                                                                    ),
                                                                }}
                                                            />
                                                        </div>
                                                    }
                                                    trigger={
                                                        <Button
                                                            variant="ghost"
                                                            className="h-6 w-6 p-0 ml-1 dark:hover:text-[var(--brand-color)]"
                                                        >
                                                            <Info className="size-3" />
                                                        </Button>
                                                    }
                                                />
                                            </div>
                                            <strong className="text-brand-red">
                                                -347.25 USD
                                            </strong>
                                        </div>
                                    </div>

                                    {/* SECTION 4: CHART */}
                                    <div className="pt-4 mt-2 border-t border-dashed">
                                        <AccountChartWithDialog
                                            data={seedData}
                                            title="Account Performance"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
            <GuestPerformanceNoticeDialog />
        </>
    );
}
