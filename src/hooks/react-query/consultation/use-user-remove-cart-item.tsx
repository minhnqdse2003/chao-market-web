import { useAppMutation } from '@/hooks/react-query/use-custom-mutation';
import { BaseResponse } from '@/types/base-response';
import { consultationsRequestApis } from '@/app/api/consultation';
import { queryClient } from '@/lib/query-client';
import { APP_QUERY_KEY } from '@/constant';

export function useUserRemoveCartItem() {
    return useAppMutation<BaseResponse<null>, string[]>({
        mutationFn: (cartIds: string[]) =>
            consultationsRequestApis.UserRemoveItemsFromCart(cartIds),
        onSuccessMessage: 'Remove items from cart successfully',
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: query => {
                    return query.queryKey.includes(
                        APP_QUERY_KEY.CONSULTATIONS_SERVICES
                    );
                },
            });
        },
        onErrorMessage: 'Remove items from cart failed',
    });
}
