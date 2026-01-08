export const formatVND = (price: number | string) => {
    const amount = typeof price === 'string' ? parseFloat(price) : price;

    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount || 0);
};
