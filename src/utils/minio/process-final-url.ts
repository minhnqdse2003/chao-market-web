export const processFinalUrl = (path: string) => {
    return `${process.env.NEXT_PUBLIC_MINIO_USE_SSL === 'true' ? 'https' : 'http'}://${process.env.NEXT_PUBLIC_MINIO_ENDPOINT}:${process.env.NEXT_PUBLIC_MINIO_PORT}/${process.env.NEXT_PUBLIC_MINIO_BUCKET}/${path}`;
};
