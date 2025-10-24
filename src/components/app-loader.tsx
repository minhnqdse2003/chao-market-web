import Image from 'next/image';
import { BrandLogoFtHat } from '@image/index';
import '@/styles/_loading-bouncing.scss';

export default function AppLoader() {
    return (
        <div
            className={
                'w-fit mx-auto h-full flex justify-center items-center animate-pulse flex-col gap-4 pulse-scale'
            }
        >
            <Image
                src={BrandLogoFtHat}
                width={150}
                height={150}
                className="w-full uppercase h-auto max-w-[24rem]"
                alt={'Brand-logo'}
            />
            <p className={'text-3xl uppercase flex gap-2'}>
                Chào Market
                <div className="text-animation">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </div>
            </p>
        </div>
    );
}
