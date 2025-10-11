import { useI18n } from '@/context/i18n/context';
import { TranslationKey } from '@/types/translations';

export const TranslatedFormMessage = ({ message }: { message?: string }) => {
    const { t } = useI18n();
    if (!message) return null;

    return (
        <p className="text-sm font-medium text-destructive">
            {t(message as TranslationKey)}
        </p>
    );
};
