import React from 'react';
import Image from 'next/image';
import { Warning3D } from '@image/index';

export default function AppFooter() {
    return (
        <footer className="dark:bg-sidebar border-t px-4 py-10">
            <div className="max-w-[80svw] flex mx-auto flex-col space-y-8">
                <div className="flex flex-col md:flex-row md:justify-between md:space-x-16">
                    {/* Left info section */}
                    <div className="md:w-2/3 flex items-center gap-12">
                        {/* Warning icon */}
                        <Image
                            src={Warning3D}
                            alt={'warning-3d-icon'}
                            width={1920}
                            height={1080}
                            className="w-1/6 h-auto"
                        />
                        <p className="text-sm leading-relaxed w-2/3 text-[var(--brand-color)]">
                            The information on this website is for informational
                            purposes only and should not be considered as
                            investment advice. All investment decisions carry
                            financial risks, and you are solely responsible for
                            your own decisions. We encourage you to seek advice
                            from independent financial professionals before
                            making any transactions.
                        </p>
                    </div>

                    {/* Four columns for links */}
                    <div className="md:w-2/3 grid grid-cols-3 gap-10 text-sm">
                        {/* About Us */}
                        <div>
                            <h3 className="font-semibold text-white mb-4">
                                About Us
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:text-white">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Term of Use
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Cookie Policy
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Products */}
                        <div>
                            <h3 className="font-semibold text-white mb-4">
                                Products
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Personal Financial Advisory
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Portfolio Management
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Trading System Development
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white">
                                        Real Trading Account Analysis
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Us */}
                        <div>
                            <h3 className="font-semibold text-white mb-4">
                                Contact Us
                            </h3>
                            <ul className="space-y-2">
                                <li className="flex justify-between">
                                    <span>Support</span>
                                    <a
                                        href="mailto:service@example.com"
                                        className="hover:text-white font-semibold"
                                    >
                                        service@
                                    </a>
                                </li>
                                <li className="flex justify-between">
                                    <span>Business</span>
                                    <a
                                        href="mailto:business@example.com"
                                        className="hover:text-white font-semibold"
                                    >
                                        business@
                                    </a>
                                </li>
                                <li className="flex justify-between">
                                    <span>Marketing</span>
                                    <a
                                        href="mailto:marketing@example.com"
                                        className="hover:text-white font-semibold"
                                    >
                                        marketing@
                                    </a>
                                </li>
                                <li className="flex justify-between">
                                    <span>News</span>
                                    <a
                                        href="mailto:press@example.com"
                                        className="hover:text-white font-semibold"
                                    >
                                        press@
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer bottom text */}
                <div className="text-center text-xs text-gray-400 mt-6">
                    © 2025 Chaomarket.com. All rights reserved. All content on
                    this website is protected by intellectual property laws.
                    Unauthorized copying, reproduction, or distribution of any
                    material is strictly prohibited.
                </div>
            </div>
        </footer>
    );
}
