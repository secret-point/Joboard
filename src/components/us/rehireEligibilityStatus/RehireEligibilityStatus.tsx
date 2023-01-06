import React, { useEffect } from "react";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col } from "@amzn/stencil-react-components/layout";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import {
  getPageNameFromPath, redirectToDashboard,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { WorkflowState } from "../../../reducers/workflow.reducer";
import { WORKFLOW_ERROR_CODE } from "../../../utils/enums/common";
import { translate as t } from "../../../utils/translator";
import Days365NotRehireEligible from "../../common/rehireEligibilityStatus/Days365NotRehireEligible";
import NotRehireEligible from "../../common/rehireEligibilityStatus/NotRehireEligible";
import RehireNotEligibleActive from "../../common/rehireEligibilityStatus/RehireNotEligibleActive";
import RehireNotEligibleSeasonalOnly from "../../common/rehireEligibilityStatus/RehireNotEligibleSeasonalOnly";

interface MapStateToProps {
  workflow: WorkflowState;
}

export const RehireEligibilityStatus = (props: MapStateToProps) => {
  const { workflow } = props;
  const { pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const { workflowErrorCode } = workflow;

  useEffect(() => {
    // Page will emit page load event once both pros are available but
    // will not emit new event on props change once it has emitted pageload event previously
    addMetricForPageLoad(pageName);
  }, [pageName]);

  useEffect(() => {
    return () => {
      // reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    };
  }, []);

  const handleGoToDashboard = () => {
    redirectToDashboard();
  };

  const renderRehireEligibility = () => {
    switch (workflowErrorCode) {
      case WORKFLOW_ERROR_CODE.ACTIVE:
        return <RehireNotEligibleActive />;

      case WORKFLOW_ERROR_CODE.NOT_REHIRE_ELIGIBLE_365_DAYS:
        return <Days365NotRehireEligible />;

      case WORKFLOW_ERROR_CODE.SEASONAL_ONLY:
        return <RehireNotEligibleSeasonalOnly />;

      case WORKFLOW_ERROR_CODE.NOT_REHIRE_ELIGIBLE:
        return <NotRehireEligible />;

      default:
        return <NotRehireEligible />;
    }
  };

  return (
    <Col gridGap="S300" padding={{ top: "S300" }}>
      {
        renderRehireEligibility()
      }
      <Col padding={{ top: "S300" }}>
        <Button variant={ButtonVariant.Primary} onClick={handleGoToDashboard}>
          {t("BB-rehire-eligibility-status-back-to-dashboard-button-text", "Return to dashboard")}
        </Button>
      </Col>
    </Col>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(RehireEligibilityStatus);
