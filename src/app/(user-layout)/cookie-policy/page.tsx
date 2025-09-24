'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FooterSection } from '@/types/translations/footer';
import { useI18n } from '@/context/i18n/context'; // Import the type for safety

export default function CookiePolicy() {
    const { t } = useI18n();

    // Fetch the array of sections from the translation file using the same type assertion pattern.
    const sections = t(
        'footer.cookiePolicy.sections' as never
    ) as unknown as FooterSection[];

    // Manually handle the date placeholder for the "last updated" text.
    const lastUpdatedText = t('common.lastUpdated').replace(
        '{date}',
        new Date().toLocaleDateString()
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
            <h1 className="text-3xl font-bold text-brand-text dark:text-[var(--brand-color)] mb-6">
                {t('footer.cookiePolicy.title')}
            </h1>

            <div className="space-y-6 text-brand-text">
                {/*
                  Check if `sections` is an array before mapping to prevent errors.
                */}
                {Array.isArray(sections) &&
                    sections.map((section, index) => (
                        <section key={index}>
                            <h2 className="text-xl font-semibold mb-3">
                                {section.title}
                            </h2>
                            {/*
                            `whitespace-pre-wrap` is essential here to render the
                            bullet points/line breaks from your translation string correctly.
                        */}
                            <p className="text-[var(--brand-grey-foreground)] whitespace-pre-wrap">
                                {section.content}
                            </p>
                        </section>
                    ))}

                <div className="pt-6 border-t border-[var(--brand-grey-foreground)]">
                    <p className="text-sm text-[var(--brand-grey-foreground)]">
                        {lastUpdatedText}
                    </p>
                </div>
            </div>
        </div>
    );
}
