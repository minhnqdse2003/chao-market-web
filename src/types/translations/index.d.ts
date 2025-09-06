import { CommonTranslations } from '@/types/translations/common';
import { AuthTranslations } from '@/types/translations/auth';
import { ValidationTranslations } from '@/types/translations/validation';

export interface TranslationsStructure {
    common: CommonTranslations;
    auth: AuthTranslations;
    validation: ValidationTranslations;
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