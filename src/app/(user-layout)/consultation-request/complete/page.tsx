'use client';

import Image from 'next/image';
import { CompleteCheckout } from '@image/index';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

export default function CheckOutComplete() {
    return (
        <div
            className={
                'w-full h-full flex flex-col justify-center items-center gap-4'
            }
        >
            <Image
                src={CompleteCheckout}
                alt={'checkout-complete'}
                width={1920}
                height={1080}
                className={'w-1/6 h-auto object-cover'}
            />
            <p className={'text-[var(--brand-color)]'}>
                &#34;Thank you for contacting us. A member of our team will get
                back to you soon.&#34;
            </p>
            <Button
                className="bg-[var(--brand-color)] text-black hover:bg-transparent border border-transparent hover:border-[var(--brand-color)] hover:text-[var(--brand-color)] transition-all! duration-300 ease-in-out rounded-3xl font-normal"
                onClick={() => redirect('/our-solutions')}
            >
                &#34;Wishing you all the best on your investment journey.&#34;
            </Button>
        </div>
    );
}
