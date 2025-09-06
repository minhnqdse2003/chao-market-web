import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { Facebook, Google } from '@image/index';
import { T } from '@/components/app-translate';

export default function SocialLogin() {
    const handleSocialLogin = (provider: string) => {
        signIn(provider, { callbackUrl: '/home' });
    };

    return (
        <>
            <div className="mb-4 mt-4 relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[var(--brand-grey-foreground)]" />
                </div>
                <div className="relative flex w-fit mx-auto px-2 justify-center text-sm bg-sidebar">
                    <span className="px-2 dark:text-white text-[var(--brand-grey-foreground)] text-lg">
                        <T keyName={'common.orContinueWith'} />
                    </span>
                </div>
            </div>
            <div className="space-x-6 mx-auto w-fit">
                <button
                    onClick={() => handleSocialLogin('facebook')}
                    className="cursor-pointer"
                >
                    <Image
                        width={1920}
                        height={1080}
                        className="size-12"
                        src={Facebook}
                        alt="facebook-icon"
                    />
                </button>

                <button
                    onClick={() => handleSocialLogin('google')}
                    className="cursor-pointer"
                >
                    <Image
                        width={1920}
                        height={1080}
                        className="size-12"
                        src={Google}
                        alt="google-icon"
                    />
                </button>
            </div>
        </>
    );
}
