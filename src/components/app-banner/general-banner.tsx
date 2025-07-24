import Image from 'next/image';
import { HomeBanner } from '@image/index';
import React from 'react';

export default function GeneralBanner() {
    return (
        <div className="relative w-full">
            <Image
                src={HomeBanner}
                alt={'Home banner'}
                width={1920}
                height={1080}
                className="w-full h-auto"
            />
            <h2 className="absolute left-1/20 top-1/2 tranform -translate-y-1/2 text-white text-3xl tracking-wider font-bold">
                We prioritise helping you <br /> manage market risks
            </h2>
        </div>
    );
}
