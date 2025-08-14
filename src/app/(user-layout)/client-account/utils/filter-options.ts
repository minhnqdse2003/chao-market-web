import { DropdownOption } from '@/components/app-dropdown';
import { AppFilterOptionsType } from '@/components/app-filter-select';

export const MARKET_OPTIONS: AppFilterOptionsType[] = [
    {
        name: 'STOCK',
        value: 'stock',
    },
    {
        name: 'FOREX',
        value: 'forex',
    },
    {
        name: 'CRYPTO',
        value: 'crypto',
    },
    {
        name: 'COMMODITY',
        value: 'commodity',
    },
];

export const ACCOUNT_OPTIONS: AppFilterOptionsType[] = [
    {
        name: 'A-Z',
        value: 'a-z',
    },
    {
        name: 'Z-A',
        value: 'z-a',
    },
];

export const PROFIT_OPTIONS: AppFilterOptionsType[] = [
    {
        name: '0%-5%',
        value: '0-5',
    },
    {
        name: '5%-20%',
        value: '5-20',
    },
    {
        name: 'Over 20%',
        value: '20-100',
    },
];

export const VIEW_OPTIONS: AppFilterOptionsType[] = [
    {
        name: 'Low to high',
        value: 'low-to-high',
    },
    {
        name: 'High to low',
        value: 'high-to-low',
    },
];

export const ALGO_TRADING_OPTIONS: AppFilterOptionsType[] = [
    {
        name: 'Less than manual trading',
        value: 'less',
    },
    {
        name: 'More than manual trading',
        value: 'more',
    },
];

const CLIENT_ACCOUNT_GROUP = {
    DEPOSIT: 'Deposit',
    START_DATE: 'Start date',
    MARKET: 'Market',
    DEFAULT: 'Default',
};

export const SORT_BY_OPTIONS: DropdownOption[] = [
    {
        value: 'stock',
        label: 'Stock',
        group: CLIENT_ACCOUNT_GROUP.MARKET,
    },
    {
        value: 'crypto',
        label: 'Crypto',
        group: CLIENT_ACCOUNT_GROUP.MARKET,
    },
    {
        value: 'forex',
        label: 'Forex',
        group: CLIENT_ACCOUNT_GROUP.MARKET,
    },
    {
        value: 'desc',
        label: 'Newest first',
        group: CLIENT_ACCOUNT_GROUP.START_DATE,
    },
    {
        value: 'asc',
        label: 'Oldest first',
        group: CLIENT_ACCOUNT_GROUP.START_DATE,
    },
    {
        value: 'high-to-low',
        label: 'High to low',
        group: CLIENT_ACCOUNT_GROUP.DEPOSIT,
    },
    {
        value: 'low-to-high',
        label: 'Low to high',
        group: CLIENT_ACCOUNT_GROUP.DEPOSIT,
    },
    {
        value: 'featured',
        label: 'Featured',
        group: CLIENT_ACCOUNT_GROUP.DEFAULT,
    },
];
