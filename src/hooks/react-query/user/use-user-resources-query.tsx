/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAppQuery } from '@/hooks/react-query/use-custom-query';
import { APP_QUERY_KEY } from '@/constant';
import { useSession } from 'next-auth/react';
import { userApis } from '@/app/api/user';

export const useUserPaidTransactionsQuery = () => {
    const { data: session, status } = useSession();

    const { data, isLoading, isError, error, refetch } = useAppQuery({
        queryKey: [APP_QUERY_KEY.USER_TRANSACTIONS, (session?.user as any)?.id],
        queryFn: async () => {
            if (status !== 'authenticated') {
                throw new Error('User not authenticated');
            }
            return await userApis.GetPaidTransactions();
        },
        options: {
            enabled: status === 'authenticated' && !!(session?.user as any)?.id,
            staleTime: 1000 * 60 * 5,
        },
    });

    return {
        transactions: data || [],
        isLoading,
        isError,
        error,
        refetch,
    };
};
