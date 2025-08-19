// types/tag/request/create-tag.ts
import { NewTag } from '@/db/schema';
import { z } from 'zod';

export type CreateTag = Pick<NewTag, 'name'>;

export const createTagSchema = z.object({
    name: z.string().min(1).max(50),
});
