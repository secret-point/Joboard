import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { ApplicationState } from "../../../reducers/application.reducer";
import { JobState } from "../../../reducers/job.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { checkAndBoundGetApplication, getLocale, routeToAppPageWithPath } from "../../../utils/helper";
import queryString from "query-string";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { QueryParamItem } from "../../../utils/types/common";
import { QUERY_PARAMETER_NAME } from "../../../utils/enums/common";
import { PAGE_ROUTES } from "../../pageRoutes";
import { loadWorkflowDS } from "../../../actions/WorkflowActions/workflowActions";
import { Col } from "@amzn/stencil-react-components/layout";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { AppConfigState } from "../../../reducers/appConfig.reducer";

interface MapStateToProps {
  job: JobState;
  application: ApplicationState;
  schedule: ScheduleState;
  candidate: CandidateState;
  appConfig: AppConfigState;
}

export const ResumeApplication = (props: MapStateToProps) => {
  const { job, application, candidate, appConfig } = props;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId } = queryParams;
  const jobDetail = job.results;
  const applicationData = application.results;
  const jobId = applicationData?.jobScheduleSelected.jobId;
  const scheduleId = applicationData?.jobScheduleSelected.scheduleId;
  const { candidateData } = candidate.results;
  const envConfig = appConfig.results?.envConfig;

  useEffect(() => {
    boundGetCandidateInfo();
  }, []);

  useEffect(() => {
    checkAndBoundGetApplication(applicationId);
  }, [applicationId]);

  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() }, () => {
      const queryParamItems: QueryParamItem[] = [
        {
          paramName: QUERY_PARAMETER_NAME.JOB_ID,
          paramValue: jobId
        }
      ];
      // Add schedule Id if exist in application
      if (scheduleId) {
        queryParamItems.push({
          paramValue: scheduleId,
          paramName: QUERY_PARAMETER_NAME.SCHEDULE_ID
        });
      }
      // force route to the same page to append query params ( jobId and schedule Id)
      routeToAppPageWithPath(PAGE_ROUTES.RESUME_APPLICATION, queryParamItems);
      // resume workflow, but do not complet any task, since there is no task to complete on resume-application page
      envConfig && loadWorkflowDS(jobId, scheduleId || "", applicationId, candidateData?.candidateId || "", envConfig);
    });
  }, [applicationData, applicationId, candidateData, envConfig, jobDetail, jobId, scheduleId]);

  useEffect(() => {
    jobDetail && applicationData && candidateData && addMetricForPageLoad(pageName);

  }, [jobDetail, applicationData, candidateData, pageName]);

  useEffect(() => {
    return () => {
      // reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    };
  }, [pageName]);

  return (
    <Col minHeight="40vh" />
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(ResumeApplication);
