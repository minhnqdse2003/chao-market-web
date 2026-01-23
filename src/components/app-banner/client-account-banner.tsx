import { useI18n } from '@/context/i18n/context';

export default function ClientAccountBanner() {
    const { t } = useI18n();
    return (
        <div className="w-full max-h-[14svh] dark:bg-[var(--brand-black-bg)] bg-[var(--brand-grey)] py-8 rounded-2xl mb-4 flex items-center justify-center">
            <p
                className="text-center text-sm lg:text-3xl italic text-[var(--brand-grey-foreground)]"
                dangerouslySetInnerHTML={{
                    __html: t('brandSlogan.clientPromise'),
                }}
            />
        </div>
    );
}
