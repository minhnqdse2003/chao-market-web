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
