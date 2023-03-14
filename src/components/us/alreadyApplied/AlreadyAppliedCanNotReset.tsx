import React, { useEffect } from "react";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import queryString from "query-string";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { getPageNameFromPath, parseQueryParamsArrayToSingleItem, redirectToDashboard } from "../../../helpers/utils";
import { JobState } from "../../../reducers/job.reducer";
import { getLocale } from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import { DuplicateJobId } from "../../../utils/constants/common";
import { useBreakpoints } from "@amzn/stencil-react-components/responsive";

interface MapStateToProps {
  job: JobState;
}

export const AlreadyAppliedCanNotReset = (props: MapStateToProps) => {
  const { job } = props;
  const { search, pathname } = useLocation();
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const pageName = getPageNameFromPath(pathname);
  const { jobId } = queryParams;
  const jobDetail = job.results;
  const { matches } = useBreakpoints();

  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() });
  }, [jobDetail, jobId]);

  useEffect(() => {
    jobDetail && addMetricForPageLoad(pageName);
  }, [jobDetail, pageName]);

  const handleGoToDashboard = () => {
    sessionStorage.setItem(DuplicateJobId, jobId);
    redirectToDashboard();
  };

  return (
    <Col gridGap="S300" padding={{ top: "S300" }}>
      <Text fontSize="T300" fontWeight="bold">
        {t("BB-already-applied", `You have already submitted an application for the role:  ${jobDetail?.jobTitle || ""}`, { jobTitle: jobDetail?.jobTitle || "" })}
        <br />
        {jobDetail?.jobTitle || ""}
      </Text>
      <Text fontSize="T300" color="neutral70">
        {t("BB-job-id", "Job Id: ")} {jobDetail?.jobId || "" }
      </Text>
      <Text fontSize="T100">
        {t("BB-already-applied-description", "You can only have one active application for this Job Id. To view your current application and see more options, click 'Go to dashboard'.")}
      </Text>
      <Row width={matches.s || matches.m ? "100%": "63%"} gridGap={20} justifyContent="flex-end">
        <Button dataTestId="button-go-to-dashboard" variant={ButtonVariant.Primary} onClick={handleGoToDashboard}>
          {t("BB-already-applied-button-text", "Go to dashboard")}
        </Button>
      </Row>
    </Col>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(AlreadyAppliedCanNotReset);
