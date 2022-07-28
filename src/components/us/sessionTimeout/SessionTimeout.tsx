import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { translate as t } from "../../../utils/translator";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { useLocation } from "react-router";
import { JobState } from "../../../reducers/job.reducer";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { checkAndBoundGetApplication, getLocale } from "../../../utils/helper";
import { ApplicationState } from "../../../reducers/application.reducer";
import queryString from "query-string";
import { WORKFLOW_STEP_NAME } from "../../../utils/enums/common";
import { onCompleteTaskHelper } from "../../../actions/WorkflowActions/workflowActions";

interface MapStateToProps {
  candidate: CandidateState,
  job: JobState,
  application: ApplicationState
}

const SessionTimeout = (props: MapStateToProps) => {
  const { job, application, candidate } = props;
  const { search, pathname } = useLocation();
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const pageName = getPageNameFromPath(pathname);
  const { applicationId, jobId } = queryParams;
  const jobDetail = job.results;
  const applicationData = application.results;
  const candidateData = candidate.results.candidateData;

  useEffect(() => {
    boundGetCandidateInfo();
  }, []);

  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() });
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

  const handleGoToJobOpportunities = () => {
    const isBackButton = true;
    const targetPageToGoBack = WORKFLOW_STEP_NAME.JOB_OPPORTUNITIES;
    applicationData && onCompleteTaskHelper(applicationData, isBackButton, targetPageToGoBack);
  };

  return (
    <Col gridGap="S300" padding={{ top: "S300" }}>
      <Text>
        {t("BB-session-timeout", "Your job position reservation has expired.")}
      </Text>
      <Text fontSize="T100">
        {t("BB-session-timeout-description", "We allow candidates up to three hours to complete their application. Unfortunately, the job position you were applying for exceeded the three hour limit. Please explore available job opportunities.")}
      </Text>
      <Col padding={{ top: "S300" }}>
        <Button variant={ButtonVariant.Primary} onClick={handleGoToJobOpportunities}>
          {t("BB-session-timeout-view-job-button-text", "View job opportunities")}
        </Button>
      </Col>
    </Col>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(SessionTimeout);
