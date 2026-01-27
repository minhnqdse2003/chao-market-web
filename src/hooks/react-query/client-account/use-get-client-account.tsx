import { useQuery } from '@tanstack/react-query';

export const useClientAccounts = (
    params: Record<string, string | null | undefined>
) => {
    return useQuery({
        queryKey: ['client-accounts', params],
        queryFn: async () => {
            const searchParams = new URLSearchParams();
            if (params.name) searchParams.append('name', params.name);
            if (params.startDate)
                searchParams.append('startDate', params.startDate);
            if (params.sortBy) searchParams.append('sortBy', params.sortBy);
            if (params.order) searchParams.append('order', params.order);
            if (params.tab && params.tab !== 'all')
                searchParams.append('tab', params.tab);

            const res = await fetch(
                `/api/client-account?${searchParams.toString()}`
            );
            if (!res.ok) throw new Error('Failed to fetch accounts');
            return res.json();
        },
    });
};

export const RANGES = {
    '1M': { days: 30, interval: 1 }, // Last 30 days, show every day
    '3M': { days: 90, interval: 3 }, // Last 90 days, show every 3rd day
    '1Y': { days: 365, interval: 7 }, // Last year, show weekly
    ALL: { days: null, interval: 14 }, // All time, show every 2 weeks
};

export const useAccountChartData = (
    accountId: string | null,
    rangeKey: keyof typeof RANGES
) => {
    return useQuery({
        queryKey: ['chart-data', accountId, rangeKey],
        queryFn: async () => {
            const range = RANGES[rangeKey];
            const params = new URLSearchParams();
            params.append('interval', range.interval.toString());

            if (range.days) {
                const date = new Date();
                date.setDate(date.getDate() - range.days);
                params.append('startDate', date.toISOString().split('T')[0]);
            }

            const res = await fetch(
                `/api/client-account/${accountId}/chart-data?${params.toString()}`
            );
            return res.json();
        },
        enabled: !!accountId,
        staleTime: 1000 * 60 * 5,
    });
};
