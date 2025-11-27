import { Post } from '@/db/schema';
import { PostRequestParams } from '@/types/post/request/post-params';
import { buildURLSearchParams } from '@/utils/api/query-params-build';

export async function getPosts(requestParams: PostRequestParams) {
    const transformParams = buildURLSearchParams(requestParams);
    transformParams.delete('type');
    if (Array.isArray(requestParams.type)) {
        requestParams.type.forEach(item =>
            transformParams.append('type', item)
        );
    }

    const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/posts?${transformParams}`
    );

    if (!response.ok) {
        console.error('Failed to fetch posts:', JSON.stringify(response));
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
