/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { createContext, useContext, useMemo } from 'react';
import { useLocale } from '@/hooks/use-locale';
import { TranslationKey } from '@/types/translations';
import { en } from '@locales/en';
import { vi } from '@locales/vi';

const translations = {
    en,
    vi,
};

const I18nContext = createContext<{
    locale: string;
    setLocale: (locale: string) => void;
    t: (key: TranslationKey) => string;
}>({
    locale: 'en',
    setLocale: () => {},
    t: key => key as string,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const { locale, setLocale } = useLocale();

    const t = useMemo(() => {
        return (key: TranslationKey): string => {
            if (!locale) return key as string;
            const keys = key.trim().split('.');
            let result: any =
                translations[locale as keyof typeof translations] ||
                translations.en;

            for (const k of keys) {
                result = result?.[k];
            }

            return result || (key as string);
        };
    }, [locale]);

    const contextValue = useMemo(
        () => ({
            locale: locale || 'en',
            setLocale,
            t,
        }),
        [locale, setLocale, t]
    );

    return (
        <I18nContext.Provider value={contextValue}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    return useContext(I18nContext);
}
