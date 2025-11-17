'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { EyeIcon, Info, XIcon } from 'lucide-react';
import React, { use, useState } from 'react';
import NavSeparator from '@/components/nav-separator';
import AppDropdown, { DropdownOption } from '@/components/app-dropdown';
import ClientAccountFilterDialog from './components/filter-dialog';
import AppTooltips from '@/components/app-tooltips';
import { Button } from '@/components/ui/button';
import { ClientAccountBanner } from '@/components/app-banner';
import { AppTabs, TabItem } from '@/components/app-tabs';
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

// Mock data generation
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
            profit: '5.0% monthly',
            link: '#',
        },
        progress: 80,
        views: 150,
        isIndependentVerification: {
            value: true,
            link: '#',
        },
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
            profit: '5.0% monthly',
            link: '#',
        },
        progress: 80,
        views: 150,
        isIndependentVerification: {
            value: false,
            link: '#',
        },
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
            profit: '5.0% monthly',
            link: '#',
        },
        progress: 80,
        views: 150,
        isIndependentVerification: {
            value: true,
            link: '#',
        },
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
            profit: '5.0% monthly',
            link: '#',
        },
        progress: 80,
        views: 150,
        isIndependentVerification: {
            value: false,
            link: '#',
        },
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
            profit: '7.5% monthly',
            link: '#',
        },
        progress: 65,
        views: 200,
        isIndependentVerification: {
            value: false,
            link: '#',
        },
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
            profit: '4.2% monthly',
            link: '#',
        },
        progress: 90,
        views: 300,
        isIndependentVerification: {
            value: false,
            link: '#',
        },
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
            profit: '6.1% monthly',
            link: '#',
        },
        progress: 75,
        views: 250,
        isIndependentVerification: {
            value: false,
            link: '#',
        },
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
            profit: '8.0% monthly',
            link: '#',
        },
        progress: 85,
        views: 400,
        isIndependentVerification: {
            value: false,
            link: '#',
        },
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
            profit: '5.8% monthly',
            link: '#',
        },
        progress: 70,
        views: 180,
        isIndependentVerification: {
            value: false,
            link: '#',
        },
    },
];

const tabsList: TabItem[] = [
    {
        title: 'All',
        value: 'all',
        renderContent: () => <></>,
    },
    {
        title: '$0 - $1,000',
        value: '1000',
        renderContent: () => <></>,
    },
    {
        title: '$1,000 - $3,000',
        value: '3000',
        renderContent: () => <></>,
    },
    {
        title: '$3,000 - $5,000',
        value: '5000',
        renderContent: () => <></>,
    },
    {
        title: '$5,000+',
        value: '5001',
        renderContent: () => <></>,
    },
];

interface PageProps {
    searchParams: {
        tab?: string;
    };
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
        setActiveCard(activeCard === index ? null : index);
    };

    const handleOnOpenPerformanceStatisticDialog = () => {
        dispatch({
            type: PERFORMANCE_STATISTIC_DIALOG_ACTIONS.OPEN_DIALOG,
        });
    };

    const SORT_BY_OPTIONS_NEWS_EVENT_TRANSLATED: DropdownOption[] = [
        {
            value: 'featured',
            label: t('common.sortBy.featured'),
            group: t('common.default'),
        },
        {
            value: 'desc',
            label: t('common.dateSort.newestFirst'),
            group: t('common.dateSort.label'),
        },
        {
            value: 'asc',
            label: t('common.dateSort.oldestFirst'),
            group: t('common.dateSort.label'),
        },
        {
            value: 'all',
            label: t('common.marketType.all'),
            group: t('common.market'),
        },
        {
            value: 'stocks',
            label: t('common.marketType.stocks'),
            group: t('common.market'),
        },
        {
            value: 'cryptocurrencies',
            label: t('common.marketType.cryptocurrencies'),
            group: t('common.market'),
        },
        {
            value: 'currencies',
            label: t('common.marketType.currencies'),
            group: t('common.market'),
        },
        {
            value: 'commodities',
            label: t('common.marketType.commodities'),
            group: t('common.market'),
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
                        className={
                            'text-brand-text font-bold dark:hover:text-[var(--brand-color)] cursor-pointer'
                        }
                        onClick={() => handleOnOpenPerformanceStatisticDialog()}
                    >
                        <T keyName={'performanceNotice.member.reminderText'} />
                    </button>
                    <AppDropdown
                        options={SORT_BY_OPTIONS_NEWS_EVENT_TRANSLATED}
                        defaultValue="featured"
                        buttonClassName="max-h-[20px] font-medium text-sm"
                        contentClassName="w-44"
                        onValueChange={value =>
                            console.log(`Selected: ${value}`)
                        }
                    />
                </div>

                <div className="w-full flex flex-row max-h-[80svh] overflow-hidden">
                    <div className="flex flex-wrap w-full items-center gap-[1rem] min-w-2/3 max-w-full max-h-[80svh] overflow-y-auto">
                        {dataList.map((data, index) => (
                            <Card
                                key={index}
                                onClick={() => handleCardClick(index)}
                                className={`h-fit dark:border-[var(--brand-grey)] border-black/10 py-4 cursor-pointer transition-all! gap-0 max-h-1/3 dark:bg-[var(--brand-black-bg)] bg-[var(--brand-grey)] duration-300 ease-in-out ${activeCard === index ? 'dark:border-[var(--brand-color)] border-black   ' : ''} ${activeCard !== null ? 'w-[calc(50%-1rem)]' : 'w-[calc(33.33%-1rem)]'}`}
                            >
                                <CardHeader
                                    className={
                                        'flex justify-between h-fit w-full mb-2 items-center'
                                    }
                                >
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
                                        <CardTitle>
                                            {capitalizeWords(data.account.name)}
                                        </CardTitle>
                                    </div>
                                    {data.isIndependentVerification.value && (
                                        <Link
                                            href={
                                                data.isIndependentVerification
                                                    .link
                                            }
                                            className={
                                                'text-xs font-semibold hover:underline text-brand-text' +
                                                ' dark:hover:text-[var(--brand-color)]'
                                            }
                                        >
                                            {t(
                                                'performanceNotice.mainSection.independentVerification'
                                            )}
                                        </Link>
                                    )}
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between text-xs mb-1.5 [&>p]:text-[var(--brand-grey-foreground)]">
                                        <p>
                                            <T keyName={'common.startDate'} />:
                                        </p>
                                        <strong>
                                            {data.account.startDate}
                                        </strong>
                                    </div>

                                    <div className="flex justify-between text-xs mb-1.5 [&>p]:text-[var(--brand-grey-foreground)]">
                                        <p>
                                            <T keyName={'common.market'} />:
                                        </p>
                                        <strong
                                            className={
                                                'rounded-sm dark:text-black text-black' +
                                                ' text-xs border dark:border-white dark:text-white' +
                                                ' bg-transparent border-black text-black' +
                                                ' px-2 py-1' +
                                                ' py-1' +
                                                ' font-semibold'
                                            }
                                        >
                                            {capitalizeWords(data.market)}
                                        </strong>
                                    </div>

                                    <div className="flex justify-between text-xs mb-1.5 text-brand-green">
                                        <p>
                                            <T keyName={'common.deposit'} />:
                                        </p>
                                        <strong className={'font-semibold'}>
                                            {data.account.deposit}
                                        </strong>
                                    </div>
                                    <div className="flex justify-between text-xs text-brand-green mb-1.5">
                                        <p>
                                            <T keyName={'common.profit'} />:
                                        </p>
                                        <strong className={'font-semibold'}>
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
                                    <div className="text-xs font-semibold flex justify-between mb-2">
                                        <p>
                                            <T keyName={'common.algoTrading'} />
                                        </p>
                                        <Progress
                                            isValueVisible={true}
                                            value={data.progress}
                                            className="w-1/2 min-h-[18px] bg-white [&>div]:bg-blue-500"
                                        />
                                        <p className="text-end">
                                            <T
                                                keyName={'common.manualTrading'}
                                            />
                                        </p>
                                    </div>
                                    <div className="flex justify-center items-center text-xs gap-2">
                                        <EyeIcon size={16} />
                                        {data.views}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div
                        data-state={activeCard !== null ? 'active' : 'inactive'}
                        className={
                            'overflow-y-auto w-full px-4 [&[data-state=inactive]]:w-0 [&[data-state=inactive]]:opacity-0 [&[data-state=active]]:opacity-100'
                        }
                    >
                        <Card
                            className={`w-full min-h-full border-[var(--brand-grey)]dark:bg-[var(--brand-black-bg)] bg-[var(--brand-grey)] text-xs p-0 transition-all! duration-300 ease-in-out`}
                        >
                            <CardHeader className="flex relative flex-row items-center justify-between p-4">
                                <div className="flex flex-col gap-2">
                                    <h2 className="font-semibold text-lg">
                                        {selectedData?.account.name}
                                    </h2>
                                    {selectedData?.isIndependentVerification
                                        .value && (
                                        <Link
                                            href={
                                                selectedData
                                                    .isIndependentVerification
                                                    .link
                                            }
                                            className={
                                                'text-xs font-semibold hover:underline text-[var(--brand-grey-foreground)]' +
                                                ' dark:hover:text-[var(--brand-color)]'
                                            }
                                        >
                                            {t(
                                                'performanceNotice.mainSection.independentVerification'
                                            )}
                                        </Link>
                                    )}
                                </div>
                                <XIcon
                                    onClick={() => setActiveCard(null)}
                                    className="cursor-pointer absolute top-3 right-3 size-4 text-[var(--brand-grey-foreground)] hover:text-brand-text"
                                />
                            </CardHeader>
                            <CardContent className="p-4 space-y-0.5">
                                <div className="flex flex-col space-y-1">
                                    {/* Market Row - Already using t() for Market type label, but the left label needs translating */}
                                    <div className="flex justify-between">
                                        <p className="text-brand-text">
                                            <T keyName={'common.market'} />:{' '}
                                            {/* Assuming common.market is used for "Market" label in details */}
                                        </p>
                                        <strong
                                            className={
                                                'rounded-sm dark:text-black text-black' +
                                                ' text-xs border dark:border-white dark:text-white' +
                                                ' bg-transparent border-black text-black' +
                                                ' px-1.5' +
                                                ' py-1' +
                                                ' font-semibold'
                                            }
                                        >
                                            {capitalizeWords(
                                                selectedData?.market || ''
                                            )}
                                        </strong>
                                    </div>

                                    <div className="flex justify-between">
                                        <p className="text-brand-text">
                                            <T keyName={'common.startDate'} />
                                            :{' '}
                                        </p>
                                        <strong>
                                            {selectedData?.account.startDate}
                                        </strong>
                                    </div>

                                    <div className="flex justify-between text-brand-green">
                                        <p>
                                            <T keyName={'common.deposit'} />
                                            :{' '}
                                        </p>
                                        <strong>
                                            {selectedData?.account.deposit}
                                        </strong>
                                    </div>

                                    <div className="flex justify-between text-brand-red">
                                        <p>
                                            <T keyName={'common.withdraw'} />
                                            :{' '}
                                        </p>
                                        <strong>{priceFormat(-2000)} $</strong>
                                    </div>
                                </div>
                                <NavSeparator isTrigger={false} />

                                <div className="flex flex-col space-y-1">
                                    <div className="flex justify-between items-center">
                                        <p className="text-brand-green flex flex-row items-center">
                                            <T keyName={'common.gain'} />:{' '}
                                            <AppTooltips
                                                contents={
                                                    <div className="max-w-[32.5rem] leading-5 flex flex-col gap-2">
                                                        <strong className="font-bold">
                                                            <T
                                                                keyName={
                                                                    'common.gain'
                                                                }
                                                            />{' '}
                                                        </strong>
                                                        <p className="font-thin">
                                                            <T
                                                                keyName={
                                                                    'common.gainTooltip'
                                                                }
                                                            />
                                                            .
                                                        </p>
                                                    </div>
                                                }
                                                trigger={
                                                    <Button
                                                        variant="ghost"
                                                        className={
                                                            'dark:hover:bg-transparent dark:hover:text-[var(--brand-color)]'
                                                        }
                                                    >
                                                        <Info className="size-3" />
                                                    </Button>
                                                }
                                            />
                                        </p>
                                        <strong className="text-brand-green">
                                            +52.82%
                                        </strong>
                                    </div>

                                    <div className="flex justify-between">
                                        <p className="text-brand-green">
                                            <T
                                                keyName={'common.absoluteGain'}
                                            />
                                            :
                                        </p>
                                        <strong className="text-brand-green">
                                            +46.94%
                                        </strong>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-brand-text">
                                            <T keyName={'common.daily'} />:{' '}
                                        </p>
                                        <strong>0.14%</strong>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-brand-text">
                                            <T keyName={'common.monthly'} />
                                            :{' '}
                                        </p>
                                        <strong>4.18%</strong>
                                    </div>
                                    <div className="flex justify-between text-brand-red">
                                        <p className="text-brand-red">
                                            <T keyName={'common.drawdown'} />
                                            :{' '}
                                        </p>
                                        <strong>
                                            {percentageFormat(-62.95)}
                                        </strong>
                                    </div>
                                </div>
                                <NavSeparator isTrigger={false} />

                                <div className="flex flex-col space-y-1">
                                    <div className="flex justify-between">
                                        <p className="text-brand-text">
                                            <T keyName={'common.balance'} />
                                            :{' '}
                                        </p>
                                        <strong>156,176.88 USD</strong>
                                    </div>

                                    <div className="flex justify-between">
                                        <p className="text-brand-text">
                                            <T keyName={'common.equity'} />
                                            :{' '}
                                        </p>
                                        <strong>140,810.40 USD (90.16%)</strong>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-brand-text">
                                            <T keyName={'common.highest'} />
                                            :{' '}
                                        </p>
                                        <strong>
                                            156,176.88 USD (Apr 16, 2025)
                                        </strong>
                                    </div>

                                    <div className="flex justify-between">
                                        <p className="text-brand-green">
                                            <T keyName={'common.profit'} />
                                            :{' '}
                                        </p>
                                        <strong className="text-brand-green">
                                            54,245.75 USD
                                        </strong>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-brand-red flex items-center">
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
                                                            />{' '}
                                                        </strong>
                                                        <p className="font-thin">
                                                            <T
                                                                keyName={
                                                                    'common.financingCostTooltip'
                                                                }
                                                            />
                                                        </p>
                                                    </div>
                                                }
                                                trigger={
                                                    <Button
                                                        variant="ghost"
                                                        className={
                                                            'dark:hover:bg-transparent dark:hover:text-[var(--brand-color)]'
                                                        }
                                                    >
                                                        <Info className="size-3" />
                                                    </Button>
                                                }
                                            />
                                        </p>
                                        <strong className="text-brand-red">
                                            -347.25 USD
                                        </strong>
                                    </div>
                                </div>
                                <AccountChartWithDialog
                                    data={seedData}
                                    title="Account Performance"
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <GuestPerformanceNoticeDialog />
        </>
    );
}
