import CarouselLogin from '@/app/(login-layout)/auth/components/carousel-login';

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-[var(--brand-black-bg)] text-white">
            {/* Left Column: Branding */}
            <div className="hidden lg:flex flex-col justify-center items-center max-h-screen p-6 w-1/2 relative">
                <CarouselLogin />
            </div>

            {/* Right Column: Form Content */}
            <main className="w-full lg:w-1/2 flex items-center justify-center p-8">
                {children}
            </main>
        </div>
    );
}
