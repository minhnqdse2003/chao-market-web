'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        console.log('Redirecting from:', pathname);
        router.push('/chao-investors/announcements');
    }, [router, pathname]); // Include dependencies

    return <div>Redirecting...</div>;
}
