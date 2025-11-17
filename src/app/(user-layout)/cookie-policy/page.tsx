'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FooterSection } from '@/types/translations/footer';
import { useI18n } from '@/context/i18n/context';
import { formatLastUpdatedDate } from '@/utils/date-time-format'; // Import the type for safety

export default function CookiePolicy() {
    const { t, locale } = useI18n();

    // Fetch the array of sections from the translation file using the same type assertion pattern.
    const sections = t(
        'footer.cookiePolicy.sections' as never
    ) as unknown as FooterSection[];

    const lastUpdatedDate = new Date(2025, 10, 1, 8, 0, 0);

    const lastUpdatedText = t('common.lastUpdated').replace(
        '{date}',
        formatLastUpdatedDate(lastUpdatedDate, locale)
    );

    return (
        <div className="w-full h-full">
            <Link href="/auth/signup">
                <Button
                    variant="outline"
                    className="mb-6 dark:text-[var(--brand-color)] dark:hover:text-black dark:bg-transparent bg-[var(--brand-color)] hover:bg-[var(--brand-color)] dark:hover:bg-[var(--brand-color)] transition-colors! duration-300 ease-in-out dark:border-transparent border-transparent font-semibold"
                >
                    {t('common.backToSignUp')}
                </Button>
            </Link>

            {/* Title from translations */}
            <h1 className="text-size-22 font-bold text-brand-text dark:text-[var(--brand-color)] mb-2">
                {t('footer.cookiePolicy.title')}
            </h1>

            <div className="space-y-6 text-brand-text">
                <div className="border-b pb-2 border-[var(--brand-grey-foreground)]">
                    <p className="text-sm text-[var(--brand-grey-foreground)]/70">
                        {lastUpdatedText}
                    </p>
                </div>

                {Array.isArray(sections) &&
                    sections.map((section, index) => (
                        <section key={index}>
                            <h2 className="text-xl font-semibold mb-3">
                                {section.title}
                            </h2>
                            <p
                                className="text-[var(--brand-grey-foreground)] whitespace-pre-wrap [&>strong]:font-bold [&>strong]:text-brand-text leading-7"
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
