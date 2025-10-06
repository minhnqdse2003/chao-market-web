'use client';
import ChaoInvestorNavigation from '@/app/(user-layout)/chao-investors/components/navigation';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathName = usePathname();
    return (
        <div>
            <ChaoInvestorNavigation searchParams={{}} currentHref={pathName} />
            {children}
        </div>
    );
}
