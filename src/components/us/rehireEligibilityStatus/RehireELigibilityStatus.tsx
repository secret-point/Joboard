import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { getPageNameFromPath, parseQueryParamsArrayToSingleItem, redirectToDashboard } from "../../../helpers/utils";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { translate as t } from "../../../utils/translator";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { getLocale } from "../../../utils/helper";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { useLocation } from "react-router";
import queryString from "query-string";
import { JobState } from "../../../reducers/job.reducer";

interface MapStateToProps {
  candidate: CandidateState,
  job: JobState
}

const RehireEligibilityStatus = (props: MapStateToProps) => {
  const { candidate, job } = props;
  const { candidateData } = candidate.results;
  const firstName = candidateData?.firstName;
  const { search, pathname } = useLocation();
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const pageName = getPageNameFromPath(pathname);
  const { jobId } = queryParams;
  const jobDetail = job.results;

  useEffect(() => {
    boundGetCandidateInfo();
  }, [])

  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() })
  }, [jobId]);

  useEffect(() => {
    jobDetail && addMetricForPageLoad(pageName);
  }, [jobDetail]);

  const handleGoToDashboard = () => {
    redirectToDashboard();
  }

  return (
    <Col gridGap="S300" padding={{ top: 'S300' }}>
      <Text>Rehire Eligibility Status</Text>
    </Col >
  )
}

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(RehireEligibilityStatus);
