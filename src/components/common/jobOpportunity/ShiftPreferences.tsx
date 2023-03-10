import React from "react";

import { getFeatureFlagValue } from "../../../utils/helper";
import { FEATURE_FLAG } from "../../../utils/enums/common";
import ApplicationShiftPreferences from "./ApplicationShiftPreferences";
import CandidateShiftPreferences from "./CandidateShiftPreferences";
import { JobState } from "../../../reducers/job.reducer";
import { ApplicationState } from "../../../reducers/application.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { connect } from "react-redux";

interface MapStateToProps {
  job: JobState;
  application: ApplicationState;
  candidate: CandidateState;
}

export const ShiftPreferences = () => {
  const enableCandidateShiftPreferences = getFeatureFlagValue(FEATURE_FLAG.ENABLE_CANDIDATE_SHIFT_PREFERENCES);
  return enableCandidateShiftPreferences ? <CandidateShiftPreferences /> : <ApplicationShiftPreferences />;
};

export const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(ShiftPreferences);
