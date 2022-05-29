import { ApplicationStep, ScheduleSortBy } from "../types/common";
import { APPLICATION_STEPS, SCHEDULE_FILTER_TYPE } from "../enums/common";

export const HVH_LOCALE = 'hvh-locale';

export const ApplicationStepList: ApplicationStep[] = [
    {
        stepNumber: 1,
        title: APPLICATION_STEPS.SELECT_JOB,
        titleTranslationKey: 'BB-ApplicationSteps-select-job-text'
    },
    {
        title: APPLICATION_STEPS.COMPLETE_REQUIRED_DOCUMENTS,
        stepNumber: 2,
        titleTranslationKey: 'BB-ApplicationSteps-complete-required-document-text'
    },
    {
        stepNumber: 3,
        title: APPLICATION_STEPS.SCHEDULE_PRE_HIRE_APPOINTMENT,
        titleTranslationKey: 'BB-ApplicationSteps-schedule-preHire-appt-text'
    }
]

export const ApplicationWithAssessmentStepList: ApplicationStep[] = [
    {
        title: APPLICATION_STEPS.COMPLETE_AN_ASSESSMENT,
        stepNumber: 1,
        titleTranslationKey: 'BB-ApplicationSteps-complete-assessment-text'
    },
    {
        stepNumber: 2,
        title: APPLICATION_STEPS.SELECT_JOB,
        titleTranslationKey: 'BB-ApplicationSteps-select-job-text'
    },
    {
        title: APPLICATION_STEPS.COMPLETE_REQUIRED_DOCUMENTS,
        stepNumber: 3,
        titleTranslationKey: 'BB-ApplicationSteps-complete-required-document-text'
    },
    {
        stepNumber: 4,
        title: APPLICATION_STEPS.SCHEDULE_PRE_HIRE_APPOINTMENT,
        titleTranslationKey: 'BB-ApplicationSteps-schedule-preHire-appt-text'
    }
]

export const ScheduleSortList: ScheduleSortBy[] = [
    {
        title: "Pay rate - Highest to Lowest",
        value: SCHEDULE_FILTER_TYPE.PAY_RATE,
        translationKey: 'BB-JobOpportunity-sort-schedule-by-pay-rate-high-to-least'
    },
    {
        title: "Hours - Most to Least",
        value: SCHEDULE_FILTER_TYPE.HOURS_DESC,
        translationKey: 'BB-JobOpportunity-sort-schedule-by-hours-most-to-least'
    },
    {
        title: "Hours - Least to Most",
        value: SCHEDULE_FILTER_TYPE.HOURS_ASC,
        translationKey: 'BB-JobOpportunity-sort-schedule-by-hours-least-to-most'
    }
]
