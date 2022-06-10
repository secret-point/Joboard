import React, { useEffect } from 'react';
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { connect } from "react-redux";
import { JobState } from "../../../reducers/job.reducer";
import { ApplicationState } from "../../../reducers/application.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { useLocation } from "react-router";
import { getPageNameFromPath, parseQueryParamsArrayToSingleItem } from "../../../helpers/utils";
import queryString from "query-string";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { boundGetApplication } from "../../../actions/ApplicationActions/boundApplicationActions";
import { getLocale, handleAcceptOffer } from "../../../utils/helper";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import { H2, H3, H4, Text } from '@amzn/stencil-react-components/text';
import { Popover } from "@amzn/stencil-react-components/popover";
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

const ContingentOffer = ( props: ContingentOfferMergedProps) => {
    const { job, application, schedule, ui, candidate } = props;
    const isLoading = ui.isLoading;
    const { search, pathname } = useLocation();
    const pageName = getPageNameFromPath(pathname);
    const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
    const { applicationId, jobId, scheduleId } = queryParams;
    const jobDetail = job.results;
    const applicationData = application.results;
    const scheduleDetail = schedule.results.scheduleDetail;
    const { candidateData } = candidate.results

    useEffect(() => {
        boundGetCandidateInfo();
    },[])

    // Don't refetch data if id is not changing
    useEffect(() => {
        jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() })
    }, [jobId]);

    useEffect(() => {
        applicationId && boundGetApplication({ applicationId: applicationId, locale: getLocale() });
    }, [applicationId]);

    useEffect(() => {
        scheduleId && boundGetScheduleDetail({
            locale: getLocale(),
            scheduleId: scheduleId
        })
    }, [scheduleId]);

    useEffect(() => {
        jobDetail && applicationData && scheduleDetail && addMetricForPageLoad(pageName);
    }, [jobDetail, applicationData, scheduleDetail]);

    const handleBackToJobs = () => {
        // Stay at the current page, wait work flow to do the routing
        // Need further work here
        // Remove schedule Id in URL here before go to contingent-offer page
        const isBackButton = true;
        const targetPageToGoBack = WORKFLOW_STEP_NAME.JOB_OPPORTUNITIES;
        applicationData && onCompleteTaskHelper(applicationData, isBackButton, targetPageToGoBack);
    }

    const firstName = candidateData?.firstName || '';

    return (
        <Col gridGap={10}>
            <Col gridGap={10}>
                <H2>{t("BB-ContingencyOffer-well-done-text","Well done so far")}{firstName ? `, ${firstName}`: ''}!</H2>
                <Text fontSize="T200">Here is the contingent offer for the job you picked.</Text>
            </Col>
            <Row>
                <Popover triggerText={t("BB-ContingencyOffer-contingent-offer-meaning-popover-title", "What is a contingent offer?")}>
                    {({ close }) => (
                        <Col gridGap="S500">
                            <Text fontSize="T200">
                                {t("BB-ContingencyOffer-contingent-offer-meaning-popover-content", "As permitted by applicable law, your offer is contingent on successfully passing the required background check, drug screening (if applicable) and rehire eligibility check (if applicable), so it’s important that you complete the pre-employment steps on the next page. In some circumstances, your first day may be delayed due to pre-employment requirements not being completed in time. If this is the case, you can expect to hear from us soon.")}
                            </Text>
                            <Row justifyContent='flex-end'>
                                <Button onClick={close}>
                                    {t("BB-ContingencyOffer-contingent-offer-meaning-popover-close-btn", 'Close')}
                                </Button>
                            </Row>
                        </Col>
                    )}
                </Popover>
            </Row>
            {scheduleDetail && <ScheduleCard scheduleDetail={scheduleDetail} displayOnly={true}/>}
            <Col className="jobDescriptionContainer">
                <H3>
                    {t("BB-ContingencyOffer-job-requirement-Section-title", "Job requirements")}
                </H3>
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
                    <Button
                        disabled={!applicationData || isLoading}
                        variant={ButtonVariant.Primary}
                        onClick={() => applicationData && handleAcceptOffer(applicationData)}
                    >
                        {t("BB-ContingencyOffer-accept-offer-button-text","Accept Offer")}
                    </Button>
                    <Button
                        disabled={!applicationData || isLoading}
                        onClick={handleBackToJobs}
                    >
                        {t("BB-ContingencyOffer-back-to-jobs-button-text",'Back to jobs')}
                    </Button>
                </Col>
            </Col>
        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(ContingentOffer);
