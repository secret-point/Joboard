import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col } from "@amzn/stencil-react-components/layout";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  redirectToDashboard,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { translate as t } from "../../../utils/translator";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { checkAndBoundGetApplication, getLocale } from "../../../utils/helper";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { JobState } from "../../../reducers/job.reducer";
import { WorkflowState } from "../../../reducers/workflow.reducer";
import { WORKFLOW_ERROR_CODE } from "../../../utils/enums/common";
import RehireNotEligibleActive from "../../common/rehireEligibilityStatus/RehireNotEligibleActive";
import Days365NotRehireEligible from "../../common/rehireEligibilityStatus/Days365NotRehireEligible";
import RehireNotEligibleSeasonalOnly from "../../common/rehireEligibilityStatus/RehireNotEligibleSeasonalOnly";
import NotRehireEligible from "../../common/rehireEligibilityStatus/NotRehireEligible";
import { ApplicationState } from "../../../reducers/application.reducer";

interface MapStateToProps {
  candidate: CandidateState,
  job: JobState,
  workflow: WorkflowState,
  application: ApplicationState
}

export const RehireEligibilityStatus = (props: MapStateToProps) => {
  const { job, workflow, candidate, application } = props;
  const { search, pathname } = useLocation();
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const pageName = getPageNameFromPath(pathname);
  const { jobId, applicationId } = queryParams;
  const jobDetail = job.results;
  const applicationData = application.results;
  const candidateData = candidate.results.candidateData;
  const { workflowErrorCode } = workflow;

  useEffect(() => {
    boundGetCandidateInfo();
  }, [])

  useEffect(() => {
    checkAndBoundGetApplication(applicationId);
  }, [applicationId]);

  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() })
  }, [jobId]);

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
  },[]);

  const handleGoToDashboard = () => {
    redirectToDashboard();
  }

  const renderRehireEligibility = () => {
    switch (workflowErrorCode) {
      case WORKFLOW_ERROR_CODE.ACTIVE:
        return <RehireNotEligibleActive/>

      case WORKFLOW_ERROR_CODE.NOT_REHIRE_ELIGIBLE_365_DAYS:
        return <Days365NotRehireEligible/>;

      case WORKFLOW_ERROR_CODE.SEASONAL_ONLY:
        return <RehireNotEligibleSeasonalOnly/>;

      case WORKFLOW_ERROR_CODE.NOT_REHIRE_ELIGIBLE:
        return <NotRehireEligible/>;

      default:
        return <NotRehireEligible/>;
    }
  }

  return (
    <Col gridGap="S300" padding={{ top: 'S300' }}>
      {
        renderRehireEligibility()
      }
      <Col padding={{top: "S300"}}>
        <Button variant={ButtonVariant.Primary} onClick={handleGoToDashboard}>
          {t("BB-rehire-eligibility-status-back-to-dashboard-button-text", "Return to dashboard")}
        </Button>
      </Col>
    </Col >
  )
}

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(RehireEligibilityStatus);
