import React, {useEffect} from 'react';
import { Col, Hr, Row } from "@amzn/stencil-react-components/layout";
import { connect } from "react-redux";
import { JobState } from "../../../reducers/job.reducer";
import { ApplicationState } from "../../../reducers/application.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { useLocation } from "react-router";
import {
    getPageNameFromPath,
    parseQueryParamsArrayToSingleItem,
    resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import queryString from "query-string";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { checkAndBoundGetApplication, getLocale, handleAcceptOffer } from "../../../utils/helper";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import { H2, H3, H4, Text } from '@amzn/stencil-react-components/text';
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import ScheduleCard from "../../common/jobOpportunity/ScheduleCard";
import InnerHTML from 'dangerously-set-html-content';
import ApplicationSteps from "../../common/ApplicationSteps";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { onCompleteTaskHelper } from '../../../actions/WorkflowActions/workflowActions';
import { uiState } from '../../../reducers/ui.reducer';
import { WORKFLOW_STEP_NAME } from "../../../utils/enums/common";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { translate as t } from "../../../utils/translator";
import { boundResetBannerMessage } from "../../../actions/UiActions/boundUi";
import { Expander } from "@amzn/stencil-react-components/expander";
import DebouncedButton from '../../common/DebouncedButton';

interface MapStateToProps {
    job: JobState,
    application: ApplicationState,
    schedule: ScheduleState,
    ui: uiState,
    candidate: CandidateState
}

interface ContingentOfferProps {

}

type ContingentOfferMergedProps = MapStateToProps & ContingentOfferProps;

export const ContingentOffer = ( props: ContingentOfferMergedProps) => {
    const { job, application, schedule, ui, candidate } = props;
    const isLoading = ui.isLoading;
    const { search, pathname } = useLocation();
    const pageName = getPageNameFromPath(pathname);
    const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
    const { applicationId, jobId, scheduleId } = queryParams;
    const jobDetail = job.results;
    const applicationData = application.results;
    const scheduleDetail = schedule.results.scheduleDetail;
    const signOnBonus = schedule.results.scheduleDetail?.signOnBonus;
    const employmentType = schedule.results.scheduleDetail?.employmentType;
    const { candidateData } = candidate.results

    useEffect(() => {
        boundGetCandidateInfo();
    },[])

    // Don't refetch data if id is not changing
    useEffect(() => {
        jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() })
    }, [jobDetail, jobId]);

    useEffect(() => {
        applicationId && checkAndBoundGetApplication(applicationId);
    }, [applicationId]);

    useEffect(() => {
        scheduleId && scheduleId!== scheduleDetail?.scheduleId && boundGetScheduleDetail({
            locale: getLocale(),
            scheduleId: scheduleId
        })
    }, [scheduleId]);

    useEffect(() => {
        // Page will emit page load event once both pros are available but
        // will not emit new event on props change once it has emitted pageload event previously
        scheduleDetail && jobDetail && applicationData && candidateData && addMetricForPageLoad(pageName);

    }, [jobDetail, applicationData, candidateData, scheduleDetail]);

    useEffect(() => {
        return () => {
            //reset this so as it can emit new pageload event after being unmounted.
            resetIsPageMetricsUpdated(pageName);
        }
    },[])

    const handleBackToJobs = () => {
        boundResetBannerMessage();
        // Stay at the current page, wait work flow to do the routing
        // Need further work here
        // Remove schedule Id in URL here before go to contingent-offer page
        const isBackButton = true;
        const targetPageToGoBack = WORKFLOW_STEP_NAME.JOB_OPPORTUNITIES;
        applicationData && onCompleteTaskHelper(applicationData, isBackButton, targetPageToGoBack);
    }

    const displayName = candidateData?.preferredFirstName || candidateData?.firstName || '';

    return (
        <Col gridGap={10}>
            <Col gridGap={10}>
                <H2>{t("BB-ContingencyOffer-well-done-text","Well done so far")}{displayName ? `, ${displayName}`: ''}!</H2>
            </Col>

            {scheduleDetail && <ScheduleCard scheduleDetail={scheduleDetail} displayOnly={true}/>}
            <Col className="jobDescriptionContainer" gridGap={8}>
                <H4>
                    {t("BB-ContingencyOffer-common-question-title-text", "Common questions")}
                </H4>
                <Row padding={{top: 'S200'}}>
                    <Expander titleText={t("BB-ContingencyOffer-contingent-offer-meaning-popover-title-text", "What is a contingent offer?")}>
                        <Col gridGap="S500">
                            <Text fontSize="T200">
                                {t("BB-ContingencyOffer-contingent-offer-meaning-popover-content", "As permitted by applicable law, your offer is contingent on successfully passing the required background check, drug screening (if applicable) and rehire eligibility check (if applicable), so it’s important that you complete the pre-employment steps on the next page. In some circumstances, your first day may be delayed due to pre-employment requirements not being completed in time. If this is the case, you can expect to hear from us soon.")}
                            </Text>
                        </Col>
                    </Expander>
                </Row>
                {employmentType === "Seasonal"? <Row padding={{top: 'S200'}}>
                    <Expander
                        titleText={t("BB-Schedule-card-about-seasonal-duration-popover-title-text", "What does a seasonal duration mean?")}>
                        <Col gridGap="S500">
                            <Text fontSize="T200">
                                {t("BB-Schedule-card-about-seasonal-duration-popover-content", "There is no difference in job duties, the difference is this role is intended to be temporary and no longer than 11 months.  If you are interested in joining on a permanent basis, the opportunity may become available.  Otherwise, you’ll be notified when your assignment will end.")}
                            </Text>
                        </Col>
                    </Expander>
                </Row>: null}
                {signOnBonus ?
                    <Row padding={{top: 'S200', bottom: 'S400'}}>
                        <Expander titleText={t("BB-Schedule-card-about-how-to-sign-bonus-title-text", "How do I get the sign on bonus?")}>
                            <Col gridGap="S500">
                                <Text fontSize="T200">
                                    {t("BB-Schedule-card-about-how-to-sign-bonus-content", `This offer includes a sign on bonus of $${signOnBonus} based on the specific details noted above. It is payable over multiple installments that may extend to 180 days after you start. If you have to reschedule, this specific offer may not be available based on the new role you choose. If you have recently worked for Amazon in the last 90 days you will not be eligible for any sign on bonus.`, {signOnBonus})}
                                </Text>
                            </Col>
                        </Expander>
                    </Row>: null
                }
                <Hr />
                <Col padding={{top: 'S400'}}>
                    <Text fontSize='T200'>
                        {t("BB-ContingencyOffer-job-requirement-Section-title", "Job requirements")}
                    </Text>
                </Col>
                <Col>
                    <InnerHTML className="jobDescription" html={scheduleDetail?.jobDescription || ''}/>
                </Col>
            </Col>
            <Col
                className="contingencyOfferFooter"
                gridGap={15}
                padding={{top: 'S400', bottom: 'S400', left: 'S300', right: 'S300'}}
            >
                <H4>{t("BB-ContingencyOffer-remaining-steps-container-title", "Remaining Steps")}</H4>
                <ApplicationSteps/>
                <Col>
                    <Text fontSize='T200'>
                        {t("BB-ContingencyOffer-understanding-accept-offer-requirement-confirm-text", "By accepting this offer, you confirm that you understand the requirements of this position.")}
                    </Text>
                </Col>
                <Col gridGap={20} padding='S300'>
                    <DebouncedButton
                        disabled={!applicationData || isLoading}
                        variant={ButtonVariant.Primary}
                        onClick={() => applicationData && handleAcceptOffer(applicationData)}
                    >
                        {t("BB-ContingencyOffer-accept-offer-button-text","Accept Offer")}
                    </DebouncedButton>
                    <DebouncedButton
                        disabled={!applicationData || isLoading}
                        onClick={handleBackToJobs}
                    >
                        {t("BB-ContingencyOffer-back-to-jobs-button-text",'Back to jobs')}
                    </DebouncedButton>
                </Col>
            </Col>
        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(ContingentOffer);
