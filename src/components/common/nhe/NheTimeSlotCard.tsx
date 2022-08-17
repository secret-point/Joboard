import { DetailedRadio, InputFooter } from '@amzn/stencil-react-components/form';
import { Col } from '@amzn/stencil-react-components/layout';
import React from 'react';
import { MINIMUM_AVAILABLE_TIME_SLOTS } from '../../../utils/constants/common';
import { formatNheTimeSlotTitle, renderNheTimeSlotFullAddress } from "../../../utils/helper";
import { NHETimeSlot } from "../../../utils/types/common";
import { translate as t } from "../../../utils/translator";

interface NheCardProps {
  nheTimeSlot: NHETimeSlot,
  handleChange: Function
}

export const NheTimeSlotCard = (props: NheCardProps) => {

  const { nheTimeSlot, handleChange } = props;

  const availableTimeSlots = nheTimeSlot.availableResources - nheTimeSlot.appointmentsBooked;

  return (
    <Col>
      <DetailedRadio
        name="nheTimeSlotCard"
        titleText={formatNheTimeSlotTitle(nheTimeSlot.dateWithoutFormat)}
        details={renderNheTimeSlotFullAddress(nheTimeSlot)}
        onChange={() => handleChange(nheTimeSlot)}
      />
      {(availableTimeSlots <= MINIMUM_AVAILABLE_TIME_SLOTS) && <InputFooter
        warning={true}
      >
        {t("BB-nhe-few-spots-remaining-text", "Very few spots remaining")}
      </InputFooter>}
    </Col>
  )
}

export default NheTimeSlotCard;
