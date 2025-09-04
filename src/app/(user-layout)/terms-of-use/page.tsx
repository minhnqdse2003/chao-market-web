'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TermsOfUse() {
    return (
        <div className="w-full h-full">
            <Link href="/auth/signup">
                <Button
                    variant="outline"
                    className="mb-6 text-[var(--brand-color)] dark:bg-transparent hover:text-black dark:hover:bg-[var(--brand-color)] transition-colors! duration-300 ease-in-out dark:border-transparent hover:font-semibold"
                >
                    ← Back to Sign Up
                </Button>
            </Link>

            <h1 className="text-3xl font-bold text-white mb-6">Terms of Use</h1>

            <div className="space-y-6 text-white">
                <section>
                    <h2 className="text-xl font-semibold mb-3">
                        1. Acceptance of Terms
                    </h2>
                    <p className="text-[var(--brand-grey-foreground)]">
                        By accessing or using ChaoMarket services, you agree to
                        be bound by these Terms of Use and all applicable laws
                        and regulations.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">
                        2. Eligibility
                    </h2>
                    <p className="text-[var(--brand-grey-foreground)]">
                        You must be at least 18 years old to use our services.
                        By using ChaoMarket, you represent and warrant that you
                        meet this requirement.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">
                        3. Account Registration
                    </h2>
                    <p className="text-[var(--brand-grey-foreground)] mb-3">
                        To access certain features, you must create an account.
                        You agree to:
                    </p>
                    <ul className="list-disc list-inside text-[var(--brand-grey-foreground)] space-y-2 ml-4">
                        <li>Provide accurate and complete information</li>
                        <li>Maintain and update your information</li>
                        <li>Maintain the security of your password</li>
                        <li>Notify us immediately of any unauthorized use</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">
                        4. User Conduct
                    </h2>
                    <p className="text-[var(--brand-grey-foreground)] mb-3">
                        You agree not to:
                    </p>
                    <ul className="list-disc list-inside text-[var(--brand-grey-foreground)] space-y-2 ml-4">
                        <li>Use the service for any illegal purpose</li>
                        <li>Interfere with or disrupt the service</li>
                        <li>Attempt to gain unauthorized access</li>
                        <li>Transmit any harmful code or content</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">
                        5. Intellectual Property
                    </h2>
                    <p className="text-[var(--brand-grey-foreground)]">
                        All content, trademarks, and other intellectual property
                        on ChaoMarket are owned by us or our licensors. You may
                        not use our intellectual property without our prior
                        written consent.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">
                        6. Disclaimer of Warranties
                    </h2>
                    <p className="text-[var(--brand-grey-foreground)]">
                        The service is provided &#34;as is&#34; without any
                        warranties of any kind. We do not warrant that the
                        service will be uninterrupted or error-free.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">
                        7. Limitation of Liability
                    </h2>
                    <p className="text-[var(--brand-grey-foreground)]">
                        To the fullest extent permitted by law, ChaoMarket shall
                        not be liable for any indirect, incidental, special, or
                        consequential damages.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">
                        8. Changes to Terms
                    </h2>
                    <p className="text-[var(--brand-grey-foreground)]">
                        We reserve the right to modify these terms at any time.
                        We will notify you of significant changes by posting a
                        notice on our website.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">
                        9. Governing Law
                    </h2>
                    <p className="text-[var(--brand-grey-foreground)]">
                        These terms shall be governed by and construed in
                        accordance with the laws of [Your Jurisdiction], without
                        regard to its conflict of law provisions.
                    </p>
                </section>

                <div className="pt-6 border-t border-[var(--brand-grey-foreground)]">
                    <p className="text-sm text-[var(--brand-grey-foreground)]">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
}
