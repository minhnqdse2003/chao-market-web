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
import { BrandLogoFtHat, BugHelp, GeneralHelp } from '@image/index';
import { CircleQuestionMark, Headset } from 'lucide-react';
import AppFooter from '@/components/app-footer';

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
                         bg-[var(--brand-color)] text-black px-4 py-1 rounded-none rounded-l-xl
                         shadow-lg hover:bg-[var(--brand-color-foreground)] font-semibold vertical-text h-fit"
                                aria-label="Open dialog"
                            >
                                Help &amp; Feedback
                            </Button>
                        </DialogTrigger>
                        <DialogContent className='[&_*_div[data-slot="Container"]:last-child]:mb-8 [&_*_div[data-slot="Container"]>div]:px-6 [&_*_div[data-slot="Container"]>div]:py-4 [&_*_div[data-slot="Container"]>a]:px-6 [&_*_div[data-slot="Container"]>a]:py-4 [&_*_div[data-slot="Container"]>a:hover]:bg-[var(--brand-black-bg)] [&_*_div[data-slot="Container"]>a:hover]:rounded-lg'>
                            <DialogHeader className="flex flex-col items-center justify-center">
                                <Image
                                    alt={'logo-brand-ft-hat'}
                                    src={BrandLogoFtHat}
                                    width={1920}
                                    height={1080}
                                    className="size-22"
                                />
                                <DialogTitle className="text-[var(--brand-color)] text-xl font-semibold">
                                    Chào Market
                                </DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col gap-1">
                                <div data-slot="Container">
                                    <div className="flex items-start gap-4">
                                        <Headset className="size-7 text-[var(--brand-color)]" />
                                        <div className="flex flex-col gap-2">
                                            <p className="font-semibold text-xl">
                                                Support request
                                            </p>
                                            <p>
                                                What do you need us to support
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div data-slot="Container">
                                    <div className="flex items-start gap-4">
                                        <Image
                                            src={BugHelp}
                                            width={1920}
                                            height={1080}
                                            className="text-[var(--brand-color)] size-7"
                                            alt={'bug-help'}
                                        />
                                        <div className="flex flex-col gap-2">
                                            <p className="font-semibold text-xl">
                                                Report a bug
                                            </p>
                                            <p>Let’s us know what broken</p>
                                        </div>
                                    </div>
                                </div>
                                <div data-slot="Container">
                                    <div className="flex items-start gap-4">
                                        <Image
                                            src={GeneralHelp}
                                            width={1920}
                                            height={1080}
                                            className="text-[var(--brand-color)] size-7"
                                            alt={'bug-help'}
                                        />
                                        <div className="flex flex-col gap-2">
                                            <p className="font-semibold text-xl">
                                                General feedback
                                            </p>
                                            <p>Tell us how we can improve</p>
                                        </div>
                                    </div>
                                </div>
                                <div data-slot="Container">
                                    <a
                                        href={'/contacts'}
                                        className="flex items-start gap-4"
                                    >
                                        <CircleQuestionMark className="size-7 text-[var(--brand-color)]" />
                                        <div className="flex flex-col gap-2">
                                            <p className="font-semibold text-xl">
                                                Contact us
                                            </p>
                                            <p>FAQs and usage introduction</p>
                                        </div>
                                    </a>
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
