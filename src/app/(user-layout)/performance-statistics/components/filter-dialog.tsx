import AppDialog from '@/components/app-dialog';
import { Button } from '@/components/ui/button';
import { ListFilter, SearchIcon } from 'lucide-react';
import React from 'react';
import AppFilterSelect, {
    AppFilterOptionsType,
} from '@/components/app-filter-select';
import AppDateRangePicker from '@/components/app-date-range-picker';
import {
    ACCOUNT_OPTIONS,
    ALGO_TRADING_OPTIONS,
    MARKET_OPTIONS,
    PROFIT_OPTIONS,
    VIEW_OPTIONS,
} from '@/constant/dropdown-filter-options';
import { BaseFilterParams, useFilter } from '@/hooks/use-filter';
import { AutosizeTextarea } from '@/components/auto-resize-textarea';
import { T } from '@/components/app-translate';
import { useI18n } from '@/context/i18n/context';

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
        searchValue,
    } = useFilter<FilterParams>({
        initialFilters: initialSearchValue,
        initialSearchValue: '',
        onApply,
    });
    const { t } = useI18n();

    const parsedToNewOptions = (
        options: AppFilterOptionsType[]
    ): AppFilterOptionsType[] => {
        return options.map(item => ({
            name: t(item.name),
            value: item.value,
        }));
    };

    // Dialog Header
    const headerContent = (
        <div className="w-full flex justify-between items-center">
            <h2 className="text-lg font-semibold" id="filter-dialog-title">
                <T keyName={'common.filterBySearch.filterBy'} />
            </h2>
        </div>
    );

    // Dialog Content
    const mainContent = (
        <div className="flex flex-col gap-4">
            <div className="relative flex items-start border-b dark:[&:hover>svg]:text-[var(--brand-color)] dark:focus-within:[&_svg]:text-[var(--brand-color)] hover:dark:[&>textarea]:placeholder:text-[var(--brand-color)]">
                <SearchIcon className="size-4 text-[var(--brand-grey-foreground)] mt-1.5 flex-shrink-0" />
                <AutosizeTextarea
                    placeholder={t('common.search')}
                    value={searchValue}
                    onChange={handleSearchChange}
                    aria-label="Search"
                    className="border-0 focus-visible:ring-0 bg-transparent! shadow-none ps-2 pe-0 py-1 text-sm resize-none focus-visible:border-0"
                    maxHeight={150}
                    minHeight={32}
                />
            </div>
            <AppFilterSelect
                options={parsedToNewOptions(MARKET_OPTIONS)}
                label={t('common.market')}
                valueOptions={filterParams.market}
                onChange={value => handleFilterChange('market', value)}
            />
            <AppFilterSelect
                options={parsedToNewOptions(ACCOUNT_OPTIONS)}
                label={t('account.title')}
                onChange={value => handleFilterChange('account', value)}
                valueOptions={filterParams.account}
            />
            <AppFilterSelect
                options={parsedToNewOptions(PROFIT_OPTIONS)}
                label={t('common.profit')}
                onChange={value => handleFilterChange('profit', value)}
                valueOptions={filterParams.profit}
            />
            <AppFilterSelect
                options={parsedToNewOptions(VIEW_OPTIONS)}
                label={t('common.views')}
                onChange={value => handleFilterChange('views', value)}
                valueOptions={filterParams.views}
            />
            <AppFilterSelect
                options={parsedToNewOptions(ALGO_TRADING_OPTIONS)}
                label={t('common.algoTrading').replace('<br/>', ' ')}
                type="radio"
                onChange={value => handleFilterChange('algoTrading', value)}
                valueOptions={filterParams.algoTrading}
            />
            <AppDateRangePicker
                label={t('common.date')}
                value={filterParams.date}
                onChange={range => handleFilterChange('date', range)}
                highlightOnActive={true}
            />
        </div>
    );

    // Dialog Footer
    const footerContent = (
        <div className="w-full flex justify-between items-center gap-4">
            <Button
                variant="ghost"
                className="dark:text-white text-brand-text hover:bg-[var(--brand-grey)] dark:hover:text-[var(--brand-color)] dark:hover:bg-transparent hover:border-transparent transition-colors! font-semibold duration-300 ease-in-out"
                onClick={handleClearAll}
            >
                <T keyName={'common.actions.clearAll'} />
            </Button>
            <Button
                variant="default"
                className="dark:hover:bg-[var(--brand-color)] dark:hover:text-black dark:text-[var(--brand-color)] dark:bg-transparent bg-transparent text-black hover:bg-[var(--brand-color)] font-semibold transition-colors! duration-300 ease-in-out"
                onClick={handleApply}
            >
                <T keyName={'common.actions.apply'} />
            </Button>
        </div>
    );

    return (
        <AppDialog
            trigger={
                <Button variant="ghost" className="font-normal">
                    <ListFilter className="mr-2 h-4 w-4" />{' '}
                    <T keyName={'common.filter'} />
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
