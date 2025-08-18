import { useAppMutation } from '@/hooks/react-query/use-custom-mutation';
import { BaseResponse } from '@/types/base-response';
import { cartApis } from '@/app/api/carts';
import { queryClient } from '@/lib/query-client';
import { APP_QUERY_KEY } from '@/constant';
import { Transaction } from '@/db/schema';
import { z } from 'zod';
import { checkoutSchema } from '@/app/api/carts/checkout/route';

export function useUserCheckout() {
    return useAppMutation<
        BaseResponse<Transaction>,
        z.infer<typeof checkoutSchema>
    >({
        mutationFn: (payload: z.infer<typeof checkoutSchema>) =>
            cartApis.UserCheckoutServerAction(payload),
        onSuccessMessage: 'Checkout submitted successfully',
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                predicate: query => {
                    return query.queryKey.includes(APP_QUERY_KEY.USER_CART);
                },
            });
        },
        onErrorMessage: 'Checkout submission failed',
    });
}
