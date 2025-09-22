export const calculateAdjustedHeight = (subtractRem: number = 18): number => {
    const screenHeight = window.innerHeight;
    const remToPx = parseFloat(
        getComputedStyle(document.documentElement).fontSize
    );
    const subtractPx = subtractRem * remToPx;
    return screenHeight - subtractPx;
};
