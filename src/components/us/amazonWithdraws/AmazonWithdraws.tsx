import React from "react";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import queryString from "query-string";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  redirectToDashboard,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { JobState } from "../../../reducers/job.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { getLocale } from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";

interface MapStateToProps {
  candidate: CandidateState,
  job: JobState,
  schedule: ScheduleState
}

export const AmazonWithdraws = (props: MapStateToProps) => {
  const { job, candidate, schedule } = props;
  const { search, pathname } = useLocation();
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const pageName = getPageNameFromPath(pathname);
  const { jobId, scheduleId } = queryParams;
  const jobDetail = job.results;
  const candidateData = candidate.results.candidateData;
  const scheduleDetail = schedule.results.scheduleDetail;

  useEffect(() => {
    boundGetCandidateInfo();
  }, []);

  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() });
  }, [jobDetail, jobId]);

  useEffect(() => {
    scheduleId && boundGetScheduleDetail({
      locale: getLocale(),
      scheduleId: scheduleId
    })
  }, [scheduleId]);

  useEffect(() => {
    // Page will emit page load event once both pros are available but
    // will not emit new event on props change once it has emitted pageload event previously
    scheduleDetail && jobDetail && candidateData && addMetricForPageLoad(pageName);

  }, [jobDetail, scheduleDetail, candidateData]);

  useEffect(() => {
    return () => {
      //reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    }
  },[])

  const handleGoToDashboard = () => {
    redirectToDashboard();
  };

  return (
    <Col gridGap="S300" padding={{ top: "S300" }}>
      <Text>
        {t("BB-amazon-withdraws", "Thank you for your interest, but we're unable to offer you a job at this time.")}
      </Text>
      <Text fontSize="T100">
        {t("BB-amazon-withdraws-description", "The information you provided does not meet our requirements. We encourage you to look at other jobs on amazon.jobs.")}
      </Text>
      <Col padding={{ top: "S300" }}>
        <Button variant={ButtonVariant.Primary} onClick={handleGoToDashboard}>
          {t("BB-amazon-withdraws-button-text", "Return to dashboard")}
        </Button>
      </Col>
    </Col>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(AmazonWithdraws);
