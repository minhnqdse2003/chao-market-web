import { CommonTranslations } from '@/types/translations/common';
import { AuthTranslations } from '@/types/translations/auth';
import { ValidationTranslations } from '@/types/translations/validation';
import { CartItemsTranslations } from '@/types/translations/cart-items';
import { OurSolutionsTranslations } from '@/types/translations/our-solutions';
import { SidebarTranslations } from '@/types/translations/sidebar';
import { BookConsultationTranslations } from '@/types/translations/book-consultations';
import { FooterTranslations } from '@/types/translations/footer';
import { MarketData } from '@/types/translations/market-data';
import { Investors } from '@/types/translations/investors';
import { AccountTranslations } from '@/types/translations/account';
import ToolsTranslations from '@/types/translations/tools';

export interface TranslationsStructure {
    common: CommonTranslations;
    auth: AuthTranslations;
    validation: ValidationTranslations;
    consultationRequest: CartItemsTranslations;
    ourSolutions: OurSolutionsTranslations;
    sidebar: SidebarTranslations;
    bookConsultation: BookConsultationTranslations;
    contactButton: ContactButtonTranslations;
    footer: FooterTranslations;
    marketData: MarketData;
    investors: Investors;
    community: CommunityTranslations;
    account: AccountTranslations;
    tool: ToolsTranslations;
}

type Leaves<T, K extends string = ''> = T extends object
    ? {
        [P in keyof T]-?: P extends string
            ? T[P] extends object
                ? Leaves<T[P], `${K}${K extends '' ? '' : '.'}${P}`>
                : `${K}${K extends '' ? '' : '.'}${P}`
            : never;
    }[keyof T]
    : K;

export type TranslationKey = Leaves<TranslationsStructure>;