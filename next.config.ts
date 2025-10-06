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
            {
                protocol: 'https',
                hostname: 'cdn2.tuoitre.vn',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'www.reuters.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'image.vietstock.vn',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'static1.vietstock.vn',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'i-invdn-com.investing.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'vnanet.vn',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'i.pravatar.cc',
                port: '',
                pathname: '/**',
            },
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
