'use client';

import BlockContents, { BlockContentsProps } from './components/block-contents';
import { GeneralBanner } from '@/components/app-banner';
import { useI18n } from '@/context/i18n/context';

const OurSolutionsPage = () => {
    const { t } = useI18n();

    // Define the content structure with translation keys
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

                    <p className="font-bold text-[var(--brand-grey-foreground)] !mt-8 dark:text-[var(--brand-color)]/70">
                        {t('ourSolutions.financialFoundation.note')}
                    </p>
                </div>
            ),
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

                    <p className="font-bold text-[var(--brand-grey-foreground)] !mt-8 dark:text-[var(--brand-color)]/70">
                        {t('ourSolutions.portfolioStrategy.note')}
                    </p>
                </div>
            ),
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

                    <p className="font-bold text-[var(--brand-grey-foreground)] !mt-8 dark:text-[var(--brand-color)]/70">
                        {t('ourSolutions.algoTrading.note')}
                    </p>
                </div>
            ),
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

                    <p className="font-bold text-[var(--brand-grey-foreground)] !mt-8 dark:text-[var(--brand-color)]/70">
                        {t('ourSolutions.tradingPerformance.note')}
                    </p>
                </div>
            ),
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

                    <p className="font-bold text-[var(--brand-grey-foreground)] !mt-8 dark:text-[var(--brand-color)]/70">
                        {t('ourSolutions.financialCourse.note')}
                    </p>
                </div>
            ),
        },
    ];

    return (
        <div className="flex flex-col [&>div:not(:last-child)]:pb-4  [&>div:not(:first-child)]:pt-18 [&>div:first-child]:mb-0! [&>div:not(:last-child)]:border-b [&>div:first-child]:border-b-0! [&>div:first-child]:pb-0! border-[var(--brand-grey)] [&>div:nth-child(2)]:pt-[47.5px] [&>div:nth-child(2)]:scroll-mt-39 [&>div:not(:first-child)]:scroll-mt-33 [&>_*_li::marker]:text-xs ">
            <GeneralBanner />
            {contents.map((item, idx) => (
                <BlockContents
                    key={idx}
                    buttonComp={item.buttonComp!}
                    title={item.title!}
                    id={`${idx + 1}`}
                    params={item.buttonComp?.id}
                >
                    {item.children}
                </BlockContents>
            ))}
        </div>
    );
};

export default OurSolutionsPage;
