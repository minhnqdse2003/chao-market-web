import { zodPaginationSchema, zodTimeStampModifiedSchema } from '@/schema/zod';
import { z } from 'zod';

export type PostRequestParams = z.infer<typeof postQuerySchema>;

export const postQuerySchema = z.object({
    ...zodPaginationSchema,
    createdAt: zodTimeStampModifiedSchema.createdAt,
    type: z.enum(['news', 'events', 'community']).optional(),
    filterBy: z
        .enum(['recommended', 'hottest', 'mostViewed', 'topRated'])
        .optional(),
});
