import { Localized } from '@/types/localized';

export type NewsType = {
    id: string;
    title: Localized;
    description: Localized;
    image: string | null;
    like: number;
    dislike: number;
    views: number;
    date: string;
    referenceSource: string;
    slug: string;
    market: string;
    currentInteractionType: 'LIKE' | 'DISLIKE' | null;
};
