'use client';
import AppDialog from '@/components/app-dialog';
import { AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog';
import { ListFilter, SearchIcon } from 'lucide-react';
import React from 'react';
import AppFilterSelect from '@/components/app-filter-select';
import AppDateRangePicker from '@/components/app-date-range-picker';
import { BaseFilterParams, useFilter } from '@/hooks/use-filter';
import { TIME_OPTIONS, SOURCE_OPTIONS } from '../utils/filter-options';
import AppDropdown from '@/components/app-dropdown';
import { SORT_BY_OPTIONS } from '@/app/(user-layout)/client-account/utils/filter-options';

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
}: {
    initialSearchValue?: FilterParams;
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
            <AlertDialogTitle className="uppercase">
                Filter News
            </AlertDialogTitle>
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
                    placeholder="Search news"
                    className="border-0 focus-visible:ring-0 bg-transparent! shadow-none"
                    onChange={handleSearchChange}
                    value={filterParams.search || ''}
                />
                <SearchIcon className="size-4" />
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
        <div className="w-full flex justify-end items-center gap-4">
            <AlertDialogCancel className="cursor-pointer">
                Close
            </AlertDialogCancel>
            <Button
                variant="default"
                className="uppercase bg-[var(--brand-color)]"
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
                    <Button variant="ghost">
                        <ListFilter /> Filter
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
                buttonClassName="max-h-[20px] font-light text-xs"
                contentClassName="w-44"
                onValueChange={value => handleFilterChange('sortBy', value)}
            />
        </div>
    );
};

export default NewsEventFilterDialogComp;
