import { AppSidebar } from '@/components/app-sidebar';

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex w-full max-w-svw ">
            <AppSidebar />
            <div className="flex w-full px-12 py-4 dark:bg-sidebar">
                {children}
            </div>
        </div>
    );
}
