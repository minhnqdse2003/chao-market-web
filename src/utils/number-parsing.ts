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

export function percentageFormat(value: string | number): string {
    const num = parseFloat(value.toString());
    return isNaN(num) ? '0.00' : `${num.toFixed(2)}%`;
}
