import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  redirectToDashboard,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { translate as t } from "../../../utils/translator";
import { useLocation } from "react-router";
import queryString from "query-string";
import { useBreakpoints } from "@amzn/stencil-react-components/responsive";
import { GetScheduleListByJobIdRequest } from "../../../utils/apiTypes";
import { checkAndBoundGetApplication, getLocale } from "../../../utils/helper";
import { boundGetScheduleListByJobId } from "../../../actions/ScheduleActions/boundScheduleActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { JobState } from "../../../reducers/job.reducer";
import { ApplicationState } from "../../../reducers/application.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { CandidateState } from "../../../reducers/candidate.reducer";

interface MapStateToProps {
  job: JobState,
  application: ApplicationState,
  candidate: CandidateState
}

const NoAvailableShift = (props: MapStateToProps) => {

  const { job, application, candidate } = props;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId, jobId } = queryParams;
  const jobDetail = job.results;
  const applicationData = application.results;
  const candidateData = candidate.results.candidateData;

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
    // Page will emit page load event once both pros are available but
    // will not emit new event on props change once it has emitted pageload event previously
    jobDetail && applicationData && candidateData && addMetricForPageLoad(pageName);

  }, [jobDetail, applicationData, candidateData]);

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
        {t("BB-no-available-shift-all-shifts-filled-text", "Currently all shifts have been filled.")}
      </Text>
      <Text fontSize="T200">
        {t("BB-no-available-shift-return-dashboard-to-apply-text", "Please return to the dashboard to apply for other jobs.")}
      </Text>
      <Button variant={ButtonVariant.Primary} onClick={handleGoToDashboard}>
        {t("BB-no-available-shift-return-to-dashboard", "Return to dashboard")}
      </Button>
    </Col >
  )
}

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(NoAvailableShift);
