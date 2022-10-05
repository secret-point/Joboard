import React, { useEffect } from 'react';
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { IconArrowLeft, IconSize } from "@amzn/stencil-react-components/icons";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { H4, Text } from '@amzn/stencil-react-components/text';
import queryString from "query-string";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { ApplicationState } from '../../../reducers/application.reducer';
import { CandidateState } from "../../../reducers/candidate.reducer";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { boundGetJobDetail } from '../../../actions/JobActions/boundJobDetailActions';
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import { boundResetBannerMessage } from "../../../actions/UiActions/boundUi";
import {
    getPageNameFromPath,
    parseQueryParamsArrayToSingleItem,
    resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { JobState } from '../../../reducers/job.reducer';
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { uiState } from '../../../reducers/ui.reducer';
import { CommonColors } from "../../../utils/colors";
import { checkAndBoundGetApplication, getLocale, handleSubmitJobConfirmation, routeToAppPageWithPath } from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import DebouncedButton from '../../common/DebouncedButton';
import JobConfirmationCard from "../../common/jobOpportunity/JobConfirmationCard";
import { PAGE_ROUTES } from "../../pageRoutes";

interface MapStateToProps {
    application: ApplicationState;
    schedule: ScheduleState;
    job: JobState;
    ui: uiState;
    candidate: CandidateState;
}

export const JobConfirmation = ( props: MapStateToProps ) => {

    const { schedule, application, job, ui, candidate } = props;
    const { isLoading } = ui;
    const { search, pathname } = useLocation();
    const pageName = getPageNameFromPath(pathname);
    const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
    const { scheduleDetail } = schedule.results;
    const { scheduleId, applicationId, jobId } = queryParams;
    const jobDetail = job.results;
    const applicationDetail = application.results;
    const { JOB_OPPORTUNITIES } = PAGE_ROUTES;
    const { candidateData } = candidate.results;

    useEffect(() => {
        boundGetCandidateInfo();
    },[])

    useEffect(() => {
        jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() })
    }, [jobDetail, jobId]);

    useEffect(() => {
        checkAndBoundGetApplication(applicationId);
    }, [applicationId]);

    useEffect(() => {
        scheduleId && boundGetScheduleDetail({
            locale: getLocale(),
            scheduleId: scheduleId
        })
    }, [scheduleId]);

    useEffect(() => {
        jobDetail && scheduleDetail && applicationDetail && candidateData && addMetricForPageLoad(pageName);

    }, [jobDetail, scheduleDetail, applicationDetail, candidateData]);

    useEffect(() => {
        return () => {
            //reset this so as it can emit new pageload event after being unmounted.
            resetIsPageMetricsUpdated(pageName);
        }
    },[])

    const handleConfirmJob = () => {
        boundResetBannerMessage();
        if(applicationDetail && scheduleDetail && jobDetail){
            handleSubmitJobConfirmation(applicationDetail, jobDetail, scheduleDetail);
        }
    }

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
                <IconArrowLeft size={IconSize.ExtraSmall} aria-hidden={true} />
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
                <DebouncedButton
                    disabled = { !applicationDetail || !scheduleDetail || !jobDetail || isLoading}
                    onClick={handleConfirmJob}
                    variant={ButtonVariant.Primary}
                >
                    {t('BB-JobOpportunity-select-job-button', 'Select this job')}
                </DebouncedButton>
            </Col>
        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(JobConfirmation);
