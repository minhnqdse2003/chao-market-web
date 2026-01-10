'use client';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { T } from '@/components/app-translate';

export type HomeNewFlow = {
    date: Date;
    category: string;
    headline: string;
    rate: number;
    view: number;
    weekday?: string;
};

export type ExchangeRate = {
    currencyCode: string;
    currencyName: string;
    cashBuying: number;
    telegraphicBuying: number;
    selling: number;
};

export type InterestRateData = {
    term: string;
    vndRate: number;
    eurRate: number;
    usdRate: number;
};

export type GoldPriceData = {
    typeOfGold: string;
    sellingPriceVND: number | string;
};

export const columns: ColumnDef<HomeNewFlow>[] = [
    {
        accessorKey: 'date',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                tableTitle={<T keyName={'common.date'} />}
            />
        ),
        cell: ({ row }) => {
            const date = row.original.date;
            return format(date, 'dd.MM.yyyy');
        },
    },
    {
        accessorKey: 'weekday',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                tableTitle={<T keyName={'common.weekday'} />}
            />
        ),
    },
    {
        accessorKey: 'category',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                tableTitle={<T keyName={'common.category'} />}
            />
        ),
    },
    {
        accessorKey: 'headline',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                tableTitle={<T keyName={'common.headline'} />}
            />
        ),
        cell: ({ row }) => {
            return <p className={'text-start'}>{row.original.headline}</p>;
        },
    },
    {
        accessorKey: 'view',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                tableTitle={<T keyName={'common.views'} />}
            />
        ),
        cell: ({ row }) => {
            const view = row.original.view;
            return view.toLocaleString('en-US');
        },
    },
];

// export const exchangeRateColumns: ColumnDef<ExchangeRate>[] = [
//     {
//         accessorKey: 'currencyCode',
//         header: ({ column }) => (
//             <DataTableColumnHeader
//                 column={column}
//                 title="Currency Code"
//                 className="text-center"
//             />
//         ),
//         enableSorting: true,
//         enableColumnFilter: true,
//     },
//     {
//         accessorKey: 'currencyName',
//         header: ({ column }) => (
//             <DataTableColumnHeader
//                 column={column}
//                 title="Currency Name"
//                 className="text-center"
//             />
//         ),
//         enableSorting: true,
//         enableColumnFilter: true,
//     },
//     {
//         accessorKey: 'cashBuying',
//         header: ({ column }) => (
//             <DataTableColumnHeader
//                 column={column}
//                 title="Cash Buying"
//                 className="text-center"
//             />
//         ),
//         cell: ({ row }) => `$${priceFormat(row.original.cashBuying)}`,
//         enableSorting: true,
//         enableColumnFilter: true,
//     },
//     {
//         accessorKey: 'telegraphicBuying',
//         header: ({ column }) => (
//             <DataTableColumnHeader
//                 column={column}
//                 title="Telegraphic Buying"
//                 className="text-center"
//             />
//         ),
//         cell: ({ row }) => `$${priceFormat(row.original.telegraphicBuying)}`,
//         enableSorting: true,
//         enableColumnFilter: true,
//     },
//     {
//         accessorKey: 'selling',
//         header: ({ column }) => (
//             <DataTableColumnHeader
//                 column={column}
//                 title="Selling"
//                 className="text-center"
//             />
//         ),
//         cell: ({ row }) => `$${priceFormat(row.original.selling)}`,
//         enableSorting: true,
//         enableColumnFilter: true,
//     },
// ];

// export const interestRateColumns: ColumnDef<InterestRateData>[] = [
//     {
//         accessorKey: 'term',
//         header: ({ column }) => (
//             <DataTableColumnHeader column={column} title="Term" />
//         ),
//     },
//     {
//         accessorKey: 'vndRate',
//         header: ({ column }) => (
//             <DataTableColumnHeader column={column} title="VND Rate" />
//         ),
//         cell: ({ row }) => percentageFormat(row.original.vndRate * 100),
//     },
//     {
//         accessorKey: 'eurRate',
//         header: ({ column }) => (
//             <DataTableColumnHeader column={column} title="EUR Rate" />
//         ),
//         cell: ({ row }) => percentageFormat(row.original.eurRate * 100),
//     },
//     {
//         accessorKey: 'usdRate',
//         header: ({ column }) => (
//             <DataTableColumnHeader column={column} title="USD Rate" />
//         ),
//         cell: ({ row }) => percentageFormat(row.original.usdRate * 100),
//     },
// ];

// export const goldPriceColumns: ColumnDef<GoldPriceData>[] = [
//     {
//         accessorKey: 'typeOfGold',
//         header: ({ column }) => (
//             <DataTableColumnHeader column={column} title="Type of Gold" />
//         ),
//     },
//     {
//         accessorKey: 'sellingPriceVND',
//         header: ({ column }) => (
//             <DataTableColumnHeader column={column} title="Giá Bán (VND)" />
//         ),
//         cell: ({ row }) => {
//             const price = row.original.sellingPriceVND;
//             if (!price || price === 'N/A') return 'N/A';
//             return priceFormat(price);
//         },
//     },
// ];
