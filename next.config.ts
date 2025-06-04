import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    experimental: {
        useLightningcss: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
