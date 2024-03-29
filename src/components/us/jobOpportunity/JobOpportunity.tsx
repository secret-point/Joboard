import React, { useEffect } from "react";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import ScheduleCard from "../../common/jobOpportunity/ScheduleCard";
import { translate as t } from "../../../utils/translator";
import { GetScheduleListByJobIdRequest } from "../../../utils/apiTypes";
import { boundGetScheduleListByJobId } from "../../../actions/ScheduleActions/boundScheduleActions";
import {
  checkAndBoundGetApplication,
  getLocale,
  goToCandidateDashboard,
  handleApplyScheduleFilters,
  handleResetScheduleFilters,
} from "../../../utils/helper";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { ApplicationStepListDefault } from "../../../utils/constants/common";
import Image from "../../common/Image";
import {
  FlyoutContent,
  FlyoutPosition,
  RenderFlyoutFunctionParams,
  WithFlyout
} from "@amzn/stencil-react-components/flyout";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { IconArrowLeft, IconHourGlass, IconSize, IconSort } from "@amzn/stencil-react-components/icons";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { useBreakpoints } from "@amzn/stencil-react-components/responsive";
import { Text } from "@amzn/stencil-react-components/text";
import queryString from "query-string";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { ApplicationState } from "../../../reducers/application.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { JobState } from "../../../reducers/job.reducer";
import FilterSchedule from "../../common/jobOpportunity/FilterSchedule";
import SortSchedule from "../../common/jobOpportunity/SortSchedule";
import StepHeader from "../../common/StepHeader";

interface MapStateToProps {
  job: JobState;
  application: ApplicationState;
  schedule: ScheduleState;
  candidate: CandidateState;
}

type JobOpportunityMergedProps = MapStateToProps;

export const JobOpportunity = ( props: JobOpportunityMergedProps ) => {
  const { job, application, schedule, candidate } = props;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId, jobId } = queryParams;
  const jobDetail = job.results;
  const applicationData = application.results;
  const scheduleData = schedule.results.scheduleList;
  const scheduleFilters = schedule.filters;
  const { matches } = useBreakpoints();
  const { candidateData } = candidate.results;

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
        <FilterSchedule filters={scheduleFilters} />
      </FlyoutContent>
    </Col>
  );

  return (
    <Col margin={{ top: "S300" }}>
      <StepHeader jobTitle={jobDetail?.jobTitle || ""} step={ApplicationStepListDefault[0]} />
      <Col id="jobOpportunityHeaderImageContainer">
        <Image
          id="jobOpportunityHeaderImage"
          src="https://m.media-amazon.com/images/G/01/HVH-CandidateApplication/jobs/20170525PrimeNowUWA2_15-min.jpg"
          aria-hidden="true"
        />
        <Col id="jobOpportunityHeaderImageOverlay">
          {/* May need to add overlay content in future*/}
        </Col>
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
            scheduleData && scheduleData.map(scheduleItem => <ScheduleCard key={scheduleItem.scheduleId} scheduleDetail={scheduleItem} />)
          }
        </Col>
      </Col>
    </Col>
  );
};

const mapStateToProps = ( state: MapStateToProps ) => {
  return state;
};

export default connect(mapStateToProps)(JobOpportunity);
