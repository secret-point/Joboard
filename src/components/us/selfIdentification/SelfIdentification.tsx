import React from 'react';
import { Col } from "@amzn/stencil-react-components/layout";
import InfoStepCard from "../../common/InfoStepCard";
import { translate as t } from "../../../utils/translator";
import { BGC_STEPS, SELF_IDENTIFICATION_STEPS } from "../../../utils/enums/common";
import NonFcraDisclosure from "../../common/bgc/NonFcraDisclosure";
import AdditionalBGCInfo from "../../common/bgc/AdditionalBGCInfo";
import EqualOpportunityForm from "../../common/self-Identification/Equal-opportunity-form";
import { JobState } from "../../../reducers/job.reducer";
import { ApplicationState } from "../../../reducers/application.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { BGCState } from "../../../reducers/bgc.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { connect } from "react-redux";
import { SelfIdentificationState } from "../../../reducers/selfIdentification.reducer";
import VeteranStatusForm from "../../common/self-Identification/veteran-status-form";
import DisabilityForm from "../../common/self-Identification/disability-form";

interface MapStateToProps {
  job: JobState,
  application: ApplicationState,
  schedule: ScheduleState,
  bgc: BGCState,
  candidate: CandidateState,
  selfIdentification: SelfIdentificationState
}

interface SelfIdentificationProps {

}

type SelfIdentificationMergeProps = MapStateToProps & SelfIdentificationProps;

const SelfIdentification = (props: SelfIdentificationMergeProps) => {

  const { selfIdentification } = props;
  const { stepConfig } = selfIdentification;

  return (
    <Col gridGap={15}>
      <InfoStepCard
        title='Voluntary Equal Opportunity Self-Identification Form'
        expandedContent={<EqualOpportunityForm/>}
        stepName={SELF_IDENTIFICATION_STEPS.EQUAL_OPPORTUNITY}
        infoCardStepStatus={stepConfig[SELF_IDENTIFICATION_STEPS.EQUAL_OPPORTUNITY]}
        stepIndex={1}
      />

      <InfoStepCard
        title='Voluntary Self-Identification of Veteran Status'
        expandedContent={<VeteranStatusForm/>}
        stepName={SELF_IDENTIFICATION_STEPS.VETERAN_FORM}
        infoCardStepStatus={stepConfig[SELF_IDENTIFICATION_STEPS.VETERAN_FORM]}
        stepIndex={2}
      />

      <InfoStepCard
        title='Voluntary Self-Identification of Disability'
        expandedContent={<DisabilityForm/>}
        stepName={SELF_IDENTIFICATION_STEPS.DISABILITY_FORM}
        infoCardStepStatus={stepConfig[SELF_IDENTIFICATION_STEPS.DISABILITY_FORM]}
        stepIndex={3}
      />
    </Col>
  )
}

const mapStateToProps = ( state: MapStateToProps ) => {
  return state;
};

export default connect(mapStateToProps)(SelfIdentification);
