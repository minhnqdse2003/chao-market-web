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
        name: 'low to high',
        value: 'low-to-high',
    },
    {
        name: 'high to low',
        value: 'high-to-low',
    },
];

export const ALGO_TRADING_OPTIONS: AppFilterOptionsType[] = [
    {
        name: 'less than Manual trading',
        value: 'less',
    },
    {
        name: 'more than Manual trading',
        value: 'more',
    },
];

export const SORT_BY_OPTIONS: DropdownOption[] = [
    { value: 'high-to-low', label: 'high to low' },
    { value: 'low-to-high', label: 'low to high' },
    { value: 'average', label: 'average' },
];
