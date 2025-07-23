import { dislikePost } from './dislike';
import { likePost } from './like';
import { Post } from '@/db/schema';

const getPost = async (postId: string) => {
    const response = await fetch(`/api/posts/${postId}`);

    if (!response.ok) {
        throw new Error('Failed to fetch post');
    }

    return response.json();
};

const updatePost = async (postId: string, data: Partial<Post>) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to update post');
    }

    return response.json();
};

const deletePost = async (postId: string) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete post');
    }

    return response.json();
};

export { getPost, updatePost, deletePost, likePost, dislikePost };
