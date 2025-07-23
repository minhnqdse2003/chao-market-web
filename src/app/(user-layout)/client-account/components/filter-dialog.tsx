import AppDialog from '@/components/app-dialog';
import { AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog';
import { ListFilter, SearchIcon } from 'lucide-react';
import React from 'react';
import AppFilterSelect from '@/components/app-filter-select';
import AppDateRangePicker from '@/components/app-date-range-picker';
import {
    ACCOUNT_OPTIONS,
    ALGO_TRADING_OPTIONS,
    MARKET_OPTIONS,
    PROFIT_OPTIONS,
    VIEW_OPTIONS,
} from '../utils/filter-options';
import { BaseFilterParams, useFilter } from '@/hooks/use-filter';

interface FilterParams extends BaseFilterParams {
    market?: string;
    account?: string;
    profit?: string;
    views?: string;
    algoTrading?: string;
    date?: {
        startDate?: Date;
        endDate?: Date;
    };
}

const initialValues: FilterParams = {};

const ClientAccountFilterDialog = ({
    onApply,
    initialSearchValue = initialValues,
}: {
    onApply: (value: unknown) => void;
    initialSearchValue?: FilterParams;
}) => {
    const {
        filterParams,
        handleSearchChange,
        handleFilterChange,
        handleClearAll,
        handleApply,
    } = useFilter<FilterParams>({
        initialFilters: initialSearchValue,
        initialSearchValue: '',
        onApply,
    });

    // Dialog Header
    const headerContent = (
        <div className="w-full flex justify-between items-center">
            <AlertDialogTitle className="uppercase">Filter By</AlertDialogTitle>
            <Button
                variant="ghost"
                className="text-[var(--brand-color)]"
                onClick={handleClearAll}
            >
                Clear all
            </Button>
        </div>
    );

    // Dialog Content
    const mainContent = (
        <div className="flex flex-col gap-4">
            <div className="relative flex items-center border-b">
                <Input
                    type="text"
                    placeholder="Search"
                    className="border-0 focus-visible:ring-0 bg-transparent! shadow-none"
                    onChange={handleSearchChange}
                />
                <SearchIcon className="size-4" />
            </div>
            <AppFilterSelect
                options={MARKET_OPTIONS}
                label="Market"
                valueOptions={filterParams.market}
                onChange={value => handleFilterChange('market', value)}
            />
            <AppFilterSelect
                options={ACCOUNT_OPTIONS}
                label="Account"
                onChange={value => handleFilterChange('account', value)}
                valueOptions={filterParams.account}
            />
            <AppFilterSelect
                options={PROFIT_OPTIONS}
                label="Profit"
                onChange={value => handleFilterChange('profit', value)}
                valueOptions={filterParams.profit}
            />
            <AppFilterSelect
                options={VIEW_OPTIONS}
                label="Views"
                onChange={value => handleFilterChange('views', value)}
                valueOptions={filterParams.views}
            />
            <AppFilterSelect
                options={ALGO_TRADING_OPTIONS}
                label="Algo trading"
                type="radio"
                onChange={value => handleFilterChange('algoTrading', value)}
                valueOptions={filterParams.algoTrading}
            />
            <AppDateRangePicker
                label="Date"
                value={filterParams.date}
                onChange={range => handleFilterChange('date', range)}
            />
        </div>
    );

    // Dialog Footer
    const footerContent = (
        <div className="w-full flex justify-end items-center gap-4">
            <AlertDialogCancel className="cursor-pointer">
                Close
            </AlertDialogCancel>
            <Button
                variant="default"
                className="uppercase bg-[var(--brand-color)] hover:"
                onClick={handleApply}
            >
                Apply
            </Button>
        </div>
    );

    return (
        <AppDialog
            trigger={
                <Button variant="ghost">
                    <ListFilter /> Filter
                </Button>
            }
            headerContent={headerContent}
            mainContent={mainContent}
            footerContent={footerContent}
            triggerClassName="inline-flex"
        />
    );
};

export default ClientAccountFilterDialog;
