import { StorageType } from '@/services/minio';

export const processFinalUrl = (
    type: StorageType,
    bucket: string,
    objectName: string
) => {
    switch (type) {
        case 'AVATAR':
            return `${process.env.NEXT_PUBLIC_MINIO_USE_SSL === 'true' ? 'https' : 'http'}://${process.env.NEXT_PUBLIC_MINIO_ENDPOINT}:${process.env.NEXT_PUBLIC_MINIO_PORT}/${bucket}/${objectName}`;
        default:
            throw new Error(
                `process path failed due to type(${type}) not exist.`
            );
    }
};
