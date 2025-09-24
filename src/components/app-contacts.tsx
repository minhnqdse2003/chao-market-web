import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useState, useEffect } from 'react';
import { PhoneCall, Speech } from 'lucide-react';
import Image from 'next/image';
import { Facebook, Zalo } from '@image/index';

export default function ContactButton() {
    const [open, setOpen] = useState(false);
    const [visibleItems, setVisibleItems] = useState<number[]>([]);

    useEffect(() => {
        if (open) {
            // Show items sequentially with delays
            const timers = [0, 200, 400].map((delay, index) =>
                setTimeout(
                    () => setVisibleItems(prev => [...prev, index]),
                    delay
                )
            );
            return () => timers.forEach(clearTimeout);
        } else {
            setVisibleItems([]);
        }
    }, [open]);

    const contactMethods = [
        {
            name: 'Zalo',
            href: '#',
            icon: (
                <Image
                    src={Zalo}
                    alt={'zalo'}
                    width={1920}
                    height={1080}
                    className={'object-contain'}
                />
            ),
            color: '#2962ff',
        },
        {
            name: 'Phone',
            href: 'tel:0985865674',
            icon: <PhoneCall className={'text-green-500'} />,
            color: 'oklch(72.3% 0.219 149.579)',
        },
        {
            name: 'Facebook',
            href: 'https://www.facebook.com/messages/t/829553990231311',
            icon: (
                <Image
                    src={Facebook}
                    alt={'facebook'}
                    width={1920}
                    height={1080}
                    className={'object-contain'}
                />
            ),
            color: '#0b82ed',
        },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        size="icon"
                        variant="outline"
                        className="h-12 w-12 rounded-full dark:bg-[var(--brand-color)] dark:text-black dark:hover:bg-[var(--brand-color-foreground)] dark:hover:text-black border-transparent transition-all! duration-300 ease-in-out bg-[var(--brand-color)] text-black hover:bg-[var(--brand-color-foreground)] hover:text-black"
                    >
                        <Speech />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-fit border-0 bg-transparent dark:bg-transparent shadow-none"
                    align="start"
                    side="top"
                    sideOffset={0}
                    alignOffset={-16}
                >
                    <div className="flex flex-col gap-4">
                        {contactMethods.map((method, index) => (
                            <div
                                key={method.name}
                                className={`transition-all! duration-300 ease-in-out ${
                                    visibleItems.includes(index)
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-4'
                                }`}
                            >
                                <a
                                    href={method.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="h-12 w-12 rounded-full relative p-2 dark:border-transparent border-transparent bg-[var(--brand-grey)]/70 transition-all! duration-300 ease-in-out"
                                    >
                                        <span className="relative z-10">
                                            {method.icon}
                                        </span>
                                        <span
                                            className="absolute inset-0 rounded-full opacity-20 animate-ping"
                                            style={{ background: method.color }}
                                        ></span>
                                    </Button>
                                </a>
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
