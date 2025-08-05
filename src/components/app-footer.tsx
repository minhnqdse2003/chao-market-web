import React from 'react';

export default function AppFooter() {
    return (
        <footer className="dark:bg-sidebar border-t px-4 py-10">
            <div className="max-w-[80svw] flex flex-col mx-auto space-y-8">
                {/* Footer Columns */}
                <div className="flex flex-col md:flex-row md:justify-center md:space-x-16">
                    {/* Get to Know Us Column */}
                    <div className="mb-8 md:mb-0">
                        <span className="text-lg text-[var(--brand-grey)] font-semibold">
                            Section
                        </span>
                        <h3 className="font-semibold pl-8 text-white text-center mb-4 text-lg">
                            Get to know us
                        </h3>
                        <ul className="space-y-3 text-normal text-[var(--brand-grey)] min-w-2/3 [&_*_a:first-child]:font-semibold">
                            <li>
                                <a href="#" className="hover:text-white">
                                    About Us
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

                    {/* Let us help you Column */}
                    <div>
                        <span className="text-lg text-[var(--brand-grey)] font-semibold">
                            Section
                        </span>
                        <h3 className="font-semibold text-white text-center pl-8 mb-4 text-lg">
                            Let us help you
                        </h3>
                        <ul className="space-y-3 text-normal text-[var(--brand-grey)] min-w-2/3 [&_*_span:first-child]:font-semibold [&_*_span:last-child]:font-bold [&_*_span:last-child]:text-[var(--brand-grey-foreground)]">
                            <li className="flex justify-between gap-12">
                                <span>Support</span>
                                <span>service@</span>
                            </li>
                            <li className="flex justify-between gap-12">
                                <span>Bussiness</span>
                                <span>bussiness@</span>
                            </li>
                            <li className="flex justify-between gap-12">
                                <span>Marketing</span>
                                <span>marketing@</span>
                            </li>
                            <li className="flex justify-between gap-12">
                                <span>News</span>
                                <span>press@</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer warning/disclaimer */}
                <div className="text-center text-normal mt-2">
                    <div className="text-[var(--brand-color)]">
                        The information on this website is for informational
                        purposes only and should not be considered as investment
                        advice.
                        <br />
                        All investment decisions carry financial risks, and you
                        are solely responsible for your own decisions.
                        <br />
                        We encourage you to seek advice from independent
                        financial professionals before making any transactions.
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center text-sm text-white font-semibold mt-6">
                    © 2025 Chaomarket.com. All rights reserved. All content on
                    this website is protected by intellectual property laws.
                    Unauthorized copying, reproduction, or distribution of any
                    material is strictly prohibited.
                </div>
            </div>
        </footer>
    );
}
