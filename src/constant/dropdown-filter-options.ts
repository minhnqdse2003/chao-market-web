import { DropdownOption } from '@/components/app-dropdown';
import { AppFilterOptionsType } from '@/components/app-filter-select';

export const MARKET_OPTIONS: AppFilterOptionsType[] = [
    {
        name: 'Stock',
        value: 'stock',
    },
    {
        name: 'Crypto',
        value: 'crypto',
    },
    {
        name: 'Forex',
        value: 'forex',
    },
    {
        name: 'Commodity',
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
    START_DATE: 'Start Date',
    MARKET: 'Market',
    DEFAULT: 'Default',
};

const NEWS_EVENT_GROUP = {
    DATE: 'Date',
    MARKET: 'Market',
};

export const SORT_BY_OPTIONS: DropdownOption[] = [
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
        value: 'all',
        label: 'All',
        group: CLIENT_ACCOUNT_GROUP.MARKET,
    },
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
        value: 'commodity',
        label: 'Commodity',
        group: CLIENT_ACCOUNT_GROUP.MARKET,
    },
    {
        value: 'featured',
        label: 'Featured',
        group: CLIENT_ACCOUNT_GROUP.DEFAULT,
    },
];

export const SORT_BY_OPTIONS_NEWS_EVENT: DropdownOption[] = [
    {
        value: 'desc',
        label: 'Newest first',
        group: NEWS_EVENT_GROUP.DATE,
    },
    {
        value: 'asc',
        label: 'Oldest first',
        group: NEWS_EVENT_GROUP.DATE,
    },
    {
        value: 'all',
        label: 'All',
        group: CLIENT_ACCOUNT_GROUP.MARKET,
    },
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
        value: 'commodity',
        label: 'Commodity',
        group: CLIENT_ACCOUNT_GROUP.MARKET,
    },
    {
        value: 'featured',
        label: 'Featured',
        group: CLIENT_ACCOUNT_GROUP.DEFAULT,
    },
];
