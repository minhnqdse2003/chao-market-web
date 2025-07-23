import { AppSidebar } from '@/components/app-sidebar';

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex w-full max-w-svw ">
            <AppSidebar />
            <div className="flex w-full">{children}</div>
        </div>
    );
}
