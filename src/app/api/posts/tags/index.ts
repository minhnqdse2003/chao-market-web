// app/api/tags.ts
import { Tag } from '@/db/schema';
import { BaseResponse } from '@/types/base-response';

// Get all tags
export async function getAllTags(): Promise<Tag[]> {
    try {
        const response = await fetch('/api/posts/tags', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch tags');
        }

        const result: BaseResponse<Tag[]> = await response.json();
        return result.data ?? [];
    } catch (error) {
        console.error('Error fetching tags:', error);
        throw error;
    }
}

// Create a new tag
export async function createTag(name: string): Promise<Tag> {
    try {
        const response = await fetch('/api/posts/tags', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        const result: BaseResponse<Tag> = await response.json();

        if (!response.ok || result.data === undefined) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create tag');
        }

        return result.data;
    } catch (error) {
        console.error('Error creating tag:', error);
        throw error;
    }
}
