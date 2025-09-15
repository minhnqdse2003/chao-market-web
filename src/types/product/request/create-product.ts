import { ConsultationServices } from '@/db/schema';
import { z } from 'zod';

export type CreateNewProduct = Pick<
    ConsultationServices,
    'name' | 'description' | 'price' | 'imageUrl' | 'stock'
>;

export const newProductSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string(),
    price: z.number().positive('Price must be positive'),
    stock: z
        .number()
        .int()
        .nonnegative('Stock must be a non-negative integer')
        .nullable(),
    imageUrl: z.string().url('Must be a valid URL').nullable(),
});
