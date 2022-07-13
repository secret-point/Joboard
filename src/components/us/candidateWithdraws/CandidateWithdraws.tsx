import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { getPageNameFromPath, parseQueryParamsArrayToSingleItem, redirectToDashboard } from "../../../helpers/utils";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { translate as t } from "../../../utils/translator";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { useLocation } from "react-router";
import { JobState } from "../../../reducers/job.reducer";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { getLocale } from "../../../utils/helper";
import { ApplicationState } from "../../../reducers/application.reducer";
import queryString from "query-string";
import { boundGetApplication } from "../../../actions/ApplicationActions/boundApplicationActions";

interface MapStateToProps {
  candidate: CandidateState,
  job: JobState,
  application: ApplicationState
}

const CandidateWithdraws = (props: MapStateToProps) => {
  const { job, application } = props;
  const { search, pathname } = useLocation();
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const pageName = getPageNameFromPath(pathname);
  const { applicationId, jobId } = queryParams;
  const jobDetail = job.results;
  const applicationData = application.results;

  useEffect(() => {
    boundGetCandidateInfo();
  }, []);

  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() });
  }, [jobId]);

  useEffect(() => {
    applicationId && boundGetApplication({ applicationId: applicationId, locale: getLocale() });
  }, [applicationId]);

  useEffect(() => {
    jobDetail && applicationData && addMetricForPageLoad(pageName);
  }, [jobDetail, applicationData]);

  const handleGoToDashboard = () => {
    redirectToDashboard();
  };

  return (
    <Col gridGap="S300" padding={{ top: "S300" }}>
      <Text>
        {t("BB-candidate-withdraws", "Thank you for your interest, but we're unable to offer you a job at this time.")}
      </Text>
      <Text fontSize="T100">
        {t("BB-candidate-withdraws-description", "The information you provided does not meet our requirements. We encourage you to look at other jobs on amazon.jobs.")}
      </Text>
      <Col padding={{ top: "S300" }}>
        <Button variant={ButtonVariant.Primary} onClick={handleGoToDashboard}>
          {t("BB-candidate-withdraws-button-text", "Return to dashboard")}
        </Button>
      </Col>
    </Col>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(CandidateWithdraws);
