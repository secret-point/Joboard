import React, { useEffect } from "react";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import queryString from "query-string";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { getPageNameFromPath, parseQueryParamsArrayToSingleItem, redirectToDashboard } from "../../../helpers/utils";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { JobState } from "../../../reducers/job.reducer";
import { getLocale } from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import { DUPLICATE_JOB_ID_LOCAL_STORAGE_KEY } from "../../../utils/constants/common";

interface MapStateToProps {
  candidate: CandidateState;
  job: JobState;
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
  }, []);

  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() });
  }, [jobDetail, jobId]);

  useEffect(() => {
    jobDetail && addMetricForPageLoad(pageName);
  }, [jobDetail, pageName]);

  const handleGoToDashboard = () => {
    localStorage.setItem(DUPLICATE_JOB_ID_LOCAL_STORAGE_KEY, jobId);
    redirectToDashboard();
  };

  return (
    <Col gridGap="S300" padding={{ top: "S300" }}>
      <Text>
        {firstName ? `${firstName}, `: ""}
        {t("BB-already-applied-UK", "Thank you for applying to Amazon!")}
      </Text>
      <Text fontSize="T100">
        {t("BB-already-applied-description-UK", "You have already applied to this job. Return to the dashboard to view your application.")}
      </Text>
      <Col padding={{ top: "S300" }}>
        <Button dataTestId="button-dashboard" variant={ButtonVariant.Primary} onClick={handleGoToDashboard}>
          {t("BB-already-applied-button-text-UK", "Go to dashboard")}
        </Button>
      </Col>
    </Col>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(AlreadyApplied);
