import { NewPost } from '@/db/schema';
import { z } from 'zod';

export type CreateNewPost = Pick<NewPost, 'content' | 'referenceSource'>;

export const createPostSchema = z.object({
    content: z.object({}).passthrough(),
    referenceSource: z.string().url().optional(),
});
