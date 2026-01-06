/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/context/i18n/context';
import { AppTabs, TabItem } from '@/components/app-tabs';
import { GeneralBanner } from '@/components/app-banner';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BlockContentsProps } from '@/app/(user-layout)/chao-solutions/components/block-contents';
import { useConsultationServicesModularApproach } from '@/hooks/react-query/consultation/use-consultation-services';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Tag, XIcon } from 'lucide-react';
import { MdAddShoppingCart } from 'react-icons/md';

interface PageProps {
    searchParams: Promise<{
        tab?: string;
    }>;
}

/**
 * 1. HOLISTIC APPROACH COMPONENT
 * Contains the original 5 static content blocks mapped into an Accordion
 */
const HolisticContent = ({ t }: { t: (key: string) => any }) => {
    const contents: Partial<BlockContentsProps>[] = [
        {
            title: t('ourSolutions.financialFoundation.title'),
            buttonComp: {
                title: t('ourSolutions.common.getStarted'),
                id: '18ff56d7-7c1c-4880-a243-12290893cada',
            },
            children: (
                <div className="space-y-6 text-brand-text/90">
                    <p>{t('ourSolutions.financialFoundation.description')}</p>

                    {/* Delivery Options Topic */}
                    <div className="space-y-1.5">
                        <p className="font-bold text-brand-text">
                            {t(
                                'ourSolutions.financialFoundation.deliveryOptions.title'
                            )}
                        </p>
                        <ul className="list-disc list-inside space-y-0.5 pl-2">
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.financialFoundation.deliveryOptions.workshop'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.financialFoundation.deliveryOptions.workshopDesc'
                                )}
                            </li>
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.financialFoundation.deliveryOptions.mentoring'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.financialFoundation.deliveryOptions.mentoringDesc'
                                )}
                            </li>
                        </ul>
                    </div>

                    {/* Outcomes Topic */}
                    <div className="space-y-1.5">
                        <p className="font-bold text-brand-text">
                            {t(
                                'ourSolutions.financialFoundation.outcomes.title'
                            )}
                        </p>
                        <ul className="list-disc list-inside space-y-0.5 pl-2 ">
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.financialFoundation.outcomes.roadmap'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.financialFoundation.outcomes.roadmapDesc'
                                )}
                            </li>
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.financialFoundation.outcomes.riskAssessment'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.financialFoundation.outcomes.riskAssessmentDesc'
                                )}
                            </li>
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.financialFoundation.outcomes.assetKnowledge'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.financialFoundation.outcomes.assetKnowledgeDesc'
                                )}
                            </li>
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.financialFoundation.outcomes.independentDecision'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.financialFoundation.outcomes.independentDecisionDesc'
                                )}
                            </li>
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.financialFoundation.outcomes.budgetingMastery'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.financialFoundation.outcomes.budgetingMasteryDesc'
                                )}
                            </li>
                        </ul>
                    </div>

                    <p className="font-medium text-[var(--brand-grey-foreground)] !mt-8 dark:text-[var(--brand-color)]">
                        {t('ourSolutions.financialFoundation.note')}
                    </p>
                </div>
            ),
            slug: 'financial-foundation-mentoring',
        },
        {
            title: t('ourSolutions.portfolioStrategy.title'),
            buttonComp: {
                title: t('ourSolutions.common.getStarted'),
                id: '35f103a7-8ca5-4072-89a3-02548c28d5ae',
            },
            children: (
                <div className="space-y-6 text-brand-text/90">
                    <p>{t('ourSolutions.portfolioStrategy.description')}</p>

                    {/* Delivery Options Topic */}
                    <div className="space-y-1.5">
                        <p className="font-bold text-brand-text">
                            {t(
                                'ourSolutions.portfolioStrategy.deliveryOptions.title'
                            )}
                        </p>
                        <ul className="list-disc list-inside space-y-0.5 pl-2">
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.portfolioStrategy.deliveryOptions.workshop'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.portfolioStrategy.deliveryOptions.workshopDesc'
                                )}
                            </li>
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.portfolioStrategy.deliveryOptions.mentoring'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.portfolioStrategy.deliveryOptions.mentoringDesc'
                                )}
                            </li>
                        </ul>
                    </div>

                    {/* Outcomes Topic */}
                    <div className="space-y-1.5">
                        <p className="font-bold text-brand-text">
                            {t('ourSolutions.portfolioStrategy.outcomes.title')}
                        </p>
                        <ul className="list-disc list-inside space-y-0.5 pl-2">
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.portfolioStrategy.outcomes.framework'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.portfolioStrategy.outcomes.frameworkDesc'
                                )}
                            </li>
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.portfolioStrategy.outcomes.rebalancing'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.portfolioStrategy.outcomes.rebalancingDesc'
                                )}
                            </li>
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.portfolioStrategy.outcomes.toolsProficiency'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.portfolioStrategy.outcomes.toolsProficiencyDesc'
                                )}
                            </li>
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.portfolioStrategy.outcomes.riskManagement'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.portfolioStrategy.outcomes.riskManagementDesc'
                                )}
                            </li>
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.portfolioStrategy.outcomes.objectiveDecision'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.portfolioStrategy.outcomes.objectiveDecisionDesc'
                                )}
                            </li>
                        </ul>
                    </div>

                    <p className="font-medium text-[var(--brand-grey-foreground)] !mt-8 dark:text-[var(--brand-color)]">
                        {t('ourSolutions.portfolioStrategy.note')}
                    </p>
                </div>
            ),
            slug: 'portfolio-strategy-tools',
        },
        {
            title: t('ourSolutions.algoTrading.title'),
            buttonComp: {
                title: t('ourSolutions.common.getStarted'),
                id: '850f6aa6-f2b5-4b89-a303-98660d887ec7',
            },
            children: (
                <div className="space-y-6 text-brand-text/90">
                    <p>{t('ourSolutions.algoTrading.description')}</p>

                    {/* Delivery Method Topic */}
                    <div className="space-y-1.5">
                        <p className="font-bold text-brand-text">
                            {t('ourSolutions.algoTrading.deliveryMethod.title')}
                        </p>
                        <p>
                            {t('ourSolutions.algoTrading.deliveryMethod.desc')}
                        </p>
                    </div>

                    {/* Outcomes Topic */}
                    <div className="space-y-1.5">
                        <p className="font-bold text-brand-text">
                            {t('ourSolutions.algoTrading.outcomes.title')}
                        </p>
                        <ul className="list-disc list-inside space-y-0.5 pl-2">
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.algoTrading.outcomes.codedSystem'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.algoTrading.outcomes.codedSystemDesc'
                                )}
                            </li>
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.algoTrading.outcomes.backtestReport'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.algoTrading.outcomes.backtestReportDesc'
                                )}
                            </li>
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.algoTrading.outcomes.deployedTool'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.algoTrading.outcomes.deployedToolDesc'
                                )}
                            </li>
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.algoTrading.outcomes.systematicExecution'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.algoTrading.outcomes.systematicExecutionDesc'
                                )}
                            </li>
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.algoTrading.outcomes.fullOwnership'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.algoTrading.outcomes.fullOwnershipDesc'
                                )}
                            </li>
                        </ul>
                    </div>

                    <p className="font-medium text-[var(--brand-grey-foreground)] !mt-8 dark:text-[var(--brand-color)]">
                        {t('ourSolutions.algoTrading.note')}
                    </p>
                </div>
            ),
            slug: 'algorithmic-trading-solutions',
        },
        {
            title: t('ourSolutions.tradingPerformance.title'),
            buttonComp: {
                title: t('ourSolutions.common.getStarted'),
                id: '91aa5027-325b-4cef-9503-8a03e0790074',
            },
            children: (
                <div className="space-y-6 text-brand-text/90">
                    <p>{t('ourSolutions.tradingPerformance.description')}</p>

                    {/* Delivery Options Topic */}
                    <div className="space-y-1.5">
                        <p className="font-bold text-brand-text">
                            {t(
                                'ourSolutions.tradingPerformance.deliveryOptions.title'
                            )}
                        </p>
                        <ul className="list-disc list-inside space-y-0.5 pl-2">
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.tradingPerformance.deliveryOptions.workshop'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.tradingPerformance.deliveryOptions.workshopDesc'
                                )}
                            </li>
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.tradingPerformance.deliveryOptions.mentoring'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.tradingPerformance.deliveryOptions.mentoringDesc'
                                )}
                            </li>
                        </ul>
                    </div>

                    {/* Outcomes Topic */}
                    <div className="space-y-1.5">
                        <p className="font-bold text-brand-text">
                            {t(
                                'ourSolutions.tradingPerformance.outcomes.title'
                            )}
                        </p>
                        <ul className="list-disc list-inside space-y-0.5 pl-2">
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.tradingPerformance.outcomes.performanceView'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.tradingPerformance.outcomes.performanceViewDesc'
                                )}
                            </li>
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.tradingPerformance.outcomes.behavioralPatterns'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.tradingPerformance.outcomes.behavioralPatternsDesc'
                                )}
                            </li>
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.tradingPerformance.outcomes.improvementPlan'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.tradingPerformance.outcomes.improvementPlanDesc'
                                )}
                            </li>
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.tradingPerformance.outcomes.selfReviewSkills'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.tradingPerformance.outcomes.selfReviewSkillsDesc'
                                )}
                            </li>
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.tradingPerformance.outcomes.tradingDiscipline'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.tradingPerformance.outcomes.tradingDisciplineDesc'
                                )}
                            </li>
                        </ul>
                    </div>

                    <p className="font-medium text-[var(--brand-grey-foreground)] !mt-8 dark:text-[var(--brand-color)]">
                        {t('ourSolutions.tradingPerformance.note')}
                    </p>
                </div>
            ),
            slug: 'trading-performance-mentoring',
        },
        {
            title: t('ourSolutions.financialCourse.title'),
            buttonComp: {
                title: t('ourSolutions.common.getStarted'),
                id: 'c3d2e0cc-484d-475c-8051-03c70b4e40d6',
            },
            children: (
                <div className="space-y-6 text-brand-text/90">
                    <p>{t('ourSolutions.financialCourse.description')}</p>

                    {/* Delivery Options Topic */}
                    <div className="space-y-1.5">
                        <p className="font-bold text-brand-text">
                            {t(
                                'ourSolutions.financialCourse.deliveryOptions.title'
                            )}
                        </p>
                        <ul className="list-disc list-inside space-y-0.5 pl-2">
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.financialCourse.deliveryOptions.groupClass'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.financialCourse.deliveryOptions.groupClassDesc'
                                )}
                            </li>
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.financialCourse.deliveryOptions.privateMentoring'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.financialCourse.deliveryOptions.privateMentoringDesc'
                                )}
                            </li>
                        </ul>
                    </div>

                    {/* Outcomes Topic */}
                    <div className="space-y-1.5">
                        <p className="font-bold text-brand-text">
                            {t('ourSolutions.financialCourse.outcomes.title')}
                        </p>
                        <ul className="list-disc list-inside space-y-0.5 pl-2">
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.financialCourse.outcomes.foundationalKnowledge'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.financialCourse.outcomes.foundationalKnowledgeDesc'
                                )}
                            </li>
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.financialCourse.outcomes.analysisSkills'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.financialCourse.outcomes.analysisSkillsDesc'
                                )}
                            </li>
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.financialCourse.outcomes.toolProficiency'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.financialCourse.outcomes.toolProficiencyDesc'
                                )}
                            </li>
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.financialCourse.outcomes.strategicFramework'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.financialCourse.outcomes.strategicFrameworkDesc'
                                )}
                            </li>
                            <li>
                                <span className="font-bold text-brand-text">
                                    {t(
                                        'ourSolutions.financialCourse.outcomes.confidenceToInvest'
                                    )}
                                    :
                                </span>{' '}
                                {t(
                                    'ourSolutions.financialCourse.outcomes.confidenceToInvestDesc'
                                )}
                            </li>
                        </ul>
                    </div>

                    <p className="font-medium text-[var(--brand-grey-foreground)] !mt-8 dark:text-[var(--brand-color)]">
                        {t('ourSolutions.financialCourse.note')}
                    </p>
                </div>
            ),
            slug: 'financial-investment-courses',
        },
    ];

    return (
        <div>
            <Accordion type="single" collapsible className="w-full space-y-6">
                {contents.map((item, idx) => (
                    <AccordionItem
                        key={idx}
                        value={item.slug}
                        id={item.slug}
                        className="border rounded-xl px-4 lg:px-8 bg-white dark:bg-transparent transition-all shadow-sm"
                    >
                        <AccordionTrigger className="hover:no-underline py-4">
                            <span className="text-base lg:text-lg dark:text-[var(--brand-color)] text-brand-text font-bold text-left tracking-tight">
                                {item.title}
                            </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                            <div className="dark:text-[var(--brand-grey-foreground)] text-brand-text text-sm lg:text-base tracking-normal lg:tracking-wide leading-6 lg:leading-8 [&_ul]:list-disc [&_ul]:list-inside">
                                {item.children}
                            </div>
                            <div className="mt-10">
                                <Link
                                    href={`/book-a-consultation?selectedItemId=${item.buttonComp.id}`}
                                >
                                    <Button className="bg-[var(--brand-color)] hover:bg-[var(--brand-color)] transition-all duration-300 ease-in-out rounded-3xl px-8 py-3 w-fit text-brand-text dark:text-black font-semibold shadow-lg text-sm lg:text-base">
                                        {t('ourSolutions.common.getStarted')}
                                    </Button>
                                </Link>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

/**
 * 2. MODULAR APPROACH COMPONENT
 * Placeholder for Instructor-led services
 */
const ModularContent = () => {
    const { data } = useConsultationServicesModularApproach();
    const { locale, t } = useI18n();
    const [activeId, setActiveId] = React.useState<string | null>(null);

    // Get the actual selected object from the data list
    const selectedItem = data?.data?.find((item: any) => item.id === activeId);

    const formatPrice = (price: string) => {
        if (!price) return '0';
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(parseFloat(price));
    };

    const handleCardClick = (id: string) => {
        setActiveId(activeId === id ? null : id);
    };

    return (
        <div className="w-full flex flex-row max-h-[80svh] overflow-hidden p-2 lg:p-6">
            <div
                className={`flex flex-wrap items-start content-start gap-4 transition-all duration-500 overflow-y-auto pr-2
                    ${activeId ? 'w-full lg:w-2/3' : 'w-full'}`}
            >
                {data?.data?.map((item: any) => (
                    <Card
                        key={item.id}
                        onClick={() => handleCardClick(item.id)}
                        className={`h-fit min-h-[520px] cursor-pointer transition-all! p-0 pb-4 duration-300 ease-in-out overflow-hidden border-2
                            ${activeId === item.id ? 'border-[var(--brand-color)] shadow-md' : 'border-transparent dark:bg-[var(--brand-black-bg)] bg-white'}
                            ${activeId ? 'w-full md:w-[calc(50%-1rem)]' : 'w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]'}`}
                    >
                        {/* Card Image */}
                        <div className="w-full aspect-video overflow-hidden">
                            <img
                                src={item.imageUrl}
                                alt={item.name[locale]}
                                className="object-cover w-full h-full hover:scale-105 transition-transform! duration-500"
                            />
                        </div>

                        <CardHeader className="p-4 space-y-2">
                            <div className="flex justify-between gap-2 [&>div]:flex [&>div]:gap-2 [&>div]:text-sm">
                                <div>
                                    {t('common.market')}:
                                    <Badge
                                        variant="secondary"
                                        className="text-[10px] uppercase"
                                    >
                                        {item.marketType}
                                    </Badge>
                                </div>
                                <div>
                                    {t('common.type')}:
                                    <Badge
                                        variant="outline"
                                        className="text-[10px] uppercase border-[var(--brand-color)] text-[var(--brand-color)]"
                                    >
                                        {item.type}
                                    </Badge>
                                </div>
                            </div>
                            <CardTitle className="line-clamp-1 text-sm lg:text-base font-bold">
                                {item.name.en}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="px-4 pb-2">
                            <CardDescription className="line-clamp-2 text-xs">
                                {item.shortDescription[locale]}
                            </CardDescription>
                        </CardContent>

                        <CardFooter className="p-4 pt-0 flex justify-between items-center border-t mt-2">
                            <div className="flex items-center dark:text-[var(--brand-color)] font-bold text-sm">
                                <Tag className="w-3 h-3 mr-1" />
                                {formatPrice(item.price)}
                            </div>
                            <div className="flex items-center text-muted-foreground text-[10px]">
                                <Eye className="w-3 h-3 mr-1" />
                                {item.views}
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* RIGHT SIDE: THE DETAILS PANEL */}
            <div
                data-state={activeId !== null ? 'active' : 'inactive'}
                className="overflow-y-auto transition-all duration-500 ease-in-out
                    [&[data-state=inactive]]:w-0 [&[data-state=inactive]]:opacity-0
                    [&[data-state=active]]:w-full lg:[&[data-state=active]]:w-1/3 [&[data-state=active]]:opacity-100 [&[data-state=active]]:ml-4"
            >
                {selectedItem && (
                    <Card className="w-full min-h-full border-black dark:border-[var(--brand-color)] p-0 pb-4 dark:bg-[var(--brand-black-bg)] bg-white sticky top-0">
                        <CardHeader className="relative p-6">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2 h-8 w-8"
                                onClick={() => setActiveId(null)}
                            >
                                <XIcon className="size-4" />
                            </Button>

                            <Badge className="w-fit mb-2">
                                {selectedItem.marketType}
                            </Badge>
                            <CardTitle className="text-xl lg:text-2xl text-[var(--brand-color)]">
                                {(selectedItem.name as unknown as any)[locale]}
                            </CardTitle>
                            <CardDescription className="text-sm mt-2 italic">
                                {(selectedItem.shortDescription as any)[locale]}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="p-6 space-y-6">
                            {/* Stats Info */}
                            <div className="grid grid-cols-2 gap-4 py-4 border-y border-dashed">
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase">
                                        {t('common.price') || 'Price'}
                                    </p>
                                    <p className="font-bold text-lg text-[var(--brand-color)]">
                                        {formatPrice(selectedItem.price)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase">
                                        {t('common.type') || 'Type'}
                                    </p>
                                    <p className="font-medium text-sm">
                                        {selectedItem.type}
                                    </p>
                                </div>
                            </div>

                            {/* HTML Description Content */}
                            <div className="prose prose-sm dark:prose-invert max-w-full">
                                <h3 className="text-sm font-bold mb-2 uppercase tracking-wider">
                                    {t('common.description') || 'Description'}
                                </h3>
                                <div
                                    className="text-sm leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                        __html: (
                                            selectedItem.description as unknown as any
                                        )[locale],
                                    }}
                                />
                            </div>

                            {/* Action Button */}
                            <div className="h-fit flex flex-col gap-2">
                                <div className={'pb-4 border-b border-dashed'}>
                                    <Button className="w-full bg-[var(--brand-color)] hover:opacity-90 text-black dark:bg-[var(--brand-color)] dark:text-black font-bold rounded-xl transition-all! hover:bg-[var(--brand-color)]">
                                        <MdAddShoppingCart /> Add to Cart
                                    </Button>
                                </div>
                                {selectedItem.instructionLink && (
                                    <Link
                                        href={
                                            selectedItem.instructionLink || '#'
                                        }
                                        target="_blank"
                                        className="w-full"
                                    >
                                        <Button className="w-full bg-[var(--brand-color)] hover:opacity-90 text-black dark:bg-[var(--brand-color)] dark:text-black font-bold rounded-xl transition-all! hover:bg-[var(--brand-color)]">
                                            {t('common.instruction')}
                                        </Button>
                                    </Link>
                                )}
                                {selectedItem.downloadLink && (
                                    <Link
                                        href={selectedItem.downloadLink || '#'}
                                    >
                                        <Button className="w-full transition-all! bg-[var(--brand-color)] hover:opacity-90 text-black dark:bg-[var(--brand-color)] dark:text-black hover:bg-[var(--brand-color)] font-bold rounded-xl">
                                            {(
                                                selectedItem?.downloadLabel as any
                                            )[locale] || 'Get Started'}
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};
/**
 * MAIN PAGE EXPORT
 */
export default function OurSolutionsPage({ searchParams }: PageProps) {
    // Next.js 15 Async Params handling
    const resolvedParams = use(searchParams);
    const tab = resolvedParams.tab || 'holistic';

    const router = useRouter();
    const { t } = useI18n();

    // Map content to AppTabs structure
    const tabsList: TabItem[] = [
        {
            title: 'Holistic Approach',
            value: 'holistic',
            renderContent: () => Promise.resolve(<HolisticContent t={t} />),
        },
        {
            title: 'Modular Approach',
            value: `modular`,
            renderContent: () => Promise.resolve(<ModularContent />),
        },
    ];

    return (
        <div className="flex flex-col w-full">
            {/* 1. Header Banner */}
            <GeneralBanner />

            {/* 2. Tabs Section */}
            <AppTabs
                tabsList={tabsList}
                size={2}
                defaultValue={tab}
                onValueChange={(value: string) => {
                    if (value) {
                        router.push('/chao-solutions?tab=' + value);
                    }
                }}
            />
        </div>
    );
}
