'use client';

import { TranslationKey } from '@/types/translations';
import { useI18n } from '@/context/i18n/context';

interface TranslateProps {
    keyName: TranslationKey;
}

export function T({ keyName }: TranslateProps) {
    const { t } = useI18n();

    return <>{t(keyName)}</>;
}
