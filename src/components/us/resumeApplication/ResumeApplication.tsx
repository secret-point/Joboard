import React, { useEffect, useState } from "react"
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { boundGetApplication } from "../../../actions/ApplicationActions/boundApplicationActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import { getPageNameFromPath, parseQueryParamsArrayToSingleItem } from "../../../helpers/utils";
import { ApplicationState } from "../../../reducers/application.reducer";
import { JobState } from "../../../reducers/job.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { getLocale } from "../../../utils/helper";
import queryString from "query-string";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";

interface MapStateToProps {
    job: JobState,
    application: ApplicationState,
    schedule: ScheduleState
}

const ResumeApplication = ( props: MapStateToProps ) => {
    const { job, application, schedule } = props;
    const { search, pathname } = useLocation();
    const pageName = getPageNameFromPath(pathname);
    const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
    const { applicationId } = queryParams;
    const jobDetail = job.results;
    const applicationData = application.results;
    const jobId = applicationData?.jobScheduleSelected.jobId;

    useEffect(()=>{
        applicationId && boundGetApplication({applicationId:applicationId, locale: getLocale()});
    },[applicationId]);
    
    useEffect(()=>{
        jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({jobId:jobId, locale: getLocale()});
    },[jobId]);

    useEffect(()=>{
        jobDetail && applicationData && addMetricForPageLoad(pageName);
    },[jobDetail, applicationData]);

    return (
        <div>ResumeApplication page, this page will be an empty page with loading icon for startWorkflow and wait the stepName for redirection</div>
    );
};

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(ResumeApplication);
