import React from 'react';

interface TagProps {
    label: string;
    onClick?: () => void;
    className?: string;
    clickable?: boolean;
}

export default function Tag({
    label,
    onClick,
    className = '',
    clickable = false,
}: TagProps) {
    const baseStyles =
        'inline-block px-4 py-2 rounded-full mb-3 text-sm font-medium cursor-default select-none text-center ' +
        'bg-[var(--brand-grey)] text-white';

    const clickableStyles =
        'hover:bg-gray-300 active:bg-gray-400 cursor-pointer';

    if (clickable) {
        return (
            <button
                type="button"
                onClick={onClick}
                className={`${baseStyles} ${clickableStyles} ${className}`}
            >
                {label}
            </button>
        );
    }

    return <span className={`${baseStyles} ${className}`}>{label}</span>;
}
