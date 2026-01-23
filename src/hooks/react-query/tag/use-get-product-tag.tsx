import { useAppQuery } from '@/hooks/react-query/use-custom-query';
import { APP_QUERY_KEY } from '@/constant';
import { getTags } from '@/services/tag/get-tags';

export function useGetProductTag() {
    return useAppQuery({
        queryKey: [APP_QUERY_KEY.GET_PRODUCT_TAGS],
        queryFn: async () => {
            return await getTags('product_type');
        },
    });
}
