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
import { LogoBrand } from '@image/index';
import AppFooter from '@/components/app-footer';
import ContactButton from '@/components/app-contacts';
import { useI18n } from '@/context/i18n/context';

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { t } = useI18n();
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
                        <DialogContent
                            className='[&_*_div[data-slot="Container"]:last-child]:mb-8 [&_*_div[data-slot="Container"]>div]:px-6 [&_*_div[data-slot="Container"]>div]:py-6 [&_*_div[data-slot="Container"]>a]:px-6 [&_*_div[data-slot="Container"]>a]:py-6 [&_*_div[data-slot="Container"]>a:hover]:bg-[var(--brand-black-bg)] w-fit max-w-max min-w-fit [&_*_div[data-slot="Container"]>a:hover]:rounded-lg bg-brand-dialog'
                            onOpenAutoFocus={e => e.preventDefault()}
                        >
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
                            <div
                                className={
                                    'dark:[&_*_a]:text-[var(--brand-color)] text-[var(--brand-grey-foreground)]' +
                                    ' [&_*_strong]:text-brand-text [&_*_a]:hover:underline' +
                                    ' [&_*_a]:font-bold [&_*_strong]:font-normal' +
                                    ' space-y-4 w-fit min-w-fit'
                                }
                            >
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: t('helpAndFeedback.title'),
                                    }}
                                    className={
                                        'text-brand-text font-semibold min-w-fit'
                                    }
                                />
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: t('helpAndFeedback.desc'),
                                    }}
                                    className="w-fit min-w-fit [&>strong]:font-normal"
                                />
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: t('helpAndFeedback.endContent'),
                                    }}
                                    className="w-fit min-w-fit [&>strong]:font-bold [&>strong]:dark:text-[var(--brand-color)]/70"
                                />
                            </div>
                        </DialogContent>
                    </Dialog>

                    <ContactButton />
                </div>
                <AppFooter />
            </div>
        </div>
    );
}
