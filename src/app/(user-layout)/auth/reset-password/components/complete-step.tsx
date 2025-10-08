'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ResetPasswordComplete } from '@image/index';
import { useRouter } from 'next/navigation';
import { T } from '@/components/app-translate';

export default function CompletionStep() {
    const router = useRouter();

    const handleOnClick = async () => {
        router.push('/auth/login');
    };

    return (
        <div className={'flex flex-col justify-evenly mt-[2.5rem]'}>
            <Image
                src={ResetPasswordComplete}
                alt={'reset-password-complete'}
                width={1920}
                height={1080}
                className={'h-2/5 mx-auto object-contain'}
            />

            <div className="flex flex-col space-y-4 w-full">
                <Button
                    className="w-full bg-[var(--brand-color)] cursor-pointer text-black font-bold py-2 px-4 rounded-3xl disabled:p-0 disabled:bg-transparent my-6 min-h-[40px] hover:bg-[var(--brand-color-foreground)] transition-colors! duration-300 ease-in-out text-base"
                    onClick={handleOnClick}
                >
                    <T keyName="auth.resetPassword.goToLogin" />
                </Button>
            </div>
        </div>
    );
}
