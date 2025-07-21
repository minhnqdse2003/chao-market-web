'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

// This is a Server Component
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const plugin = React.useRef(Autoplay({ delay: 2000, playOnInit: true }));
    const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollToIndex = (index: number) => {
        if (carouselApi) {
            carouselApi.scrollTo(index);
        }
    };

    useEffect(() => {
        if (!carouselApi) return;

        const updateCarouselState = () => {
            setCurrentIndex(carouselApi.selectedScrollSnap());
        };

        updateCarouselState();

        carouselApi.on('select', updateCarouselState);

        return () => {
            carouselApi.off('select', updateCarouselState); // Clean up on unmount
        };
    }, [carouselApi]);

    return (
        <div className="flex min-h-screen bg-[var(--brand-grey)] text-white">
            {/* Left Column: Branding */}
            <div className="hidden lg:flex flex-col justify-center items-center w-1/2 p-8 bg-[var(--brand-grey)] relative">
                <Link
                    href="/"
                    className="absolute top-8 left-8 bg-gray-700/50 px-4 py-2 rounded-lg text-sm hover:bg-gray-600"
                >
                    &larr; Back to website
                </Link>
                <Carousel
                    plugins={[plugin.current]}
                    setApi={setCarouselApi}
                    className="w-full max-w-xs"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={() => {
                        // plugin.current.play();
                    }}
                >
                    <CarouselContent>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <CarouselItem key={index}>
                                <Card className="p-0">
                                    <CardContent className="relative flex aspect-square items-center justify-center p-0">
                                        <Image
                                            width={50}
                                            height={50}
                                            src="/img/login-theme.png"
                                            alt="Market Graph"
                                            className="object-cover w-full h-auto"
                                            unoptimized
                                        />
                                        <h2 className="absolute text-3xl font-bold mt-4">
                                            We prioritise helping you manage
                                            market risks.
                                        </h2>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {/* Placeholder for indicator dots */}
                    {Array.from({ length: 3 }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToIndex(index)}
                            className={`w-8 h-1 rounded-full ${
                                currentIndex === index
                                    ? 'bg-yellow-400'
                                    : 'bg-gray-600'
                            }`}
                        />
                    ))}
                </Carousel>
            </div>

            {/* Right Column: Form Content */}
            <main className="w-full lg:w-1/2 flex items-center justify-center p-8">
                {children} {/* This is where page.tsx will be rendered */}
            </main>
        </div>
    );
}
