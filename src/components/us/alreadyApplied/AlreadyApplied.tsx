import React, { useEffect } from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import queryString from "query-string";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { parseQueryParamsArrayToSingleItem } from "../../../helpers/utils";
import { JobState } from "../../../reducers/job.reducer";
import { getLocale } from "../../../utils/helper";
import AlreadyAppliedCanNotReset from "./AlreadyAppliedCanNotReset";
import AlreadyAppliedButCanBeReset from "./AlreadyAppliedButCanBeReset";
import { CREATE_APPLICATION_ERROR_CODE } from "../../../utils/enums/common";
import { ApplicationState } from "../../../reducers/application.reducer";

interface MapStateToProps {
  job: JobState;
  application: ApplicationState;
}

export const AlreadyApplied = (props: MapStateToProps) => {
  const { application, job } = props;
  const { search } = useLocation();
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { jobId } = queryParams;
  const jobDetail = job.results;
  const { errorCode, errorMetadata } = application;

  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() });
  }, [jobDetail, jobId]);

  useEffect(() => {
  }, [errorCode, errorMetadata]);

  const renderAlreadyApplied = () => {
    switch (errorCode) {
      case CREATE_APPLICATION_ERROR_CODE.APPLICATION_ALREADY_EXIST_CAN_BE_RESET:
        return <AlreadyAppliedButCanBeReset />;
      default:
        return <AlreadyAppliedCanNotReset />;
    }
  };

  return (
    <Col>
      {
        renderAlreadyApplied()
      }
    </Col>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(AlreadyApplied);
