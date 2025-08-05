'use client';
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { LoginTheme } from '@image/index';
import React, { useEffect, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';

export default function CarouselLogin() {
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
        <Carousel
            plugins={[plugin.current]}
            setApi={setCarouselApi}
            className="w-full h-full relative"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={() => {
                plugin.current.play();
            }}
        >
            <CarouselContent>
                {Array.from({ length: 3 }).map((_, index) => (
                    <CarouselItem key={index} className="pl-0 ">
                        <Card className="text-carousel-fallback">
                            <CardContent className="relative flex h-full w-full aspect-square items-center justify-center p-0">
                                <Image
                                    width={1920}
                                    height={1080}
                                    src={LoginTheme}
                                    alt="Market Graph"
                                    className="object-cover carousel-image"
                                    unoptimized
                                />
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="w-full absolute z-2 bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="w-full flex items-center justify-center gap-4 relative">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToIndex(index)}
                            className={`w-1/7 h-1.5 cursor-pointer rounded-full  ${
                                currentIndex === index
                                    ? 'bg-[var(--brand-color)]'
                                    : 'bg-white'
                            }`}
                        />
                    ))}
                    <h2 className="absolute text-3xl top-0 font-bold italic transform -translate-y-[calc(100%+50%)] text-center">
                        We prioritise helping you
                        <br />
                        manage market risks.
                    </h2>
                </div>
            </div>
            <div className="text-carousel-overlay z-1 pointer-events-none absolute top-0 left-0 w-full h-full flex items-center justify-center" />
        </Carousel>
    );
}
