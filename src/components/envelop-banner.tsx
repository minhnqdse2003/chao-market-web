import { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';
import Image from 'next/image';
import { BrandLogoFtHat } from '@image/index';

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
                className="px-4 fixed left-0 bottom-0 py-2 pb-0 w-[var(--sidebar-width)] font-semibold text-sm rounded-t-3xl cursor-pointer hover:pb-2 transition-[padding]! ease-out duration-300 flex gap-2 justify-center items-center hover:text-[var(--brand-color)] bg-[var(--brand-grey)]"
            >
                <p>Disclaimer</p>
                <Info className="size-5" />
            </button>

            <div
                className={`fixed inset-0 z-10 bg-black/50 bg-opacity-50 transition-opacity duration-400 ease-in-out ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={togglePopover}
                aria-hidden="true"
            />

            {/* Popover */}
            <div
                className={`fixed bg-black z-20 shadow-lg text-sm text-white rounded-lg p-6 transition-all! duration-400 ease-in-out
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
                <div
                    className={
                        'w-full flex flex-col mb-6 justify-center items-center'
                    }
                >
                    <Image
                        alt={'logo-brand-ft-hat'}
                        src={BrandLogoFtHat}
                        width={1920}
                        height={1080}
                        className="size-22"
                    />
                    <p className="text-[var(--brand-color)] text-xl font-semibold">
                        Chào Market
                    </p>
                </div>
                <p>
                    The information provided here is for general informational
                    purposes only. While we strive to keep the content accurate
                    and up to date, we make no guarantees of any kind, express
                    or implied, about the completeness, accuracy, reliability,
                    suitability, or availability with respect to the
                    information, products, services, or related graphics
                    contained in this popover for any purpose. Any reliance you
                    place on such information is therefore strictly at your own
                    risk.
                    <br />
                    <br />
                    In no event will we be liable for any loss or damage
                    including without limitation, indirect or consequential loss
                    or damage, or any loss or damage whatsoever arising from
                    loss of data or profits arising out of, or in connection
                    with, the use of this popover or the information contained
                    herein.
                    <br />
                    <br />
                    Please consult with professionals or official sources for
                    specific advice related to your situation. If you want a
                    shorter version or a more formal/legal text, just let me
                    know!
                </p>

                {/* Auto-close countdown message */}
                {isOpen && isAutoPopup.current && countdown > 0 && (
                    <p className="mt-4 text-sm text-[var(--brand-color)] italic text-center">
                        This will automatically close in {countdown} second
                        {countdown > 1 ? 's' : ''}.
                    </p>
                )}
            </div>
        </div>
    );
}
