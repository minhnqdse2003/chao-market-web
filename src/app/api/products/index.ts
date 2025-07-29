import { Product } from '@/db/schema';
import { BaseResponse } from '@/types/base-response';
import { PaginatedResponse } from '@/types/pagination';
import { CreateNewProduct } from '@/types/product/request/create-product';
import {
    fetchProductById,
    patchProduct,
    updateProduct,
} from '@/app/api/products/[id]';
import { ProductRequestParams } from '@/types/product/request/product-request-params';
import { buildURLSearchParams } from '@/utils/api/query-params-build';

// === Base API Configuration ===
const API_BASE = '/api/products';

// === Fetch All Products with Pagination (GET /api/products) ===
export const fetchAllProducts = async (
    queryParams: ProductRequestParams = {
        pageIndex: 0,
        pageSize: 10,
    }
): Promise<PaginatedResponse<Product>> => {
    const params = buildURLSearchParams(queryParams);

    const res = await fetch(`${API_BASE}?${params}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    const data: PaginatedResponse<Product> = await res.json();
    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }

    return data;
};

// === Create a New Product (POST /api/products) ===
export const createProduct = async (
    payload: CreateNewProduct
): Promise<BaseResponse<Product>> => {
    const res = await fetch(API_BASE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    const data: BaseResponse<Product> = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to create product');
    }

    return data;
};

// === Export All Functions as One Object (Optional) ===
export const productApi = {
    fetchAllProducts,
    createProduct,
    fetchProductById,
    updateProduct,
    patchProduct,
};
