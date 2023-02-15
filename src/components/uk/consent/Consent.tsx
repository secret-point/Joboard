import React, { useEffect, useState } from "react";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { FlyoutContent, WithFlyout } from "@amzn/stencil-react-components/flyout";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { H3, H4, Text } from "@amzn/stencil-react-components/text";
import queryString from "query-string";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import {
  boundCreateApplicationAndSkipScheduleDS,
  boundCreateApplicationDS,
  boundGetApplicationList
} from "../../../actions/ApplicationActions/boundApplicationActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import { boundResetBannerMessage } from "../../../actions/UiActions/boundUi";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { JobState } from "../../../reducers/job.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { uiState } from "../../../reducers/ui.reducer";
import { CreateApplicationAndSkipScheduleRequestDS, CreateApplicationRequestDS } from "../../../utils/apiTypes";
import { QUERY_PARAMETER_NAME } from "../../../utils/enums/common";
import { getLocale, goToCandidateDashboard, routeToAppPageWithPath } from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import { Application } from "../../../utils/types/common";
import DebouncedButton from "../../common/DebouncedButton";
import { PAGE_ROUTES } from "../../pageRoutes";
import InnerHTML from "dangerously-set-html-content";
import { Link } from "@amzn/stencil-react-components/link";
import { CandidateState } from "../../../reducers/candidate.reducer";
import CustomModal from "../../common/CustomModal";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { boundWorkflowRequestStart } from "../../../actions/WorkflowActions/boundWorkflowActions";
import { loadWorkflowDS } from "../../../actions/WorkflowActions/workflowActions";
import { AppConfigState } from "../../../reducers/appConfig.reducer";

interface MapStateToProps {
  job: JobState;
  schedule: ScheduleState;
  ui: uiState;
  candidate: CandidateState;
  appConfig: AppConfigState;
}

interface RenderFlyoutFunctionParams {
  close: () => void;
}

export const Consent = (props: MapStateToProps) => {
  const { job, schedule, candidate, appConfig } = props;
  const { search, pathname } = useLocation();
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { jobId } = queryParams;
  const jobDetail = job.results;
  const { scheduleId } = queryParams;
  const { scheduleDetail } = schedule.results;
  const { candidateData } = candidate.results;
  const envConfig = appConfig.results?.envConfig;
  const pageName = getPageNameFromPath(pathname);

  const [showExistingAppModal, setShowExistingAppModal] = useState(false);

  // Don't refetch data if id is not changing
  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() });
  }, [jobId]);

  // Load candidate so that we can log candidateId if application already exists error happens
  useEffect(() => {
    boundGetCandidateInfo();
  }, []);

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
    return () => {
      // reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    };
  }, []);

  const handleStartApplication = () => {
    boundResetBannerMessage();
    const candidateId = candidateData?.candidateId;
    if (candidateId) {
      boundGetApplicationList({ candidateId, status: "active" }, (applicationList: Application[]) => {
        const applicationLength = applicationList.length;
        if (applicationLength > 0) {
          setShowExistingAppModal(true);
        } else {
          executeCreateApplication();
          setShowExistingAppModal(false);
        }
      });
    }
  };

  const executeCreateApplication = () => {
    if (scheduleId) {
      const payload: CreateApplicationAndSkipScheduleRequestDS = {
        jobId,
        dspEnabled: job.results?.dspEnabled,
      };
      boundCreateApplicationAndSkipScheduleDS(payload);
    } else {
      const payload: CreateApplicationRequestDS = {
        jobId,
        dspEnabled: job.results?.dspEnabled,
      };
      boundCreateApplicationDS(payload, (application: Application) => {
        const { applicationId, candidateId } = application;

        boundWorkflowRequestStart();
        envConfig && loadWorkflowDS(
          jobId || "",
          scheduleId || "",
          applicationId,
          candidateId,
          envConfig
        );
        // Reload consent page with applicationId and wait for workflow service to return next page before continue the application
        routeToAppPageWithPath(PAGE_ROUTES.CONSENT, [{ paramName: QUERY_PARAMETER_NAME.APPLICATION_ID, paramValue: application.applicationId }]);
      });
    }
  };

  const renderFlyout = ({ close }: RenderFlyoutFunctionParams) => (
    <FlyoutContent
      titleText={t("BB-Kondo-ConsentPage-flyout-user-data-policy-title-text", "EU/UK Candidate Privacy Notice")}
      onCloseButtonClick={close}
    >
      <Col gridGap={15}>
        <Text>
          {t("BB-ConsentPage-flyout-mx-user-data-policy-text", "I am aware that all information gathered may be transferred pursuant to the Federal Law on the Protection of Personal Data in the Possession of Private Parties and its regulations, guidelines and other applicable provisions on data privacy, as well as in terms of the Privacy Notice of the Company for Employees and/or Candidates.")}
        </Text>
      </Col>
    </FlyoutContent>
  );
  const renderRightToWorkFlyout = ({ close }: RenderFlyoutFunctionParams) => (
    <FlyoutContent
      titleText={t("BB-Kondo-ConsentPage-flyout-right-to-work-title-text", "Right To Work documentation")}
      onCloseButtonClick={close}
    >
      <Col gridGap={15}>
        <H3 fontWeight="bold">
          {t("BB-Kondo-ConsentPage-flyout-uk-right-to-work-content-title-text", "UK Right to Work Check")}
        </H3>
        <Text>
          {t("BB-Kondo-ConsentPage-flyout-uk-right-to-work-part1-text", "In order to begin your employment, Amazon must check your original document(s) proving your right to work in the UK. Right to Work document examples include, but are not limited to")}:
        </Text>
        <ul>
          <li>
            <Text>
              {t("BB-Kondo-ConsentPage-flyout-uk-right-to-work-document-item-passport-text", "British Passport")}
            </Text>
          </li>
          <li>
            <Text>
              {t("BB-Kondo-ConsentPage-flyout-uk-right-to-work-document-item-residence-card-text", "Permanent Residence Card")}
            </Text>
          </li>
          <li>
            <Text>
              {t("BB-Kondo-ConsentPage-flyout-uk-right-to-work-document-item-indefinite-leave-stamp-text", "Indefinite Leave to Remain stamps")}
            </Text>
          </li>
          <li>
            <Text>
              {t("BB-Kondo-ConsentPage-flyout-uk-right-to-work-document-item-biometric-residence-permit-text", "Biometric Residence Permit")}
            </Text>
          </li>
        </ul>
        <Text>
          <InnerHTML html={t("BB-Kondo-ConsentPage-flyout-uk-right-to-work-part2-text", "For more information and details of all acceptable Right to Work Documents, please see our <a href='https://glspub.s3-us-west-2.amazonaws.com/Work+Authorization/UK+Employee+Guide/index.html' target='_blank' rel='noopener noreferrer'>UK Employee Work Authorisation Guide</a>")} />
        </Text>
      </Col>
    </FlyoutContent>
  );

  return (
    <Col gridGap="S300" padding="S300">
      <h1>
        {t("BB-ConsentPage-qualification-criteria-header-text", "By applying, you confirm that:")}
      </h1>
      <ul>
        <li>
          <Text fontSize="T200">
            {t("BB-Kondo-qualification-criteria-above18", "You are 18 years or above.")}
          </Text>
        </li>
        <li>
          <Text fontSize="T200">
            {t("BB-Kondo-qualificationCriteria-should-complete-all-steps", "You are the sole applicant and shall be personally completing each step unless you receive any assistance from Amazon to complete this application.")}
          </Text>
        </li>
        <li>
          <Text fontSize="T200">
            {t("BB-Kondo-qualification-criteria-right-to-work-part1", "You have")}
            <WithFlyout renderFlyout={renderRightToWorkFlyout}>
              {({ open }) => (
                <Link
                  onClick={() => open()}
                  margin={{
                    left: "S100"
                  }}
                >
                  {t("BB-Kondo-qualificationCriteria-right-to-work-part2", "the right to work documentation")}
                </Link>
              )}
            </WithFlyout>
          </Text>
        </li>
        <li>
          <Text fontSize="T200">
            {t("BB-Kondo-qualificationCriteria-medical-test", "You are willing to complete a pre-employment medical test, if applicable.")}
          </Text>
        </li>
        <li>
          <Text fontSize="T200">
            {t("BB-Kondo-qualificationCriteria-employment-bgc-consent", "You consent to a pre-employment background check.")}
          </Text>
        </li>
      </ul>
      <Col gridGap={8}>
        <Text textAlign="center" color="gray" fontSize="0.8em">
          {t("BB-ConsentPage-data-policy-header-text", "By applying, you read and agree to the")}
        </Text>
        <WithFlyout renderFlyout={renderFlyout}>
          {({ open }) => (
            <Button
              variant={ButtonVariant.Tertiary}
              style={{
                margin: "0.5em 0",
                width: "100%"
              }}
              onClick={() => open()}
            >
              {t("BB-Kondo-ConsentPage-flyout-user-data-policy-title-text", "EU/UK Candidate Privacy Notice")}
            </Button>
          )}
        </WithFlyout>
        <DebouncedButton
          variant={ButtonVariant.Primary}
          style={{ width: "100%" }}
          onClick={handleStartApplication}
          id="startApplicationButton"
        >
          {t("BB-kondo-ConsentPage-start-application-button", "Start Application")}
        </DebouncedButton>
        <Col
          className="consentDisabilityAccommodationText"
          gridGap={15}
          padding={{ top: "S400", bottom: "S400", left: "S300", right: "S300" }}
          margin={{ top: "S400" }}
        >
          <Text fontSize="T100">
            <InnerHTML html={t("BB-Kondo-ConsentPage-consent-disability-accommodation-text", "Our inclusive culture empowers Amazonians to deliver the best results for our customers. If you have a disability and need an adjustment during the application and hiring process, including support for the interview or onboarding process, please contact the Applicant-Candidate Accommodation Team (ACAT), Monday through Friday from 7:00 am GMT - 4:00 pm GMT . If calling directly from the United Kingdom, please dial +44 800 086 9884. If calling from Ireland, please dial +353 1800 851 489. You may also contact us if you might need an adjustment in your new role and would like to initiate a request prior to starting your Day 1.")} />
          </Text>
        </Col>
      </Col>
      <CustomModal shouldOpen={showExistingAppModal} setShouldOpen={setShowExistingAppModal}>
        <Col gridGap="S300" width="100%" alignSelf="center">
          <H4 fontWeight="bold" textAlign="center">
            {t("BB-consent-existing-application-notice-title", "You Have an active job application")}
          </H4>
          <Col gridGap="S300" padding={{ top: "S300" }}>
            <Text>
              {t("BB-consent-existing-application-notice-text1", "You already have an active job application. You can have only one active application at a time. If you submit this application, your existing application will be withdrawn.")}
            </Text>
            <Text>
              {t("BB-consent-existing-application-notice-text2", "To resume or see your application, click on \"Go to dashboard\". To continue with this application, click \"Continue\"")}
            </Text>
          </Col>
          <Row justifyContent="flex-end" gridGap="S300" alignItems="center">
            <Row>
              <Link onClick={() => {
                goToCandidateDashboard();
                setShowExistingAppModal(false);
              }}
              >
                {t("BB-consent-existing-app-go-to-dashboard-link", "Go to dashboard")}
              </Link>
            </Row>
            <Button onClick={() => {
              executeCreateApplication();
              setShowExistingAppModal(false);
            }}
            >
              {t("BB-consent-existing-app-continue-btn", "Continue")}
            </Button>
          </Row>
        </Col>
      </CustomModal>
    </Col>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(Consent);
