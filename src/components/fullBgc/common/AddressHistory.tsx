import React from "react";
import { ButtonVariant } from "@amzn/stencil-react-components/button";
import { Col } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import { connect } from "react-redux";
import { ApplicationState } from "../../../reducers/application.reducer";
import { FullBgcState } from "../../../reducers/fullBgc.reducer";
import { JobState } from "../../../reducers/job.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { FULL_BGC_STEPS } from "../../../utils/enums/common";
import { goToNextFullBgcStep } from "../../../utils/helper";
import { FullBgcStepConfig } from "../../../utils/types/common";
import DebouncedButton from "../../common/DebouncedButton";

interface MapStateToProps {
  job: JobState;
  application: ApplicationState;
  schedule: ScheduleState;
  fullBgc: FullBgcState;
}

interface AddressHistoryProps {
}

type AddressHistoryMergedProps = MapStateToProps & AddressHistoryProps;

export const AddressHistory = ( props: AddressHistoryMergedProps ) => {
  const { fullBgc } = props;
  const stepConfig = fullBgc.stepConfig as FullBgcStepConfig;

  const handleClickNext = () => {
    goToNextFullBgcStep(stepConfig, FULL_BGC_STEPS.ADDRESS_HISTORY, FULL_BGC_STEPS.BIRTH_HISTORY);
  };

  return (
    <Col className="address-history-container" gridGap={15}>
      <Text fontSize="T200">
        Address History Component
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

export default connect(mapStateToProps)(AddressHistory);
