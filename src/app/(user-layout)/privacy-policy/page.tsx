'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PrivacyPolicy() {
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

            <h1 className="text-3xl font-bold text-white mb-6">
                Privacy Policy
            </h1>

            <div className="space-y-6 text-white">
                <section>
                    <h2 className="text-xl font-semibold mb-3">
                        1. Information We Collect
                    </h2>
                    <p className="text-[var(--brand-grey-foreground)] mb-3">
                        We collect information you provide directly to us,
                        including your name, email address, date of birth, and
                        gender when you create an account.
                    </p>
                    <p className="text-[var(--brand-grey-foreground)]">
                        We also automatically collect information about your
                        device and usage, such as IP address, browser type, and
                        pages visited.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">
                        2. How We Use Your Information
                    </h2>
                    <ul className="list-disc list-inside text-[var(--brand-grey-foreground)] space-y-2">
                        <li>To provide and maintain our services</li>
                        <li>To communicate with you about your account</li>
                        <li>To improve our website and user experience</li>
                        <li>To comply with legal obligations</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">
                        3. Data Sharing and Disclosure
                    </h2>
                    <p className="text-[var(--brand-grey-foreground)]">
                        We do not sell or rent your personal information to
                        third parties. We may share information with trusted
                        service providers who assist us in operating our
                        services.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">
                        4. Data Security
                    </h2>
                    <p className="text-[var(--brand-grey-foreground)]">
                        We implement appropriate security measures to protect
                        your personal information. However, no method of
                        transmission over the Internet is 100% secure.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">
                        5. Your Rights
                    </h2>
                    <p className="text-[var(--brand-grey-foreground)]">
                        You have the right to access, update, or delete your
                        personal information. Contact us at
                        privacy@chaomarket.com for any privacy-related requests.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">
                        6. Changes to This Policy
                    </h2>
                    <p className="text-[var(--brand-grey-foreground)]">
                        We may update this policy from time to time. We will
                        notify you of any changes by posting the new policy on
                        this page.
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
