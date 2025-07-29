import { Product } from '@/db/schema';
import { BaseResponse } from '@/types/base-response';
import { CreateNewProduct } from '@/types/product/request/create-product';
import { UpdateProduct } from '@/types/product/request/update-product';

const API_BASE = '/api/products';

/**
 * Fetches a product by ID from the API
 * @param id - The product ID
 * @returns Promise<BaseResponse<Product>>
 */
export const fetchProductById = async (
    id: string
): Promise<BaseResponse<Product>> => {
    const res = await fetch(`${API_BASE}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    const data: BaseResponse<Product> = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch product');
    }

    return data;
};

/**
 * Updates a product fully (PUT request)
 * @param id - The product ID
 * @param payload - The updated product data
 * @returns Promise<BaseResponse<Product>>
 */
export const updateProduct = async (
    id: string,
    payload: CreateNewProduct
): Promise<BaseResponse<Product>> => {
    const res = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    const data: BaseResponse<Product> = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to update product');
    }

    return data;
};

/**
 * Partially updates a product (PATCH request)
 * @param id - The product ID
 * @param payload - The partial update data
 * @returns Promise<BaseResponse<Product>>
 */
export const patchProduct = async (
    id: string,
    payload: UpdateProduct
): Promise<BaseResponse<Product>> => {
    const res = await fetch(`${API_BASE}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    const data: BaseResponse<Product> = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to partially update product');
    }

    return data;
};
