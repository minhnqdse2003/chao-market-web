/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import React, { use, useState } from 'react';
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
import { Eye, Tag } from 'lucide-react';
import { MdAddShoppingCart } from 'react-icons/md';
import { signIn, useSession } from 'next-auth/react';
import { useCartStore } from '@/stores/cart.store';
import { CART_ACTIONS } from '@/stores/actions/cart.action';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { capitalizeWords } from '@/utils/string-parsing';
import ConsultationFilterDialog from '@/app/(user-layout)/chao-solutions/components/custom-solution-dialog';
import { GetConsultationFilterRequestParams } from '@/types/custom-solution/request';
import AppDropdown, { DropdownOption } from '@/components/app-dropdown';
import LoadingComponent from '@/components/loading-spiner';
import { cn } from '@/lib/utils';

interface PageProps {
    searchParams: Promise<{
        tab?: string;
    }>;
}

/**
 * 1. HOLISTIC APPROACH COMPONENT
 * Contains the original 5 static content blocks mapped into an Accordion
 */

const accordionTriggerStyle = `hover:cursor-pointer py-4 justify-start items-center dark:[&[data-state='open']]:text-[var(--brand-color)] dark:[&[data-state='open']>_*_]:text-[var(--brand-color)] [&[data-state='open']]:underline dark:hover:text-[var(--brand-color)] dark:hover:[&>_*_]:text-[var(--brand-color)] dark:decoration-[var(--brand-color)]`;
const HolisticContent = () => {
    const { t } = useI18n();
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
                        className="rounded-none px-4 lg:px-8 transition-all"
                    >
                        <AccordionTrigger className={accordionTriggerStyle}>
                            <span className="text-base lg:text-lg text-brand-text font-bold text-left tracking-tight">
                                {item.title}
                            </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                            <div className="dark:text-[var(--brand-grey-foreground)] text-brand-text text-sm lg:text-base tracking-normal lg:tracking-wide leading-6 lg:leading-8 [&_ul]:list-disc [&_ul]:list-inside">
                                {item.children}
                            </div>
                            <div className="mt-10">
                                <Link
                                    href={`/book-a-consultation?selectedItemId=${item?.buttonComp?.id}`}
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
    const initialFilterParams: GetConsultationFilterRequestParams = {
        type: 'all',
        dateSort: 'desc',
        market: 'All',
    };
    const [consultationFilterParams, setConsultationFilterParams] =
        useState<GetConsultationFilterRequestParams>(initialFilterParams);
    const { data, isLoading } = useConsultationServicesModularApproach(
        consultationFilterParams
    );
    const { locale, t } = useI18n();
    const { status } = useSession();
    const router = useRouter();
    const dispatch = useCartStore(state => state.dispatch);
    const [activeId, setActiveId] = React.useState<string | null>(null);

    const selectedItem = data?.data?.find((item: any) => item.id === activeId);

    const ALL_SORT_OPTIONS: DropdownOption[] = [
        // Date Group
        {
            value: 'date_desc',
            label: t('common.dateSort.newestFirst'),
            group: t('common.date'),
        },
        {
            value: 'date_asc',
            label: t('common.dateSort.oldestFirst'),
            group: t('common.date'),
        },

        // Price Group
        {
            value: 'price_desc',
            label: t('common.hightToLow'),
            group: t('common.price'),
        },
        {
            value: 'price_asc',
            label: t('common.lowToHight'),
            group: t('common.price'),
        },

        // Views Group
        {
            value: 'views_desc',
            label: t('common.viewSort.mostViewedFirst'),
            group: t('common.views'),
        },
        {
            value: 'views_asc',
            label: t('common.viewSort.leastViewedFirst'),
            group: t('common.views'),
        },
    ];

    const handleUpdateSort = (combinedValue: string) => {
        const [field, direction] = combinedValue.split('_');

        setConsultationFilterParams(prev => ({
            ...prev,
            // Reset all sort fields and set the active one
            dateSort: field === 'date' ? direction : undefined,
            priceSort: field === 'price' ? direction : undefined,
            viewSort: field === 'views' ? direction : undefined,
        }));
    };

    const formatPrice = (price: string) => {
        if (!price) return '0';
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currencyDisplay: 'code',
            currency: 'VND',
        }).format(parseFloat(price));
    };

    const handleCardClick = (id: string) => {
        setActiveId(id);
    };

    const handleOnClickAddToCart = (id?: string) => {
        if (id && status === 'authenticated') {
            dispatch({
                type: CART_ACTIONS.ADD_ITEM,
                payload: id,
            });
            return;
        }
        return signIn(undefined, {
            callbackUrl: `/chao-solutions?tab=modular`,
        });
    };

    const handleOnClickBuyNow = async (id: string) => {
        await handleOnClickAddToCart(id);
        router.push(`/cart`);
    };

    if (isLoading) return <LoadingComponent />;

    return (
        <div className="w-full p-2 lg:px-4">
            {/* GRID LAYOUT - Now always full width */}
            <div className={'w-full flex justify-between items-center mb-2'}>
                <ConsultationFilterDialog
                    onApply={data =>
                        setConsultationFilterParams(prev => ({
                            ...prev,
                            ...data,
                        }))
                    }
                    initialSearchValue={consultationFilterParams}
                />

                <AppDropdown
                    options={ALL_SORT_OPTIONS}
                    defaultValue={
                        consultationFilterParams.dateSort
                            ? `date_${consultationFilterParams.dateSort}`
                            : consultationFilterParams.priceSort
                              ? `price_${consultationFilterParams.priceSort}`
                              : consultationFilterParams.viewSort
                                ? `views_${consultationFilterParams.viewSort}`
                                : 'date_desc'
                    }
                    value={
                        consultationFilterParams.dateSort
                            ? `date_${consultationFilterParams.dateSort}`
                            : consultationFilterParams.priceSort
                              ? `price_${consultationFilterParams.priceSort}`
                              : consultationFilterParams.viewSort
                                ? `views_${consultationFilterParams.viewSort}`
                                : 'date_desc'
                    }
                    buttonClassName="h-9 min-w-[180px] font-semibold"
                    onValueChange={handleUpdateSort}
                    shouldDisplayGroupLabel={true}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.data?.map((item: any) => (
                    <Card
                        key={item.id}
                        onClick={() => handleCardClick(item.id)}
                        className={cn(
                            `h-fit min-h-[320px] cursor-pointer transition-all! p-0 pb-4 duration-300 ease-in-out overflow-hidden border-2 border-transparent dark:bg-[var(--brand-black-bg)] bg-white dark:hover:border-[var(--brand-color)] hover:border-black hover:shadow-md`,
                            {
                                'dark:border-[var(--brand-color)] border-black':
                                    activeId === item.id,
                            }
                        )}
                    >
                        <div className="w-full overflow-hidden">
                            <img
                                src={item.imageUrl}
                                alt={item.name[locale]}
                                className="object-cover aspect-video w-full max-h-[200px] h-full hover:scale-105 transition-transform! duration-500"
                            />
                        </div>

                        <CardHeader className="p-4 space-y-2">
                            <div className="flex justify-between gap-2 [&>div]:flex [&>div]:gap-2 [&>div]:text-xs lg:[&>div]:text-sm">
                                <div
                                    className={
                                        'flex justify-between items-center'
                                    }
                                >
                                    <p
                                        className={
                                            'dark:text-[var(--brand-grey-foreground)] text-brand-text'
                                        }
                                    >
                                        {t('common.market')}:
                                    </p>
                                    <Badge
                                        variant="outline"
                                        className="font-bold text-xs border-brand-text text-brand-text"
                                    >
                                        {capitalizeWords(item.marketType)}
                                    </Badge>
                                </div>
                                <div
                                    className={
                                        'flex justify-between items-center'
                                    }
                                >
                                    <p
                                        className={
                                            'dark:text-[var(--brand-grey-foreground)] text-brand-text'
                                        }
                                    >
                                        {t('common.type')}:
                                    </p>
                                    <p className={'font-bold text-xs'}>
                                        {capitalizeWords(item.type)}
                                    </p>
                                </div>
                            </div>
                            <CardTitle className="line-clamp-1 text-sm lg:text-base font-bold">
                                {item.name[locale]}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="px-4 pb-2">
                            <CardDescription className="line-clamp-2 text-sm ">
                                {item.shortDescription[locale]}
                            </CardDescription>
                        </CardContent>

                        <CardFooter className="p-4 pt-0 flex justify-between items-center border-t mt-2">
                            <div className="flex items-center dark:text-[var(--brand-color)] font-bold text-base">
                                <Tag className="w-3 h-3 mr-1" />
                                {formatPrice(item.price)}
                            </div>
                            <div className="flex items-center text-muted-foreground text-sm">
                                <Eye className="w-3 h-3 mr-1" />
                                {item.views}
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* DETAIL DIALOG */}
            <Dialog
                open={!!activeId}
                onOpenChange={open => !open && setActiveId(null)}
            >
                <DialogContent className="max-w-full lg:max-w-2xl max-h-[90svh] overflow-y-auto p-0 border-none bg-transparent">
                    {selectedItem && (
                        <Card className="w-full p-0 py-4 dark:bg-[var(--brand-black-bg)] bg-white gap-4">
                            <CardHeader className="p-6 pb-2">
                                <div
                                    className={
                                        'flex justify-between items-center mb-6'
                                    }
                                >
                                    <div
                                        className={
                                            'flex items-center gap-2 text-xs'
                                        }
                                    >
                                        <p className="text-muted-foreground text-sm">
                                            {t('common.market') || 'Market'}:
                                        </p>
                                        <Badge
                                            variant="outline"
                                            className="font-bold border-brand-text text-brand-text"
                                        >
                                            {selectedItem.marketType}
                                        </Badge>
                                    </div>
                                    <div
                                        className={
                                            'flex items-center gap-2 text-xs'
                                        }
                                    >
                                        <p className="text-muted-foreground text-sm">
                                            {t('common.type') || 'Type'}:
                                        </p>
                                        <p className="font-bold">
                                            {selectedItem.type}
                                        </p>
                                    </div>
                                </div>
                                <DialogTitle className="text-xl lg:text-[22px]">
                                    {(selectedItem.name as any)[locale]}
                                </DialogTitle>

                                <DialogDescription className="text-sm mt-2 italic mb-4">
                                    {
                                        (selectedItem.shortDescription as any)[
                                            locale
                                        ]
                                    }
                                </DialogDescription>
                                <p className="font-bold lg:text-xl  text-[var(--brand-color)]">
                                    {formatPrice(selectedItem.price)}
                                </p>
                            </CardHeader>

                            <CardContent className="px-6 space-y-4 max-h-[40svh] overflow-y-auto">
                                {/* HTML Description Content */}
                                <Accordion
                                    type="single"
                                    collapsible
                                    defaultValue="description"
                                    className="w-full"
                                >
                                    <AccordionItem
                                        value="description"
                                        className="border-none"
                                    >
                                        <AccordionTrigger
                                            className={cn(
                                                accordionTriggerStyle,
                                                'py-0'
                                            )}
                                        >
                                            {t('common.description') ||
                                                'Description'}
                                        </AccordionTrigger>
                                        <AccordionContent className="pt-2">
                                            <div className="prose prose-sm dark:prose-invert max-w-full">
                                                <div
                                                    className="text-sm leading-relaxed text-brand-text/90 [&>_*_]:list-decimal [&>_*_]:list-inside"
                                                    dangerouslySetInnerHTML={{
                                                        __html: (
                                                            selectedItem.description as any
                                                        )[locale],
                                                    }}
                                                />
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>

                                {/* Action Buttons */}
                                <div className="h-fit flex flex-col gap-4">
                                    {(selectedItem?.guideInstruction as any) && (
                                        <Accordion
                                            type="single"
                                            collapsible
                                            className="w-full"
                                        >
                                            <AccordionItem
                                                value="guide"
                                                className="border-none"
                                            >
                                                <AccordionTrigger
                                                    className={cn(
                                                        accordionTriggerStyle,
                                                        'py-0'
                                                    )}
                                                >
                                                    {t('common.instruction') ||
                                                        'Guide'}
                                                </AccordionTrigger>
                                                <AccordionContent className="pt-2 flex flex-col gap-2">
                                                    <div className="prose prose-sm dark:prose-invert max-w-full">
                                                        <div
                                                            className="text-sm leading-relaxed text-brand-text/90 [&>_*_]:list-decimal [&>_*_]:list-inside"
                                                            dangerouslySetInnerHTML={{
                                                                __html: (
                                                                    selectedItem.guideInstruction as any
                                                                )[locale],
                                                            }}
                                                        />
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div
                                    className={'w-full flex justify-end gap-4'}
                                >
                                    <Button
                                        variant={'outline'}
                                        className="w-[8.8125rem] hover:opacity-90 font-bold rounded-xl transition-all! py-1"
                                        onClick={() =>
                                            handleOnClickAddToCart(
                                                selectedItem.id
                                            )
                                        }
                                    >
                                        <MdAddShoppingCart className="mr-2 size-5" />
                                        {t('common.addToCart')}
                                    </Button>
                                    <Button
                                        className="w-[8.8125rem] bg-[var(--brand-color)] hover:opacity-90 text-black dark:bg-[var(--brand-color)] dark:text-black font-bold rounded-xl transition-all! hover:bg-[var(--brand-color)] py-1"
                                        onClick={() =>
                                            handleOnClickBuyNow(selectedItem.id)
                                        }
                                    >
                                        {t('common.buyNow')}
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

/**
 * MAIN PAGE EXPORT
 */
export default function OurSolutionsPage({ searchParams }: PageProps) {
    const resolvedParams = use(searchParams);
    const tab = resolvedParams.tab || 'holistic';
    const router = useRouter();
    const { t } = useI18n();

    const tabsList: TabItem[] = [
        {
            title: t('common.fullSolution'),
            value: 'holistic',
            renderContent: () => Promise.resolve(<HolisticContent />),
        },
        {
            title: t('common.customSolution'),
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
                defaultValue={'holistic'}
                value={tab}
                onValueChange={(value: string) => {
                    if (value) {
                        router.push('/chao-solutions?tab=' + value);
                    }
                }}
            />
        </div>
    );
}
