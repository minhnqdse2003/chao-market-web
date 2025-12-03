'use client';
import TabAuthMode from '@/app/(user-layout)/auth/components/tab-auth-mode';
import Image from 'next/image';
import { CompleteCheckout } from '@image/index';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useI18n } from '@/context/i18n/context';

interface PageProps {
    searchParams: {
        firstName: string;
    };
}

export default function SuccessPage({ searchParams }: PageProps) {
    const { firstName } = searchParams;
    const { t } = useI18n();

    return (
        <div
            className={'h-full w-full max-h-svh flex text-brand-text flex-col'}
        >
            <div className={'h-1/3 flex flex-col justify-between'}>
                <TabAuthMode />
                <div className={'max-h-8'}>
                    <p className="text-2xl font-bold">
                        {t('common.welcomeToChaoMarket')},{' '}
                        <span className="text-[var(--brand-color)]">
                            {firstName}
                        </span>{' '}
                        !
                    </p>
                    <p
                        className={
                            'text-[var(--brand-grey-foreground)] text-lg'
                        }
                    >
                        {t('common.yourAccountHasBeenCreated')}.
                    </p>
                </div>
            </div>
            <div className={'w-full h-full flex flex-col pb-4'}>
                <div
                    className={
                        'min-h-[15.375rem] max-h-[15.375rem] w-full flex flex-col my-auto'
                    }
                >
                    <Image
                        src={CompleteCheckout}
                        width={1920}
                        height={1080}
                        alt={'checkout-complete'}
                        className={
                            'w-2/5 max-w-[13rem] h-auto object-cover mx-auto'
                        }
                    />
                    <Button
                        className="bg-[var(--brand-color)] min-h-[2.5rem] hover:bg-[var(--brand-color-foreground)] text-black font-semibold transition-all! duration-300 ease-in-out rounded-3xl text-lg"
                        asChild
                    >
                        <Link href={'/auth/login'}>{t('auth.login')}</Link>
                    </Button>
                </div>
                <div className={'h-[8.9375rem]'} />
            </div>
        </div>
    );
}
