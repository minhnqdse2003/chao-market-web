'use client';

import { AppSidebar } from '@/components/app-sidebar';
import AppFooter from '@/components/app-footer';
import ContactButton from '@/components/app-contacts';
import AppNavbarMobile from '@/components/app-navbar-mobile';

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex w-full max-w-svw text-sm lg:text-base">
            <AppSidebar />
            <div className="flex flex-col w-full dark:bg-sidebar ">
                <div className="flex flex-col w-full dark:bg-sidebar relative">
                    <AppNavbarMobile />
                    <div className="min-h-svh px-6 pt-4 lg:px-12 lg:py-6">
                        {children}
                    </div>

                    {/* Dialog Container*/}
                    {/*       <Dialog>*/}
                    {/*           <DialogTrigger asChild>*/}
                    {/*               <Button*/}
                    {/*                   className="fixed top-1/2 right-0 transition-all! z-11 ease-out duration-300 transform translate-x-6/7 hover:translate-x-0 -translate-y-1/2*/}
                    {/*bg-brand-floating-btn text-black px-4 py-1 rounded-none rounded-l-xl*/}
                    {/*shadow-lg hover:bg-brand-floating-btn font-semibold vertical-text h-fit"*/}
                    {/*                   aria-label="Open dialog"*/}
                    {/*               >*/}
                    {/*                   Help &amp; Feedback*/}
                    {/*               </Button>*/}
                    {/*           </DialogTrigger>*/}
                    {/*           <DialogContent*/}
                    {/*               className='[&_*_div[data-slot="Container"]:last-child]:mb-8 [&_*_div[data-slot="Container"]>div]:px-6 [&_*_div[data-slot="Container"]>div]:py-6 [&_*_div[data-slot="Container"]>a]:px-6 [&_*_div[data-slot="Container"]>a]:py-6 [&_*_div[data-slot="Container"]>a:hover]:bg-[var(--brand-black-bg)] w-full lg:w-fit lg:max-w-max lg:min-w-fit [&_*_div[data-slot="Container"]>a:hover]:rounded-lg bg-brand-dialog'*/}
                    {/*               onOpenAutoFocus={e => e.preventDefault()}*/}
                    {/*           >*/}
                    {/*               <DialogHeader className="flex flex-col items-center justify-center">*/}
                    {/*                   <Image*/}
                    {/*                       alt={'logo-brand-ft-hat'}*/}
                    {/*                       src={LogoBrand}*/}
                    {/*                       width={300}*/}
                    {/*                       height={300}*/}
                    {/*                       className="lg:size-16 size-8"*/}
                    {/*                   />*/}
                    {/*                   <DialogTitle className="dark:text-[var(--brand-color)] text-brand-text text-center text-lg lg:text-size-22 font-semibold">*/}
                    {/*                       <p>Chào Market</p>*/}
                    {/*                       <p*/}
                    {/*                           className={*/}
                    {/*                               'dark:text-white text-brand-text font-medium' +*/}
                    {/*                               ' hidden' +*/}
                    {/*                               ' lg:block'*/}
                    {/*                           }*/}
                    {/*                       >*/}
                    {/*                           Manage Your Risk*/}
                    {/*                       </p>*/}
                    {/*                   </DialogTitle>*/}
                    {/*               </DialogHeader>*/}
                    {/*               <div*/}
                    {/*                   className={*/}
                    {/*                       'dark:[&_*_a]:text-[var(--brand-color)] text-[var(--brand-grey-foreground)]' +*/}
                    {/*                       ' [&_*_strong]:text-brand-text [&_*_a]:hover:underline' +*/}
                    {/*                       ' [&_*_a]:font-bold [&_*_strong]:font-bold' +*/}
                    {/*                       ' space-y-4 w-fit min-w-fit'*/}
                    {/*                   }*/}
                    {/*               >*/}
                    {/*                   <p*/}
                    {/*                       dangerouslySetInnerHTML={{*/}
                    {/*                           __html: t('helpAndFeedback.title'),*/}
                    {/*                       }}*/}
                    {/*                       className={*/}
                    {/*                           'text-brand-text dark:text-[var(--brand-color)] text-base lg:text-size-20' +*/}
                    {/*                           ' font-bold' +*/}
                    {/*                           ' w-full lg:min-w-fit'*/}
                    {/*                       }*/}
                    {/*                   />*/}
                    {/*                   <p*/}
                    {/*                       dangerouslySetInnerHTML={{*/}
                    {/*                           __html: t('helpAndFeedback.desc'),*/}
                    {/*                       }}*/}
                    {/*                       className="w-full lg:w-fit lg:min-w-fit [&>strong]:font-bold text-sm lg:text-base lg:text-nowrap leading-7"*/}
                    {/*                   />*/}
                    {/*                   <p*/}
                    {/*                       dangerouslySetInnerHTML={{*/}
                    {/*                           __html: t('helpAndFeedback.endContent'),*/}
                    {/*                       }}*/}
                    {/*                       className="w-full lg:w-fit lg:min-w-fit [&>strong]:font-medium text-sm [&>strong]:dark:text-[var(--brand-color)]"*/}
                    {/*                   />*/}
                    {/*               </div>*/}
                    {/*           </DialogContent>*/}
                    {/*       </Dialog>*/}

                    <ContactButton />
                </div>
                <AppFooter />
            </div>
        </div>
    );
}
