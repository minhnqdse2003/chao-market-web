/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import React, { use, useMemo, useState } from 'react';
import NavSeparator from '@/components/nav-separator';
import AppDropdown, { DropdownOption } from '@/components/app-dropdown';
import ClientAccountFilterDialog from './components/filter-dialog';
import { ClientAccountBanner } from '@/components/app-banner';
import { AppTabs, TabItem } from '@/components/app-tabs';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { percentageFormat, priceFormat } from '@/utils/number-parsing';
import { AccountChartWithDialog } from '@/app/(user-layout)/performance-statistics/components/account-chart-with-dialog';
import { GuestPerformanceNoticeDialog } from '@/app/(user-layout)/performance-statistics/components/guest-performance-notice-dialog';
import { useI18n } from '@/context/i18n/context';
import { T } from '@/components/app-translate';
import { usePerformanceStatisticStore } from '@/stores/performance-statistic.store';
import { PERFORMANCE_STATISTIC_DIALOG_ACTIONS } from '@/stores/actions/performance-statistic.action';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    RANGES,
    useAccountChartData,
    useClientAccounts,
} from '@/hooks/react-query/client-account/use-get-client-account';
import AppTooltips from '@/components/app-tooltips';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { capitalizeWords } from '@/utils/string-parsing';
import { transformApiToChartData } from '@/utils/chart-transformer';

const tabsList: TabItem[] = [
    { title: 'All', value: 'all', renderContent: () => <></> },
    { title: '$0 - $1,000', value: '1000', renderContent: () => <></> },
    { title: '$1,000 - $3,000', value: '3000', renderContent: () => <></> },
    { title: '$3,000 - $5,000', value: '5000', renderContent: () => <></> },
    { title: '$5,000+', value: '5001', renderContent: () => <></> },
];

export default function Page({
    searchParams: params,
}: {
    searchParams: Promise<{
        name?: string;
        tab?: string;
        sortBy?: string;
        order?: string;
        startDate?: string;
    }>;
}) {
    const [activeAccountId, setActiveAccountId] = useState<string | null>(null);
    const [range, setRange] = useState<keyof typeof RANGES>('1Y');

    const { t } = useI18n();
    const searchParams = use(params);
    const router = useRouter();
    const { dispatch } = usePerformanceStatisticStore();

    // Get URL Params for Filtering/Sorting
    const name = searchParams.name;
    const tab = searchParams.tab || 'all';
    const sortBy = searchParams.sortBy || 'scrapedAt';
    const order = searchParams.order || 'desc';
    const startDate = searchParams.startDate;

    // Fetch Accounts Data & Chart Data
    const { data: accounts, isLoading } = useClientAccounts({
        name,
        tab,
        sortBy,
        order,
        startDate,
    });

    const { data: rawChartData, isLoading: isChartLoading } =
        useAccountChartData(activeAccountId, range);

    const handleCardClick = (id: string) => {
        setActiveAccountId(id);
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

    const updateFilters = (updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(updates).forEach(([key, value]) => {
            if (value) params.set(key, value);
            else params.delete(key);
        });
        router.push(`?${params.toString()}`);
    };

    const selectedAccount = accounts?.find(
        (a: any) => a.id === activeAccountId
    );

    const formattedChartData = useMemo(() => {
        return transformApiToChartData(rawChartData);
    }, [rawChartData]);

    if (isLoading) return null;

    return (
        <>
            <div className="w-full">
                <ClientAccountBanner />
                <AppTabs
                    tabsList={tabsList}
                    defaultValue={tab}
                    onValueChange={activeTab =>
                        updateFilters({ tab: activeTab })
                    }
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
                    {accounts?.map((account: any) => (
                        <Card
                            key={account.id}
                            onClick={() => handleCardClick(account.id)}
                            className={cn(
                                'h-fit dark:border-[var(--brand-grey)] dark:bg-[var(--brand-black-bg)] bg-[var(--brand-grey)] py-4 cursor-pointer transition-all' +
                                    ' hover:border-[var(--brand-color)]',
                                activeAccountId === account.id &&
                                    'dark:border-[var(--brand-color)] border-black'
                            )}
                        >
                            <CardHeader className="flex justify-between h-fit w-full mb-2 items-center">
                                <div className="flex items-center gap-2">
                                    <Avatar className="rounded-sm">
                                        <AvatarFallback>
                                            {account.name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <CardTitle className="text-sm">
                                        {account.name}
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between text-xs mb-1.5">
                                    <p>
                                        <T keyName={'common.startDate'} />:
                                    </p>
                                    <strong>
                                        {new Date(
                                            account.scrapedAt
                                        ).toLocaleDateString()}
                                    </strong>
                                </div>
                                <div className="flex justify-between text-xs mb-1.5 text-brand-green">
                                    <p>
                                        <T keyName={'common.deposit'} />:
                                    </p>
                                    <strong>
                                        {priceFormat(
                                            account.stats?.depositsTotal
                                        )}{' '}
                                        USD
                                    </strong>
                                </div>
                                <div className="flex justify-between text-xs text-brand-green mb-1.5">
                                    <p>
                                        <T keyName={'common.profit'} />:
                                    </p>
                                    <strong>
                                        {priceFormat(account.stats?.profit)} USD
                                    </strong>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* DETAIL DIALOG */}
                <Dialog
                    open={activeAccountId !== null}
                    onOpenChange={open => !open && setActiveAccountId(null)}
                >
                    <DialogContent
                        autoFocus={false}
                        className="max-w-[90svw] lg:max-w-xl max-h-[90svh] overflow-y-auto p-0 border-none bg-transparent"
                        onOpenAutoFocus={e => e.preventDefault()}
                    >
                        {selectedAccount && (
                            <Card className="w-full border-[var(--brand-grey)] dark:bg-[var(--brand-black-bg)] bg-[var(--brand-grey)] text-xs p-0 overflow-hidden shadow-2xl">
                                <CardHeader className="flex relative flex-row items-center justify-between p-6 pb-2">
                                    <div className="flex flex-col gap-2">
                                        <h2 className="font-semibold text-xl dark:text-[var(--brand-color)]">
                                            {selectedAccount.name}
                                        </h2>
                                        {/* Note: Verification link is static as it's not in the scraped schema yet */}
                                        <div className="text-xs font-semibold text-[var(--brand-grey-foreground)]">
                                            {t(
                                                'performanceNotice.mainSection.independentVerification'
                                            )}
                                        </div>
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
                                                {capitalizeWords('STOCKS')}
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
                                                {new Date(
                                                    selectedAccount.scrapedAt
                                                ).toLocaleDateString()}
                                            </strong>
                                        </div>
                                        <div className="flex justify-between text-brand-green">
                                            <p>
                                                <T keyName={'common.deposit'} />
                                                :
                                            </p>
                                            <strong>
                                                {priceFormat(
                                                    selectedAccount.stats
                                                        ?.depositsTotal
                                                )}{' '}
                                                USD
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
                                                {priceFormat(
                                                    selectedAccount.stats
                                                        ?.withdrawalsTotal
                                                )}{' '}
                                                USD
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
                                                +{selectedAccount.stats?.gain}%
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
                                                +
                                                {selectedAccount.stats?.absGain}
                                                %
                                            </strong>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-brand-text">
                                                <T keyName={'common.daily'} />:
                                            </p>
                                            <strong>
                                                {selectedAccount.stats?.daily}%
                                            </strong>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-brand-text">
                                                <T keyName={'common.monthly'} />
                                                :
                                            </p>
                                            <strong>
                                                {selectedAccount.stats?.monthly}
                                                %
                                            </strong>
                                        </div>
                                        <div className="flex justify-between text-brand-red">
                                            <p>
                                                <T
                                                    keyName={'common.drawdown'}
                                                />
                                                :
                                            </p>
                                            <strong>
                                                {percentageFormat(
                                                    selectedAccount.stats
                                                        ?.drawdown
                                                )}
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
                                            <strong>
                                                {priceFormat(
                                                    selectedAccount.stats
                                                        ?.balance
                                                )}{' '}
                                                USD
                                            </strong>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-brand-text">
                                                <T keyName={'common.equity'} />:
                                            </p>
                                            <strong>
                                                {priceFormat(
                                                    selectedAccount.stats
                                                        ?.equity
                                                )}{' '}
                                                USD
                                            </strong>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-brand-text">
                                                <T keyName={'common.highest'} />
                                                :
                                            </p>
                                            {/* Note: highest is stored in your stats table */}
                                            <strong>
                                                {priceFormat(
                                                    selectedAccount.stats
                                                        ?.balance
                                                )}{' '}
                                                USD
                                            </strong>
                                        </div>
                                        <div className="flex justify-between text-brand-green">
                                            <p>
                                                <T keyName={'common.profit'} />:
                                            </p>
                                            <strong className="font-bold">
                                                {priceFormat(
                                                    selectedAccount.stats
                                                        ?.profit
                                                )}{' '}
                                                USD
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
                                                {/* interest is used as financing cost */}
                                                -0.00 USD
                                            </strong>
                                        </div>
                                    </div>

                                    {/* SECTION 4: CHART */}
                                    <div className="pt-4 mt-2 border-t border-dashed">
                                        {isChartLoading ? (
                                            <div className="h-[200px] flex items-center justify-center text-[var(--brand-grey-foreground)]">
                                                <T keyName={'common.loading'} />
                                                ...
                                            </div>
                                        ) : (
                                            <div className={'block'}>
                                                <div className="flex gap-2 justify-end">
                                                    {(
                                                        Object.keys(
                                                            RANGES
                                                        ) as Array<
                                                            keyof typeof RANGES
                                                        >
                                                    ).map(key => (
                                                        <Button
                                                            key={key}
                                                            onClick={() =>
                                                                setRange(key)
                                                            }
                                                            variant={'ghost'}
                                                            className={cn(
                                                                'px-3 py-1 text-[10px] font-bold rounded-md transition-colors',
                                                                range === key
                                                                    ? 'bg-[var(--brand-color)] text-black' +
                                                                          ' dark:hover:bg-[var(--brand-color)]' +
                                                                          ' dark:hover:text-black'
                                                                    : ''
                                                            )}
                                                        >
                                                            {key}
                                                        </Button>
                                                    ))}
                                                </div>
                                                <AccountChartWithDialog
                                                    data={formattedChartData}
                                                    title={t(
                                                        'common.accountPerformance'
                                                    )}
                                                />
                                            </div>
                                        )}
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
