import React, { useEffect } from 'react';
import { Col } from "@amzn/stencil-react-components/layout";
import JobConfirmationCard from "../../common/jobOpportunity/JobConfirmationCard";
import { H4, Text } from '@amzn/stencil-react-components/text';
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { translate as t } from "../../../utils/translator";
import { connect } from "react-redux";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { useLocation } from "react-router";
import { getPageNameFromPath, parseQueryParamsArrayToSingleItem } from "../../../helpers/utils";
import queryString from "query-string";
import { GetScheduleListByJobIdRequest } from "../../../utils/apiTypes";
import { getLocale } from "../../../utils/helper";
import { boundGetScheduleListByJobId } from "../../../actions/ScheduleActions/boundScheduleActions";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobe-actions";

interface MapStateToProps {
    schedule: ScheduleState
}

const JobConfirmation = ( props: MapStateToProps ) => {

    const { schedule } = props;
    const { search, pathname } = useLocation();
    const pageName = getPageNameFromPath(pathname);
    const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
    const applicationId = queryParams.applicationId;
    const jobId = queryParams.jobId;
    const scheduleDetail = schedule?.scheduleDetail;

    useEffect(() => {
        const request: GetScheduleListByJobIdRequest = {
            jobId,
            applicationId,
            locale: getLocale()
        }
        boundGetScheduleListByJobId(request);
    }, []);

    useEffect(() => {
        scheduleDetail && addMetricForPageLoad(pageName);
    }, [scheduleDetail]);

    return (
        <Col gridGap={10}>
            <Col className="jobConfirmationHeader" gridGap={8} padding={{ top: 'S300' }}>
                <H4>{scheduleDetail?.externalJobTitle}</H4>
                <Text fontSize='T200'>{scheduleDetail?.briefJobDescription}</Text>
            </Col>
            {scheduleDetail && <JobConfirmationCard schedule={scheduleDetail}/>}
            <Col className="selectJobButtonContainer" padding='S300'>
                <Button
                    onClick={() => {
                    }}
                    variant={ButtonVariant.Primary}
                >
                    {t('BB-JobOpportunity-select-job-button', 'Select this job')}
                </Button>
            </Col>
        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(JobConfirmation);
