import { profileApis } from '@/app/api/user/profile';

export const userApis = {
    ...profileApis,
    GetPaidTransactions: async () => {
        const response = await fetch('/api/my-resources'); // Adjust path to your route
        if (!response.ok) throw new Error('Failed to fetch transactions');
        return response.json();
    },
};
