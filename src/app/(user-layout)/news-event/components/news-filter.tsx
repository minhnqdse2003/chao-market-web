'use client';
import AppDialog from '@/components/app-dialog';
import { Button } from '@/components/ui/button';
import { ListFilter, SearchIcon } from 'lucide-react';
import React from 'react';
import AppFilterSelect from '@/components/app-filter-select';
import AppDateRangePicker from '@/components/app-date-range-picker';
import { BaseFilterParams, useFilter } from '@/hooks/use-filter';
import { TIME_OPTIONS, SOURCE_OPTIONS } from '../utils/filter-options';
import AppDropdown from '@/components/app-dropdown';
import { SORT_BY_OPTIONS } from '@/app/(user-layout)/client-account/utils/filter-options';
import { AutosizeTextarea } from '@/components/auto-resize-textarea';

interface FilterParams extends BaseFilterParams {
    search?: string;
    time?: string;
    date?: {
        startDate?: Date;
        endDate?: Date;
    };
    sources?: string;
    sortBy?: string;
}

const initialValues: FilterParams = {};

const NewsEventFilterDialogComp = ({
    initialSearchValue = initialValues,
    title = 'Filter News',
}: {
    initialSearchValue?: FilterParams;
    title?: string;
}) => {
    const onApply = (value: unknown) => {
        console.log(value);
    };

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
            <h2 className="text-lg font-semibold">{title}</h2>
        </div>
    );

    // Dialog Content
    const mainContent = (
        <div className="flex flex-col gap-4">
            <div className="relative flex items-start border-b">
                <SearchIcon className="size-4 text-[var(--brand-grey)] mt-1.5 flex-shrink-0" />
                <AutosizeTextarea
                    placeholder="Search"
                    value={filterParams.search}
                    onChange={handleSearchChange}
                    aria-label="Search"
                    className="border-0 focus-visible:ring-0 bg-transparent! shadow-none ps-2 pe-0 py-1 text-sm resize-none focus-visible:border-0"
                    maxHeight={150}
                    minHeight={32}
                />
            </div>
            <AppFilterSelect
                options={TIME_OPTIONS}
                label="Time"
                type="radio"
                valueOptions={filterParams.time}
                onChange={value => handleFilterChange('time', value)}
            />
            {filterParams.time === 'custom' && (
                <AppDateRangePicker
                    label="Custom Date Range"
                    value={filterParams.date}
                    onChange={range => handleFilterChange('date', range)}
                    highlightOnActive={true}
                />
            )}
            <AppFilterSelect
                options={SOURCE_OPTIONS}
                label="Sources"
                valueOptions={filterParams.sources}
                onChange={value => handleFilterChange('sources', value)}
            />
        </div>
    );

    // Dialog Footer
    const footerContent = (
        <div className="w-full flex justify-between items-center gap-4">
            <Button
                variant="ghost"
                className="dark:text-white text-brand-text hover:bg-[var(--brand-grey)] dark:hover:text-[var(--brand-color)] dark:hover:bg-transparent hover:border-transparent hover:shadow-lg transition-colors! hover:font-semibold duration-300 ease-in-out"
                onClick={handleClearAll}
            >
                Clear All
            </Button>
            <Button
                variant="default"
                className="dark:hover:bg-[var(--brand-color)] dark:hover:text-black dark:text-[var(--brand-color)] dark:bg-transparent bg-transparent text-black hover:bg-[var(--brand-color)] hover:font-semibold transition-colors! duration-300 ease-in-out"
                onClick={handleApply}
            >
                Apply
            </Button>
        </div>
    );

    return (
        <div className="flex w-full justify-between items-center">
            <AppDialog
                trigger={
                    <Button variant="ghost" className="font-normal">
                        <ListFilter className="mr-2 h-4 w-4" /> Filter:
                    </Button>
                }
                headerContent={headerContent}
                mainContent={mainContent}
                footerContent={footerContent}
                triggerClassName="inline-flex"
            />
            <AppDropdown
                options={SORT_BY_OPTIONS}
                defaultValue="featured"
                buttonClassName="max-h-[20px] font-light text-sm"
                contentClassName="w-44"
                onValueChange={value => handleFilterChange('sortBy', value)}
            />
        </div>
    );
};

export default NewsEventFilterDialogComp;
