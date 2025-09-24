'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AboutUsContent } from '@/types/translations/footer';
import { useI18n } from '@/context/i18n/context'; // Import the updated type

export default function AboutUs() {
    const { t } = useI18n();

    // Fetch the entire "aboutUs" object using the updated structure
    const aboutUsContent = t(
        'footer.aboutUs' as never
    ) as unknown as AboutUsContent;

    return (
        <div className="w-full h-full">
            <Link href="/">
                <Button
                    variant="outline"
                    className="mb-6 dark:text-[var(--brand-color)] dark:hover:text-black dark:bg-transparent bg-[var(--brand-color)] hover:bg-[var(--brand-color)] dark:hover:bg-[var(--brand-color)] transition-colors! duration-300 ease-in-out dark:border-transparent border-transparent font-semibold"
                >
                    {t('common.backToHome')}
                </Button>
            </Link>

            {/* Check if the content object was loaded successfully */}
            {aboutUsContent && (
                <>
                    <h1 className="text-3xl font-bold dark:text-[var(--brand-color)] text-brand-text mb-6">
                        {aboutUsContent.title}
                    </h1>

                    <div className="space-y-6 text-brand-text">
                        {/* Outer loop: Iterate over each section (e.g., Mission, Approach) */}
                        {Array.isArray(aboutUsContent.sections) &&
                            aboutUsContent.sections.map((section, index) => (
                                <section key={index}>
                                    <h2 className="text-xl font-semibold mb-3">
                                        {section.title}
                                    </h2>
                                    {/* Inner loop: Iterate over the paragraphs within this section */}
                                    <div className="space-y-4">
                                        {Array.isArray(section.content) &&
                                            section.content.map(
                                                (paragraph, pIndex) => (
                                                    <p
                                                        key={pIndex}
                                                        className="text-[var(--brand-grey-foreground)]"
                                                    >
                                                        {paragraph}
                                                    </p>
                                                )
                                            )}
                                    </div>
                                </section>
                            ))}
                    </div>
                </>
            )}
        </div>
    );
}
