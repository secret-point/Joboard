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
import { Locale } from "../../../utils/types/common";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";

interface MapStateToProps {
    job: JobState,
    application: ApplicationState,
    schedule: ScheduleState
}

const ContingentOffer = ( props: MapStateToProps ) => {
    const { job, application, schedule } = props;
    const { search, pathname } = useLocation();
    const pageName = getPageNameFromPath(pathname);
    const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
    const { applicationId } = queryParams;
    const jobDetail = job.results;
    const applicationData = application.results;
    const scheduleDetail = schedule.scheduleDetail;
    const jobId = applicationData?.jobScheduleSelected.jobId;
    const scheduleId = applicationData?.jobScheduleSelected.scheduleId;

    useEffect(()=>{
        applicationId && boundGetApplication({applicationId:applicationId, locale:Locale.enUS});
    },[]);
    
    useEffect(()=>{
        if(jobId && scheduleId){
            boundGetJobDetail({jobId:jobId, locale:Locale.enUS});
            boundGetScheduleDetail({ locale: getLocale(),scheduleId: scheduleId});
        }
    },[jobId, scheduleId]);

    useEffect(()=>{
        jobDetail && applicationData && scheduleDetail && addMetricForPageLoad(pageName);
    },[jobDetail, scheduleDetail, applicationData]);

    return (
        <div>Contingent Offer page</div>
    );
};

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(ContingentOffer);
