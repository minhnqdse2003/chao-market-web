import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useState, useEffect } from 'react';
import { Speech } from 'lucide-react';
import Image from 'next/image';
import { Messenger, Telegram, WhatsApp, Zalo } from '@image/index';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';

export default function ContactButton() {
    const [open, setOpen] = useState(false);
    const [visibleItems, setVisibleItems] = useState<number[]>([]);

    useEffect(() => {
        if (open) {
            // Show items sequentially with delays
            const timers = [0, 200, 400, 600].map((delay, index) =>
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
            name: 'Messenger',
            href: 'https://m.me/ChaoMarket.Official  ',
            icon: (
                <Image
                    src={Messenger}
                    alt={'messenger'}
                    width={1920}
                    height={1080}
                    className={'object-contain'}
                />
            ),
            color: '#2962ff',
        },
        {
            name: 'Zalo',
            href: 'https://zalo.me/0985865674  ',
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
            name: 'Telegram',
            href: 'https://t.me/ChaoMarket  ',
            icon: (
                <Image
                    src={Telegram}
                    alt={'telegram'}
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
            icon: (
                <Image
                    src={WhatsApp}
                    alt={'whatsapp'}
                    width={1920}
                    height={1080}
                    className={'object-contain'}
                />
            ),
            color: '#2ad348', // Note: This icon is WhatsApp but for Phone contact
        },
    ];

    return (
        <TooltipProvider>
            <div className="fixed bottom-6 right-6 z-50">
                <Popover open={open} onOpenChange={setOpen}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <PopoverTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-12 w-12 rounded-full dark:bg-[var(--brand-color)] dark:text-black dark:hover:bg-[var(--brand-color-foreground)] dark:hover:text-black border-transparent transition-all! duration-300 ease-in-out bg-[var(--brand-color)] text-black hover:bg-[var(--brand-color-foreground)] hover:text-black"
                                >
                                    <Speech
                                        strokeWidth={3}
                                        className={'size-5'}
                                    />
                                </Button>
                            </PopoverTrigger>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            <p>Quick Contact</p>
                        </TooltipContent>
                    </Tooltip>
                    <PopoverContent
                        className="w-fit border-0 bg-transparent dark:bg-transparent shadow-none"
                        align="start"
                        side="top"
                        sideOffset={0}
                        alignOffset={-14}
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
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href={method.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={
                                                    'h-fit w-fit flex p-0.5'
                                                }
                                            >
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    tabIndex={-1}
                                                    className="w-fit h-fit border-0 rounded-md relative dark:bg-transparent dark:hover:bg-transparent bg-transparent hover:bg-transparent dark:border-transparent border-transparent  transition-all! duration-300 ease-in-out"
                                                >
                                                    <span className="w-10 h-10 relative z-10">
                                                        {method.icon}
                                                    </span>
                                                    <span
                                                        className="absolute inset-0 rounded-md focus-visible:ring-transparent opacity-20 animate-ping"
                                                        style={{
                                                            background:
                                                                method.color,
                                                        }}
                                                    ></span>
                                                </Button>
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent
                                            side="left"
                                            align={'center'}
                                            alignOffset={-50}
                                        >
                                            <p>{method.name}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </TooltipProvider>
    );
}
