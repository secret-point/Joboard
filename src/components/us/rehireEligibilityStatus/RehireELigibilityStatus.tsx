import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col } from "@amzn/stencil-react-components/layout";
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
import { WorkflowState } from "../../../reducers/workflow.reducer";
import { WORKFLOW_ERROR_CODE } from "../../../utils/enums/common";
import RehireNotEligibleActive from "../../common/rehireEligibilityStatus/RehireNotEligibleActive";
import Days365NotRehireEligible from "../../common/rehireEligibilityStatus/Days365NotRehireEligible";
import RehireNotEligibleSeasonalOnly from "../../common/rehireEligibilityStatus/RehireNotEligibleSeasonalOnly";
import NotRehireEligible from "../../common/rehireEligibilityStatus/NotRehireEligible";

interface MapStateToProps {
  candidate: CandidateState,
  job: JobState,
  workflow: WorkflowState
}

const RehireEligibilityStatus = (props: MapStateToProps) => {
  const { job, workflow } = props;
  const { search, pathname } = useLocation();
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const pageName = getPageNameFromPath(pathname);
  const { jobId } = queryParams;
  const jobDetail = job.results;
  const { workflowErrorCode } = workflow;

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
