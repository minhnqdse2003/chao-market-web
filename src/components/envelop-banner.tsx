import { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FunnelPopover() {
    const [isOpen, setIsOpen] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [, setAutoClosed] = useState(false); // track if auto close occurred
    const [countdown, setCountdown] = useState(3); // countdown for auto close
    const btnRef = useRef<HTMLButtonElement>(null);
    const autoCloseTimeout = useRef<NodeJS.Timeout | null>(null);
    const countdownInterval = useRef<NodeJS.Timeout | null>(null);
    const isAutoPopup = useRef(false); // track if current open is auto popup

    useEffect(() => {
        const hasSeen = sessionStorage.getItem('funnelPopoverSeen');
        if (!hasSeen && btnRef.current) {
            const rect = btnRef.current.getBoundingClientRect();
            setCoords({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height,
            });
            setIsOpen(true);
            isAutoPopup.current = true; // mark this as auto popup
            setCountdown(10);

            // Start countdown interval to update seconds every 1s
            countdownInterval.current = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        // When reaches 0 or 1, clear interval
                        if (countdownInterval.current) {
                            clearInterval(countdownInterval.current);
                            countdownInterval.current = null;
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            // Auto close after 10 seconds
            autoCloseTimeout.current = setTimeout(() => {
                setIsOpen(false);
                sessionStorage.setItem('funnelPopoverSeen', 'true');
                setAutoClosed(true);
                isAutoPopup.current = false;
            }, 10000);
        }
        // Cleanup on unmount
        return () => {
            if (autoCloseTimeout.current)
                clearTimeout(autoCloseTimeout.current);
            if (countdownInterval.current)
                clearInterval(countdownInterval.current);
        };
    }, []);

    const togglePopover = () => {
        // If auto close timer or countdown is running, cancel them
        if (autoCloseTimeout.current) {
            clearTimeout(autoCloseTimeout.current);
            autoCloseTimeout.current = null;
        }
        if (countdownInterval.current) {
            clearInterval(countdownInterval.current);
            countdownInterval.current = null;
        }
        isAutoPopup.current = false; // user triggered, no auto popup anymore

        if (!isOpen && btnRef.current) {
            const rect = btnRef.current.getBoundingClientRect();
            setCoords({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height,
            });
        }
        setIsOpen(prev => !prev);
        sessionStorage.setItem('funnelPopoverSeen', 'true');
        setAutoClosed(true);
    };

    return (
        <div className="relative h-fit w-full flex items-center justify-center">
            <button
                ref={btnRef}
                onClick={togglePopover}
                className="px-4 fixed left-0 bottom-0 py-1 pb-1 w-[var(--sidebar-width)] font-semibold text-xs rounded-t-3xl cursor-pointer hover:pb-2 transition-[padding]! ease-out duration-300 flex gap-2 justify-center items-end text-center hover:text-[var(--brand-color)] bg-[var(--brand-grey)]"
            >
                <p>Disclaimer</p>
                <Info className="size-3" />
            </button>

            <div
                className={`fixed inset-0 z-22 bg-black/50 bg-opacity-50 transition-opacity duration-400 ease-in-out ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={togglePopover}
                aria-hidden="true"
            />

            {/* Popover */}
            <div
                className={`fixed bg-black z-23 border flex flex-col items-center border-[var(--brand-color)] shadow-lg text-sm text-white rounded-lg p-6 transition-all! duration-400 ease-in-out
                ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                `}
                style={{
                    left: isOpen ? '50%' : `${coords.x}px`,
                    top: isOpen ? '50%' : `${coords.y}px`,
                    transformOrigin: 'bottom center',
                    transform: isOpen
                        ? 'translate(-50%, -50%) scaleX(1) scaleY(1)'
                        : 'translate(-50%, 0) scaleX(0.5) scaleY(0.3)',
                }}
            >
                <div className={'w-full mb-6'}>
                    <p>Disclaimer</p>
                </div>
                <p
                    className={`text-[var(--brand-color)] text-center mb-4 text-lg leading-relaxed`}
                >
                    &#34;The information provided by Chào Market does not
                    constitute and shall not be considered as investment advice,
                    financial advice, a recommendation, or a solicitation to
                    buy, sell, or hold any financial asset. All investment
                    decisions carry financial risks, and you are solely
                    responsible for your own decisions&#34;
                </p>

                <Button
                    className="font-bold bg-[var(--brand-color)] text-black hover:bg-[var(--brand-color-foreground)] mx-auto my-0"
                    onClick={togglePopover}
                >
                    I Agree
                </Button>

                {/* Auto-close countdown message */}
                {isOpen && isAutoPopup.current && countdown > 0 && (
                    <p className="mt-4 text-sm text-[var(--brand-grey-foreground)] italic text-center">
                        This will automatically close in {countdown} second
                        {countdown > 1 ? 's' : ''}.
                    </p>
                )}
            </div>
        </div>
    );
}
