import { DetailedRadio } from '@amzn/stencil-react-components/form';
import { Col } from '@amzn/stencil-react-components/layout';
import React from 'react';
import { NHETimeSlot } from "../../../utils/types/common";
import { renderNheTimeSlotFullAddress } from "../../../utils/helper";

interface NheCardProps {
  nheTimeSlot: NHETimeSlot
}

const NheTimeSlotCard = (props: NheCardProps) => {

  const { nheTimeSlot } = props;

    return (
        <Col>
            <DetailedRadio
                titleText={nheTimeSlot.timeRange}
                details={renderNheTimeSlotFullAddress(nheTimeSlot)}
            />
        </Col>
    )
}

export default NheTimeSlotCard;
