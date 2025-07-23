import { Post } from '@/db/schema';

export async function getPosts() {
    const response = await fetch(`/api/posts`);

    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }

    return response.json();
}

export async function createPost(data: Partial<Post>) {
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to create post');
    }

    return response.json();
}

export * from './[id]';
