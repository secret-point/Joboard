import React from "react";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import queryString from "query-string";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  redirectToDashboard,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { JobState } from "../../../reducers/job.reducer";
import { getLocale } from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";

interface MapStateToProps {
  job: JobState,
  candidate: CandidateState,
}

export const CanNotOfferJob = (props: MapStateToProps) => {

  const { job, candidate } = props;
  const { search, pathname } = useLocation();
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const pageName = getPageNameFromPath(pathname);
  const { jobId } = queryParams;
  const jobDetail = job.results;
  const candidateData = candidate.results.candidateData;

  useEffect(() => {
    boundGetCandidateInfo();
  }, []);

  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() });
  }, [jobDetail, jobId]);

  useEffect(() => {
    // Page will emit page load event once both pros are available but
    // will not emit new event on props change once it has emitted pageload event previously
    jobDetail && candidateData && addMetricForPageLoad(pageName);

  }, [jobDetail, candidateData]);

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
        {t("BB-can-not-offer-job-title-text", "Thank you for your interest, but we're unable to offer you a job at this time.")}
      </Text>
      <Text fontSize="T200">
        {t("BB-can-not-offer-job-description-text", "The information you provided does not meet our requirements. We encourage you to look at other jobs on amazon.jobs.")}
      </Text>
      <Button variant={ButtonVariant.Primary} onClick={handleGoToDashboard}>
        {t("BB-can-not-offer-job-return-to-dashboard-text", "Return to dashboard")}
      </Button>
    </Col >
  )
}

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(CanNotOfferJob);
