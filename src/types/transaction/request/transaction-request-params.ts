import { NewConsultations } from '@/db/schema';
import { zodPaginationSchema, zodTimeStampModifiedSchema } from '@/schema/zod';
import { PaginationRequest } from '@/types/pagination';
import { z } from 'zod';

export interface TransactionRequestParams
    extends PaginationRequest,
        Pick<
            NewConsultations,
            'status' | 'createdAt' | 'updatedAt' | 'totalAmount'
        > {}

export const transactionQuerySchema = z.object({
    ...zodPaginationSchema,
    ...zodTimeStampModifiedSchema,
    status: z.enum(['pending', 'completed', 'cancelled', 'failed']).optional(),
    totalAmount: z
        .string()
        .transform(val => parseInt(val))
        .refine(val => !isNaN(val) && val >= 0, {
            message: 'totalAmount must be a non-negative integer',
        })
        .optional(),
});
