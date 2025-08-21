import TabAuthMode from '@/app/(user-layout)/auth/components/tab-auth-mode';
import Image from 'next/image';
import { CompleteCheckout } from '@image/index';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PageProps {
    searchParams: {
        firstName: string;
    };
}

export default function SuccessPage({ searchParams }: PageProps) {
    const { firstName } = searchParams;

    return (
        <div className={'h-full max-h-svh flex flex-col gap-4 justify-center'}>
            <TabAuthMode />
            <p className="text-3xl font-bold">
                Welcome to Chào Market,{' '}
                <span className="text-[var(--brand-color)]">{firstName}</span>
            </p>
            <p className={'text-[var(--brand-grey-foreground)] text-lg'}>
                Your account has been created.
            </p>
            <Image
                src={CompleteCheckout}
                width={1920}
                height={1080}
                alt={'checkout-complete'}
                className={'w-3/5 h-auto object-cover mx-auto'}
            />
            <Button
                className="bg-[var(--brand-color)] hover:bg-[var(--brand-color-foreground)] text-black font-semibold transition-all! duration-300 ease-in-out rounded-3xl text-lg"
                asChild
            >
                <Link href={'/auth/login'}>Login</Link>
            </Button>
        </div>
    );
}
