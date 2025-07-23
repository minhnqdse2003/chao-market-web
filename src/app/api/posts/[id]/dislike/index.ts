const dislikePost = async (postId: string) => {
    const response = await fetch(`/api/posts/${postId}/dislike`, {
        method: 'POST',
    });

    if (!response.ok) {
        throw new Error('Failed to dislike post');
    }

    return response.json();
};

export { dislikePost };
