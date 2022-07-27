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

export const AlreadyApplied = (props: MapStateToProps) => {
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
  }, [jobDetail, jobId]);

  useEffect(() => {
    jobDetail && addMetricForPageLoad(pageName);
  }, [jobDetail, pageName]);

  const handleGoToDashboard = () => {
    redirectToDashboard();
  }

  return (
    <Col gridGap="S300" padding={{ top: 'S300' }}>
      <Text>
        {firstName ? `${firstName}, `: ''}
        {t("BB-already-applied", "You have already started and / or completed an application for this job.")}
      </Text>
      <Text fontSize="T100">
        {t("BB-already-applied-description", "Return to the dashboard resume your application or view application and new hire appointment details, and your next steps.")}
      </Text>
      <Col padding={{top: "S300"}}>
        <Button dataTestId="button-dashboard" variant={ButtonVariant.Primary} onClick={handleGoToDashboard}>
          {t("BB-already-applied-button-text", "Return to dashboard")}
        </Button>
      </Col>
    </Col >
  )
}

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(AlreadyApplied);
