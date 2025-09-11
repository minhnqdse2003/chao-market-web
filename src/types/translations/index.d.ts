import { CommonTranslations } from '@/types/translations/common';
import { AuthTranslations } from '@/types/translations/auth';
import { ValidationTranslations } from '@/types/translations/validation';
import { CartItemsTranslations } from '@/types/translations/cart-items';
import { OurSolutionsTranslations } from '@/types/translations/our-solutions';
import { SidebarTranslations } from '@/types/translations/sidebar';
import { BookConsultationTranslations } from '@/types/translations/book-consultations';

export interface TranslationsStructure {
    common: CommonTranslations;
    auth: AuthTranslations;
    validation: ValidationTranslations;
    cartItems: CartItemsTranslations;
    ourSolutions: OurSolutionsTranslations;
    sidebar: SidebarTranslations;
    bookConsultation: BookConsultationTranslations;
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