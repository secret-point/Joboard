import React, { useEffect } from "react";
import queryString from "query-string";
import { Col } from "@amzn/stencil-react-components/layout";
import { useLocation } from "react-router";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { ApplicationState } from "../../../reducers/application.reducer";
import { boundGetApplication } from "../../../actions/ApplicationActions/boundApplicationActions";
import { boundUpdateWotcStatus } from "../../../actions/WotcActions/boundWotcAction";
import { checkAndBoundGetApplication, getLocale } from "../../../utils/helper";
import { connect } from "react-redux";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { Application, UpdateWotcStatusRequest } from "../../../utils/types/common";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { onCompleteTaskHelper } from "../../../actions/WorkflowActions/workflowActions";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { JobState } from "../../../reducers/job.reducer";

interface MapStateToProps {
  candidate: CandidateState;
  application: ApplicationState;
  schedule: ScheduleState;
  job: JobState,
};

const WOTC_COMPLETE_STATUS = "Completed";

export const WotcComplete = (props: MapStateToProps) => {
  const { candidate, application, job, schedule } = props;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId, jobId, scheduleId } = queryParams;
  const applicationData = application.results;
  const scheduleDetail = schedule.results.scheduleDetail;
  const { candidateData } = candidate.results;
  const jobDetail = job.results;

  useEffect(() => {
    boundGetCandidateInfo();
  }, [])

  useEffect(() => {
    checkAndBoundGetApplication(applicationId);
  }, [applicationId]);

  useEffect(() => {
    scheduleId && scheduleId!== scheduleDetail?.scheduleId && boundGetScheduleDetail({
      locale: getLocale(),
      scheduleId: scheduleId
    })
  }, [scheduleId]);

  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() })
  }, [jobDetail, jobId]);

  useEffect(() => {
    jobDetail && applicationData && candidateData && scheduleDetail && addMetricForPageLoad(pageName);

  }, [jobDetail, applicationData, candidateData, scheduleDetail]);

  useEffect(() => {
    return () => {
      //reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    }
  },[]);

  useEffect(() => {
    if (candidateData) {
      const request: UpdateWotcStatusRequest = {
        applicationId,
        candidateId: candidateData?.candidateId,
        status: WOTC_COMPLETE_STATUS
      };

      // TODO: remove any
      boundUpdateWotcStatus(request, (data: any) => {
        // get the latest application data and update the application state, then complete the step
        boundGetApplication({ applicationId: applicationId, locale: getLocale() }, (app: Application) => {
          onCompleteTaskHelper(app);
        });
      });
    }

  }, [applicationId, candidateData]);


  return (
    <Col minHeight="40vh"></Col>
  )
}

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(WotcComplete);
