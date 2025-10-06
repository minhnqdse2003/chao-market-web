interface TitleNode {
    title: string;
}

interface ChaoSocialNode {
    title: string;
    items: {
        facebook: TitleNode,
        tiktok: TitleNode,
        threads: TitleNode,
        youtube: TitleNode,
    };
}

interface ToolForInvestorNode {
    title: string;
    items: {
        currencyConverterCalc: TitleNode,
        pipCalculator: TitleNode,
        profitCalculator: TitleNode,
        pivotalCalculator: TitleNode,
        fiboCalculator: TitleNode,
        marginCalculator: TitleNode,
        investmentCalculator: TitleNode,
    };
}

export interface Investors {
    title: string;
    items: {
        chaoAnnoucement: TitleNode;
        chaoSocial: ChaoSocialNode;
        toolForInvestor: ToolForInvestorNode;
    };
}