import React, { useEffect, useState } from "react";

import { getFeatureFlagValue, getLocale } from "../../../utils/helper";
import { FEATURE_FLAG } from "../../../utils/enums/common";
import ThankYouRedirectToAsh from "./ThankYouRedirectToAsh";
import ThankYouSummary from "./ThankYouSummary";
import { JobState } from "../../../reducers/job.reducer";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { parseQueryParamsArrayToSingleItem } from "../../../helpers/utils";
import queryString from "query-string";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";

interface MapStateToProps {
  job: JobState;
}

type ThankYouMergedProps = MapStateToProps;

export const ThankYou = (props: ThankYouMergedProps) => {
  const { job } = props;
  const { search } = useLocation();
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { jobId } = queryParams;
  const jobDetail = job.results;

  const [enableThankYouRedirectToAsh, setEnableThankYouRedirectToAsh] = useState(false);

  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() });
  }, [jobDetail, jobId]);

  useEffect(() => {
    setEnableThankYouRedirectToAsh(getFeatureFlagValue(FEATURE_FLAG.ENABLE_THANK_YOU_REDIRECT_TO_ASH) && jobDetail?.dspEnabled === true);
  }, [jobDetail]);

  return enableThankYouRedirectToAsh ? <ThankYouRedirectToAsh /> : <ThankYouSummary />;
};

export const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(ThankYou);
