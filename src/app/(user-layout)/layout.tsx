'use client';

import { AppSidebar } from '@/components/app-sidebar';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { BugHelp, BugHelpLight, LogoBrand } from '@image/index';
import { CircleQuestionMark, Headset } from 'lucide-react';
import AppFooter from '@/components/app-footer';
import Link from 'next/link';
import { GiSparkles } from 'react-icons/gi';
import { useTheme } from 'next-themes';

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { theme } = useTheme();
    return (
        <div className="flex w-full max-w-svw">
            <AppSidebar />
            <div className="flex flex-col w-full dark:bg-sidebar ">
                <div className="flex flex-col w-full dark:bg-sidebar relative">
                    <div className="min-h-svh px-12 py-8">{children}</div>

                    {/* Dialog Container*/}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                className="fixed top-1/2 right-0 transition-all! ease-out duration-300 transform translate-x-6/7 hover:translate-x-0 -translate-y-1/2
                         bg-brand-floating-btn text-black px-4 py-1 rounded-none rounded-l-xl
                         shadow-lg hover:bg-brand-floating-btn font-semibold vertical-text h-fit"
                                aria-label="Open dialog"
                            >
                                Help &amp; Feedback
                            </Button>
                        </DialogTrigger>
                        <DialogContent className='[&_*_div[data-slot="Container"]:last-child]:mb-8 [&_*_div[data-slot="Container"]>div]:px-6 [&_*_div[data-slot="Container"]>div]:py-6 [&_*_div[data-slot="Container"]>a]:px-6 [&_*_div[data-slot="Container"]>a]:py-6 [&_*_div[data-slot="Container"]>a:hover]:bg-[var(--brand-black-bg)] [&_*_div[data-slot="Container"]>a:hover]:rounded-lg bg-brand-dialog'>
                            <DialogHeader className="flex flex-col items-center justify-center">
                                <Image
                                    alt={'logo-brand-ft-hat'}
                                    src={LogoBrand}
                                    width={1920}
                                    height={1080}
                                    className="size-16"
                                />
                                <DialogTitle className="dark:text-[var(--brand-color)] text-brand-text text-center text-lg font-semibold">
                                    <p>Chào Market</p>
                                    <p
                                        className={
                                            'text-sm dark:text-white text-brand-text font-medium'
                                        }
                                    >
                                        Manage Your Risk
                                    </p>
                                </DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col gap-1">
                                <div data-slot="Container">
                                    <Link
                                        href={'/contacts'}
                                        className="flex items-start gap-4 hover:bg-[var(--brand-grey)]!"
                                    >
                                        <Headset className="size-7 dark:text-[var(--brand-color)]" />
                                        <div className="flex flex-col gap-2">
                                            <p className="font-semibold text-xl">
                                                Support request
                                            </p>
                                            <p
                                                className={
                                                    'text-[var(--brand-grey-foreground)]'
                                                }
                                            >
                                                What do you need us to support ?
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                                <div data-slot="Container">
                                    <Link
                                        href={'/contacts'}
                                        className="flex items-start gap-4 hover:bg-[var(--brand-grey)]!"
                                    >
                                        <Image
                                            src={
                                                theme === 'dark'
                                                    ? BugHelp
                                                    : BugHelpLight
                                            }
                                            width={1920}
                                            height={1080}
                                            className="size-7"
                                            alt={'bug-help'}
                                        />
                                        <div className="flex flex-col gap-2">
                                            <p className="font-semibold text-xl">
                                                Report a bug
                                            </p>
                                            <p
                                                className={
                                                    'text-[var(--brand-grey-foreground)]'
                                                }
                                            >
                                                Let’s us know what broken
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                                <div data-slot="Container">
                                    <Link
                                        href={'/contacts'}
                                        className="flex items-start gap-4 hover:bg-[var(--brand-grey)]!"
                                    >
                                        <GiSparkles
                                            className={
                                                'size-7 dark:text-[var(--brand-color)]'
                                            }
                                        />
                                        <div className="flex flex-col gap-2">
                                            <p className="font-semibold text-xl">
                                                General feedback
                                            </p>
                                            <p
                                                className={
                                                    'text-[var(--brand-grey-foreground)]'
                                                }
                                            >
                                                Tell us how we can improve
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                                <div data-slot="Container">
                                    <Link
                                        href={'/contacts'}
                                        className="flex items-start gap-4 hover:bg-[var(--brand-grey)]!"
                                    >
                                        <CircleQuestionMark className="size-7 dark:text-[var(--brand-color)]" />
                                        <div className="flex flex-col gap-2">
                                            <p className="font-semibold text-xl">
                                                Contact us
                                            </p>
                                            <p
                                                className={
                                                    'text-[var(--brand-grey-foreground)]'
                                                }
                                            >
                                                FAQs and usage introduction
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                <AppFooter />
            </div>
        </div>
    );
}
