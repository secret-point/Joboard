import React from "react";
import { ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import { connect } from "react-redux";
import { ApplicationState } from "../../../../reducers/application.reducer";
import { FullBgcState } from "../../../../reducers/fullBgc.reducer";
import { JobState } from "../../../../reducers/job.reducer";
import { ScheduleState } from "../../../../reducers/schedule.reducer";
import { FullBgcStepConfig } from "../../../../utils/types/common";
import DebouncedButton from "../../../common/DebouncedButton";
import { goToNextFullBgcStep } from "../../../../utils/helper";
import { FULL_BGC_STEPS } from "../../../../utils/enums/common";

interface MapStateToProps {
  job: JobState;
  application: ApplicationState;
  schedule: ScheduleState;
  fullBgc: FullBgcState;
}

type ProofOfId1MergedProps = MapStateToProps;

export const ProofOfId1 = ( props: ProofOfId1MergedProps ) => {
  const { fullBgc } = props;
  const stepConfig = fullBgc.stepConfig as FullBgcStepConfig;

  const handleClickNext = () => {
    goToNextFullBgcStep(stepConfig, FULL_BGC_STEPS.PROOF_OF_ID1, FULL_BGC_STEPS.PROOF_OF_ID2);
  };

  return (
    <Col className="documentation-container" gridGap={15}>
      <Text fontSize="T200">
        ProofOfId1 Component
      </Text>
      ...
      <DebouncedButton variant={ButtonVariant.Secondary} onClick={handleClickNext}>
        Next
      </DebouncedButton>
    </Col>
  );
};

const mapStateToProps = ( state: MapStateToProps ) => {
  return state;
};

export default connect(mapStateToProps)(ProofOfId1);
