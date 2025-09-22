'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    Facebook,
    Instagram,
    Phone,
    Mail,
    Users,
    LifeBuoy,
    ThumbsUp,
} from 'lucide-react'; // Import Lucide icons

export default function AppFooter() {
    const pathname = usePathname();

    if (pathname.startsWith('/auth') || pathname.startsWith('/post')) {
        return null;
    }

    // Define social media links with icons
    const socialLinks = [
        {
            name: '@Chào Market',
            url: 'https://www.facebook.com/profile.php?id=61580243678116',
            icon: <Facebook size={20} />,
        },
        {
            name: '@chaomarket.com',
            url: 'https://www.tiktok.com/@chaomarket.com',
            icon: <ThumbsUp size={20} />,
        },
        {
            name: '@_chaomarket_',
            url: 'https://www.instagram.com/_chaomarket_/',
            icon: <Instagram size={20} />,
        },
        {
            name: '@_chaomarket_',
            url: 'https://www.threads.net/@_chaomarket_/',
            icon: <Mail size={20} />,
        },
        {
            name: '@Chào Market',
            url: 'https://group.beincom.com/ref/DICgO2',
            icon: <Users size={20} />,
        },
    ];

    return (
        <footer className="dark:bg-sidebar border-t px-4 py-10">
            <div className="max-w-[80svw] flex flex-col justify-center mx-auto space-y-8">
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
                    <div className="mb-8 md:mb-0">
                        {' '}
                        {/* Added margin for consistency on mobile */}
                        <h3 className="font-semibold uppercase text-white mb-4 text-lg">
                            Let us help you
                        </h3>
                        <ul className="space-y-3 text-normal dark:text-[var(--brand-grey-foreground)] min-w-2/3 [&_*_span:first-child]:font-semibold [&_*_span:last-child]:font-bold dark:[&_*_span:last-child]:text-brand-text">
                            <li className="flex justify-between gap-12">
                                <span className="flex items-center gap-2">
                                    <Users size={20} />
                                    Consulting
                                </span>
                                <span>
                                    <a
                                        href="mailto:consulting@chaomarket.com"
                                        className="hover:underline"
                                    >
                                        consulting@chaomarket.com
                                    </a>
                                </span>
                            </li>
                            <li className="flex justify-between gap-12">
                                <span className="flex items-center gap-2">
                                    <LifeBuoy size={20} />
                                    Support
                                </span>
                                <span>
                                    <a
                                        href="mailto:support@chaomarket.com"
                                        className="hover:underline"
                                    >
                                        support@chaomarket.com
                                    </a>
                                </span>
                            </li>
                            <li className="flex justify-between gap-12">
                                <span className="flex items-center gap-2">
                                    <Mail size={20} />
                                    Contact
                                </span>
                                <span>
                                    <a
                                        href="mailto:contact@chaomarket.com"
                                        className="hover:underline"
                                    >
                                        contact@chaomarket.com
                                    </a>
                                </span>
                            </li>
                            <li className="flex justify-between gap-12">
                                <span className="flex items-center gap-2">
                                    <Phone size={20} />
                                    Phone
                                </span>
                                <span>
                                    <a
                                        href="tel:0985865674"
                                        className="hover:underline"
                                    >
                                        0985865674
                                    </a>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Follow us Column */}
                    <div>
                        <h3 className="font-semibold uppercase text-white mb-4 text-lg">
                            Follow us
                        </h3>
                        <ul className="space-y-3 text-normal dark:text-[var(--brand-grey-foreground)] min-w-2/3">
                            {socialLinks.map((link, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between gap-12"
                                >
                                    <span className="flex items-center gap-2">
                                        {link.icon}
                                    </span>
                                    <span>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline text-brand-text"
                                        >
                                            {link.name === 'BIC'
                                                ? 'Join Group'
                                                : link.name}
                                        </a>
                                    </span>
                                </li>
                            ))}
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
