import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import StepHeader from "../../common/StepHeader";
import { Image } from "@amzn/hvh-candidate-application-ui-components";
import { IconArrowLeft, IconHourGlass, IconSize, IconSort } from '@amzn/stencil-react-components/icons';
import { Text } from "@amzn/stencil-react-components/text";
import { getPageNameFromPath, parseQueryParamsArrayToSingleItem } from "../../../helpers/utils";
import { useLocation } from "react-router";
import queryString from "query-string";
import { Locale } from "../../../utils/types/common";
import { boundGetApplication } from "../../../actions/ApplicationActions/boundApplicationActions";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobe-actions";
import { JobState } from "../../../reducers/job.reducer";
import { ApplicationState } from "../../../reducers/application.reducer";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import ScheduleCard from "../../common/jobOpportunity/ScheduleCard";
import { translate as t } from "../../../utils/translator";
import { GetScheduleListByJobIdRequest } from "../../../utils/apiTypes";
import { boundGetScheduleListByJobId } from "../../../actions/ScheduleActions/boundScheduleActions";
import { getLocale } from "../../../utils/helper";
import { ScheduleState } from "../../../reducers/schedule.reducer";

interface MapStateToProps {
    job: JobState,
    application: ApplicationState,
    schedule: ScheduleState
}

interface JobOpportunityProps {

}

type JobOpportunityMergedProps = MapStateToProps & JobOpportunityProps;

const JobOpportunity = (props: JobOpportunityMergedProps) => {
    const { job, application, schedule } = props;
    const { search, pathname } = useLocation();
    const pageName = getPageNameFromPath(pathname);
    const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
    const applicationId = queryParams.applicationId;
    const jobId = queryParams.jobId;
    const jobDetail = job.results;
    const applicationData = application.results;
    const scheduleData = schedule.scheduleList;

    useEffect(()=>{
        jobId && boundGetJobDetail({jobId:jobId, locale:Locale.enUS})
        applicationId && boundGetApplication({applicationId:applicationId, locale:Locale.enUS});
        const request: GetScheduleListByJobIdRequest = {
            jobId,
            applicationId,
            locale: getLocale()
        }
        boundGetScheduleListByJobId(request);
    },[]);

    useEffect(()=>{
        jobDetail && applicationData && addMetricForPageLoad(pageName);
    },[jobDetail, applicationData]);


    return (
        <Col id='jobOpportunityContainer'>
            <StepHeader jobTitle="Amazon Associate" applicationStep="" stepAction="1. Select job"/>
            <Col id="jobOpportunityHeaderImageContainer">
                <Image
                    id="jobOpportunityHeaderImage"
                    src="https://m.media-amazon.com/images/G/01/HVH-CandidateApplication/jobs/20170525PrimeNowUWA2_15-min.jpg"
                    aria-hidden="true"
                />
                <Col id="jobOpportunityHeaderImageOverlay">
                    {/*May need to add overlay content in future*/}
                </Col>
            </Col>

            <Col>
                <Row padding={{top: 'S400'}}>
                    <Row className="backToJobDashboardLink" gridGap={5}>
                        <IconArrowLeft size={IconSize.ExtraSmall} fontSize='T100'/>
                        <Text fontWeight="medium" fontSize='T200'>
                            {t('BB-JobOpportunity-Go-To-Dashboard-Link','Go Back to Jobs Dashboard')}
                        </Text>
                    </Row>
                </Row>

                <Col className="scheduleListContainer" padding={{ top: 'S500' }}>
                    <Row className="scheduleListActionContainer">
                        <Row className="scheduleListActionItem" gridGap={5}>
                            <IconHourGlass size={IconSize.ExtraSmall} fontSize='T100'/>
                            <Text fontWeight="medium" fontSize='T100'>
                                {t('BB-JobOpportunity-filter-button','Filter')}
                            </Text>
                        </Row>
                        <Row className="scheduleListActionItem" gridGap={5}>
                            <IconSort size={IconSize.ExtraSmall} fontSize='0.8em'/>
                            <Text fontWeight="medium" fontSize='0.8em'>
                                {t('BB-JobOpportunity-sort-button','Sort')}
                            </Text>
                        </Row>
                    </Row>

                    {
                        scheduleData.map(scheduleItem => <ScheduleCard scheduleDetail={scheduleItem}/>)
                    }
                </Col>
            </Col>
        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(JobOpportunity);
