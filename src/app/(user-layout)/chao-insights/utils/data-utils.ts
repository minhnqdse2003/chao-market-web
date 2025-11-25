import { Localized } from '@/types/localized';

export type NewsType = {
    title: Localized;
    description: Localized;
    image?: string;
    like: number;
    dislike: number;
    views: number;
    date: string;
    referenceSource: string;
    slug: string;
    market: string;
};
