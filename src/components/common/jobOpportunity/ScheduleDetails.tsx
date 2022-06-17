import React from "react";
import {
  IconCalendarFill, IconClockFill,
  IconDocument,
  IconGlobe,
  IconPaymentFill,
  IconSize
} from '@amzn/stencil-react-components/icons';
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import { renderScheduleFullAddress } from "../../../utils/helper";
import { Schedule } from "../../../utils/types/common";

interface ScheduleDetailsProps {
  scheduleDetail: Schedule,
}

const ScheduleDetails = (props: ScheduleDetailsProps) => {

  const { scheduleDetail } = props;

  const {
    hoursPerWeek,
    firstDayOnSite,
    currencyCode,
    scheduleText,
    totalPayRate,
  } = scheduleDetail;

  return (
    <Col gridGap={8} width="95%">
      <Row gridGap={5} alignItems="center">
        <IconClockFill size={IconSize.ExtraSmall} />
        <Text fontSize="T100">{scheduleText}</Text>
      </Row>
      <Row gridGap={5} alignItems="center">
        <IconCalendarFill size={IconSize.ExtraSmall} />
        <Text fontSize="T100">{`Possible Start Date: ${firstDayOnSite}`} <b>(or earlier!)</b></Text>
      </Row>
      <Row gridGap={5} alignItems="center">
        <IconPaymentFill size={IconSize.ExtraSmall} />
        <Text fontSize="T100">{`${currencyCode}${totalPayRate} /hr`}</Text>
      </Row>
      <Row gridGap={5} alignItems="center">
        <IconDocument size={IconSize.ExtraSmall} />
        <Text fontSize="T100">{`${hoursPerWeek}hrs/wk`}</Text>
      </Row>
      <Row gridGap={5} alignItems="center">
        <IconGlobe size={IconSize.ExtraSmall} />
        <Text fontSize="T100">{renderScheduleFullAddress(scheduleDetail)}</Text>
      </Row>
    </Col>
  )
}

export default ScheduleDetails;
