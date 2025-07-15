'use client';
import { AppTabs, TabItem } from '@/components/app-tabs';
import React from 'react';
import { getMockData } from './utils/data-utils';
import NewsComp from './components/news';
import NewsEventFilterDialogComp from './components/news-filter';

const Page = () => {
    const tabs: TabItem[] = [
        {
            title: 'All',
            value: 'all',
            renderContent: async () => {
                const data = await getMockData();
                return <NewsComp news={data} />;
            },
        },
        {
            title: 'Recommended',
            value: 'recommended',
            renderContent: async () => {
                const data = await getMockData();
                return <NewsComp news={data} />;
            },
        },
        {
            title: 'Hottest',
            value: 'hottest',
            renderContent: async () => {
                const data = await getMockData();
                return <NewsComp news={data} />;
            },
        },
        {
            title: 'Most Viewed',
            value: 'mostViewed',
            renderContent: async () => {
                const data = await getMockData();
                return <NewsComp news={data} />;
            },
        },
        {
            title: 'Top Rated',
            value: 'topRated',
            renderContent: async () => {
                const data = await getMockData();
                return <NewsComp news={data} />;
            },
        },
    ];

    const onApply = (value: unknown) => {
        console.log(value);
    };

    return (
        <div>
            <NewsEventFilterDialogComp onApply={value => onApply(value)} />
            <AppTabs tabsList={tabs} />
        </div>
    );
};

export default Page;
