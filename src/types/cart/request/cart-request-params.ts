import { NewCart } from '@/db/schema';
import { zodPaginationSchema, zodTimeStampModifiedSchema } from '@/schema/zod';
import { PaginationRequest } from '@/types/pagination';
import { z } from 'zod';

export interface CartRequestParams
    extends PaginationRequest,
        Pick<NewCart, 'isCheckedOut' | 'createdAt' | 'updatedAt'> {}

export const cartQuerySchema = z.object({
    ...zodPaginationSchema,
    ...zodTimeStampModifiedSchema,
    isCheckedOut: z
        .string()
        .transform(val => val === 'true')
        .optional(),
});
