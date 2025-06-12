import { zodPaginationSchema, zodTimeStampModifiedSchema } from '@/schema/zod';
import { PaginationRequest } from '@/types/pagination';
import { z } from 'zod';

export interface PostRequestParams extends PaginationRequest {
    createdAt?: Date;
}

export const postQuerySchema = z.object({
    ...zodPaginationSchema,
    createdAt: zodTimeStampModifiedSchema.createdAt,
});
