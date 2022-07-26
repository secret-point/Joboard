import React, { useEffect } from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import { useLocation } from "react-router";
import { getPageNameFromPath, parseQueryParamsArrayToSingleItem } from "../../../helpers/utils";
import queryString from "query-string";
import { JobState } from "../../../reducers/job.reducer";
import { ApplicationState } from "../../../reducers/application.reducer";
import { connect } from "react-redux";
import { checkAndBoundGetApplication, getLocale, routeToAppPageWithPath } from "../../../utils/helper";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { QueryParamItem } from "../../../utils/types/common";
import { QUERY_PARAMETER_NAME, WORKFLOW_STEP_NAME } from "../../../utils/enums/common";
import { PAGE_ROUTES } from "../../pageRoutes";
import { onCompleteTaskHelper } from "../../../actions/WorkflowActions/workflowActions";

interface MapStateToProps {
  job: JobState,
  application: ApplicationState,
}

const AssessmentFinished = (props: MapStateToProps) => {
  const { job, application } = props;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId } = queryParams;
  const jobDetail = job.results;
  const applicationData = application.results;
  const jobId = applicationData?.jobScheduleSelected.jobId;
  const scheduleId = applicationData?.jobScheduleSelected.scheduleId;

  useEffect(() => {
    checkAndBoundGetApplication(applicationId);
  }, [applicationId]);

  useEffect(() => {
    jobDetail && applicationData && addMetricForPageLoad(pageName);
  }, [jobDetail, applicationData, pageName]);

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
      routeToAppPageWithPath(PAGE_ROUTES.ASSESSMENT_FINISHED, queryParamItems);
      //call workflow service to update step
      applicationData && onCompleteTaskHelper(applicationData, false, undefined, WORKFLOW_STEP_NAME.ASSESSMENT_CONSENT);
    });
  }, [applicationData, jobDetail, jobId, scheduleId]);

  return (
    <Col></Col>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(AssessmentFinished);
