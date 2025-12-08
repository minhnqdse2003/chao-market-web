import CarouselLogin from '@/app/(user-layout)/auth/components/carousel-login';

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-fit lg:max-h-[90svh] lg:h-svh w-full text-white">
            {/* Left Column: Branding */}
            <div className="hidden lg:flex flex-col justify-center items-center max-h-svh h-[90svh] p-6 w-1/2 relative">
                <CarouselLogin />
            </div>

            {/* Right Column: Form Content */}
            <main className="w-full lg:w-1/2 flex items-center justify-center h-fit max-h-fit lg:max-h-svh lg:h-[90svh] p-8 px-6 md:px-16 lg:px-32">
                {children}
            </main>
        </div>
    );
}
