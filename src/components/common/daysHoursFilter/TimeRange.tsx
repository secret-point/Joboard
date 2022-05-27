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
    startTimeHours: string;
    endTimeHours: string;
}

const TimeRange = ( props: TimeRangeProps ) => {

    const { disabled, id, dayIndex, endTimeHours, startTimeHours, onChange } = props;
    const [startTime, setStartTime] = useState(startTimeHours);
    const [endTime, setEndTime] = useState(endTimeHours);

    const onStartChange = ( option: TimeRangeHoursData ) => {
        setStartTime(option.time);
        onChange(
            {
                interval: option.time,
                isStartTime: false,
            },
            dayIndex
        );
    };

    const onEndChange = ( option: TimeRangeHoursData ) => {
        setEndTime(option.time);

        onChange(
            {
                interval: option.time,
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
            <Col gridGap={10} width="100%" padding={{ right: 'S300' }}>
                <Label htmlFor={`${id}-start-time`}>
                    {t("BB-TimeRange-start-time-select-label-text", "Start Time")}
                </Label>
                <Select
                    id={`${id}-start-time`}
                    disabled={disabled}
                    value={startTime}
                    onChange={onStartChange}
                    options={populateTimeRangeHourData(startTime)}
                    renderOption={option => (
                        <Row width='100%'>
                            <Text> {option.time}</Text>
                        </Row>
                    )}
                    renderNativeOption={option => option.time}
                    renderSelectedValue={option => option}
                    valueAccessor={option => option.time}
                />
            </Col>
            <Col gridGap={10} width="100%" padding={{ left: 'S300' }}>
                <Label htmlFor={`${id}-end-time`}>
                    {t("BB-TimeRange-end-time-select-label-text", "End Time")}
                </Label>
                <Select
                    id={`${id}-end-time`}
                    disabled={disabled}
                    value={endTime}
                    onChange={onEndChange}
                    options={populateTimeRangeHourData(startTime, true)}
                    renderOption={option => (
                        <Row width='100%'>
                            <Text> {option.time}</Text>
                        </Row>
                    )}
                    renderNativeOption={option => option.time}
                    renderSelectedValue={option => option}
                    valueAccessor={option => option.time}
                />
            </Col>
        </Row>
    );
};

export default TimeRange;
