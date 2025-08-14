import React from 'react';
import { LogoBrand } from '@image/index';
import Image from 'next/image';

export default function TabAuthMode() {
    return (
        <>
            <div className="flex items-center justify-center gap-4">
                <Image
                    width={1920}
                    height={1080}
                    src={LogoBrand}
                    alt="Chao market logo"
                    className="size-18"
                />
                <h1 className="text-[var(--brand-color)] text-4xl font-bold">
                    Chào Market
                </h1>
            </div>
        </>
    );
}
