import React, { useEffect } from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import queryString from "query-string";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { getPageNameFromPath, parseQueryParamsArrayToSingleItem } from "../../../helpers/utils";
import { redirectToASHChecklist } from "../../../utils/helper";

export const SupplementarySuccess = () => {
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId, jobId, requisitionId } = queryParams;

  useEffect(() => {
    addMetricForPageLoad(pageName);
  }, [pageName]);

  useEffect(() => {
    if (applicationId && (jobId || requisitionId)) {
      redirectToASHChecklist(applicationId, jobId, requisitionId);
    }
  }, [applicationId, jobId, requisitionId]);

  return (
    <Col minHeight="40vh" />
  );
};

const mapStateToProps = (state: any) => {
  return state;
};

export default connect(mapStateToProps)(SupplementarySuccess);
