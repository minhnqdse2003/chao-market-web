'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AppFooter() {
    const pathname = usePathname();

    if (pathname.startsWith('/auth') || pathname.startsWith('/post')) {
        return null;
    }

    return (
        <footer className="dark:bg-sidebar border-t px-4 py-10">
            <div className="max-w-[80svw] flex flex-col justify-center space-y-8">
                {/* Footer Columns */}
                <div className="flex flex-col md:flex-row md:justify-between md:px-8">
                    {/* Get to Know Us Column */}
                    <div className="mb-8 md:mb-0">
                        <h3 className="font-semibold uppercase text-white text-center mb-4 text-lg">
                            Get to know us
                        </h3>
                        <ul className="space-y-3 text-normal text-[var(--brand-grey-foreground)] min-w-2/3 [&_*_a:first-child]:font-semibold">
                            <li>
                                <Link
                                    href="/about-us"
                                    className="hover:text-white"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms-of-use"
                                    className="hover:text-white"
                                >
                                    Term of Use
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="hover:text-white"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cookie-policy"
                                    className="hover:text-white"
                                >
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Let us help you Column */}
                    <div>
                        <h3 className="font-semibold uppercase text-white mb-4 text-lg">
                            Let us help you
                        </h3>
                        <ul className="space-y-3 text-normal dark:text-[var(--brand-grey-foreground)] min-w-2/3 [&_*_span:first-child]:font-semibold [&_*_span:last-child]:font-bold dark:[&_*_span:last-child]:text-brand-text">
                            <li className="flex justify-between gap-12">
                                <span>Consulting</span>
                                <span>consulting@chaomarket.com</span>
                            </li>
                            <li className="flex justify-between gap-12">
                                <span>Support</span>
                                <span>support@chaomarket.com</span>
                            </li>
                            <li className="flex justify-between gap-12">
                                <span>Contact</span>
                                <span>contact@chaomarket.com</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold uppercase text-white mb-4 text-lg">
                            Follow us
                        </h3>
                        <ul className="space-y-3 text-normal dark:text-[var(--brand-grey-foreground)] min-w-2/3 [&_*_span:first-child]:font-semibold [&_*_span:last-child]:font-bold dark:[&_*_span:last-child]:text-brand-text">
                            <li className="flex justify-between gap-12">
                                <span>Facebook</span>
                                <span>
                                    <a
                                        href="https://www.facebook.com/profile.php?id=61580243678116"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline"
                                    >
                                        Facebook
                                    </a>
                                </span>
                            </li>
                            <li className="flex justify-between gap-12">
                                <span>Tiktok</span>
                                <span>
                                    <a
                                        href="https://www.tiktok.com/@chaomarket.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline"
                                    >
                                        @chaomarket.com
                                    </a>
                                </span>
                            </li>
                            <li className="flex justify-between gap-12">
                                <span>Instagram</span>
                                <span>
                                    <a
                                        href="https://www.instagram.com/insta_chaomarket/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline"
                                    >
                                        @insta_chaomarket
                                    </a>
                                </span>
                            </li>
                            <li className="flex justify-between gap-12">
                                <span>Thread</span>
                                <span>
                                    <a
                                        href="https://www.threads.com/@insta_chaomarket"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline"
                                    >
                                        @insta_chaomarket
                                    </a>
                                </span>
                            </li>
                            <li className="flex justify-between gap-12">
                                <span>BIC</span>
                                <span>
                                    <a
                                        href="https://group.beincom.com/ref/DICgO2"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline"
                                    >
                                        Join Group
                                    </a>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center text-sm dark:text-[var(--brand-color)] text-brand-text font-semibold mt-6">
                    © 2025 Chaomarket.com. All rights reserved. All content on
                    this website is protected by intellectual property laws.
                    Unauthorized copying, reproduction, or distribution of any
                    material is strictly prohibited.
                </div>
            </div>
        </footer>
    );
}
