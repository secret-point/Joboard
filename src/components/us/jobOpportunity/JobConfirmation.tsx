import React, { useEffect } from 'react';
import { Col, Row } from "@amzn/stencil-react-components/layout";
import JobConfirmationCard from "../../common/jobOpportunity/JobConfirmationCard";
import { H4, Text } from '@amzn/stencil-react-components/text';
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { translate as t } from "../../../utils/translator";
import { connect } from "react-redux";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { useLocation } from "react-router";
import { checkIfIsCSRequest, getPageNameFromPath, parseQueryParamsArrayToSingleItem } from "../../../helpers/utils";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { CommonColors } from "../../../utils/colors";
import { IconArrowLeft, IconSize } from "@amzn/stencil-react-components/icons";
import { getLocale, routeToAppPageWithPath } from "../../../utils/helper";
import { JOB_CONFIRMATION, JOB_OPPORTUNITIES } from "../../pageRoutes";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import queryString from "query-string";
import { QueryParamItem } from "../../../utils/types/common";
import { QUERY_PARAMETER_NAME } from "../../../utils/enums/common";
import { boundGetApplication, boundUpdateApplicationDS } from '../../../actions/ApplicationActions/boundApplicationActions';
import { SelectedScheduleForUpdateApplication, UpdateApplicationRequestDS } from '../../../utils/apiTypes';
import { ApplicationState } from '../../../reducers/application.reducer';
import { UPDATE_APPLICATION_API_TYPE } from '../../../utils/constants/common';
import { JobState } from '../../../reducers/job.reducer';
import { boundGetJobDetail } from '../../../actions/JobActions/boundJobDetailActions';
import { onCompleteTaskHelper } from '../../../actions/WorkflowActions/workflowActions';
import { uiState } from '../../../reducers/ui.reducer';

interface MapStateToProps {
    application: ApplicationState
    schedule: ScheduleState
    job: JobState
    ui: uiState
}

const JobConfirmation = ( props: MapStateToProps ) => {

    const { schedule, application, job, ui } = props;
    const isLoading = ui.isLoading;
    const { search, pathname } = useLocation();
    const pageName = getPageNameFromPath(pathname);
    const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
    const scheduleDetail = schedule.scheduleDetail;
    const { scheduleId, applicationId, jobId } = queryParams;
    const jobDetail = job.results;
    const applicationDetail = application.results;

    useEffect(() => {
        jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() })
    }, [jobId]);

    useEffect(() => {
        applicationId && boundGetApplication({ applicationId: applicationId, locale: getLocale() });
    }, [applicationId]);

    useEffect(() => {
        scheduleId && boundGetScheduleDetail({
            locale: getLocale(),
            scheduleId: scheduleId
        })
    }, [scheduleId]);

    useEffect(() => {
        jobDetail && scheduleDetail && applicationDetail && addMetricForPageLoad(pageName);
    }, [jobDetail, scheduleDetail, applicationDetail]);

    return (
        <Col gridGap={10}>
            <Row
                gridGap={5}
                alignItems="center"
                width="fit-content"
                color={CommonColors.Blue70}
                padding='S200'
                onClick={() => {
                    routeToAppPageWithPath(JOB_OPPORTUNITIES);
                }}
                style={{ cursor: 'pointer' }}
            >
                <IconArrowLeft size={IconSize.ExtraSmall}/>
                <Text fontSize="T100" fontWeight="medium">
                    {
                        t('BB-JobOpportunity-back-to-indexPage-link', 'View Jobs')
                    }
                </Text>
            </Row>
            <Col className="jobConfirmationHeader" gridGap={8} padding={{ top: 'S300' }}>
                <H4>{scheduleDetail?.externalJobTitle}</H4>
                <Text fontSize='T200'>{scheduleDetail?.briefJobDescription}</Text>
            </Col>
            {scheduleDetail && <JobConfirmationCard schedule={scheduleDetail}/>}
            <Col className="selectJobButtonContainer" padding='S300'>
                <Button
                    disabled = { !applicationDetail || !scheduleDetail || !jobDetail || isLoading}
                    onClick={() => {
                        if(applicationDetail && scheduleDetail && jobDetail){
                            const queryParamItem: QueryParamItem = {
                                paramName: QUERY_PARAMETER_NAME.SCHEDULE_ID,
                                paramValue: scheduleDetail?.scheduleId
                            }
                            const selectedSchedule: SelectedScheduleForUpdateApplication = {
                                jobId: jobId,
                                scheduleId: scheduleId,
                                scheduleDetails: JSON.stringify(scheduleDetail),
                            }
                            const dspEnabled = applicationDetail?.dspEnabled;
                            const updateApplicationRequest: UpdateApplicationRequestDS = {
                                applicationId,
                                payload: selectedSchedule,
                                type: UPDATE_APPLICATION_API_TYPE.JOB_CONFIRM,
                                isCsRequest: checkIfIsCSRequest(),
                                dspEnabled
                            }
                            boundUpdateApplicationDS(updateApplicationRequest, ()=>{
                                // Stay at the current page but add new urlParams, wait work flow to do the routing
                                routeToAppPageWithPath(JOB_CONFIRMATION, [queryParamItem]);
                                onCompleteTaskHelper(applicationDetail);
                            });
                        }
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
