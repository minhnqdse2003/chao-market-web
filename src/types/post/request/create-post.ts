import { z } from 'zod';

export type CreateNewPost = z.infer<typeof createPostSchema>;

export const createPostSchema = z.object({
    content: z.string().min(0),
    referenceSource: z.url(),
    title: z.string().min(1),
    description: z.string().min(1),
    type: z.enum(['news', 'events', 'community']),
    slug: z.string().optional(),

    // SEO fields (optional)
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    seoKeywords: z.array(z.string()).optional(),
    ogImage: z.url().optional(),
    canonicalUrl: z.url().optional(),
    robots: z.string().optional(),
    tagIds: z.array(z.uuid()).optional(),
});
