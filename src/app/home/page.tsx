import React from 'react';
import { columns, HomeNewFlow } from './columns';
import { DataTable } from '@/components/data-table';

const mockData: HomeNewFlow[] = [
    {
        date: new Date('2025-06-27'),
        category: 'Technology',
        headline: 'AI Breakthrough in Natural Language Processing',
        rate: 4.75,
        view: 1200,
    },
    {
        date: new Date('2025-06-26'),
        category: 'Finance',
        headline: 'Stock Market Surges to Record Highs',
        rate: 3.2,
        view: 850,
    },
    {
        date: new Date('2025-06-25'),
        category: 'Health',
        headline: 'New Vaccine Shows Promising Results',
        rate: 4.1,
        view: 2000,
    },
    {
        date: new Date('2025-06-24'),
        category: 'Entertainment',
        headline: 'Blockbuster Movie Breaks Box Office Records',
        rate: 2.95,
        view: 3200,
    },
    {
        date: new Date('2025-06-23'),
        category: 'Science',
        headline: 'Scientists Discover New Exoplanet',
        rate: 4.5,
        view: 650,
    },
];
const Page = () => {
    return (
        <div>
            <DataTable
                columns={columns}
                data={[...mockData, ...mockData, ...mockData]}
            />
        </div>
    );
};

export default Page;
