'use client';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { ColumnDef } from '@tanstack/react-table';

export type HomeNewFlow = {
    date: Date;
    category: string;
    headline: string;
    rate: number;
    view: number;
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
            <DataTableColumnHeader column={column} title="Date" />
        ),
        cell: ({ row }) => {
            const date = row.original.date;
            return date.toLocaleDateString(); // Format date for display
        },
    },
    {
        accessorKey: 'category',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Category" />
        ),
    },
    {
        accessorKey: 'headline',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Headline" />
        ),
    },
    {
        accessorKey: 'rate',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Rate" />
        ),
        cell: ({ row }) => {
            const rate = row.original.rate;
            return rate.toFixed(2);
        },
    },
    {
        accessorKey: 'view',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Views" />
        ),
    },
];

export const exchangeRateColumns: ColumnDef<ExchangeRate>[] = [
    {
        accessorKey: 'currencyCode',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Currency Code"
                className="text-center"
            />
        ),
        enableSorting: true,
        enableColumnFilter: true,
    },
    {
        accessorKey: 'currencyName',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Currency Name"
                className="text-center"
            />
        ),
        enableSorting: true,
        enableColumnFilter: true,
    },
    {
        accessorKey: 'cashBuying',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Cash Buying"
                className="text-center"
            />
        ),
        cell: ({ row }) => `$${row.original.cashBuying.toFixed(2)}`,
        enableSorting: true,
        enableColumnFilter: true,
    },
    {
        accessorKey: 'telegraphicBuying',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Telegraphic Buying"
                className="text-center"
            />
        ),
        cell: ({ row }) => `$${row.original.telegraphicBuying.toFixed(2)}`,
        enableSorting: true,
        enableColumnFilter: true,
    },
    {
        accessorKey: 'selling',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Selling"
                className="text-center"
            />
        ),
        cell: ({ row }) => `$${row.original.selling.toFixed(2)}`,
        enableSorting: true,
        enableColumnFilter: true,
    },
];

export const interestRateColumns: ColumnDef<InterestRateData>[] = [
    {
        accessorKey: 'term',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Term" />
        ),
    },
    {
        accessorKey: 'vndRate',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="VND Rate" />
        ),
        cell: ({ row }) => `${(row.original.vndRate * 100).toFixed(2)}%`,
    },
    {
        accessorKey: 'eurRate',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="EUR Rate" />
        ),
        cell: ({ row }) => `${(row.original.eurRate * 100).toFixed(2)}%`,
    },
    {
        accessorKey: 'usdRate',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="USD Rate" />
        ),
        cell: ({ row }) => `${(row.original.usdRate * 100).toFixed(2)}%`,
    },
];

export const goldPriceColumns: ColumnDef<GoldPriceData>[] = [
    {
        accessorKey: 'typeOfGold',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Type of Gold" />
        ),
    },
    {
        accessorKey: 'sellingPriceVND',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Giá Bán (VND)" />
        ),
        cell: ({ row }) => row.original.sellingPriceVND || 'N/A',
    },
];
