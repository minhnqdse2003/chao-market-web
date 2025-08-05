'use server';

import {
    ExchangeRate,
    GoldPriceData,
    HomeNewFlow,
    InterestRateData,
} from './columns';

export const generateMockData = async (
    type: string
): Promise<HomeNewFlow[]> => {
    const baseDate = new Date('2025-07-02T13:33:00+07:00');
    const data: HomeNewFlow[] = [];

    for (let i = 0; i < 5; i++) {
        const date = new Date(baseDate);
        date.setDate(baseDate.getDate() - i);

        data.push({
            date, // Keep Date object here
            category: type === 'newsFlow' ? 'News' : type,
            headline:
                type === 'newsFlow'
                    ? `Breaking ${type.replace(/([A-Z])/g, ' $1').trim()} Update ${i + 1}`
                    : `${type.replace(/([A-Z])/g, ' $1').trim()} Report ${i + 1}`,
            rate: parseFloat((Math.random() * 100).toFixed(2)), // 0-100 percent as number
            view: Math.floor(Math.random() * 3500) + 500, // keep number here
        });
    }
    return data;
};

export const getTabData = async (
    tabValue: string
): Promise<
    HomeNewFlow[] | ExchangeRate[] | InterestRateData[] | GoldPriceData[]
> => {
    switch (tabValue) {
        case 'newsFlow':
            return generateMockData('newsFlow');
        case 'exchangeRate':
            return generateExchangeRateData();
        case 'interestRate':
            return generateInterestRateData();
        case 'goldPriceVietnam':
            return generateGoldPriceData();
        default:
            return generateMockData('newsFlow');
    }
};

export const generateExchangeRateData = async (): Promise<ExchangeRate[]> => {
    return [
        {
            currencyCode: 'USD',
            currencyName: 'US Dollar',
            cashBuying: 25147.0,
            telegraphicBuying: 25177.0,
            selling: 25477.0,
        },
        {
            currencyCode: 'USD',
            currencyName: 'US Dollar',
            cashBuying: 25147.0,
            telegraphicBuying: 25177.0,
            selling: 25477.0,
        },
        {
            currencyCode: 'USD',
            currencyName: 'US Dollar',
            cashBuying: 25147.0,
            telegraphicBuying: 25177.0,
            selling: 25477.0,
        },
        {
            currencyCode: 'USD',
            currencyName: 'US Dollar',
            cashBuying: 25147.0,
            telegraphicBuying: 25177.0,
            selling: 25477.0,
        },
        {
            currencyCode: 'USD',
            currencyName: 'US Dollar',
            cashBuying: 25147.0,
            telegraphicBuying: 26177.0,
            selling: 25477.0,
        },
    ];
};

export const generateInterestRateData = async (): Promise<
    InterestRateData[]
> => {
    const data: InterestRateData[] = [];

    const terms = ['Không kỳ hạn', '1 tháng', '3 tháng', '6 tháng', '12 tháng'];
    for (let i = 0; i < 5; i++) {
        data.push({
            term: terms[i],
            vndRate: Math.random() * 0.005 + 0.001,
            eurRate: Math.random() * 0.005 + 0.002,
            usdRate: Math.random() * 0.003,
        });
    }
    return data;
};

export const generateGoldPriceData = async (): Promise<GoldPriceData[]> => {
    const data: GoldPriceData[] = [];
    const typeOfGold = 'SJC gold bar (approximately 37.5 grams)';

    for (let i = 0; i < 5; i++) {
        data.push({
            typeOfGold,
            sellingPriceVND:
                i === 3
                    ? 'N/A'
                    : Math.floor(Math.random() * 90000000) + 80000000,
        });
    }
    return data;
};
