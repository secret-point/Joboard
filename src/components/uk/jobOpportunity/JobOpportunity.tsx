import React, { useEffect, useState } from "react";
import ScheduleCard from "../../common/jobOpportunity/ScheduleCard";
import { translate as t } from "../../../utils/translator";
import {
  checkAndBoundGetApplication,
  getLocale,
  getSupportedCitiesFromScheduleList,
  goToCandidateDashboard,
  handleApplyScheduleFilters,
  handleResetScheduleFilters,
  routeToAppPageWithPath
} from "../../../utils/helper";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { ApplicationStepListUK } from "../../../utils/constants/common";
import Image from "../../common/Image";
import {
  FlyoutContent,
  FlyoutPosition,
  RenderFlyoutFunctionParams,
  WithFlyout
} from "@amzn/stencil-react-components/flyout";
import { Button, ButtonSize, ButtonVariant } from "@amzn/stencil-react-components/button";
import { IconArrowLeft, IconHourGlass, IconSize, IconSort } from "@amzn/stencil-react-components/icons";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { useBreakpoints } from "@amzn/stencil-react-components/responsive";
import { H5, Text } from "@amzn/stencil-react-components/text";
import queryString from "query-string";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { ApplicationState } from "../../../reducers/application.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { JobState } from "../../../reducers/job.reducer";
import SortSchedule from "../../common/jobOpportunity/SortSchedule";
import StepHeader from "../../common/StepHeader";
import FilterScheduleUK from "./FilterScheduleUK";
import ShiftPreferenceCard from "../../common/jobOpportunity/ShiftPreferenceCard";
import InactivityModal from "../../common/InactivityModal";
import { PAGE_ROUTES } from "../../pageRoutes";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { GetScheduleListByJobIdRequest } from "../../../utils/apiTypes";
import { boundGetScheduleListByJobId } from "../../../actions/ScheduleActions/boundScheduleActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { boundGetAssessmentElegibility } from "../../../actions/AssessmentActions/boundAssessmentActions";
import { AssessmentState } from "../../../reducers/assessment.reducer";
import { APPLICATION_STEPS as STEPS } from "../../../utils/enums/common";
import { getStepsByTitle } from "../../../helpers/steps-helper";
import { getScheduleDuration } from "../../../helpers/job-helpers";
import { getLocalizedDate, get12hrTimeStringLocalized } from "../../../helpers/localization-helpers";

interface MapStateToProps {
  job: JobState;
  application: ApplicationState;
  schedule: ScheduleState;
  candidate: CandidateState;
  assessment: AssessmentState;
}

type JobOpportunityMergedProps = MapStateToProps ;

export const JobOpportunity = ( props: JobOpportunityMergedProps ) => {
  const { job, application, schedule, candidate, assessment } = props;
  const { search, pathname } = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId, jobId } = queryParams;
  const jobDetail = job.results;
  const applicationData = application.results;
  const scheduleData = schedule.results.scheduleList;
  const scheduleDataUk = scheduleData?.map((schedule) => {
    return {
      ...schedule,
      firstDayOnSite: schedule.hireStartDate || schedule.firstDayOnSite,
      duration: getScheduleDuration({ ...schedule, applicationId }),
      hireEndDate: schedule?.hireEndDate && getLocalizedDate(schedule.hireEndDate),
      scheduleText: schedule?.scheduleText && get12hrTimeStringLocalized(schedule.scheduleText)

    };
  });
  const scheduleFilters = schedule.filters;
  const { matches } = useBreakpoints();
  const { candidateData } = candidate.results;
  const [showInactiveModal, setShowInactiveModal] = useState(false);
  const withAssessment = assessment.results.assessmentElegibility ;
  const applicationSteps = withAssessment ? ApplicationStepListUK : getStepsByTitle(ApplicationStepListUK, STEPS.COMPLETE_AN_ASSESSMENT, false );
  const headerStep = getStepsByTitle(applicationSteps, STEPS.SELECT_JOB)[0]; 

  const width = matches.s ? "100VW" : "420px";

  useEffect(() => {
    boundGetCandidateInfo();
  }, []);

  useEffect(() => {
    const request: GetScheduleListByJobIdRequest = {
      jobId,
      applicationId,
      locale: getLocale()
    };
    boundGetScheduleListByJobId(request);
  }, [applicationId, jobId]);

  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() });
  }, [jobDetail, jobId]);

  useEffect(() => {
    checkAndBoundGetApplication(applicationId);
  }, [applicationId]);

  useEffect(() => {
    // Page will emit page load event once both pros are available but
    // will not emit new event on props change once it has emitted pageload event previously
    scheduleData && jobDetail && applicationData && candidateData && addMetricForPageLoad(pageName);

  }, [jobDetail, applicationData, candidateData, scheduleData]);

  useEffect(() => {
    return () => {
      // reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    };
  }, []);

  useEffect(() => {
    jobId && applicationId && candidateData?.candidateId && boundGetAssessmentElegibility({
      applicationId,
      candidateId: candidateData.candidateId, 
      jobId });
  }, [jobId, applicationId, candidateData?.candidateId]);

  const renderSortScheduleFlyout = ( { close }: RenderFlyoutFunctionParams ) => (
    <Col width={width} height="100vh">
      <FlyoutContent
        titleText={t("BB-JobOpportunity-sort-schedule-flyout-title", "Sort By")}
        onCloseButtonClick={close}
        buttons={[
          <Button
            onClick={() => {
              handleApplyScheduleFilters(scheduleFilters);
              close();
            }}
            variant={ButtonVariant.Primary}
            key="apply"
          >
            {t("BB-JobOpportunity-sort-schedule-flyout-apply-Btn", "Apply")}
          </Button>
        ]}
      >
        <SortSchedule filters={scheduleFilters} />
      </FlyoutContent>
    </Col>
  );
  const renderFilterScheduleFlyout = ( { close }: RenderFlyoutFunctionParams ) => (
    <Col width={width} height="100vh">
      <FlyoutContent
        titleText={t("BB-JobOpportunity-filter-schedule-flyout-title", "Filter")}
        onCloseButtonClick={close}
        buttons={[
          <Button
            onClick={() => {
              handleResetScheduleFilters();
              close();
            }}
            key="reset"
          >
            {t("BB-JobOpportunity-filter-schedule-flyout-reset-Btn", "Reset")}
          </Button>,
          <Button
            onClick={() => {
              handleApplyScheduleFilters(scheduleFilters);
              close();
            }}
            variant={ButtonVariant.Primary}
            key="apply"
          >
            {t("BB-JobOpportunity-filter-schedule-flyout-apply-Btn", "Apply")}
          </Button>
        ]}
      >
        <FilterScheduleUK
          filters={scheduleFilters}
          supportedCities={getSupportedCitiesFromScheduleList(scheduleData || [])}
          scheduleCount={scheduleData?.length || 0}
        />
      </FlyoutContent>
    </Col>
  );

  return (
    <Col margin={{ top: "S300" }}>
      {
        // TODO need to align how each application workflow is related to app steps
      }
      <StepHeader jobTitle={jobDetail?.jobTitle || ""} step={headerStep} steps={applicationSteps} />
      <Col id="jobOpportunityHeaderImageContainer">
        <Image
          id="jobOpportunityHeaderImage"
          src="https://m.media-amazon.com/images/G/01/HVH-CandidateApplication/jobs/20170525PrimeNowUWA2_15-min.jpg"
          aria-hidden="true"
        />
      </Col>

      <Col>
        <Row padding={{ top: "S400" }}>
          <Row
            className="backToJobDashboardLink"
            gridGap={5}
            onClick={goToCandidateDashboard}
          >
            <IconArrowLeft size={IconSize.ExtraSmall} fontSize="T100" aria-hidden />
            <Text fontWeight="medium" fontSize="T200">
              {t("BB-JobOpportunity-Go-To-Dashboard-Link", "Go Back to Jobs Dashboard")}
            </Text>
          </Row>
        </Row>

        <Col className="scheduleListContainer" padding={{ top: "S500" }}>
          <Row className="scheduleListActionContainer">
            <Row className="scheduleListActionItem" gridGap={5}>
              <WithFlyout
                renderFlyout={renderFilterScheduleFlyout}
                flyoutPosition={FlyoutPosition.Leading}
              >
                {( { open } ) => (
                  <Row onClick={() => open()} gridGap={8} alignItems="center">
                    <IconHourGlass size={IconSize.ExtraSmall} aria-hidden />
                    <Text fontWeight="medium" fontSize="T200">
                      {t("BB-JobOpportunity-filter-button", "Filter")}
                    </Text>
                  </Row>
                )}
              </WithFlyout>
            </Row>
            <Row
              className="scheduleListActionItem"
            >
              <WithFlyout renderFlyout={renderSortScheduleFlyout}>
                {( { open } ) => (
                  <Row onClick={() => open()} gridGap={8} alignItems="center">
                    <IconSort size={IconSize.ExtraSmall} aria-hidden />
                    <Text fontWeight="medium" fontSize="T200">
                      {t("BB-JobOpportunity-sort-button", "Sort")}
                    </Text>
                  </Row>
                )}
              </WithFlyout>
            </Row>
          </Row>
          {
            scheduleDataUk && scheduleDataUk.map(scheduleItem => <ScheduleCard key={scheduleItem.scheduleId} scheduleDetail={scheduleItem} />)
          }
          <ShiftPreferenceCard />
        </Col>
      </Col>
      <InactivityModal millisecondsToTimeout={300000} isOpen={showInactiveModal} setIsOpen={setShowInactiveModal}>
        <Col
          padding={{ top: "S400" }}
          gridGap="S500"
        >
          <H5 fontWeight="bold">
            {t("BB-JobOpportunity-inactivity-modal-title", "Don't see a shift that works for you?")}
          </H5>
          <Button
            onClick={ () => {
              setShowInactiveModal(false);
              routeToAppPageWithPath(PAGE_ROUTES.SHIFT_PREFERENCE);
            }}
            variant={ButtonVariant.Primary}
            size={ButtonSize.Small}
          >
            {t("BB-JobOpportunity-inactivity-button-text", "Enter shift preferences to continue")}
          </Button>
        </Col>
      </InactivityModal>
    </Col>
  );
};

const mapStateToProps = ( state: MapStateToProps ) => {
  return state;
};

export default connect(mapStateToProps)(JobOpportunity);
