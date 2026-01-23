import React from 'react';
import { ListFilter, SearchIcon } from 'lucide-react';
import AppDialog from '@/components/app-dialog';
import { Button } from '@/components/ui/button';
import AppFilterSelect, {
    AppFilterOptionsType,
} from '@/components/app-filter-select';
import { MARKET_OPTIONS } from '@/constant/dropdown-filter-options';
import { useFilter } from '@/hooks/use-filter';
import { AutosizeTextarea } from '@/components/auto-resize-textarea';
import { T } from '@/components/app-translate';
import { useI18n } from '@/context/i18n/context';
import { useGetProductTag } from '@/hooks/react-query/tag/use-get-product-tag';
import { GetConsultationFilterRequestParams } from '@/types/custom-solution/request';
import { DialogClose } from '@/components/ui/dialog';

const initialValues: GetConsultationFilterRequestParams = {
    type: 'all',
    dateSort: 'desc',
    market: 'All',
};

interface ConsultationFilterDialogProps {
    onApply: (value: GetConsultationFilterRequestParams) => void;
    initialSearchValue?: GetConsultationFilterRequestParams;
}

const ConsultationFilterDialog = ({
    onApply,
    initialSearchValue = initialValues,
}: ConsultationFilterDialogProps) => {
    const {
        filterParams,
        handleSearchChange,
        handleFilterChange,
        handleClearAll,
        handleApply,
        setFilterParams,
        setSearchValue,
        searchValue,
    } = useFilter<GetConsultationFilterRequestParams>({
        initialFilters: initialValues,
        initialSearchValue: initialSearchValue.searchValue || '',
        onApply,
    });

    const { data: productTags } = useGetProductTag();

    const { t } = useI18n();

    // Helper to translate dropdown options
    const parsedToNewOptions = (
        options: AppFilterOptionsType[]
    ): AppFilterOptionsType[] => {
        return options.map(item => ({
            name: t(item.name),
            value: item.value.slice(0, 1).toUpperCase() + item.value.slice(1),
        }));
    };

    const productTagOptions = [
        { name: t('common.marketType.all'), value: 'all' },
        ...(productTags?.data?.map(tag => ({
            name: tag.name,
            value: tag.name,
        })) ?? []),
    ];

    React.useEffect(() => {
        if (initialSearchValue) {
            // We only want to update the keys that exist in our Dialog
            setFilterParams(prev => ({
                ...prev,
                market: initialSearchValue.market || 'all',
                type: initialSearchValue.type || 'all',
            }));
            setSearchValue(initialSearchValue.searchValue || '');
        }
    }, [initialSearchValue, setFilterParams, setSearchValue]);

    const headerContent = (
        <div className="w-full flex justify-between items-center">
            <h2 className="text-lg font-semibold" id="filter-dialog-title">
                <T keyName={'common.filterBySearch.filterBy'} />
            </h2>
        </div>
    );

    const mainContent = (
        <div className="flex flex-col gap-4">
            {/* Search Input */}
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

            {/* Market Filter */}
            <AppFilterSelect
                options={parsedToNewOptions(MARKET_OPTIONS)}
                label={t('common.market')}
                valueOptions={filterParams.market}
                onChange={value => handleFilterChange('market', value)}
            />

            {/* Type Filter */}
            <AppFilterSelect
                options={productTagOptions}
                label={t('common.type')}
                valueOptions={filterParams.type}
                onChange={value => handleFilterChange('type', value)}
            />
        </div>
    );

    const footerContent = (
        <div className="w-full flex justify-between items-center gap-4">
            <DialogClose
                className="dark:text-white text-brand-text hover:bg-[var(--brand-grey)] dark:hover:text-[var(--brand-color)] dark:hover:bg-transparent hover:border-transparent transition-colors! font-semibold duration-300 ease-in-out py-2 px-4 rounded-lg"
                onClick={handleClearAll}
            >
                <T keyName={'common.actions.clearAll'} />
            </DialogClose>
            <DialogClose
                className="dark:hover:bg-[var(--brand-color)] dark:hover:text-black dark:text-[var(--brand-color)] dark:bg-transparent bg-transparent text-black hover:bg-[var(--brand-color)] font-semibold transition-colors! duration-300 ease-in-out py-2 px-4 rounded-lg"
                onClick={handleApply}
            >
                <T keyName={'common.actions.apply'} />
            </DialogClose>
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

export default ConsultationFilterDialog;
