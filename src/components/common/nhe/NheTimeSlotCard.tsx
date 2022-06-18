import { DetailedRadio } from '@amzn/stencil-react-components/form';
import { Col } from '@amzn/stencil-react-components/layout';
import React from 'react';
import { NHETimeSlot } from "../../../utils/types/common";
import { renderNheTimeSlotFullAddress } from "../../../utils/helper";

interface NheCardProps {
  nheTimeSlot: NHETimeSlot,
  handleChange: Function
}

const NheTimeSlotCard = (props: NheCardProps) => {

  const { nheTimeSlot, handleChange } = props;

    return (
        <Col>
            <DetailedRadio
              name="nheTimeSlotCard"
              titleText={nheTimeSlot.timeRange}
              details={renderNheTimeSlotFullAddress(nheTimeSlot)}
              onChange={() => handleChange(nheTimeSlot)}
            />
        </Col>
    )
}

export default NheTimeSlotCard;
