import { AppFilterOptionsType } from '@/components/app-filter-select';

export const TIME_OPTIONS: AppFilterOptionsType[] = [
    { value: 'today', name: 'Today' },
    { value: 'thisWeek', name: 'This Week' },
    { value: 'thisMonth', name: 'This Month' },
    { value: 'custom', name: 'Custom' },
];

export const SOURCE_OPTIONS: AppFilterOptionsType[] = [
    { value: 'bloomberg', name: 'Bloomberg' },
    { value: 'vnexpress', name: 'Vnexpress' },
    { value: 'tygiavang', name: 'Tygiavang' },
    { value: 'baomoi', name: 'Baomoi' },
];
