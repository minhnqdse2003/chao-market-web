/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ChartDataPoint {
    date: number; // timestamp
    equityPercentage?: number;
    gainPercentage?: number;
    depositAmount?: number;
    withdrawalAmount?: number;
}

export const transformApiToChartData = (apiData: any): ChartDataPoint[] => {
    if (!apiData) return [];

    const dateMap = new Map<string, ChartDataPoint>();

    const merge = (data: any[], key: keyof ChartDataPoint) => {
        data?.forEach(item => {
            const dateStr = item.date;
            const existing = dateMap.get(dateStr) || {
                date: new Date(dateStr).getTime(),
                equityPercentage: 0,
                gainPercentage: 0,
            };

            existing[key] = Number(item.value);
            dateMap.set(dateStr, existing);
        });
    };

    // Map your API keys to the ChartDataPoint keys
    merge(apiData.equity_growth, 'equityPercentage');
    merge(apiData.growth, 'gainPercentage');
    merge(apiData.deposit, 'depositAmount');
    merge(apiData.withdrawal, 'withdrawalAmount');

    // Convert Map back to array and sort by date ascending
    return Array.from(dateMap.values()).sort((a, b) => a.date - b.date);
};
