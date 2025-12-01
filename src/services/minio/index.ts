'use server';

import * as Minio from 'minio';
import sharp from 'sharp';
import { processFinalUrl } from '@/lib/process-final-url-minio';

// Reusable MinIO client (safe in server actions)
const getMinioClient = () => {
    return new Minio.Client({
        endPoint: process.env.NEXT_PUBLIC_MINIO_ENDPOINT!,
        port: parseInt(process.env.NEXT_PUBLIC_MINIO_PORT!),
        useSSL: process.env.NEXT_PUBLIC_MINIO_USE_SSL === 'true',
        accessKey: process.env.MINIO_ACCESS_KEY!,
        secretKey: process.env.MINIO_SECRET_KEY!,
    });
};

export type StorageType = 'AVATAR';

export async function uploadImage(file: File, type: StorageType) {
    try {
        // Convert File to buffer (formidable not needed for single File in Server Actions)
        const arrayBuffer = await file.arrayBuffer();
        const buffer = await sharp(Buffer.from(arrayBuffer)).webp().toBuffer();

        const minioClient = getMinioClient();
        const bucket = process.env.NEXT_PUBLIC_MINIO_BUCKET!;
        const objectName = processPath(type, file);

        try {
            await minioClient.bucketExists(bucket);
        } catch {
            await minioClient.makeBucket(bucket, 'us-east-1');
            await minioClient.setBucketPolicy(
                bucket,
                JSON.stringify({
                    Version: '2012-10-17',
                    Statement: [
                        {
                            Effect: 'Allow',
                            Principal: '*',
                            Action: ['s3:GetObject'],
                            Resource: [`arn:aws:s3:::${bucket}/*`],
                        },
                    ],
                })
            );
        }

        // Upload
        await minioClient.putObject(bucket, objectName, buffer, buffer.length, {
            'Content-Type': file.type,
        });

        // Return public URL
        const url = processFinalUrl(type, bucket, objectName);
        return { success: true, url, path: objectName };
    } catch (error) {
        console.error('[MinIO Upload Error]:', error);
        return { error: error.message || 'Upload failed' };
    }
}

const processPath = (type: StorageType, file: File) => {
    switch (type) {
        case 'AVATAR':
            return `avatar/${new Date().getFullYear()}/${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
        default:
            throw new Error(
                `process path failed due to type(${type}) not exist.`
            );
    }
};
