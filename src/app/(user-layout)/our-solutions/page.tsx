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
                        <strong>
                            {t(
                                'ourSolutions.financialFoundation.deliveryOptions.title'
                            )}
                        </strong>
                    </p>
                    <ul>
                        <li>
                            <strong>
                                {t(
                                    'ourSolutions.financialFoundation.deliveryOptions.workshop'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.financialFoundation.deliveryOptions.workshopDesc'
                            )}
                        </li>
                        <li>
                            <strong>
                                {t(
                                    'ourSolutions.financialFoundation.deliveryOptions.mentoring'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.financialFoundation.deliveryOptions.mentoringDesc'
                            )}
                        </li>
                    </ul>
                    <p className="mt-6">
                        <strong>
                            {t(
                                'ourSolutions.financialFoundation.outcomes.title'
                            )}
                        </strong>
                    </p>
                    <ul className="mt-2">
                        <li>
                            <strong>
                                {t(
                                    'ourSolutions.financialFoundation.outcomes.roadmap'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.financialFoundation.outcomes.roadmapDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <strong>
                                {t(
                                    'ourSolutions.financialFoundation.outcomes.riskAssessment'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.financialFoundation.outcomes.riskAssessmentDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <strong>
                                {t(
                                    'ourSolutions.financialFoundation.outcomes.assetKnowledge'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.financialFoundation.outcomes.assetKnowledgeDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <strong>
                                {t(
                                    'ourSolutions.financialFoundation.outcomes.independentDecision'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.financialFoundation.outcomes.independentDecisionDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <strong>
                                {t(
                                    'ourSolutions.financialFoundation.outcomes.budgetingMastery'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.financialFoundation.outcomes.budgetingMasteryDesc'
                            )}
                        </li>
                    </ul>
                    <p className="font-bold mt-4">
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
                        <strong>
                            {t(
                                'ourSolutions.portfolioStrategy.deliveryOptions.title'
                            )}
                        </strong>
                    </p>
                    <ul>
                        <li>
                            <strong>
                                {t(
                                    'ourSolutions.portfolioStrategy.deliveryOptions.workshop'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.portfolioStrategy.deliveryOptions.workshopDesc'
                            )}
                        </li>
                        <li>
                            <strong>
                                {t(
                                    'ourSolutions.portfolioStrategy.deliveryOptions.mentoring'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.portfolioStrategy.deliveryOptions.mentoringDesc'
                            )}
                        </li>
                    </ul>
                    <p className="mt-6">
                        <strong>
                            {t('ourSolutions.portfolioStrategy.outcomes.title')}
                        </strong>
                    </p>
                    <ul className="mt-2">
                        <li>
                            <strong>
                                {t(
                                    'ourSolutions.portfolioStrategy.outcomes.framework'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.portfolioStrategy.outcomes.frameworkDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <strong>
                                {t(
                                    'ourSolutions.portfolioStrategy.outcomes.rebalancing'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.portfolioStrategy.outcomes.rebalancingDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <strong>
                                {t(
                                    'ourSolutions.portfolioStrategy.outcomes.toolsProficiency'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.portfolioStrategy.outcomes.toolsProficiencyDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <strong>
                                {t(
                                    'ourSolutions.portfolioStrategy.outcomes.riskManagement'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.portfolioStrategy.outcomes.riskManagementDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <strong>
                                {t(
                                    'ourSolutions.portfolioStrategy.outcomes.objectiveDecision'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.portfolioStrategy.outcomes.objectiveDecisionDesc'
                            )}
                        </li>
                    </ul>
                    <p className="font-bold mt-4">
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
                        <strong>
                            {t('ourSolutions.algoTrading.deliveryMethod.title')}
                        </strong>
                    </p>
                    <p>{t('ourSolutions.algoTrading.deliveryMethod.desc')}</p>
                    <p className="mt-6">
                        <strong>
                            {t('ourSolutions.algoTrading.outcomes.title')}
                        </strong>
                    </p>
                    <ul className="mt-2">
                        <li>
                            <strong>
                                {t(
                                    'ourSolutions.algoTrading.outcomes.codedSystem'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.algoTrading.outcomes.codedSystemDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <strong>
                                {t(
                                    'ourSolutions.algoTrading.outcomes.backtestReport'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.algoTrading.outcomes.backtestReportDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <strong>
                                {t(
                                    'ourSolutions.algoTrading.outcomes.deployedTool'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.algoTrading.outcomes.deployedToolDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <strong>
                                {t(
                                    'ourSolutions.algoTrading.outcomes.systematicExecution'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.algoTrading.outcomes.systematicExecutionDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <strong>
                                {t(
                                    'ourSolutions.algoTrading.outcomes.fullOwnership'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.algoTrading.outcomes.fullOwnershipDesc'
                            )}
                        </li>
                    </ul>
                    <p className="font-bold mt-4">
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
                        <strong>
                            {t(
                                'ourSolutions.tradingPerformance.deliveryOptions.title'
                            )}
                        </strong>
                    </p>
                    <ul>
                        <li>
                            <strong>
                                {t(
                                    'ourSolutions.tradingPerformance.deliveryOptions.workshop'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.tradingPerformance.deliveryOptions.workshopDesc'
                            )}
                        </li>
                        <li>
                            <strong>
                                {t(
                                    'ourSolutions.tradingPerformance.deliveryOptions.mentoring'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.tradingPerformance.deliveryOptions.mentoringDesc'
                            )}
                        </li>
                    </ul>
                    <p className="mt-6">
                        <strong>
                            {t(
                                'ourSolutions.tradingPerformance.outcomes.title'
                            )}
                        </strong>
                    </p>
                    <ul className="mt-2">
                        <li>
                            <strong>
                                {t(
                                    'ourSolutions.tradingPerformance.outcomes.performanceView'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.tradingPerformance.outcomes.performanceViewDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <strong>
                                {t(
                                    'ourSolutions.tradingPerformance.outcomes.behavioralPatterns'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.tradingPerformance.outcomes.behavioralPatternsDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <strong>
                                {t(
                                    'ourSolutions.tradingPerformance.outcomes.improvementPlan'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.tradingPerformance.outcomes.improvementPlanDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <strong>
                                {t(
                                    'ourSolutions.tradingPerformance.outcomes.selfReviewSkills'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.tradingPerformance.outcomes.selfReviewSkillsDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <strong>
                                {t(
                                    'ourSolutions.tradingPerformance.outcomes.tradingDiscipline'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.tradingPerformance.outcomes.tradingDisciplineDesc'
                            )}
                        </li>
                    </ul>
                    <p className="font-bold mt-4">
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
                        <strong>
                            {t(
                                'ourSolutions.financialCourse.deliveryOptions.title'
                            )}
                        </strong>
                    </p>
                    <ul>
                        <li>
                            <strong>
                                {t(
                                    'ourSolutions.financialCourse.deliveryOptions.groupClass'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.financialCourse.deliveryOptions.groupClassDesc'
                            )}
                        </li>
                        <li>
                            <strong>
                                {t(
                                    'ourSolutions.financialCourse.deliveryOptions.privateMentoring'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.financialCourse.deliveryOptions.privateMentoringDesc'
                            )}
                        </li>
                    </ul>
                    <p className="mt-6">
                        <strong>
                            {t('ourSolutions.financialCourse.outcomes.title')}
                        </strong>
                    </p>
                    <ul className="mt-2">
                        <li>
                            <strong>
                                {t(
                                    'ourSolutions.financialCourse.outcomes.foundationalKnowledge'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.financialCourse.outcomes.foundationalKnowledgeDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <strong>
                                {t(
                                    'ourSolutions.financialCourse.outcomes.analysisSkills'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.financialCourse.outcomes.analysisSkillsDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <strong>
                                {t(
                                    'ourSolutions.financialCourse.outcomes.toolProficiency'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.financialCourse.outcomes.toolProficiencyDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <strong>
                                {t(
                                    'ourSolutions.financialCourse.outcomes.strategicFramework'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.financialCourse.outcomes.strategicFrameworkDesc'
                            )}
                        </li>
                        <li className="mt-2">
                            <strong>
                                {t(
                                    'ourSolutions.financialCourse.outcomes.confidenceToInvest'
                                )}
                                :
                            </strong>{' '}
                            {t(
                                'ourSolutions.financialCourse.outcomes.confidenceToInvestDesc'
                            )}
                        </li>
                    </ul>
                    <p className="font-bold mt-4">
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
