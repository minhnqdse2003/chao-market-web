'use client';

import { useState, useEffect, useCallback } from 'react';

interface CountdownProps {
    initialTime: number;
    onResend: () => void;
    disabled?: boolean;
    buttonLabel?: string;
    className?: string;
    autoStart?: boolean; // New prop to control auto-start
}

export default function Countdown({
    initialTime,
    onResend,
    disabled = false,
    buttonLabel = 'Resend OTP',
    className = '',
    autoStart = true,
}: CountdownProps) {
    const [countdown, setCountdown] = useState(initialTime);
    const [isActive, setIsActive] = useState(autoStart);

    // Initialize countdown timer
    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isActive && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
        } else if (countdown === 0 && isActive) {
            setIsActive(false);
        }

        return () => clearTimeout(timer);
    }, [countdown, isActive]);

    // Reset countdown when autoStart is true (component mounts)
    useEffect(() => {
        if (autoStart) {
            setCountdown(initialTime);
            setIsActive(true);
        }
    }, [autoStart, initialTime]);

    const startCountdown = useCallback(() => {
        setCountdown(initialTime);
        setIsActive(true);
    }, [initialTime]);

    const handleResend = useCallback(() => {
        if (!disabled) {
            onResend();
            startCountdown();
        }
    }, [onResend, startCountdown, disabled]);

    const isDisabled = disabled;

    return (
        <button
            onClick={handleResend}
            disabled={isDisabled}
            className={`cursor-pointer dark:text-[var(--brand-color)] font-bold hover:underline ${
                isDisabled
                    ? 'opacity-50 cursor-not-allowed pointer-events-none'
                    : 'hover:underline'
            } ${className}`}
        >
            {isActive ? `${buttonLabel} (${countdown}s)` : buttonLabel}
        </button>
    );
}
