export function formatToTwoDecimals(value: string | number): string {
    const num = parseFloat(value.toString());
    return isNaN(num) ? '0.00' : num.toFixed(2);
}

export function priceFormat(value: string | number): string {
    const num = parseFloat(value.toString());
    if (isNaN(num)) return '0.00';

    return num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

export function percentageFormat(
    value: string | number,
    shouldPercentageVisible: boolean = true
): string {
    const num = parseFloat(value.toString());
    return isNaN(num)
        ? '0.00'
        : `${num.toFixed(2)}${shouldPercentageVisible ? '%' : ''}`;
}

export function formatNumberOfViews(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return num.toLocaleString();
    }
    return num.toString();
}
