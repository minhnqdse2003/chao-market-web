'use server';

import { TagTypes } from '@/types/tags';
import { db } from '@/lib/db';
import { tags, Tag } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { BaseResponse } from '@/types/base-response';

export const getTags = async (type: TagTypes): Promise<BaseResponse<Tag[]>> => {
    try {
        const result = await db
            .select()
            .from(tags)
            .where(eq(tags.tagType, type))
            .orderBy(tags.name);

        return {
            data: result,
            message: 'Get Tag Successfully.',
        };
    } catch (error) {
        console.error('Failed to fetch tags:', error);
        return {
            data: [],
        };
    }
};
