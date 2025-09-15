import AppCarousel, { CarouselItemProps } from '@/components/app-carousel';
import { HomeBannerImages } from '@image/index';

export default function HomePage() {
    const carouselItems: CarouselItemProps[] = [
        {
            id: '1',
            imageUrl: HomeBannerImages.HomeBanner1,
            link: '/products/1',
            alt: 'Product 1',
            title: 'Summer Sale',
            description: 'Up to 50% off on selected items',
        },
        {
            id: '2',
            imageUrl: HomeBannerImages.HomeBanner2,
            link: '/services',
            alt: 'Services',
            title: 'New Services',
            description: 'Check out our latest offerings',
        },
        {
            id: '3',
            imageUrl: HomeBannerImages.HomeBanner3,
            link: '/about',
            alt: 'About Us',
            title: 'Our Story',
            description: 'Learn more about our company',
        },
    ];

    return (
        <div className="container mx-auto py-8">
            <AppCarousel
                items={carouselItems}
                autoPlay={true}
                autoPlayDelay={2000}
                showIndicators={true}
                showNavigation={true}
                imageClassName="rounded-xl"
                className={'h-[25svh]'}
                indicatorClassName="w-2 h-2"
            />
        </div>
    );
}
