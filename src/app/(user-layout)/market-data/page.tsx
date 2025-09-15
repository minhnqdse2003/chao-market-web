'use client';

import React from 'react';
import {
    columns,
    ExchangeRate,
    exchangeRateColumns,
    goldPriceColumns,
    GoldPriceData,
    HomeNewFlow,
    interestRateColumns,
    InterestRateData,
} from './columns';
import { DataTable } from '@/components/data-table';
import { getTabData } from './data-utils';
import { AppTabs } from '@/components/app-tabs';
import { GeneralBanner } from '@/components/app-banner';
import { AppDatePicker } from '@/components/app-date-picker';

const Page = () => {
    const tabsList = [
        {
            title: 'News Flow',
            value: 'newsFlow',
            renderContent: async () => {
                const data = (await getTabData('newsFlow')) as HomeNewFlow[];
                return <DataTable columns={columns} data={data} />;
            },
        },
        {
            title: 'Exchange Rate',
            value: 'exchangeRate',
            renderContent: async () => {
                const data = (await getTabData(
                    'exchangeRate'
                )) as ExchangeRate[];
                const onDateChange = (date: Date | undefined) => {
                    console.log(date);
                };
                return (
                    <div>
                        <AppDatePicker onDateChange={onDateChange} />
                        <DataTable columns={exchangeRateColumns} data={data} />
                    </div>
                );
            },
        },
        {
            title: 'Interest Rate',
            value: 'interestRate',
            renderContent: async () => {
                const data = (await getTabData(
                    'interestRate'
                )) as InterestRateData[];
                const onDateChange = (date: Date | undefined) => {
                    console.log(date);
                };
                return (
                    <div>
                        <AppDatePicker onDateChange={onDateChange} />
                        <DataTable columns={interestRateColumns} data={data} />
                    </div>
                );
            },
        },
        {
            title: 'Gold Price (Vietnam)',
            value: 'goldPriceVietnam',
            renderContent: async () => {
                const data = (await getTabData(
                    'goldPriceVietnam'
                )) as GoldPriceData[];
                const onDateChange = (date: Date | undefined) => {
                    console.log(date);
                };
                return (
                    <div>
                        <AppDatePicker onDateChange={onDateChange} />
                        <DataTable columns={goldPriceColumns} data={data} />
                    </div>
                );
            },
        },
    ];

    return (
        <div className="w-full">
            <GeneralBanner />
            <AppTabs tabsList={tabsList} />
        </div>
    );
};

export default Page;
