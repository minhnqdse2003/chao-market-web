'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FooterSection } from '@/types/translations/footer';
import { useI18n } from '@/context/i18n/context';
import { formatLastUpdatedDate } from '@/utils/date-time-format'; // Import the type for safety

export default function TermsOfUse() {
    const { t, locale } = useI18n();

    const sections = t(
        'footer.termOfUse.sections' as never
    ) as unknown as FooterSection[];

    const lastUpdatedDate = new Date(2025, 10, 1, 8, 0, 0);
    const lastUpdatedText = t('common.lastUpdated').replace(
        '{date}',
        formatLastUpdatedDate(lastUpdatedDate, locale)
    );

    return (
        <div className="w-full h-full">
            <Link href="/auth/sign-up">
                <Button
                    variant="outline"
                    className="mb-6 dark:text-[var(--brand-color)] dark:hover:text-black dark:bg-transparent bg-[var(--brand-color)] hover:bg-[var(--brand-color)] dark:hover:bg-[var(--brand-color)] transition-colors! duration-300 ease-in-out dark:border-transparent border-transparent font-semibold"
                >
                    {t('common.backToSignUp')}
                </Button>
            </Link>

            <div className={'mb-6 flex flex-col gap-2'}>
                <h1 className="text-size-22 font-bold text-brand-text dark:text-[var(--brand-color)]">
                    {t('footer.termOfUse.title')}
                </h1>
                <div className="border-b pb-2 text-sm text-[var(--brand-grey-foreground)]/70 border-[var(--brand-grey-foreground)]">
                    {lastUpdatedText}
                </div>
            </div>

            <div className="space-y-6 text-brand-text">
                {Array.isArray(sections) &&
                    sections.map((section, index) => (
                        <section key={index}>
                            <h2 className="text-xl font-semibold mb-3">
                                {section.title}
                            </h2>
                            <p
                                className="text-brand-text/90 dark:text-[var(--brand-grey-foreground)] dark:[&>a]:text-[var(--brand-color)] [&>a]:font-bold [&>strong]:text-brand-text [&>a]:text-brand-text [&>a]:hover:underline dark:[&>strong]:text-brand-text [&>strong]:font-bold whitespace-pre-wrap leading-7"
                                dangerouslySetInnerHTML={{
                                    __html: section.content,
                                }}
                            />
                        </section>
                    ))}
            </div>
        </div>
    );
}
