import React, { useEffect } from "react";
import { ButtonVariant } from "@amzn/stencil-react-components/button";
import { Expander } from "@amzn/stencil-react-components/expander";
import { Col, Hr, Row } from "@amzn/stencil-react-components/layout";
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
import { WORKFLOW_STEP_NAME } from "../../../utils/enums/common";
import { checkAndBoundGetApplication, getLocale, handleAcceptOffer } from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import ApplicationSteps from "../../common/ApplicationSteps";
import DebouncedButton from "../../common/DebouncedButton";
import ScheduleCard from "../../common/jobOpportunity/ScheduleCard";

interface MapStateToProps {
  job: JobState;
  application: ApplicationState;
  schedule: ScheduleState;
  ui: uiState;
  candidate: CandidateState;
}

interface ContingentOfferProps {

}

type ContingentOfferMergedProps = MapStateToProps & ContingentOfferProps;

export const ContingentOffer = ( props: ContingentOfferMergedProps) => {
  const { job, application, schedule, ui, candidate } = props;
  const { isLoading } = ui;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId, jobId, scheduleId } = queryParams;
  const jobDetail = job.results;
  const applicationData = application.results;
  const { scheduleDetail } = schedule.results;
  const signOnBonus = schedule.results.scheduleDetail?.signOnBonus;
  const displayCurrency = "$";
  const employmentType = schedule.results.scheduleDetail?.employmentType;
  const { candidateData } = candidate.results;

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

  const handleBackToJobs = () => {
    boundResetBannerMessage();
    // Stay at the current page, wait work flow to do the routing
    // Need further work here
    // Remove schedule Id in URL here before go to contingent-offer page
    const isBackButton = true;
    const targetPageToGoBack = WORKFLOW_STEP_NAME.JOB_OPPORTUNITIES;
    applicationData && onCompleteTaskHelper(applicationData, isBackButton, targetPageToGoBack);
  };

  const displayName = candidateData?.preferredFirstName || candidateData?.firstName || "";

  return (
    <Col gridGap={10}>
      <Col gridGap={10}>
        <H2>{t("BB-ContingencyOffer-well-done-text", "Well done so far")}{displayName ? `, ${displayName}`: ""}!</H2>
        <Text fontSize="T200">{t("BB-ContingencyOffer-job-picked-title-text", "Here is the contingent offer for the job you picked.")}</Text>
      </Col>

      {scheduleDetail && <ScheduleCard scheduleDetail={scheduleDetail} displayOnly />}
      <Col className="jobDescriptionContainer" gridGap={8}>
        <H4>
          {t("BB-ContingencyOffer-common-question-title-text", "Common questions")}
        </H4>
        <Row padding={{ top: "S200" }}>
          <Expander titleText={t("BB-ContingencyOffer-contingent-offer-meaning-popover-title-text", "What is a contingent offer?")}>
            <Col gridGap={8}>
              <Text>
                {t("BB-ContingencyOffers-contingent-offer-meaning-popover-content", "This offer is confirmation that you’ll be hired as an employee of Amazon if you successfully complete your background, drug test and all any other required pre-hire activities.")}
              </Text>
              <Row padding={{ top: "S200", bottom: "S200" }}>
                <Text>
                  {
                    t("BB-ContingencyOffers-contingent-offer-meaning-popover-content-next-line", "Your start time might be delayed if:")
                  }
                </Text>
              </Row>
              <Col padding={{ left: "S300" }}>
                <Text>
                  <li>
                    {t("BB-ContingencyOffers-contingent-offer-meaning-popover-content-point-one", "The background check is not completed on time")}
                  </li>
                </Text>
                <Text>
                  <li>
                    {t("BB-ContingencyOffers-contingent-offer-meaning-popover-content-point-two", "You don’t meet the drug test requirements on time")}
                  </li>
                </Text>
                <Text>
                  <li>
                    {t("BB-ContingencyOffers-contingent-offer-meaning-popover-content-point-three", "Training spots fill up.")}
                  </li>
                </Text>
              </Col>
              <Row>
                <Text>
                  {t("BB-ContingencyOffers-contingent-offer-meaning-popover-content-last-line", "If your start date is delayed, you’ll receive additional information regarding next steps.")}
                </Text>
              </Row>
            </Col>
          </Expander>
        </Row>
        {employmentType === "Seasonal" ? (
          <Row padding={{ top: "S200" }}>
            <Expander
              titleText={t("BB-Schedule-card-about-seasonal-duration-popover-title-text", "What does a seasonal duration mean?")}
            >
              <Col gridGap="S500">
                <Text fontSize="T200">
                  {t("BB-Schedules-card-about-seasonal-duration-popover-content", "Seasonal Roles and Regular Roles have the same job duties. Seasonal roles, however, are intended to be temporary and last no longer than 11 months. If you’re interested in joining Amazon on a permanent basis, the opportunity may become available in the future.  Otherwise, you’ll be notified when your assignment will end.")}
                </Text>
              </Col>
            </Expander>
          </Row>
        ): null}
        {signOnBonus ? (
          <Row padding={{ top: "S200", bottom: "S400" }}>
            <Expander titleText={t("BB-Schedule-card-about-how-to-sign-bonus-title-text", "How do I get the sign on bonus?")}>
              <Col gridGap={8}>
                <Text>
                  {t("BB-Schedules-card-about-how-to-sign-bonus-content", `This offer includes a sign on bonus of ${displayCurrency}${signOnBonus} based on the specific details noted above. It's payable over multiple installments that may extend to 180 days after your start.`, { displayCurrency, signOnBonus })}
                </Text>
                <Row padding={{ top: "S200", bottom: "S200" }}>
                  <Text>
                    {
                      t("BB-Schedules-card-about-how-to-sign-bonus-content-point", "This specific offer may not be available if:")
                    }
                  </Text>
                </Row>
                <Col padding={{ left: "S300" }}>
                  <Text>
                    <li>
                      {t("BB-Schedules-card-about-how-to-sign-bonus-content-point-one", "You reschedule your shift")}
                    </li>
                  </Text>
                  <Text>
                    <li>
                      {t("BB-Schedules-card-about-how-to-sign-bonus-content-point-two", "You reschedule your start date, or")}
                    </li>
                  </Text>
                  <Text>
                    <li>
                      {t("BB-Schedules-card-about-how-to-sign-bonus-content-point-three", "You choose a new role.")}
                    </li>
                  </Text>
                </Col>
                <Row>
                  <Text>
                    {t("BB-Schedules-card-about-how-to-sign-bonus-content-last-line", "If you’ve worked for Amazon in the last 90 days you will not be eligible for any sign on bonus.")}
                  </Text>
                </Row>
              </Col>
            </Expander>
          </Row>
        ): null
        }
        <Hr />
        <Col padding={{ top: "S400" }}>
          <Text>
            {t("BB-ContingencyOffer-job-requirement-Section-title", "Job requirements")}
          </Text>
        </Col>
        <Col>
          <InnerHTML className="jobDescription" html={scheduleDetail?.jobDescription || ""} />
        </Col>
      </Col>
      <Col
        className="contingencyOfferFooter"
        gridGap={15}
        padding={{ top: "S400", bottom: "S400", left: "S300", right: "S300" }}
      >
        <H4>{t("BB-ContingencyOffer-remaining-steps-container-title", "Remaining Steps")}</H4>
        <ApplicationSteps />
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
