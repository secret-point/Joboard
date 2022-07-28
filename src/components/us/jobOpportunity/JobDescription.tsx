import React, { useEffect } from 'react';
import { Col, Row } from "@amzn/stencil-react-components/layout";
import InnerHTML from 'dangerously-set-html-content';
import { connect } from "react-redux";
import { JobState } from "../../../reducers/job.reducer";
import { CommonColors } from "../../../utils/colors";
import { IconArrowLeft, IconSize } from "@amzn/stencil-react-components/icons";
import { Text } from "@amzn/stencil-react-components/text";
import { translate as t } from "../../../utils/translator";
import { checkAndBoundGetApplication, getLocale, routeToAppPageWithPath } from "../../../utils/helper";
import { PAGE_ROUTES } from "../../pageRoutes";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import queryString from "query-string";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { useLocation } from "react-router";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { ApplicationState } from "../../../reducers/application.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";

interface MapStateToProps {
    job: JobState,
    application: ApplicationState,
    candidate: CandidateState
}

const JobDescription = (props: MapStateToProps) => {

    const { job, application, candidate } = props;
    const { search, pathname } = useLocation();
    const pageName = getPageNameFromPath(pathname);
    const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
    const { jobId, applicationId } = queryParams;
    const jobDetail = job.results;
    const applicationData = application.results;
    const { JOB_CONFIRMATION } = PAGE_ROUTES;
    const candidateData = candidate.results.candidateData;

    useEffect(() => {
      boundGetCandidateInfo();
    },[])

    // Don't refetch data if id is not changing
    useEffect(() => {
        jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() })
    }, [jobDetail, jobId]);

    useEffect(() => {
        checkAndBoundGetApplication(applicationId);
    }, [applicationId]);;

    useEffect(()=>{
      applicationData && jobDetail && candidateData && addMetricForPageLoad(pageName);
    },[jobDetail, candidateData, applicationData]);

  useEffect(() => {
    return () => {
      //reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    }
  },[])

    return (
        <Col>
            <Row
                gridGap={5}
                alignItems="center"
                width="fit-content"
                color={CommonColors.Blue70}
                padding='S200'
                onClick={() => {
                    routeToAppPageWithPath(JOB_CONFIRMATION);
                }}
                style={{ cursor: 'pointer' }}
            >
                <IconArrowLeft size={IconSize.ExtraSmall}/>
                <Text fontSize="T100" fontWeight="medium">
                    {
                        t('BB-JobOpportunity-back-to-jobConfirmation-link','Back')
                    }
                </Text>
            </Row>
            <Row id="jobImageContainer" width="100%" padding='S300'>
                <img src={jobDetail?.image}/>
            </Row>
            <InnerHTML className="jobDescription" html={jobDetail?.jobDescription || ''}/>
        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(JobDescription);
