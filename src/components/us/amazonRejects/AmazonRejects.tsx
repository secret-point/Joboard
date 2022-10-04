import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  redirectToDashboard,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { translate as t } from "../../../utils/translator";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { checkAndBoundGetApplication, getLocale } from "../../../utils/helper";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { JobState } from "../../../reducers/job.reducer";
import { ApplicationState } from "../../../reducers/application.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";

interface MapStateToProps {
  job: JobState,
  application: ApplicationState,
  schedule: ScheduleState,
  candidate: CandidateState
}

export const AmazonRejects = (props: MapStateToProps) => {
  const { job, application, schedule, candidate } = props;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId, jobId, scheduleId } = queryParams;
  const jobDetail = job.results;
  const applicationData = application.results;
  const scheduleDetail = schedule.results.scheduleDetail;
  const candidateData = candidate.results?.candidateData;

  useEffect(() => {
    boundGetCandidateInfo();
  },[])

  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() })
  }, [jobDetail, jobId]);

  useEffect(() => {
    checkAndBoundGetApplication(applicationId);
  }, [applicationId]);

  useEffect(() => {
    scheduleId && boundGetScheduleDetail({
      locale: getLocale(),
      scheduleId: scheduleId
    })
  }, [scheduleId]);

  useEffect(() => {
    // Page will emit page load event once both pros are available but
    // will not emit new event on props change once it has emitted pageload event previously
    scheduleDetail && jobDetail && applicationData && candidateData && addMetricForPageLoad(pageName);

  }, [jobDetail, applicationData, scheduleDetail, candidateData]);

  useEffect(() => {
    return () => {
      //reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    }
  },[])

  const handleGoToDashboard = () => {
    redirectToDashboard();
  }

  return (
    <Col gridGap="S300" padding={{ top: 'S300' }}>
      <Text fontSize="T400">
        {t("BB-amazon-rejects-thank-you", "Thank you for your interest, but we're unable to offer you a job at this time.")}
      </Text>
      <Text fontSize="T200">
        {t("BB-amazon-rejects-not-meet-requirements", "The information you provided does not meet our requirements. We encourage you to look at other jobs on amazon.jobs.")}
      </Text>
      <Button variant={ButtonVariant.Primary} onClick={handleGoToDashboard}>
        {t("BB-amazon-rejects-return-to-dashboard", "Return to dashboard")}
      </Button>
    </Col >
  )
}

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(AmazonRejects);
