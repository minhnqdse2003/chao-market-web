import AppDialog from '@/components/app-dialog';
import { AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog';
import { ListFilter, SearchIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import AppFilterSelect from '@/components/app-filter-select';
import AppDateRangePicker from '@/components/app-date-range-picker';
import {
    ACCOUNT_OPTIONS,
    ALGO_TRADING_OPTIONS,
    MARKET_OPTIONS,
    PROFIT_OPTIONS,
    VIEW_OPTIONS,
} from '../utils/filter-options';

const ClientAccountFilterDialog = ({ onApply, initialSearchValue = '' }) => {
    const [searchValue, setSearchValue] = useState(initialSearchValue);
    const debounceSearchValue = useDebounce(searchValue, 300);

    // Handler for search input change
    const handleSearchChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setSearchValue(event.target.value);
    };

    // Handler for Clear All button
    const handleClearAll = () => {
        setSearchValue('');
        onApply(null);
    };

    // Handler for Apply button
    const handleApply = () => {
        onApply({
            searchValue: debounceSearchValue,
        });
    };

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
                onChange={value => console.log(`Market: ${value}`)}
            />
            <AppFilterSelect
                options={ACCOUNT_OPTIONS}
                label="Account"
                onChange={value => console.log(`Account: ${value}`)}
            />
            <AppFilterSelect
                options={PROFIT_OPTIONS}
                label="Profit"
                onChange={value => console.log(`Profit: ${value}`)}
            />
            <AppFilterSelect
                options={VIEW_OPTIONS}
                label="Views"
                onChange={value => console.log(`Views: ${value}`)}
            />
            <AppFilterSelect
                options={ALGO_TRADING_OPTIONS}
                label="Algo trading"
                type="radio"
                onChange={value => console.log(`Algo trading: ${value}`)}
            />
            <AppDateRangePicker
                label="Date"
                onChange={range => console.log(JSON.stringify(range))}
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
                className="uppercase"
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
