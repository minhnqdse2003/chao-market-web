'use client';

import { getMetaDataConfig, MetaDataConfig } from '@/services/meta_data';
import { useQuery } from '@tanstack/react-query';

export const useMetaData = () => {
    return useQuery<MetaDataConfig | undefined>({
        queryKey: ['metaDataConfig'],
        queryFn: async () => {
            const data = await getMetaDataConfig();
            return data.data;
        },
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        retry: 1,
        retryDelay: 1000,
        throwOnError: false,
    });
};
