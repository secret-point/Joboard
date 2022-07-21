import React, { useEffect } from "react";
import queryString from "query-string";
import { Col } from "@amzn/stencil-react-components/layout";
import { useLocation } from "react-router";
import { getPageNameFromPath, parseQueryParamsArrayToSingleItem } from "../../../helpers/utils";
import { ApplicationState } from "../../../reducers/application.reducer";
import { boundGetApplication } from "../../../actions/ApplicationActions/boundApplicationActions";
import { boundUpdateWotcStatus } from "../../../actions/WotcActions/boundWotcAction";
import { checkAndBoundGetApplication, getLocale } from "../../../utils/helper";
import { connect } from "react-redux";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { Application, UpdateWotcStatusRequest } from "../../../utils/types/common";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { onCompleteTaskHelper } from "../../../actions/WorkflowActions/workflowActions";

interface MapStateToProps {
  candidate: CandidateState;
  application: ApplicationState;
};

const WOTC_COMPLETE_STATUS = "Completed";

export const WotcComplete = (props: MapStateToProps) => {
  const { candidate, application } = props;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId } = queryParams;
  const applicationData = application.results;
  const { candidateData } = candidate.results;

  useEffect(() => {
    boundGetCandidateInfo();
  }, [])

  useEffect(() => {
    checkAndBoundGetApplication(applicationId);
  }, [applicationId]);

  useEffect(() => {
    applicationData && addMetricForPageLoad(pageName);
  }, [applicationData, pageName]);

  useEffect(() => {
    if (candidateData) {
      const request: UpdateWotcStatusRequest = {
        applicationId,
        candidateId: candidateData?.candidateId,
        status: WOTC_COMPLETE_STATUS
      };

      // TODO: remove any
      boundUpdateWotcStatus(request, (data: any) => {
        // get the latest application data and update the application state, then complete the step
        boundGetApplication({ applicationId: applicationId, locale: getLocale() }, (app: Application) => {
          onCompleteTaskHelper(app);
        });
      });
    }

  }, [applicationId, candidateData]);


  return (
    <Col minHeight="40vh"></Col>
  )
}

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(WotcComplete);
