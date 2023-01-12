import React, { useState } from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Label, Text } from "@amzn/stencil-react-components/text";
import { Select } from "@amzn/stencil-react-components/form";
import { populateTimeRangeHourData } from "../../../utils/helper";
import { TimeRangeHoursData } from "../../../utils/types/common";
import { translate as t } from "../../../utils/translator";

interface TimeRangeProps {
  disabled: boolean;
  dayIndex: number;
  onChange: Function;
  id?: string;
  startTimeHours: number;
  endTimeHours: number;
  displayMilitaryTime?: boolean;
}

export const TimeRange = ( props: TimeRangeProps ) => {

  const { disabled, id, dayIndex, endTimeHours, startTimeHours, onChange, displayMilitaryTime } = props;
  const [startTime, setStartTime] = useState<string>(startTimeHours.toString());
  /* eslint-disable  @typescript-eslint/no-unused-vars */
  const [endTime, setEndTime] = useState<string>(endTimeHours.toString());

  const startTimeOptions = populateTimeRangeHourData(startTime, displayMilitaryTime);
  const endTimeOptions = populateTimeRangeHourData(startTime, displayMilitaryTime, true);
  const defaultStartTime = startTimeHours >= 0 ? startTimeOptions[startTimeHours] : startTimeOptions[startTimeOptions.length - 1];
  const defaultEndTime = endTimeHours >= 0 ? endTimeOptions[endTimeHours] : endTimeOptions[endTimeOptions.length - 1];

  const onStartChange = ( option: TimeRangeHoursData ) => {
    setStartTime(option.hours.toString());
    onChange(
      {
        interval: option.hours.toString(),
        isStartTime: true,
      },
      dayIndex
    );
  };

  const onEndChange = ( option: TimeRangeHoursData ) => {
    setEndTime(option.hours.toString());

    onChange(
      {
        interval: option.hours.toString(),
        isStartTime: false,
      },
      dayIndex
    );
  };

  return (
    <Row
      gridGap={10}
      justifyContent="space-between"
      alignItems="center"
    >
      <Col gridGap={10} width="100%" padding={{ right: "S300" }}>
        <Label htmlFor={`${id}-start-time`}>
          {t("BB-TimeRange-start-time-select-label-text", "Start Time")}
        </Label>
        <Select
          id={`${id}-start-time`}
          disabled={disabled}
          onChange={onStartChange}
          defaultValue={defaultStartTime}
          options={startTimeOptions}
          renderOption={option => (
            <Row width="100%">
              <Text> {option.time}</Text>
            </Row>
          )}
          renderNativeOption={option => option.time}
          renderSelectedValue={option => option.time}
          valueAccessor={option => option.time}
        />
      </Col>
      <Col gridGap={10} width="100%" padding={{ left: "S300" }}>
        <Label htmlFor={`${id}-end-time`}>
          {t("BB-TimeRange-end-time-select-label-text", "End Time")}
        </Label>
        <Select
          id={`${id}-end-time`}
          disabled={disabled}
          defaultValue={defaultEndTime}
          onChange={onEndChange}
          options={endTimeOptions}
          renderOption={option => (
            <Row width="100%">
              <Text> {option.time}</Text>
            </Row>
          )}
          renderNativeOption={option => option.time}
          renderSelectedValue={option => option.time}
          valueAccessor={option => option.time}
        />
      </Col>
    </Row>
  );
};

export default TimeRange;
