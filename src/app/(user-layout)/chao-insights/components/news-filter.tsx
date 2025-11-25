'use client';
import AppDialog from '@/components/app-dialog';
import { Button } from '@/components/ui/button';
import { ListFilter, SearchIcon } from 'lucide-react';
import React from 'react';
import AppFilterSelect, {
    AppFilterOptionsType,
} from '@/components/app-filter-select';
import AppDateRangePicker from '@/components/app-date-range-picker';
import { BaseFilterParams, useFilter } from '@/hooks/use-filter';
import AppDropdown, { DropdownOption } from '@/components/app-dropdown';
import { AutosizeTextarea } from '@/components/auto-resize-textarea';
import { useI18n } from '@/context/i18n/context';

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

    const { t } = useI18n();

    const TIME_OPTIONS = [
        { value: 'today', name: t('common.timePresets.today') },
        { value: 'thisWeek', name: t('common.timePresets.thisWeek') },
        { value: 'thisMonth', name: t('common.timePresets.thisMonth') },
        { value: 'custom', name: t('common.timePresets.custom') },
    ];

    const SOURCE_OPTIONS: AppFilterOptionsType[] = [
        { value: 'bloomberg', name: 'Bloomberg' },
        { value: 'vnexpress', name: 'Vnexpress' },
        { value: 'tygiavang', name: 'Tygiavang' },
        { value: 'baomoi', name: 'Baomoi' },
    ];

    const SORT_BY_OPTIONS_NEWS_EVENT_TRANSLATED: DropdownOption[] = [
        {
            value: 'featured',
            label: t('common.sortBy.featured'), // Key for Featured
            group: t('common.default'),
        },
        {
            value: 'desc',
            label: t('common.dateSort.newestFirst'),
            group: t('common.dateSort.label'),
        },
        {
            value: 'asc',
            label: t('common.dateSort.oldestFirst'),
            group: t('common.dateSort.label'),
        },
        {
            value: 'all',
            label: t('common.marketType.all'),
            group: t('common.market'),
        },
        {
            value: 'stocks',
            label: t('common.marketType.stocks'),
            group: t('common.market'),
        },
        {
            value: 'cryptocurrencies',
            label: t('common.marketType.cryptocurrencies'),
            group: t('common.market'),
        },
        {
            value: 'currencies',
            label: t('common.marketType.currencies'),
            group: t('common.market'),
        },
        {
            value: 'commodities',
            label: t('common.marketType.commodities'),
            group: t('common.market'),
        },
    ];

    // Dialog Header
    const headerContent = (
        <div className="w-full flex justify-between items-center">
            <h2 className="text-lg font-semibold">
                {t('common.filterBySearch.filterBy')}
            </h2>
        </div>
    );

    // Dialog Content
    const mainContent = (
        <div className="flex flex-col gap-4">
            <div className="relative flex items-start border-b dark:[&:hover>svg]:text-[var(--brand-color)] dark:hover:[&>textarea]:placeholder:text-[var(--brand-color)] [&:hover>svg]:text-black dark:focus-within:[&_svg]:text-[var(--brand-color)] focus-within:[&_svg]:text-black">
                <SearchIcon className="size-4 text-[var(--brand-grey-foreground)] mt-1.5 flex-shrink-0" />
                <AutosizeTextarea
                    placeholder={t('common.search')}
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
                label={t('common.time')}
                type="radio"
                valueOptions={filterParams.time}
                onChange={value => handleFilterChange('time', value)}
            />
            {filterParams.time === 'custom' && (
                <AppDateRangePicker
                    label={t('common.customDateRange.rangeTitle')}
                    value={filterParams.date}
                    onChange={range => handleFilterChange('date', range)}
                    highlightOnActive={true}
                />
            )}
            <AppFilterSelect
                options={SOURCE_OPTIONS}
                label={t('common.sources')}
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
                className="dark:text-white text-brand-text hover:bg-[var(--brand-grey)] dark:hover:text-[var(--brand-color)] dark:hover:bg-transparent hover:border-transparent hover:shadow-lg transition-colors! font-semibold duration-300 ease-in-out"
                onClick={handleClearAll}
            >
                {t('common.actions.clearAll')}
            </Button>
            <Button
                variant="default"
                className="dark:hover:bg-[var(--brand-color)] font-semibold dark:hover:text-black dark:text-[var(--brand-color)] dark:bg-transparent bg-transparent text-black hover:bg-[var(--brand-color)] transition-colors! duration-300 ease-in-out"
                onClick={handleApply}
            >
                {t('common.actions.apply')}
            </Button>
        </div>
    );

    return (
        <div className="flex w-full justify-between items-center">
            <AppDialog
                trigger={
                    <Button variant="ghost" className="font-normal">
                        <ListFilter className="mr-2 h-4 w-4" />{' '}
                        {t('common.filter')}:
                    </Button>
                }
                headerContent={headerContent}
                mainContent={mainContent}
                footerContent={footerContent}
                triggerClassName="inline-flex"
            />
            <AppDropdown
                options={SORT_BY_OPTIONS_NEWS_EVENT_TRANSLATED}
                defaultValue="featured"
                buttonClassName="max-h-[20px] font-light text-sm"
                contentClassName="w-44"
                onValueChange={value => handleFilterChange('sortBy', value)}
            />
        </div>
    );
};

export default NewsEventFilterDialogComp;
