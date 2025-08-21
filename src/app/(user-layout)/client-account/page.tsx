'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { CircleX, EyeIcon, Info } from 'lucide-react';
import React, { useState } from 'react';
import NavSeparator from '@/components/nav-separator';
import AppDropdown from '@/components/app-dropdown';
import ClientAccountFilterDialog from './components/filter-dialog';
import { SORT_BY_OPTIONS } from './utils/filter-options';
import AppTooltips from '@/components/app-tooltips';
import { Button } from '@/components/ui/button';
import { ClientAccountBanner } from '@/components/app-banner';
import { AppTabs, TabItem } from '@/components/app-tabs';

// Mock data generation
const dataList = [
    {
        avatar: {
            src: 'https://i.pravatar.cc/150?img=1',
            alt: 'user1',
            fallback: 'JD',
        },
        market: 'STOCK',
        account: {
            name: 'John Doe',
            startDate: '01-01-2024',
            deposit: '5,000.00 USD',
            profit: '5.0% monthly',
        },
        progress: 80,
        views: 150,
    },
    {
        avatar: {
            src: 'https://i.pravatar.cc/150?img=1',
            alt: 'user1',
            fallback: 'JD',
        },
        market: 'STOCK',
        account: {
            name: 'John Doe',
            startDate: '01-01-2024',
            deposit: '5,000.00 USD',
            profit: '5.0% monthly',
        },
        progress: 80,
        views: 150,
    },
    {
        avatar: {
            src: 'https://i.pravatar.cc/150?img=1',
            alt: 'user1',
            fallback: 'JD',
        },
        market: 'STOCK',
        account: {
            name: 'John Doe',
            startDate: '01-01-2024',
            deposit: '5,000.00 USD',
            profit: '5.0% monthly',
        },
        progress: 80,
        views: 150,
    },
    {
        avatar: {
            src: 'https://i.pravatar.cc/150?img=1',
            alt: 'user1',
            fallback: 'JD',
        },
        market: 'STOCK',
        account: {
            name: 'John Doe',
            startDate: '01-01-2024',
            deposit: '5,000.00 USD',
            profit: '5.0% monthly',
        },
        progress: 80,
        views: 150,
    },
    {
        avatar: {
            src: 'https://i.pravatar.cc/150?img=2',
            alt: 'user2',
            fallback: 'JS',
        },
        market: 'CRYPTO',
        account: {
            name: 'Jane Smith',
            startDate: '15-03-2024',
            deposit: '7,500.00 USD',
            profit: '7.5% monthly',
        },
        progress: 65,
        views: 200,
    },
    {
        avatar: {
            src: 'https://i.pravatar.cc/150?img=3',
            alt: 'user3',
            fallback: 'AJ',
        },
        market: 'FOREX',
        account: {
            name: 'Alex Johnson',
            startDate: '10-06-2024',
            deposit: '3,000.00 USD',
            profit: '4.2% monthly',
        },
        progress: 90,
        views: 300,
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
        },
        progress: 75,
        views: 250,
    },
    {
        avatar: {
            src: 'https://i.pravatar.cc/150?img=5',
            alt: 'user5',
            fallback: 'MC',
        },
        market: 'STOCK',
        account: {
            name: 'Michael Chen',
            startDate: '05-10-2024',
            deposit: '6,800.00 USD',
            profit: '8.0% monthly',
        },
        progress: 85,
        views: 400,
    },
    {
        avatar: {
            src: 'https://i.pravatar.cc/150?img=6',
            alt: 'user6',
            fallback: 'SL',
        },
        market: 'CRYPTO',
        account: {
            name: 'Sarah Lee',
            startDate: '12-12-2024',
            deposit: '5,500.00 USD',
            profit: '5.8% monthly',
        },
        progress: 70,
        views: 180,
    },
];

const tabsList: TabItem[] = [
    {
        title: 'All',
        value: 'all',
        renderContent: () => <></>,
    },
    {
        title: '$0-$1,000',
        value: '1000',
        renderContent: () => <></>,
    },
    {
        title: '$1,000-$3,000',
        value: '3000',
        renderContent: () => <></>,
    },
    {
        title: '$3,000-$5,000',
        value: '5000',
        renderContent: () => <></>,
    },
    {
        title: '$5,000+',
        value: '5001',
        renderContent: () => <></>,
    },
];

export default function Page() {
    const [activeCard, setActiveCard] = useState<number | null>(null);

    const handleCardClick = (index: number) => {
        setActiveCard(activeCard === index ? null : index);
    };

    const selectedData = activeCard !== null ? dataList[activeCard] : null;

    return (
        <div className="w-full">
            <ClientAccountBanner />
            <AppTabs tabsList={tabsList} />

            <div className="max-h-[4svh] mb-2 flex items-center justify-between w-full">
                <ClientAccountFilterDialog
                    onApply={(value: unknown) => console.log(value)}
                />
                <AppDropdown
                    options={SORT_BY_OPTIONS}
                    defaultValue="featured"
                    buttonClassName="max-h-[20px] font-medium text-sm"
                    contentClassName="w-44"
                    onValueChange={value => console.log(`Selected: ${value}`)}
                />
            </div>

            <div className="w-full flex flex-row max-h-[80svh] overflow-hidden">
                <div className="flex flex-wrap w-full items-center gap-[1rem] min-w-2/3 max-w-full max-h-[80svh] overflow-y-auto">
                    {dataList.map((data, index) => (
                        <Card
                            key={index}
                            onClick={() => handleCardClick(index)}
                            className={`h-fit py-4 cursor-pointer transition-all! gap-0 max-h-1/3 bg-[var(--brand-black-bg)] duration-300 ease-in-out ${activeCard === index ? 'border-[var(--brand-color)]' : ''} ${activeCard !== null ? 'w-[calc(50%-1rem)]' : 'w-[calc(33.33%-1rem)]'}`}
                        >
                            <CardHeader>
                                <div className="flex items-center justify-center gap-2 w-full">
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
                                        Market:{' '}
                                        <span className="text-[var(--brand-color)] uppercase">
                                            {data.market}
                                        </span>
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between text-xs mb-1.5">
                                    <p>Account</p>
                                    <strong>{data.account.name}</strong>
                                </div>
                                <div className="flex justify-between text-xs mb-1.5">
                                    <p>Start date</p>
                                    <strong>{data.account.startDate}</strong>
                                </div>
                                <div className="flex justify-between text-xs mb-1.5">
                                    <p>Deposit</p>
                                    <strong>{data.account.deposit}</strong>
                                </div>
                                <div className="flex justify-between text-xs text-green-500 mb-1.5">
                                    <p>Profit</p>
                                    <strong>{data.account.profit}</strong>
                                </div>
                                <div className="text-xs font-semibold flex justify-between mb-2">
                                    <p className="italic">Algo Trading</p>
                                    <Progress
                                        isValueVisible={true}
                                        value={data.progress}
                                        className="w-1/2 min-h-[18px] bg-white [&>div]:bg-blue-500"
                                    />
                                    <p className="italic">Manual Trading</p>
                                </div>
                                <div className="flex justify-center items-center text-xs gap-2">
                                    <EyeIcon size={16} />
                                    {data.views}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <Card
                    className={`w-full ml-4 h-full bg-[var(--brand-black-bg)] text-xs p-0 transition-all! duration-300 ease-in-out [&[data-state=inactive]]:w-0 [&[data-state=inactive]]:opacity-0 [&[data-state=active]]:opacity-100`}
                    data-state={activeCard !== null ? 'active' : 'inactive'}
                >
                    <CardHeader className="flex flex-row items-center justify-between p-4">
                        <div className="flex flex-row items-center gap-2">
                            <h2 className="font-semibold text-lg">
                                {selectedData?.account.name}
                            </h2>
                            <span className="border-[var(--brand-color)] border text-[var(--brand-color)] font-semibold px-3 py-1 rounded-lg">
                                {selectedData?.market}
                            </span>
                        </div>
                        <CircleX
                            size={24}
                            onClick={() => setActiveCard(null)}
                            className="cursor-pointer hover:text-[var(--brand-color)]"
                        />
                    </CardHeader>
                    <CardContent className="p-4 space-y-0.5">
                        <div className="flex flex-col">
                            <div className="flex justify-between">
                                <p className="text-gray-400">Start date</p>
                                <p className="font-medium">
                                    {selectedData?.account.startDate}
                                </p>
                            </div>
                            <div className="flex justify-between text-green-500">
                                <p>Deposit</p>
                                <p className="font-medium">
                                    {selectedData?.account.deposit}
                                </p>
                            </div>
                            <div className="flex justify-between text-red-500">
                                <p>Withdraw</p>
                                <p className="font-medium">5% monthly</p>
                            </div>
                        </div>
                        <NavSeparator isTrigger={false} />
                        <div className="flex flex-col">
                            <div className="flex justify-between">
                                <p className="text-gray-400 flex flex-row items-center">
                                    Gain
                                    <AppTooltips
                                        contents={
                                            <div className="max-w-[24rem] flex flex-col gap-2">
                                                <strong>Gain</strong>
                                                <p>
                                                    Time-Weighted Return TWR
                                                    performance dollar invested
                                                    system inception measurement
                                                    required Global Investment
                                                    Performance Standards CFA
                                                    Institute cash inflows
                                                    outflows amounts periods
                                                    impact return efficiency
                                                    yield profit growth rate
                                                    analysis evaluation metric
                                                    standard benchmark finance
                                                    investment portfolio rate
                                                    return calculation
                                                    assessment monitoring
                                                    progress achievement success
                                                    result outcome effectiveness
                                                    productivity gain loss
                                                    comparison study review
                                                    appraisal valuation
                                                </p>
                                            </div>
                                        }
                                        trigger={
                                            <Button variant="ghost">
                                                <Info className="size-3" />
                                            </Button>
                                        }
                                    />
                                </p>
                                <p className="font-medium text-green-500">
                                    +52.82%
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-400">Abs. Gain</p>
                                <p className="font-medium text-green-500">
                                    +46.94%
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-400">Daily</p>
                                <p className="font-medium">0.14%</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-400">Monthly</p>
                                <p className="font-medium">4.18%</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-400">Drawdown</p>
                                <p className="font-medium">62.95%</p>
                            </div>
                        </div>
                        <NavSeparator isTrigger={false} />
                        <div className="flex flex-col">
                            <div className="flex justify-between">
                                <p className="text-gray-400">Balance</p>
                                <p className="font-medium">156,176.88 USD</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-400">Equity</p>
                                <p className="font-medium">
                                    (140,810.40 USD (90.16%))
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-400">Highest</p>
                                <p className="font-medium">
                                    156,176.88 USD (Apr 16, 2025)
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-400">Profit</p>
                                <p className="font-medium text-green-500">
                                    54,245.75 USD
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-400">Interest</p>
                                <p className="font-medium text-red-500">
                                    -347.25 USD
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
