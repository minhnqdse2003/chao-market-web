import BlockContents, { BlockContentsProps } from './components/block-contents';
import { GeneralBanner } from '@/components/app-banner';

const contents: Partial<BlockContentsProps>[] = [
    {
        title: 'Consulting Personal Finance',
        buttonComp: {
            title: 'Get Started',
            id: '18ff56d7-7c1c-4880-a243-12290893cada',
        },
        children: (
            <>
                <p>
                    At ChàoMarkets, we understand that each individual has
                    unique financial goals and different investment paths. Our
                    Personal Financial Advisory service is designed to help you
                    optimize investment decisions, especially in the dynamic
                    financial market. We apply advanced trading algorithms and
                    in-depth data analysis methods to develop strategies that
                    are accurate and tailored to your financial capacity and
                    risk appetite.
                </p>
                <p>
                    By combining expert advice with automated trading technology
                    (algorithmic trading), we not only help you build a solid
                    financial plan but also support you in seizing potential
                    investment opportunities with confidence and high
                    efficiency. Whether you&apos;re a beginner or an experienced
                    investor, our services are committed to providing the most
                    suitable financial solutions to help you achieve your
                    long-term financial goals.
                </p>
                <p>
                    ChàoMarket – Where trading strategies turn into successful
                    financial decisions.
                </p>
            </>
        ),
    },
    {
        title: 'Managing Investment Portfolio',
        buttonComp: {
            title: 'Get Started',
            id: '35f103a7-8ca5-4072-89a3-02548c28d5ae',
        },
        children: (
            <>
                <p>
                    At ChàoMarkets, our Portfolio Management service helps you
                    build and maintain an efficient investment portfolio,
                    optimizing returns and minimizing risks in a constantly
                    fluctuating financial market. We combine artificial
                    intelligence and advanced trading algorithms to analyze and
                    monitor investment opportunities regularly, adjusting your
                    portfolio in a flexible and intelligent manner.
                </p>
                <p>
                    We understand that each investor has unique financial goals,
                    so our portfolio management service is personalized to meet
                    your specific needs and risk appetite. By utilizing big data
                    analysis tools and automated trading algorithms, you will
                    always receive accurate investment decisions, helping you
                    optimize long-term profits.
                </p>
                <p>
                    Whether you&apos;re investing in stocks, Forex, or other
                    financial assets, ChàoMarket is committed to supporting you
                    in managing and growing your portfolio in a professional,
                    efficient, and sustainable manner.
                </p>
            </>
        ),
    },
    {
        title: 'Building Trading System',
        buttonComp: {
            title: 'Get Started',
            id: '850f6aa6-f2b5-4b89-a303-98660d887ec7',
        },
        children: (
            <>
                <p>
                    At ChàoMarkets, we offer a specialized algorithmic trading
                    system development service, designed to optimize trading
                    strategies and performance in the financial markets. Based
                    on a solid data foundation and advanced algorithms, we help
                    investors automate their trading processes, minimize risks,
                    and enhance decision-making speed and accuracy.
                </p>
                <p>Our services include:</p>
                <ul>
                    <li>
                        Custom Trading Strategy Development: Analyzing and
                        developing strategies that align with investment goals
                        and the characteristics of the financial markets.
                    </li>
                    <li>
                        Trading System Optimization: Utilizing analytical
                        algorithms to optimize profits and minimize losses under
                        changing market conditions.
                    </li>
                    <li>
                        Integration of Trading Systems into Real Platforms: We
                        support the integration of trading systems into popular
                        online trading platforms, ensuring high practicality and
                        feasibility.
                    </li>
                </ul>
            </>
        ),
    },
    {
        title: 'Analysing Trading Account',
        buttonComp: {
            title: 'Get Started',
            id: '91aa5027-325b-4cef-9503-8a03e0790074',
        },
        children: (
            <>
                <p>
                    At ChàoMarkets, we offer a real trading account analysis
                    service that helps investors assess and optimize their
                    trading performance in the financial markets. By leveraging
                    powerful algorithmic analysis tools, we provide detailed
                    insights into executed trading strategies, offering
                    improvement suggestions and helping investors identify both
                    opportunities and risks during their trading process.
                </p>
                <p>Our services include:</p>
                <ul>
                    <li>
                        Trading Performance Analysis: Evaluating the trading
                        performance of real accounts, highlighting strengths and
                        weaknesses in trading strategies.
                    </li>
                    <li>
                        Risk Identification and Minimization: Analyzing the risk
                        factors in trading strategies and offering optimal
                        solutions to minimize risk.
                    </li>
                    <li>
                        Strategy Optimization Recommendations: Based on real
                        data, we provide specific recommendations on how to
                        optimize trading strategies to improve profitability and
                        overall performance.
                    </li>
                </ul>
            </>
        ),
    },
    {
        title: 'Financial Investment Course',
        buttonComp: {
            title: 'Get Started',
            id: 'c3d2e0cc-484d-475c-8051-03c70b4e40d6',
        },
        children: (
            <>
                <p>
                    At ChàoMarkets, we offer in-depth financial investment
                    courses specifically designed to help investors in Vietnam
                    master the essential knowledge of the financial markets and
                    algorithmic trading. Our courses are not just theoretical;
                    they also cover practical strategies tailored to the
                    characteristics and trends of the financial market.
                </p>
                <p>Our course services include:</p>
                <ul>
                    <li>
                        Solid foundational knowledge: Students will be equipped
                        with basic knowledge of financial markets, types of
                        assets, and financial analysis methods.
                    </li>
                    <li>
                        Practical investment strategies: Detailed guidance on
                        effective investment strategies, from market trend
                        analysis to using algorithmic tools to optimize returns.
                    </li>
                    <li>
                        Algorithmic trading application: Skills for applying
                        algorithmic trading to automate investment strategies
                        and maximize trading efficiency.
                    </li>
                    <li>
                        Learn from experts: The course is taught by experts with
                        rich experience in finance and technology, ensuring that
                        you gain the most insightful and practical knowledge.
                    </li>
                </ul>
            </>
        ),
    },
];

const Page = () => {
    return (
        <div className="flex flex-col gap-6 [&>div:not(:last-child)]:mb-12 [&>div:first-child]:mb-0! [&>div:not(:last-child)]:border-b [&>div:first-child]:border-b-0! border-[var(--brand-grey)]">
            <GeneralBanner />
            {contents.map((item, idx) => (
                <BlockContents
                    key={idx}
                    buttonComp={item.buttonComp!}
                    title={item.title!}
                    id={`${idx + 1}`}
                >
                    {item.children}
                </BlockContents>
            ))}
        </div>
    );
};

export default Page;
