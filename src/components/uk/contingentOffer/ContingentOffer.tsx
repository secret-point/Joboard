import React, { useEffect } from "react";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col } from "@amzn/stencil-react-components/layout";
import { H2, H4, Text } from "@amzn/stencil-react-components/text";
import InnerHTML from "dangerously-set-html-content";
import queryString from "query-string";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import { boundResetBannerMessage } from "../../../actions/UiActions/boundUi";
import { onCompleteTaskHelper } from "../../../actions/WorkflowActions/workflowActions";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { ApplicationState } from "../../../reducers/application.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { JobState } from "../../../reducers/job.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { uiState } from "../../../reducers/ui.reducer";
import { APPLICATION_STEPS as STEPS, WORKFLOW_STEP_NAME } from "../../../utils/enums/common";
import {
  checkAndBoundGetApplication,
  getLocale,
  handleAcceptOffer,
  initiateScheduleDetailOnPageLoad
} from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import ApplicationSteps from "../../common/ApplicationSteps";
import DebouncedButton from "../../common/DebouncedButton";
import ScheduleCard from "../../common/jobOpportunity/ScheduleCard";
import { FlyoutContent, RenderFlyoutFunctionParams, WithFlyout } from "@amzn/stencil-react-components/flyout";
import { AssessmentState } from "../../../reducers/assessment.reducer";
import { ApplicationStepListUK } from "../../../utils/constants/common";
import { boundGetAssessmentElegibility } from "../../../actions/AssessmentActions/boundAssessmentActions";
import { getStepsByTitle } from "../../../helpers/steps-helper";
import { PAGE_ROUTES } from "../../pageRoutes";
import { getScheduleInUKFormat } from "../../../helpers/schedule-helper";

interface MapStateToProps {
  job: JobState;
  application: ApplicationState;
  schedule: ScheduleState;
  ui: uiState;
  candidate: CandidateState;
  assessment: AssessmentState;
}

type ContingentOfferMergedProps = MapStateToProps;

export const ContingentOffer = ( props: ContingentOfferMergedProps) => {
  const { job, application, schedule, ui, candidate, assessment } = props;
  const { isLoading } = ui;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId, jobId, scheduleId } = queryParams;
  const jobDetail = job.results;
  const applicationData = application.results;
  let { scheduleDetail } = schedule.results;
  scheduleDetail = scheduleDetail && getScheduleInUKFormat(scheduleDetail);
  const { candidateData } = candidate.results;
  const { assessmentElegibility } = assessment.results;
  const applicationSteps = assessmentElegibility? ApplicationStepListUK : getStepsByTitle(ApplicationStepListUK, STEPS.COMPLETE_AN_ASSESSMENT, false);
  const stepTitles = applicationSteps.map(step => step.title);

  const partialApplicationSteps = [
    { 
      ...getStepsByTitle(applicationSteps, STEPS.ENTER_REQUIRED_INFORMATION)[0], 
      customIndex: (stepTitles.indexOf(STEPS.ENTER_REQUIRED_INFORMATION)) + 1
    },
    {
      ...getStepsByTitle(applicationSteps, STEPS.SCHEDULE_PRE_HIRE_APPOINTMENT )[0],
      customIndex: (stepTitles.indexOf(STEPS.SCHEDULE_PRE_HIRE_APPOINTMENT)) + 1 }
  ];

  useEffect(() => {
    // Refresh and add scheduleId in the url from the jobSelected if it doesn't exist from the query param
    if (!scheduleId && applicationData) {
      initiateScheduleDetailOnPageLoad(applicationData, PAGE_ROUTES.CONTINGENT_OFFER);
    }
  }, [applicationData]);

  useEffect(() => {
    boundGetCandidateInfo();
  }, []);

  // Don't refetch data if id is not changing
  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() });
  }, [jobDetail, jobId]);

  useEffect(() => {
    applicationId && checkAndBoundGetApplication(applicationId);
  }, [applicationId]);

  useEffect(() => {
    scheduleId && scheduleId!== scheduleDetail?.scheduleId && boundGetScheduleDetail({
      locale: getLocale(),
      scheduleId: scheduleId
    });
  }, [scheduleId]);

  useEffect(() => {
    // Page will emit page load event once both pros are available but
    // will not emit new event on props change once it has emitted pageload event previously
    scheduleDetail && jobDetail && applicationData && candidateData && addMetricForPageLoad(pageName);

  }, [jobDetail, applicationData, candidateData, scheduleDetail]);

  useEffect(() => {
    return () => {
      // reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    };
  }, []);

  useEffect(() => {
    jobId && applicationId && candidateData?.candidateId && assessmentElegibility === null && boundGetAssessmentElegibility({
      applicationId,
      candidateId: candidateData.candidateId, 
      jobId });
  }, [jobId, applicationId, candidateData?.candidateId]);

  const handleBackToJobs = () => {
    boundResetBannerMessage();
    // Stay at the current page, wait work flow to do the routing
    // Need further work here
    // Remove schedule Id in URL here before go to contingent-offer page
    const isBackButton = true;
    const targetPageToGoBack = WORKFLOW_STEP_NAME.JOB_OPPORTUNITIES;
    applicationData && onCompleteTaskHelper(applicationData, isBackButton, targetPageToGoBack);
  };

  const renderConditionalOfferFlyout = ({ close }: RenderFlyoutFunctionParams) => (
    <FlyoutContent
      titleText={t("BB-Kondo-ContingencyOffer-flyout-conditional-offer-title-text", "What is a conditional offer of employment?")}
      onCloseButtonClick={close}
    >
      <Col>
        <Text>{t("BB-Kondo-ContingencyOffer-flyout-conditional-offer-paragraph1-text", "This offer is conditional on you:")}</Text>
        <ul className="contingent-offer-conditional-ul-list">
          <li>
            <Text>{t("BB-Kondo-ContingencyOffer-flyout-conditional-offer-list1-text", "completing registration documents (where applicable)")}</Text>
          </li>
          <li>
            <Text>{t("BB-Kondo-ContingencyOffer-flyout-conditional-offer-list2-text", "successfully completing a background check")}</Text>
          </li>
          <li>
            <Text>{t("BB-Kondo-ContingencyOffer-flyout-conditional-offer-list3-text", "successfully completing a medical test (where applicable)")}</Text>
          </li>
          <li>
            <Text>{t("BB-Kondo-ContingencyOffer-flyout-conditional-offer-list4-text", "successfully completing rehire eligibility (where applicable)")}</Text>
          </li>
          <li>
            <Text>{t("BB-Kondo-ContingencyOffer-flyout-conditional-offer-list5-text", "having the right to work in the UK and providing the required evidence")}</Text>
          </li>
          <li>
            <Text>{t("BB-Kondo-ContingencyOffer-flyout-conditional-offer-list6-text", "signing and returning the contract of employment")}</Text>
          </li>
          <li>
            <Text>{t("BB-Kondo-ContingencyOffer-flyout-conditional-offer-list7-text", "successfully attending and completing induction training/Day 0, including a health and safety assessment")}</Text>
          </li>
        </ul>
        <Text>{t("BB-Kondo-ContingencyOffer-flyout-conditional-offer-paragraph2-text", "Your start date for your preferred shift and/or number of hours, schedule and location could change subject to business demand.")}</Text>
      </Col>
    </FlyoutContent>
  );

  const renderJobDescriptionFlyout = ({ close }: RenderFlyoutFunctionParams) => (
    <FlyoutContent
      titleText={t("BB-Kondo-ContingencyOffer-flyout-job-description-title-text", "Job description")}
      onCloseButtonClick={close}
    >
      <Col>
        <InnerHTML className="jobDescription" html={jobDetail?.jobDescription || ""} />
      </Col>
    </FlyoutContent>
  );

  const displayName = candidateData?.preferredFirstName || candidateData?.firstName || "";

  return (
    <Col gridGap={10}>
      <Col gridGap={10}>
        <H2>{t("BB-ContingencyOffer-well-done-text", "Well done so far")}{displayName ? `, ${displayName}`: ""}!</H2>
        <Text fontSize="T200">
          {t("BB-Kondo-ContingencyOffer-job-picked-title-text", "You have passed the assessment. Here is the conditional offer of employment for the job you picked")}
        </Text>
      </Col>

      <WithFlyout renderFlyout={renderConditionalOfferFlyout}>
        {({ open }) => (
          <Button
            variant={ButtonVariant.Tertiary}
            className="contingent-offer-flyout-btn"
            onClick={() => open()}
          >
            {t("BB-Kondo-ContingencyOffer-what-is-conditional-offer-text", "What is a conditional offer of employment?")}
          </Button>
        )}
      </WithFlyout>
      {scheduleDetail && <ScheduleCard scheduleDetail={scheduleDetail} displayOnly />}
      <Col className="jobDescriptionContainer" gridGap={8}>
        <Col padding={{ top: "S400" }}>
          <WithFlyout renderFlyout={renderJobDescriptionFlyout}>
            {({ open }) => (
              <Button
                variant={ButtonVariant.Tertiary}
                className="contingent-offer-flyout-btn"
                dataTestId="contingentOfferFlyoutBtn"
                onClick={() => open()}
              >
                {t("BB-Kondo-ContingencyOffer-view-job-description-text", "View Job description")}
              </Button>
            )}
          </WithFlyout>
        </Col>
      </Col>
      <Col
        className="contingencyOfferFooter"
        gridGap={15}
        padding={{ top: "S400", bottom: "S400", left: "S300", right: "S300" }}
      >
        <H4>{t("BB-ContingencyOffer-remaining-steps-container-title", "Remaining Steps")}</H4>
        <ApplicationSteps steps={partialApplicationSteps} />
        <Col>
          <Text fontSize="T200">
            {t("BB-ContingencyOffer-understanding-accept-offer-requirement-confirm-text", "By accepting this offer, you confirm that you understand the requirements of this position.")}
          </Text>
        </Col>
        <Col gridGap={20} padding="S300">
          <DebouncedButton
            disabled={!applicationData || isLoading}
            variant={ButtonVariant.Primary}
            onClick={() => applicationData && handleAcceptOffer(applicationData)}
          >
            {t("BB-ContingencyOffer-accept-offer-button-text", "Accept Offer")}
          </DebouncedButton>
          <DebouncedButton
            disabled={!applicationData || isLoading}
            onClick={handleBackToJobs}
          >
            {t("BB-ContingencyOffer-back-to-jobs-button-text", "Back to jobs")}
          </DebouncedButton>
        </Col>
      </Col>
    </Col>
  );
};

const mapStateToProps = ( state: MapStateToProps ) => {
  return state;
};

export default connect(mapStateToProps)(ContingentOffer);
