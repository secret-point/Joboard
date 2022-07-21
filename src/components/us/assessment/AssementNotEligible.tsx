import React, { useEffect } from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text, H4 } from "@amzn/stencil-react-components/text";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { checkAndBoundGetApplication, getLocale, goToCandidateDashboard } from "../../../utils/helper";
import { connect } from "react-redux";
import { ApplicationState } from "../../../reducers/application.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { useLocation } from "react-router";
import { getPageNameFromPath, parseQueryParamsArrayToSingleItem } from "../../../helpers/utils";
import queryString from "query-string";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { JobState } from "../../../reducers/job.reducer";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { translate as t } from "../../../utils/translator";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";

interface MapStateToProps {
  application: ApplicationState,
  candidate: CandidateState,
  job: JobState
}

interface AssessmentNotEligibleProps {

}

type AssessmentNotEligibleMergedProps = MapStateToProps & AssessmentNotEligibleProps;

export const AssessmentNotEligible = (props: AssessmentNotEligibleMergedProps) => {

  const { application, job, candidate } = props;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId, jobId } = queryParams;
  const applicationData = application.results;
  const jobDetail = job.results;
  const candidateData = candidate.results.candidateData;

  useEffect(() => {
    boundGetCandidateInfo();
  },[])

  useEffect(() => {
    checkAndBoundGetApplication(applicationId);
  }, [applicationId]);

  // Don't refresh data if id is not changing
  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() })
  }, [jobDetail, jobId]);

  useEffect(() => {
    jobDetail && applicationData && addMetricForPageLoad(pageName);
  }, [jobDetail, applicationData, pageName]);

  return (
    <Col gridGap={15}>
      <H4>
        {t("BB-assessment-not-eligible-heading-text", "{name}, your interest with Amazon means a lot to us.", {name: candidateData?.firstName || ''})}
      </H4>
      <Text fontSize="T200">
        {t("BB-assessment-not-eligible-thank-you-and-assessment-not-eligible-notice-text", "Thank you so much for giving us the opportunity to consider you for this position. Sadly, we will not be moving forward with your candidacy at this time.")}
      </Text>
      <Text fontSize="T200">
        {t("BB-assessment-not-eligible-reconsideration-notice-text", "To be reconsidered for this role at another time, you may take the assessment again in three months.")}
      </Text>
      <Col padding={{top: 'S300'}}>
        <Button
          variant={ButtonVariant.Primary}
          onClick={goToCandidateDashboard}
        >
          {t("BB-assessment-not-eligible-back-to-dashboard-button-text", "Return to dashboard")}
        </Button>
      </Col>
    </Col>
  )
}

const mapStateToProps = ( state: MapStateToProps ) => {
  return state;
};

export default connect(mapStateToProps)(AssessmentNotEligible);
