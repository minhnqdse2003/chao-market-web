import { NewPost } from '@/db/schema';
import { z } from 'zod';

export type CreateNewPost = Pick<
    NewPost,
    'content' | 'referenceSource' | 'title' | 'description'
>;

export const createPostSchema = z.object({
    content: z.string(),
    referenceSource: z.string().url(),
    title: z.string(),
    description: z.string(),
});
