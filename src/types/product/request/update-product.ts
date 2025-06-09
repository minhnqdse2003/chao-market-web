import { CreateNewProduct, newProductSchema } from './create-product';

export type updateProduct = Partial<CreateNewProduct>;

export const updateProductSchema = newProductSchema.partial();
