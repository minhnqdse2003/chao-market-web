const likePost = async (postId: string) => {
    const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
    });

    if (!response.ok) {
        throw new Error('Failed to like post');
    }

    return response.json();
};

export { likePost };
