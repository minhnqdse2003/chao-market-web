import { z } from 'zod';
import { CreateNewPost } from './create-post';

export type UpdatePost = CreateNewPost;

export const updatePostSchema = z.object({
    content: z.object({}).passthrough().optional(),
    referenceSource: z.string().url().optional(),
});
