'use client';

export const calculateAdjustedHeight = (subtractRem: number = 18): number => {
    if (typeof window === 'undefined') {
        return 600;
    }
    const screenHeight = window.innerHeight;
    const remToPx = parseFloat(
        getComputedStyle(document.documentElement).fontSize
    );
    const subtractPx = subtractRem * remToPx;
    return screenHeight - subtractPx;
};

export const processHeight = (numberOfSubTabs?: number) => {
    return numberOfSubTabs
        ? calculateAdjustedHeight() + 52 * numberOfSubTabs
        : calculateAdjustedHeight();
};

export const calculateAdjustedWidth = (subtractRem: number = 60): number => {
    const screenWidth = window.innerWidth;
    const remToPx = parseFloat(
        getComputedStyle(document.documentElement).fontSize
    );
    const subtractPx = subtractRem * remToPx;
    return screenWidth - subtractPx;
};
