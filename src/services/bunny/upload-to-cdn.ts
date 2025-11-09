'use server';

import sharp from 'sharp';

const REGION = process.env.BUNNY_REGION || '';
const BASE_HOSTNAME = 'storage.bunnycdn.com';
const HOSTNAME = REGION ? `${REGION}.${BASE_HOSTNAME}` : BASE_HOSTNAME;
const STORAGE_ZONE_NAME = process.env.BUNNY_STORAGE_ZONE_NAME;
const ACCESS_KEY = process.env.BUNNY_STORAGE_API_KEY;

if (!STORAGE_ZONE_NAME || !ACCESS_KEY) {
    throw new Error('BunnyCDN environment variables are missing');
}

export interface UploadResult {
    success: boolean;
    url?: string;
    error?: string;
}

export interface UploadPayload {
    file: File;
    remotePath: string;
    convertToWebP: boolean;
}

export async function uploadToBunnyCDN({
    file,
    remotePath,
    convertToWebP = false,
}: UploadPayload): Promise<UploadResult> {
    try {
        const arrayBuffer = await file.arrayBuffer();
        let buffer = Buffer.from(arrayBuffer as ArrayBuffer);
        let finalRemotePath = remotePath;
        let contentType = file.type || 'application/octet-stream';

        if (convertToWebP && file.type.startsWith('image/')) {
            try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                buffer = await sharp(buffer)
                    .webp({ quality: 25, effort: 6 })
                    .toBuffer();
                finalRemotePath = remotePath.replace(/\.[^/.]+$/, '.webp');
                contentType = 'image/webp';
            } catch (err) {
                console.warn(
                    'WebP conversion failed, uploading original:',
                    err
                );
            }
        }

        const response = await fetch(
            `https://${HOSTNAME}/${STORAGE_ZONE_NAME}/${finalRemotePath}`,
            {
                method: 'PUT',
                headers: {
                    AccessKey: ACCESS_KEY!,
                    'Content-Type': contentType,
                },
                body: buffer,
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('BunnyCDN upload error:', response.status, errorText);
            return {
                success: false,
                error: `Upload failed: ${response.status}`,
            };
        }

        // Construct public URL
        const publicUrl = `https://${STORAGE_ZONE_NAME}.${HOSTNAME}/${finalRemotePath}`;
        return { success: true, url: publicUrl };
    } catch (error) {
        console.error('Upload action error:', error);
        return {
            success: false,
            error: (error as Error).message,
        };
    }
}
