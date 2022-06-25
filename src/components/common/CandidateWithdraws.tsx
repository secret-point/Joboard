import React, { useEffect } from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text, H4 } from "@amzn/stencil-react-components/text";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { getLocale, goToCandidateDashboard } from "../../utils/helper";
import { connect } from "react-redux";
import { ApplicationState } from "../../reducers/application.reducer";
import { useLocation } from "react-router";
import { getPageNameFromPath, parseQueryParamsArrayToSingleItem } from "../../helpers/utils";
import queryString from "query-string";
import { boundGetApplication } from "../../actions/ApplicationActions/boundApplicationActions";
import { JobState } from "../../reducers/job.reducer";
import { addMetricForPageLoad } from "../../actions/AdobeActions/adobeActions";
import { translate as t } from "../../utils/translator";

interface MapStateToProps {
  application: ApplicationState,
  job: JobState
}

export const CandidateWithdraws = (props: MapStateToProps) => {

  const { application, job } = props;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId } = queryParams;
  const applicationData = application.results;
  const jobDetail = job.results;

  useEffect(() => {
    applicationId && boundGetApplication({ applicationId: applicationId, locale: getLocale() });
  }, [applicationId]);

  useEffect(() => {
    jobDetail && applicationData && addMetricForPageLoad(pageName);
  }, [jobDetail, applicationData]);

  return (
    <Col gridGap={15}>
      <H4>
        {t("BB-candidate-withdraws-thank-you-text", "Thank you for your interest, but we are unable to offer you a job at this time.")}
      </H4>
      <Text fontSize="T200">
        {t("BB-candidate-withdraws-withdraw-reason-text", "The information you provided does not meet our requirements. We encourage you to look at the jobs at amazon.jobs.")}
      </Text>
      <Col padding={{top: 'S300'}}>
        <Button
          variant={ButtonVariant.Primary}
          onClick={goToCandidateDashboard}
        >
          {t("BB-candidate-withdraws-back-to-dashboard-button-text", "Return to dashboard")}
        </Button>
      </Col>
    </Col>
  )
}

const mapStateToProps = ( state: MapStateToProps ) => {
  return state;
};

export default connect(mapStateToProps)(CandidateWithdraws);