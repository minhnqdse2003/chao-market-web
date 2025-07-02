'use server';

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

// Tab list with dynamic content rendering
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
            const data = (await getTabData('exchangeRate')) as ExchangeRate[];
            return <DataTable columns={exchangeRateColumns} data={data} />;
        },
    },
    {
        title: 'Interest Rate',
        value: 'interestRate',
        renderContent: async () => {
            const data = (await getTabData(
                'interestRate'
            )) as InterestRateData[];
            return <DataTable columns={interestRateColumns} data={data} />;
        },
    },
    {
        title: 'Gold Price (Vietnam)',
        value: 'goldPriceVietnam',
        renderContent: async () => {
            const data = (await getTabData(
                'goldPriceVietnam'
            )) as GoldPriceData[];
            return <DataTable columns={goldPriceColumns} data={data} />;
        },
    },
];

const Page = async () => {
    return (
        <div>
            <AppTabs tabsList={tabsList} />
        </div>
    );
};

export default Page;
