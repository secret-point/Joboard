import React, { Suspense, useEffect } from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import { H3 } from "@amzn/stencil-react-components/text";
import queryString from "query-string";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { ApplicationState } from "../../../reducers/application.reducer";
import { BGCState } from "../../../reducers/bgc.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { JobState } from "../../../reducers/job.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { ApplicationStepList } from "../../../utils/constants/common";
import { checkAndBoundGetApplication, getLocale, initiateScheduleDetailOnPageLoad } from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import StepHeader from "../../common/StepHeader";
import AdditionalBGCInfo from "./AdditionalBGCInfo";
import { PAGE_ROUTES } from "../../pageRoutes";

interface MapStateToProps {
  job: JobState;
  application: ApplicationState;
  schedule: ScheduleState;
  bgc: BGCState;
  candidate: CandidateState;
}

interface BackgroundCheckProps {
}

type BackgroundCheckMergedProps = MapStateToProps & BackgroundCheckProps;

export const BackgroundCheck = ( props: BackgroundCheckMergedProps ) => {

  const { job, application, schedule, candidate } = props;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId, jobId, scheduleId } = queryParams;
  const jobDetail = job.results;
  const applicationData = application.results;
  const { scheduleDetail } = schedule.results;
  const { candidateData } = candidate.results;

  useEffect(() => {
    // Refresh and add scheduleId in the url from the jobSelected if it doesn't exist from the query param
    if (!scheduleId && applicationData) {
      initiateScheduleDetailOnPageLoad(applicationData, PAGE_ROUTES.ADDITIONAL_INFORMATION);
    }
  }, [applicationData]);

  useEffect(() => {
    boundGetCandidateInfo();
  }, []);

  useEffect(() => {
    scheduleId && scheduleId!== scheduleDetail?.scheduleId && boundGetScheduleDetail({
      locale: getLocale(),
      scheduleId: scheduleId
    });
  }, [scheduleDetail, scheduleId]);

  // Don't refetch data if id is not changing
  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() });
  }, [jobDetail, jobId]);

  useEffect(() => {
    checkAndBoundGetApplication(applicationId);
  }, [applicationId]);

  useEffect(() => {
    // Page will emit page load event once both pros are available but
    // will not emit new event on props change once it has emitted pageload event previously
    scheduleDetail && jobDetail && applicationData && candidateData && addMetricForPageLoad(pageName);
  }, [jobDetail, applicationData, candidateData, scheduleDetail, pageName]);

  useEffect(() => {
    return () => {
      // reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    };
  }, [pageName]);

  return (
    <Col className="bgcContainer" gridGap={15}>
      <StepHeader jobTitle={jobDetail?.jobTitle || ""} step={ApplicationStepList[1]} />
      <Col gridGap={15}>
        <H3>{t("BB-Kondo-BGC-additional-information-title-text", "Additional information")}</H3>
      </Col>

      <Suspense fallback={<></>}>
        <AdditionalBGCInfo />
      </Suspense>
    </Col>
  );
};

const mapStateToProps = ( state: MapStateToProps ) => {
  return state;
};

export default connect(mapStateToProps)(BackgroundCheck);
