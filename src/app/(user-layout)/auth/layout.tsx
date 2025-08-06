import CarouselLogin from '@/app/(user-layout)/auth/components/carousel-login';

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex max-h-[90svh] h-svh w-full text-white">
            {/* Left Column: Branding */}
            <div className="hidden lg:flex flex-col justify-center items-center max-h-svh p-6 w-1/2 relative">
                <CarouselLogin />
            </div>

            {/* Right Column: Form Content */}
            <main className="w-full lg:w-1/2 flex items-center justify-center max-h-svh p-8">
                {children}
            </main>
        </div>
    );
}
