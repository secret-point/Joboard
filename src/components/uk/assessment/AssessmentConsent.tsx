import React, { useEffect } from "react";
import { ButtonVariant } from "@amzn/stencil-react-components/button";
import { FlyoutContent, WithFlyout } from "@amzn/stencil-react-components/flyout";
import { Col, } from "@amzn/stencil-react-components/layout";
import { H1, H3, Text } from "@amzn/stencil-react-components/text";
import queryString from "query-string";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { JobState } from "../../../reducers/job.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { getLocale } from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import DebouncedButton from "../../common/DebouncedButton";
import { Link } from "@amzn/stencil-react-components/link";
import StepHeader from "../../common/StepHeader";
import { ApplicationStepListUK } from "../../../utils/constants/common";
import VideoContainer from "../../common/VideoContainer";
import { Expander } from "@amzn/stencil-react-components/expander";
import { onCompleteTaskHelper } from "../../../actions/WorkflowActions/workflowActions";
import { ApplicationState } from "../../../reducers/application.reducer";
import { APPLICATION_STEPS as STEPS } from "../../../utils/enums/common";
import { getStepsByTitle } from "../../../helpers/steps-helper";
import { AssessmentState } from "../../../reducers/assessment.reducer";
import { boundGetAssessmentElegibilitySuccess } from "../../../actions/AssessmentActions/boundAssessmentActions";
import { CandidateState } from "../../../reducers/candidate.reducer";

interface MapStateToProps {
  job: JobState;
  schedule: ScheduleState;
  application: ApplicationState;
  assessment: AssessmentState;
  candidate: CandidateState;
}

interface RenderFlyoutFunctionParams {
  close: () => void;
}

export const AssessmentConsent = (props: MapStateToProps) => {
  const { job, schedule, application, assessment } = props;
  const { search, pathname } = useLocation();
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { jobId, scheduleId } = queryParams;
  const jobDetail = job.results;
  const { scheduleDetail } = schedule.results;
  const pageName = getPageNameFromPath(pathname);
  const applicationData = application.results;
  const headerStep = getStepsByTitle(ApplicationStepListUK, STEPS.COMPLETE_AN_ASSESSMENT)[0]; 
  const { assessmentElegibility } = assessment.results;

  // Don't refetch data if id is not changing
  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() });
  }, [jobId]);

  useEffect(() => {
    scheduleId && boundGetScheduleDetail({
      locale: getLocale(),
      scheduleId: scheduleId
    });
  }, [scheduleId]);

  useEffect(() => {
    if (jobDetail && ((scheduleId && scheduleDetail) || (!scheduleId))) {
      addMetricForPageLoad(pageName);
    }

  }, [jobDetail, scheduleDetail]);

  useEffect(() => {
    // Setting the assessmentElegibility to true to prevent subsequent request during this session
    assessmentElegibility === null && boundGetAssessmentElegibilitySuccess({
      assessmentElegibility: true });
  }, []);

  useEffect(() => {
    return () => {
      // reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    };
  }, []);

  const handleConsentToAssessment = () => {
    applicationData && onCompleteTaskHelper(applicationData);
  };

  const renderAssessmentPolicyFlyout = ({ close }: RenderFlyoutFunctionParams) => (
    <FlyoutContent
      titleText={t("BB-AssessmentConsentPage-assessment-policy-flyout-title", "Assessment Policy")}
      onCloseButtonClick={close}
    >
      <Col gridGap={15}>
        <H3 fontWeight="bold" fontSize="T400">
          {t("BB-AssessmentConsentPage-assessment-policy-flyout-acknowledgement-title", "Acknowledgement")}
        </H3>
        <Text>
          {t("BB-AssessmentConsentPage-assessment-policy-flyout-acknowledgement-intro", "By taking the assessment, I acknowledge that:")}
        </Text>
        <ul>
          <li>
            <Text>
              {t("BB-AssessmentConsentPage-assessment-policy-flyout-acknowledgement-list-item-1", "Responses to all assessments in this application process are my own.")}
            </Text>
          </li>

          <li>
            <Text>
              {t("BB-AssessmentConsentPage-assessment-policy-flyout-acknowledgement-list-item-2", "I did not consult any other person or use any additional resources while completing the assessments.")}
            </Text>
          </li>
          <li>
            <Text>
              {t("BB-AssessmentConsentPage-assessment-policy-flyout-acknowledgement-list-item-3", "I understand that I may be asked to justify my answers and that any misrepresentation will result in rejection of my application.")}
            </Text>
          </li>

        </ul>
      </Col>
    </FlyoutContent>
  );

  return (
    <>
      <Col gridGap="S300" padding="0">
        <StepHeader jobTitle={jobDetail?.jobTitle || ""} step={headerStep} steps={ApplicationStepListUK} />

        <H1 fontSize="T400" fontWeight="regular">
          {t("BB-AssessmentConsentPage-title-text", "Assessment")}
        </H1>

        <Text fontSize="T200">
          {t("BB-AssessmentConsentPage-intro", "Evaluate your fit at Amazon.")}
        </Text>

        <VideoContainer src="https://static-assets.associate.amazondelivers.jobs/media-assets/Blackbird_Assessment_Intro_20200928.mp4" id="assessment-video" poster="https://m.media-amazon.com/images/G/01/HVH-CandidateApplication/AssessmentPoster.jpg" />

        <Expander titleText={t("B-AssessmentConsentPage-conditions-title-text-expanderTitle", "Read assessment instructions")}>

          <Text>
            {t("BB-AssessmentConsentPage-conditions-title-text-expanderContent-intro", "You are about to complete an assessment that is part of the application process.")}
          </Text>

          <ul>
            <li>
              <Text>
                {t("BB-AssessmentConsentPage-conditions-title-text-expanderContent-list-item-1", "We recommend that you find a quiet place to avoid distractions.")}
              </Text>
            </li>
            <li>
              <Text>
                {t("BB-AssessmentConsentPage-conditions-title-text-expanderContent-list-item-2", "After you finish the assessment, you will be returned to your application process.")}
              </Text>
            </li>
            <li>
              <Text>
                {t("BB-AssessmentConsentPage-conditions-title-text-expanderContent-list-item-3", "Our inclusive culture empowers Amazonians to deliver the best results for our customers. If you have a disability and need an adjustment during the application and hiring process, including support for the interview or onboarding process, please contact the Applicant-Candidate Accommodation Team (ACAT), Monday through Friday from 7:00 am GMT - 4:00 pm GMT . If calling directly from the United Kingdom, please dial +44 800 086 9884. If calling from Ireland, please dial +353 1800 851 489. You may also contact us if you might need an adjustment in your new role and would like to initiate a request prior to starting your Day 1.")}
              </Text>
            </li>
          </ul>

        </Expander>
        <Text margin={{ bottom: "S400" }} fontSize="T200">
          {t("BB-AssessmentConsentPage-title-text-introduction", "By beginning the assessment, you agree to the")}
          <WithFlyout renderFlyout={renderAssessmentPolicyFlyout}>
            {({ open }) => (
              <Link
                onClick={() => open()}
                margin={{
                  left: "S100"
                }}
              >
                {t("BB-AssessmentConsentPage-assessment-policy-flyout-buttonLabel", "Assessment Policy")}
              </Link>
            )}
          </WithFlyout>
        </Text>
        <Col gridGap={8}>
          <DebouncedButton
            variant={ButtonVariant.Primary}
            style={{ width: "100%" }}
            onClick={() => {
              handleConsentToAssessment();
            }}
          >
            {t("BB-AssessmentConsentPage-start-assessment-button", "Start Assessment")}
          </DebouncedButton>
        </Col>
      </Col>
    </>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(AssessmentConsent);
