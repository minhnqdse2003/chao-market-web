import { addProductsToCartSchema } from '@/types/cart/request/add-products-to-cart';
import { z } from 'zod';
import { BaseResponse } from '@/types/base-response';
import { UUID } from 'crypto';
import { Cart, CartItem, Product, Transaction } from '@/db/schema';
import { checkoutSchema } from '@/app/api/carts/checkout/route';

const API_BASE = '/api/carts';

const AddProductToCartServerAction = async (
    payload: z.infer<typeof addProductsToCartSchema>
) => {
    const res = await fetch(API_BASE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    const data: BaseResponse<UUID> = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to add products to cart');
    }

    return data;
};

const GetUserCartServerAction = async () => {
    const res = await fetch(`${API_BASE}/user/Oijslslapsmd0292msks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data: BaseResponse<
        Cart & {
            items: (CartItem & { product: Product })[];
        }
    > = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to get user cart');
    }

    return data;
};

const UserCheckoutServerAction = async (
    payload: z.infer<typeof checkoutSchema>
) => {
    const res = await fetch(`${API_BASE}/checkout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    const data: BaseResponse<Transaction> = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to submit checkout');
    }

    return data;
};

const UserRemoveItemsFromCart = async (productIds: string[]) => {
    const res = await fetch(`${API_BASE}/items`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productIds }),
    });

    const data: BaseResponse<null> = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to remove items from cart');
    }

    return data;
};

export const cartApis = {
    AddProductToCartServerAction,
    GetUserCartServerAction,
    UserCheckoutServerAction,
    UserRemoveItemsFromCart,
};
