import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { boundGetApplication } from "../../../actions/ApplicationActions/boundApplicationActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { getPageNameFromPath, parseQueryParamsArrayToSingleItem } from "../../../helpers/utils";
import { ApplicationState } from "../../../reducers/application.reducer";
import { JobState } from "../../../reducers/job.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { getLocale, routeToAppPageWithPath } from "../../../utils/helper";
import queryString from "query-string";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { QueryParamItem } from "../../../utils/types/common";
import { QUERY_PARAMETER_NAME } from "../../../utils/enums/common";
import { PAGE_ROUTES } from "../../pageRoutes";
import { onCompleteTaskHelper } from "../../../actions/WorkflowActions/workflowActions";
import { Col } from "@amzn/stencil-react-components/layout";

interface MapStateToProps {
    job: JobState,
    application: ApplicationState,
    schedule: ScheduleState
}

const ResumeApplication = (props: MapStateToProps) => {
    const { job, application, schedule } = props;
    const { search, pathname } = useLocation();
    const pageName = getPageNameFromPath(pathname);
    const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
    const { applicationId } = queryParams;
    const jobDetail = job.results;
    const applicationData = application.results;
    const jobId = applicationData?.jobScheduleSelected.jobId;
    const scheduleId = applicationData?.jobScheduleSelected.scheduleId;

    useEffect(() => {
        applicationId && boundGetApplication({ applicationId: applicationId, locale: getLocale() });
    }, [applicationId]);

    useEffect(() => {
        jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() }, () => {
            const queryParamItems: QueryParamItem[] = [
                {
                    paramName: QUERY_PARAMETER_NAME.JOB_ID,
                    paramValue: jobId
                }
            ];
            //Add schedule Id if exist in application
            if (scheduleId) {
                queryParamItems.push({
                    paramValue: scheduleId,
                    paramName: QUERY_PARAMETER_NAME.SCHEDULE_ID
                });
            }
            //force route to the same page to append query params ( jobId and schedule Id)
            routeToAppPageWithPath(PAGE_ROUTES.RESUME_APPLICATION, queryParamItems);
            //call workflow service to update step
            applicationData && onCompleteTaskHelper(applicationData);
        });
    }, [jobId]);

    useEffect(() => {
        jobDetail && applicationData && addMetricForPageLoad(pageName);
    }, [jobDetail, applicationData]);

    return (
      <Col minHeight="40vh"></Col>
    );
};

const mapStateToProps = (state: MapStateToProps) => {
    return state;
};

export default connect(mapStateToProps)(ResumeApplication);
