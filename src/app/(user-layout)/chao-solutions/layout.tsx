import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Giải Pháp Tài Chính Chao Market | Our Financial Solutions',
    description:
        'Khám phá giải pháp tài chính toàn diện: Nền tảng tài chính, chiến lược danh mục, giao dịch thuật toán... | Discover comprehensive financial solutions...',
    keywords: [
        'giải pháp tài chính',
        'nền tảng tài chính',
        'giao dịch thuật toán',
        'financial foundation',
        'portfolio strategy',
        'algorithmic trading',
        'Chao Market giải pháp',
    ],
    alternates: {
        canonical: 'https://chaomarket.com/chao-solution',
    },
    openGraph: {
        title: 'Giải Pháp Tài Chính Chao Market | Financial Solutions',
        description: 'Workshop, mentoring và công cụ tài chính chuyên sâu...',
        url: 'https://chaomarket.com/chao-solution',
        images: [
            {
                url: 'https://chaomarket.com/img/brand-logo.svg',
                width: 1200,
                height: 630,
            },
        ],
        locale: 'vi_VN',
        type: 'website',
    },
};

export default function OurSolutionsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
