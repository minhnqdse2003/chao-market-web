'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BIC, Facebook, Instagram, ThreadBlack, TikTok } from '@image/index';
import { Mail, Phone, Users } from 'lucide-react';

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
            icon: (
                <Image
                    alt={'facebook-img'}
                    className={'size-6 rounded-full p-0.5'}
                    src={Facebook}
                    width={1920}
                    height={1080}
                />
            ),
        },
        {
            name: '@chaomarket.com',
            url: 'https://www.tiktok.com/@chaomarket.com',
            icon: (
                <Image
                    alt={'tiktok-img'}
                    className={'size-6 rounded-full p-0.5'}
                    src={TikTok}
                    width={1920}
                    height={1080}
                />
            ),
        },
        {
            name: '@_chaomarket_',
            url: 'https://www.instagram.com/_chaomarket_/',
            icon: (
                <Image
                    alt={'instagram-img'}
                    className={'size-6 rounded-full p-0.5'}
                    src={Instagram}
                    width={1920}
                    height={1080}
                />
            ),
        },
        {
            name: '@_chaomarket_',
            url: 'https://www.threads.net/@_chaomarket_/',
            icon: (
                <Image
                    alt={'threads-img'}
                    className={'size-6 rounded-full p-0.5'}
                    src={ThreadBlack}
                    width={1920}
                    height={1080}
                />
            ),
        },
        {
            name: '@Chào Market',
            url: 'https://group.beincom.com/ref/DICgO2',
            icon: (
                <Image
                    alt={'threads-img'}
                    className={'size-6 rounded-full p-0.5'}
                    src={BIC}
                    width={1920}
                    height={1080}
                />
            ),
        },
    ];

    return (
        <footer className="dark:bg-sidebar border-t px-4 py-10">
            <div className="max-w-[80svw] flex flex-col justify-center mx-auto space-y-8">
                {/* Footer Columns */}
                <div className="flex flex-col md:flex-row md:justify-between md:px-8">
                    {/* Get to Know Us Column */}
                    <div className="mb-8 md:mb-0">
                        <h3 className="font-semibold uppercase text-brand-text text-center mb-4 text-lg">
                            Get to know us
                        </h3>
                        <ul className="space-y-3 text-normal text-brand-text min-w-2/3 [&_*_a:first-child]:font-semibold">
                            <li>
                                <Link
                                    href="/about-us"
                                    className="hover:underline"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms-of-use"
                                    className="hover:underline"
                                >
                                    Term of Use
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="hover:underline"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cookie-policy"
                                    className="hover:underline"
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
                        <h3 className="font-semibold uppercase text-brand-text mb-4 text-lg">
                            Let us help you
                        </h3>
                        <ul className="space-y-3 text-normal dark:text-[var(--brand-grey-foreground)] text-[var(--brand-grey-foreground)] min-w-2/3 [&_*_span:first-child]:font-semibold [&_*_span:last-child]:font-bold dark:[&_*_span:last-child]:text-brand-text [&>_*_a]:text-brand-text">
                            <li className="flex justify-between gap-12">
                                <span className="flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={'size-6'}
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M12.563 10.875V9.187L9.75 12l2.813 2.813v-1.688h5.099l-5.405 5.227L5.724 12l6.532-6.352l3.461 3.365c.212.206.499.321.798.321s.586-.115.798-.32a1.08 1.08 0 0 0 0-1.552l-4.258-4.14A1.15 1.15 0 0 0 12.256 3a1.14 1.14 0 0 0-.797.321L3.33 11.224a1.08 1.08 0 0 0-.331.777c0 .29.119.569.33.775l8.129 7.903c.211.206.499.321.797.321c.3 0 .587-.115.799-.321l7.438-7.232c.309-.293.507-.67.507-1.111c0-.442-.198-.819-.517-1.12c-.21-.201-.493-.341-.788-.341z"
                                        />
                                    </svg>
                                    Information
                                </span>
                                <span>
                                    <a
                                        href="mailto:info@chaomarket.com"
                                        className="hover:underline"
                                    >
                                        info@chaomarket.com
                                    </a>
                                </span>
                            </li>
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
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 512 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="m494 61.363l-82.58 77.934l78.994 132.96l3.586-4.458V61.362zM18 62.5v225.893c4.48.582 9.863.903 15.295.96c11.87.125 21.654-.65 27.15-1.144L113.1 154.974zm389.154 104.86l-7.04 4.556c-.15.097-5.362 3.336-6.893 4.29l-10.605 6.42l.15.09c-4.914 3.057-6.28 3.917-11.857 7.38c-2.83 1.757-2.9 1.798-5.584 3.465c-20.29-10.907-42.306-19.29-67.998-25.882c-32.312 9.762-66.542 23.888-100.722 37.142c14.19 17.087 29.96 22.651 45.845 22.85c18.42.23 37.25-7.78 50.218-16.754l7.4-5.12l7.426 10.73l115.453 83.33l45.112-29.987zm-280.677 2.74L81.11 284.887l16.65 12.803l30.795-34.905l2.467-2.795l3.72-.232q2.25-.141 4.44-.13c10.212.066 19.342 2.716 26.19 8.76c5.072 4.472 8.444 10.426 10.4 17.32l2.28-.142c11.995-.75 22.802 1.725 30.63 8.63c7.827 6.907 11.63 17.323 12.38 29.32l.07 1.08c6.44 1.216 12.205 3.752 16.893 7.888c7.828 6.906 11.63 17.32 12.38 29.317l.197 3.12a38 38 0 0 1 1.9.658l2.033-2.853l5.47-7.678l2.813-3.95l7.33 5.223l59.428 42.336c6.464-1.594 10.317-4.075 12.46-7.086c2.147-3.012 3.233-7.47 2.624-14.107l-71.258-51.03l-7.318-5.24l5.19-7.246l6.67-9.365l7.33 5.223l80.335 57.226c6.464-1.593 10.32-4.074 12.463-7.085c2.144-3.01 3.23-7.457 2.625-14.082l-92.398-65.55l-7.34-5.21l10.414-14.68l7.343 5.208l92.414 65.565c6.47-1.594 10.327-4.075 12.473-7.088c2.148-3.015 3.233-7.476 2.62-14.125l-110.44-79.71c-14.655 8.688-33.402 15.648-53.557 15.396c-23.587-.295-48.817-11.566-67.377-40.05a9 9 0 0 1 4.343-13.327c13.014-4.945 26.163-10.17 39.343-15.354l-92.056-6.834zm12.902 107.62l-47.564 53.91c.927 6.746 3.04 10.942 5.887 13.454s7.275 4.085 14.084 4.164l47.563-53.908c-.927-6.747-3.04-10.945-5.887-13.457s-7.274-4.084-14.084-4.162zm43.308 25.81l-53.713 60.88c.926 6.747 3.04 10.945 5.886 13.457c2.85 2.51 7.275 4.083 14.085 4.16l53.713-60.878c-.926-6.748-3.04-10.944-5.887-13.457s-7.273-4.085-14.083-4.164zm29.34 38.286l-47.56 53.91c.927 6.746 3.04 10.943 5.887 13.456c2.848 2.512 7.275 4.083 14.084 4.162L232 359.44c-.927-6.75-3.04-10.947-5.887-13.46c-2.847-2.512-7.274-4.083-14.084-4.162zm24.702 39.137l-38.794 44.28c.925 6.76 3.038 10.962 5.888 13.476c2.845 2.51 7.267 4.082 14.067 4.163l38.796-44.28c-.926-6.758-3.04-10.96-5.89-13.476c-2.844-2.51-7.266-4.08-14.066-4.162zm35.342 4.79c1.694 4.62 2.673 9.74 3.014 15.192l.232 3.704l-8.277 9.448l26.724 19.037c6.464-1.594 10.316-4.075 12.46-7.086c2.145-3.01 3.233-7.464 2.628-14.093l-36.78-26.2z"
                                        ></path>
                                    </svg>
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
                                        098 586 5674
                                    </a>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Follow us Column */}
                    <div>
                        <h3 className="font-semibold uppercase text-brand-text mb-4 text-lg">
                            Follow us
                        </h3>
                        <ul className="space-y-3 text-normal dark:text-[var(--brand-grey-foreground)] min-w-2/3">
                            {socialLinks.map((link, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between gap-12"
                                >
                                    <span className="flex items-center gap-2 text-[var(--brand-color)]">
                                        {link.icon}
                                    </span>
                                    <span>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline text-brand-text font-semibold"
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
