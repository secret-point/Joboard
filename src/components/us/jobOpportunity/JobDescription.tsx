import React, { useEffect } from "react";
import { IconArrowLeft, IconSize } from "@amzn/stencil-react-components/icons";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import InnerHTML from "dangerously-set-html-content";
import queryString from "query-string";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { boundResetBannerMessage } from "../../../actions/UiActions/boundUi";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { ApplicationState } from "../../../reducers/application.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { JobState } from "../../../reducers/job.reducer";
import { CommonColors } from "../../../utils/colors";
import { checkAndBoundGetApplication, getLocale, routeToAppPageWithPath } from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import { PAGE_ROUTES } from "../../pageRoutes";

interface MapStateToProps {
  job: JobState;
  application: ApplicationState;
  candidate: CandidateState;
}

export const JobDescription = (props: MapStateToProps) => {

  const { job, application, candidate } = props;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { jobId, applicationId } = queryParams;
  const jobDetail = job.results;
  const applicationData = application.results;
  const { JOB_CONFIRMATION } = PAGE_ROUTES;
  const { candidateData } = candidate.results;

  useEffect(() => {
    boundGetCandidateInfo();
  }, []);

  // Don't refetch data if id is not changing
  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() });
  }, [jobDetail, jobId]);

  useEffect(() => {
    checkAndBoundGetApplication(applicationId);
  }, [applicationId]);

  useEffect(() => {
    applicationData && jobDetail && candidateData && addMetricForPageLoad(pageName);
  }, [jobDetail, candidateData, applicationData]);

  useEffect(() => {
    return () => {
      // reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    };
  }, []);

  return (
    <Col>
      <Row
        gridGap={5}
        alignItems="center"
        width="fit-content"
        color={CommonColors.Blue70}
        padding="S200"
        onClick={() => {
          boundResetBannerMessage();
          routeToAppPageWithPath(JOB_CONFIRMATION);
        }}
        style={{ cursor: "pointer" }}
      >
        <IconArrowLeft size={IconSize.ExtraSmall} aria-hidden />
        <Text fontSize="T100" fontWeight="medium">
          {
            t("BB-JobOpportunity-back-to-jobConfirmation-link", "Back")
          }
        </Text>
      </Row>
      <Row id="jobImageContainer" width="100%" padding="S300">
        <img src={jobDetail?.image} />
      </Row>
      {jobDetail?.jobDescription && <InnerHTML className="jobDescription" html={jobDetail?.jobDescription || ""} />}
    </Col>
  );
};

const mapStateToProps = ( state: MapStateToProps ) => {
  return state;
};

export default connect(mapStateToProps)(JobDescription);
