'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FooterSection } from '@/types/translations/footer';
import { useI18n } from '@/context/i18n/context'; // Import the type for safety

export default function PrivacyPolicy() {
    const { t } = useI18n();

    // The logic is the same as before: cast the key to `any` to get the array,
    // then cast the result to the correct type.
    const sections = t(
        'footer.privacyPolicy.sections' as never
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
                    className="mb-6 text-[var(--brand-color)] dark:bg-transparent hover:text-black dark:hover:bg-[var(--brand-color)] transition-colors! duration-300 ease-in-out dark:border-transparent hover:font-semibold"
                >
                    {t('common.backToSignUp')}
                </Button>
            </Link>

            {/* Title from translations */}
            <h1 className="text-3xl font-bold text-white mb-6">
                {t('footer.privacyPolicy.title')}
            </h1>

            <div className="space-y-6 text-white">
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
                            `whitespace-pre-wrap` is ESSENTIAL here.
                            Your privacy policy content uses line breaks (\n) for bullet points.
                            This class ensures they are rendered correctly.
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
