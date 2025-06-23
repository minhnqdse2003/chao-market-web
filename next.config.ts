import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    experimental: {
        useLightningcss: false,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'platform-lookaside.fbsbx.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
