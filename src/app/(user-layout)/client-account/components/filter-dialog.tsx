import AppDialog from '@/components/app-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
            <h2 className="text-lg font-semibold" id="filter-dialog-title">
                Filter By
            </h2>
        </div>
    );

    // Dialog Content
    const mainContent = (
        <div className="flex flex-col gap-4">
            <div className="relative flex items-center border-b">
                <SearchIcon className="size-4 text-[var(--brand-grey)]" />
                <Input
                    type="text"
                    placeholder="Search"
                    className="border-0 focus-visible:ring-0 bg-transparent! shadow-none"
                    onChange={handleSearchChange}
                    aria-label="Search"
                />
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
                label="Algo Trading"
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
        <div className="w-full flex justify-between items-center gap-4">
            <Button
                variant="ghost"
                className="text-white dark:hover:text-black dark:hover:bg-[var(--brand-color)] hover:border-transparent transition-colors! duration-300 ease-in-out"
                onClick={handleClearAll}
            >
                Clear All
            </Button>
            <Button
                variant="default"
                className="dark:hover:bg-[var(--brand-color)] dark:hover:text-black text-[var(--brand-color)] dark:bg-transparent transition-colors! duration-300 ease-in-out"
                onClick={handleApply}
            >
                Apply
            </Button>
        </div>
    );

    return (
        <AppDialog
            trigger={
                <Button variant="ghost" className="font-normal">
                    <ListFilter /> Filter:
                </Button>
            }
            headerContent={headerContent}
            mainContent={mainContent}
            footerContent={footerContent}
            triggerClassName="inline-flex"
            contentContainerClassName="[&>div]:pt-6"
        />
    );
};

export default ClientAccountFilterDialog;
