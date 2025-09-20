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
                <>
                    <p>{t('ourSolutions.financialFoundation.description')}</p>
                    <p>
                        <span className="font-medium text-white">
                            {t(
                                'ourSolutions.financialFoundation.deliveryOptions.title'
                            )}
                        </span>
                    </p>
                    <ul>
                        <li>
                            <span className="font-medium text-white">
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
                            <span className="font-medium text-white">
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
                    <p className="mt-6">
                        <span className="font-medium text-white">
                            {t(
                                'ourSolutions.financialFoundation.outcomes.title'
                            )}
                        </span>
                    </p>
                    <ul className="mt-2">
                        <li>
                            <span className="font-medium text-white">
                                {t(
                                    'ourSolutions.financialFoundation.outcomes.roadmap'
                                )}
                                :
                            </span>{' '}
                            {t(
                                'ourSolutions.financialFoundation.outcomes.roadmapDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <span className="font-medium text-white">
                                {t(
                                    'ourSolutions.financialFoundation.outcomes.riskAssessment'
                                )}
                                :
                            </span>{' '}
                            {t(
                                'ourSolutions.financialFoundation.outcomes.riskAssessmentDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <span className="font-medium text-white">
                                {t(
                                    'ourSolutions.financialFoundation.outcomes.assetKnowledge'
                                )}
                                :
                            </span>{' '}
                            {t(
                                'ourSolutions.financialFoundation.outcomes.assetKnowledgeDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <span className="font-medium text-white">
                                {t(
                                    'ourSolutions.financialFoundation.outcomes.independentDecision'
                                )}
                                :
                            </span>{' '}
                            {t(
                                'ourSolutions.financialFoundation.outcomes.independentDecisionDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <span className="font-medium text-white">
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
                    <p className="font-medium text-white mt-4">
                        {t('ourSolutions.financialFoundation.note')}
                    </p>
                </>
            ),
        },
        {
            title: t('ourSolutions.portfolioStrategy.title'),
            buttonComp: {
                title: t('ourSolutions.common.getStarted'),
                id: '35f103a7-8ca5-4072-89a3-02548c28d5ae',
            },
            children: (
                <>
                    <p>{t('ourSolutions.portfolioStrategy.description')}</p>
                    <p>
                        <span className="font-medium text-white">
                            {t(
                                'ourSolutions.portfolioStrategy.deliveryOptions.title'
                            )}
                        </span>
                    </p>
                    <ul>
                        <li>
                            <span className="font-medium text-white">
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
                            <span className="font-medium text-white">
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
                    <p className="mt-6">
                        <span className="font-medium text-white">
                            {t('ourSolutions.portfolioStrategy.outcomes.title')}
                        </span>
                    </p>
                    <ul className="mt-2">
                        <li>
                            <span className="font-medium text-white">
                                {t(
                                    'ourSolutions.portfolioStrategy.outcomes.framework'
                                )}
                                :
                            </span>{' '}
                            {t(
                                'ourSolutions.portfolioStrategy.outcomes.frameworkDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <span className="font-medium text-white">
                                {t(
                                    'ourSolutions.portfolioStrategy.outcomes.rebalancing'
                                )}
                                :
                            </span>{' '}
                            {t(
                                'ourSolutions.portfolioStrategy.outcomes.rebalancingDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <span className="font-medium text-white">
                                {t(
                                    'ourSolutions.portfolioStrategy.outcomes.toolsProficiency'
                                )}
                                :
                            </span>{' '}
                            {t(
                                'ourSolutions.portfolioStrategy.outcomes.toolsProficiencyDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <span className="font-medium text-white">
                                {t(
                                    'ourSolutions.portfolioStrategy.outcomes.riskManagement'
                                )}
                                :
                            </span>{' '}
                            {t(
                                'ourSolutions.portfolioStrategy.outcomes.riskManagementDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <span className="font-medium text-white">
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
                    <p className="font-medium text-white mt-4">
                        {t('ourSolutions.portfolioStrategy.note')}
                    </p>
                </>
            ),
        },
        {
            title: t('ourSolutions.algoTrading.title'),
            buttonComp: {
                title: t('ourSolutions.common.getStarted'),
                id: '850f6aa6-f2b5-4b89-a303-98660d887ec7',
            },
            children: (
                <>
                    <p>{t('ourSolutions.algoTrading.description')}</p>
                    <p>
                        <span className="font-medium text-white">
                            {t('ourSolutions.algoTrading.deliveryMethod.title')}
                        </span>
                    </p>
                    <p>{t('ourSolutions.algoTrading.deliveryMethod.desc')}</p>
                    <p className="mt-6">
                        <span className="font-medium text-white">
                            {t('ourSolutions.algoTrading.outcomes.title')}
                        </span>
                    </p>
                    <ul className="mt-2">
                        <li>
                            <span className="font-medium text-white">
                                {t(
                                    'ourSolutions.algoTrading.outcomes.codedSystem'
                                )}
                                :
                            </span>{' '}
                            {t(
                                'ourSolutions.algoTrading.outcomes.codedSystemDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <span className="font-medium text-white">
                                {t(
                                    'ourSolutions.algoTrading.outcomes.backtestReport'
                                )}
                                :
                            </span>{' '}
                            {t(
                                'ourSolutions.algoTrading.outcomes.backtestReportDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <span className="font-medium text-white">
                                {t(
                                    'ourSolutions.algoTrading.outcomes.deployedTool'
                                )}
                                :
                            </span>{' '}
                            {t(
                                'ourSolutions.algoTrading.outcomes.deployedToolDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <span className="font-medium text-white">
                                {t(
                                    'ourSolutions.algoTrading.outcomes.systematicExecution'
                                )}
                                :
                            </span>{' '}
                            {t(
                                'ourSolutions.algoTrading.outcomes.systematicExecutionDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <span className="font-medium text-white">
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
                    <p className="font-medium text-white mt-4">
                        {t('ourSolutions.algoTrading.note')}
                    </p>
                </>
            ),
        },
        {
            title: t('ourSolutions.tradingPerformance.title'),
            buttonComp: {
                title: t('ourSolutions.common.getStarted'),
                id: '91aa5027-325b-4cef-9503-8a03e0790074',
            },
            children: (
                <>
                    <p>{t('ourSolutions.tradingPerformance.description')}</p>
                    <p>
                        <span className="font-medium text-white">
                            {t(
                                'ourSolutions.tradingPerformance.deliveryOptions.title'
                            )}
                        </span>
                    </p>
                    <ul>
                        <li>
                            <span className="font-medium text-white">
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
                            <span className="font-medium text-white">
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
                    <p className="mt-6">
                        <span className="font-medium text-white">
                            {t(
                                'ourSolutions.tradingPerformance.outcomes.title'
                            )}
                        </span>
                    </p>
                    <ul className="mt-2">
                        <li>
                            <span className="font-medium text-white">
                                {t(
                                    'ourSolutions.tradingPerformance.outcomes.performanceView'
                                )}
                                :
                            </span>{' '}
                            {t(
                                'ourSolutions.tradingPerformance.outcomes.performanceViewDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <span className="font-medium text-white">
                                {t(
                                    'ourSolutions.tradingPerformance.outcomes.behavioralPatterns'
                                )}
                                :
                            </span>{' '}
                            {t(
                                'ourSolutions.tradingPerformance.outcomes.behavioralPatternsDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <span className="font-medium text-white">
                                {t(
                                    'ourSolutions.tradingPerformance.outcomes.improvementPlan'
                                )}
                                :
                            </span>{' '}
                            {t(
                                'ourSolutions.tradingPerformance.outcomes.improvementPlanDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <span className="font-medium text-white">
                                {t(
                                    'ourSolutions.tradingPerformance.outcomes.selfReviewSkills'
                                )}
                                :
                            </span>{' '}
                            {t(
                                'ourSolutions.tradingPerformance.outcomes.selfReviewSkillsDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <span className="font-medium text-white">
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
                    <p className="font-medium text-white mt-4">
                        {t('ourSolutions.tradingPerformance.note')}
                    </p>
                </>
            ),
        },
        {
            title: t('ourSolutions.financialCourse.title'),
            buttonComp: {
                title: t('ourSolutions.common.getStarted'),
                id: 'c3d2e0cc-484d-475c-8051-03c70b4e40d6',
            },
            children: (
                <>
                    <p>{t('ourSolutions.financialCourse.description')}</p>
                    <p>
                        <span className="font-medium text-white">
                            {t(
                                'ourSolutions.financialCourse.deliveryOptions.title'
                            )}
                        </span>
                    </p>
                    <ul>
                        <li>
                            <span className="font-medium text-white">
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
                            <span className="font-medium text-white">
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
                    <p className="mt-6">
                        <span className="font-medium text-white">
                            {t('ourSolutions.financialCourse.outcomes.title')}
                        </span>
                    </p>
                    <ul className="mt-2">
                        <li>
                            <span className="font-medium text-white">
                                {t(
                                    'ourSolutions.financialCourse.outcomes.foundationalKnowledge'
                                )}
                                :
                            </span>{' '}
                            {t(
                                'ourSolutions.financialCourse.outcomes.foundationalKnowledgeDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <span className="font-medium text-white">
                                {t(
                                    'ourSolutions.financialCourse.outcomes.analysisSkills'
                                )}
                                :
                            </span>{' '}
                            {t(
                                'ourSolutions.financialCourse.outcomes.analysisSkillsDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <span className="font-medium text-white">
                                {t(
                                    'ourSolutions.financialCourse.outcomes.toolProficiency'
                                )}
                                :
                            </span>{' '}
                            {t(
                                'ourSolutions.financialCourse.outcomes.toolProficiencyDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <span className="font-medium text-white">
                                {t(
                                    'ourSolutions.financialCourse.outcomes.strategicFramework'
                                )}
                                :
                            </span>{' '}
                            {t(
                                'ourSolutions.financialCourse.outcomes.strategicFrameworkDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <span className="font-medium text-white">
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
                    <p className="font-medium text-white mt-4">
                        {t('ourSolutions.financialCourse.note')}
                    </p>
                </>
            ),
        },
    ];

    return (
        <div className="flex flex-col gap-6 [&>div:not(:last-child)]:pb-6 [&>div:first-child]:mb-0! [&>div:not(:last-child)]:border-b [&>div:first-child]:border-b-0! border-[var(--brand-grey)]">
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

export default OurSolutionsPage;
