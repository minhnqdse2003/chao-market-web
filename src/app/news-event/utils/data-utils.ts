export async function getMockData(): Promise<NewsType[]> {
    const mockData: NewsType[] = [
        {
            title: 'Exploring the Future of Renewable Energy',
            description:
                'An in-depth look at emerging technologies in solar and wind energy, highlighting innovations in energy storage and grid integration. The article discusses challenges and opportunities for scaling renewable energy globally.',
            image: 'https://i.pravatar.cc/150?img=9', // wind turbine
            like: 1245,
            dislike: 87,
            views: 15672,
            date: '2025-07-01',
            referenceSource:
                'https://example.com/articles/renewable-energy-future',
        },
        {
            title: 'Advancements in Artificial Intelligence for Healthcare',
            description:
                'This article explores how AI is transforming diagnostics and patient care, with a focus on machine learning models for early disease detection and personalized treatment plans.',
            image: 'https://i.pravatar.cc/150?img=9', // AI + healthcare
            like: 892,
            dislike: 45,
            views: 9876,
            date: '2025-06-15',
            referenceSource:
                'https://example.com/articles/ai-healthcare-advancements',
        },
        {
            title: 'The Rise of Quantum Computing',
            description:
                'A detailed overview of quantum computing breakthroughs, including their potential to revolutionize cryptography and complex simulations. Challenges in scalability are also discussed.',
            image: 'https://i.pravatar.cc/150?img=9', // abstract tech
            like: 2034,
            dislike: 123,
            views: 23451,
            date: '2025-05-20',
            referenceSource:
                'https://example.com/articles/quantum-computing-rise',
        },
        {
            title: 'Sustainable Urban Planning in the 21st Century',
            description:
                'An analysis of modern urban planning strategies that prioritize sustainability, including green infrastructure and smart city technologies to reduce environmental impact.',
            image: 'https://i.pravatar.cc/150?img=9', // green city
            like: 657,
            dislike: 32,
            views: 7890,
            date: '2025-04-10',
            referenceSource:
                'https://example.com/articles/sustainable-urban-planning',
        },
        {
            title: 'The Impact of 5G on Global Connectivity',
            description:
                'This piece examines the rollout of 5G networks, their impact on IoT, autonomous vehicles, and remote work, along with concerns about infrastructure costs and security.',
            image: 'https://i.pravatar.cc/150?img=9', // 5G antennas
            like: 1765,
            dislike: 98,
            views: 18234,
            date: '2025-03-05',
            referenceSource: 'https://example.com/articles/5g-global-impact',
        },
    ];

    return mockData;
}

export type NewsType = {
    title: string;
    description: string;
    image: string;
    like: number;
    dislike: number;
    views: number;
    date: string;
    referenceSource: string;
};
