export function formatToTwoDecimals(value: string | number): string {
    const num = parseFloat(value.toString());
    return isNaN(num) ? '0.00' : num.toFixed(2);
}
