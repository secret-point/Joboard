import React, { useEffect } from 'react';
import { Col, Row } from "@amzn/stencil-react-components/layout";
import InnerHTML from 'dangerously-set-html-content';
import { connect } from "react-redux";
import { JobState } from "../../../reducers/job.reducer";
import { CommonColors } from "../../../utils/colors";
import { IconArrowLeft, IconSize } from "@amzn/stencil-react-components/icons";
import { Text } from "@amzn/stencil-react-components/text";
import { translate as t } from "../../../utils/translator";
import { routeToAppPageWithPath } from "../../../utils/helper";
import { JOB_CONFIRMATION } from "../../pageRoutes";
import { getPageNameFromPath, parseQueryParamsArrayToSingleItem } from "../../../helpers/utils";
import queryString from "query-string";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { Locale } from "../../../utils/types/common";
import { useLocation } from "react-router";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";

interface MapStateToProps {
    job: JobState,
}

const JobDescription = (props: MapStateToProps) => {

    const { job } = props;
    const { search, pathname } = useLocation();
    const pageName = getPageNameFromPath(pathname);
    const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
    const { jobId } = queryParams;
    const jobDetail = job.results;

    useEffect(() => {
        jobId && boundGetJobDetail({jobId:jobId, locale:Locale.enUS})
    },[])

    useEffect(()=>{
        jobDetail && addMetricForPageLoad(pageName);
    },[jobDetail]);

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
