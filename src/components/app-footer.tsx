'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
    Facebook,
    Instagram,
    ThreadBlack,
    TikTok,
    Youtube,
} from '@image/index';
import { Mail, Users } from 'lucide-react';
import { useI18n } from '@/context/i18n/context'; // Assuming useI18n is available
import { T } from './app-translate';

export default function AppFooter() {
    const { t } = useI18n(); // Get translation function

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
            name: '@ChaoMarket',
            url: 'https://www.youtube.com/@ChaoMarket',
            icon: (
                <Image
                    alt={'youtube-img'}
                    className={'size-6 rounded-full p-0.5'}
                    src={Youtube}
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
    ];

    return (
        <footer className="dark:bg-sidebar border-t px-4 py-10">
            <div className="max-w-[80svw] flex flex-col justify-center mx-auto space-y-8">
                {/* Footer Columns */}
                <div className="flex flex-col md:flex-row md:justify-between md:px-8">
                    {/* Get to Know Us Column */}
                    <div className="mb-8 md:mb-0">
                        <h3 className="font-semibold uppercase text-brand-text mb-4 text-lg">
                            <T keyName={'footer.getToKnowUs'} />{' '}
                            {/* APPLIED KEY */}
                        </h3>
                        <ul className="space-y-3 text-normal text-[var(--brand-grey-foreground)] [&>_*_a]:hover:text-brand-text min-w-2/3 [&_*_a:first-child]:font-normal">
                            <li>
                                <Link
                                    href="/about-us"
                                    className="hover:underline"
                                >
                                    <T keyName={'footer.aboutUs.title'} />{' '}
                                    {/* APPLIED KEY */}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms-of-use"
                                    className="hover:underline"
                                >
                                    <T keyName={'footer.termOfUse.title'} />{' '}
                                    {/* APPLIED KEY */}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="hover:underline"
                                >
                                    <T keyName={'footer.privacyPolicy.title'} />{' '}
                                    {/* APPLIED KEY */}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cookie-policy"
                                    className="hover:underline"
                                >
                                    <T keyName={'footer.cookiePolicy.title'} />{' '}
                                    {/* APPLIED KEY */}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Let us help you Column */}
                    <div className="mb-8 md:mb-0">
                        <h3 className="font-semibold uppercase text-brand-text mb-4 text-lg">
                            <T keyName={'common.letUsHelpYou'} />{' '}
                            {/* APPLIED KEY */}
                        </h3>
                        <ul className="space-y-3 text-normal dark:text-[var(--brand-grey-foreground)] text-[var(--brand-grey-foreground)] min-w-2/3 [&_*_span:first-child]:font-normal [&_*_span:last-child]:font-semibold dark:[&_*_span:last-child]:text-brand-text [&>_*_a]:text-brand-text">
                            <li className="flex justify-between">
                                <span className="flex items-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={'size-5'}
                                        viewBox="2 2 20 20"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M12.563 10.875V9.187L9.75 12l2.813 2.813v-1.688h5.099l-5.405 5.227L5.724 12l6.532-6.352l3.461 3.365c.212.206.499.321.798.321s.586-.115.798-.32a1.08 1.08 0 0 0 0-1.552l-4.258-4.14A1.15 1.15 0 0 0 12.256 3a1.14 1.14 0 0 0-.797.321L3.33 11.224a1.08 1.08 0 0 0-.331.777c0 .29.119.569.33.775l8.129 7.903c.211.206.499.321.797.321c.3 0 .587-.115.799-.321l7.438-7.232c.309-.293.507-.67.507-1.111c0-.442-.198-.819-.517-1.12c-.21-.201-.493-.341-.788-.341z"
                                        />
                                    </svg>
                                    <T keyName={'common.information'} />{' '}
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
                            <li className="flex justify-between">
                                <span className="flex items-center gap-2">
                                    <Users size={20} />
                                    <T keyName={'common.consulting'} />{' '}
                                    {/* APPLIED KEY */}
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
                            <li className="flex justify-between">
                                <span className="flex items-center gap-2">
                                    <Mail size={20} />
                                    <T keyName={'common.contact'} />{' '}
                                    {/* APPLIED KEY */}
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
                            {/*<li className="flex justify-between gap-12">*/}
                            {/*    <span className="flex items-center gap-2">*/}
                            {/*        <Phone size={20} />*/}
                            {/*        <T keyName={'common.phone'} />{' '}*/}
                            {/*    </span>*/}
                            {/*    <span>*/}
                            {/*        <a*/}
                            {/*            href="tel:0985865674"*/}
                            {/*            className="hover:underline"*/}
                            {/*        >*/}
                            {/*            +84 98 586 5674*/}
                            {/*        </a>*/}
                            {/*    </span>*/}
                            {/*</li>*/}
                        </ul>
                    </div>

                    {/* Follow us Column */}
                    <div>
                        <h3 className="font-semibold uppercase text-brand-text mb-4 text-lg">
                            <T keyName={'footer.followUs'} />{' '}
                            {/* APPLIED KEY */}
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
                                                ? t('footer.joinGroup') // Assuming you add a key for 'Join Group' if needed
                                                : link.name}
                                        </a>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div
                    className="text-center text-sm dark:text-[var(--brand-color)] text-brand-text font-semibold mt-6"
                    dangerouslySetInnerHTML={{ __html: t('footer.copyright') }}
                />
            </div>
        </footer>
    );
}
