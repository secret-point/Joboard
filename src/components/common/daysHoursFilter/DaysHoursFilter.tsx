import React, { useState } from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import { ToggleSwitch } from "@amzn/stencil-react-components/toggle-switch";
import capitalize from "lodash/capitalize";
import cloneDeep from "lodash/cloneDeep";
import moment from "moment";
import { translate as t } from "../../../utils/translator";
import { DayHoursFilter } from "../../../utils/types/common";
import TimeRange from "./TimeRange";

interface DaysHoursFilterProps {
  defaultFilter: DayHoursFilter[];
  onValueChange: Function;
  label: string;
}

export const DaysHoursFilter = ( props: DaysHoursFilterProps ) => {

  const { defaultFilter, onValueChange, label } = props;
  const [daysFilters, setDaysFilters] = useState<DayHoursFilter[]>(defaultFilter);

  const onToggleChange = ( e: any, index: number ) => {
    const newDaysFilters = cloneDeep(daysFilters);
    newDaysFilters[index].isActive = e;
    setDaysFilters(newDaysFilters);

    if(onValueChange) {
      onValueChange(newDaysFilters);
    }
  };

  const getHours = (time: string) => {
    if (time === "23:59") {
      return -1;
    } else {
      const dateTime = moment(`1990-01-01T${time}:00.000Z`).utc();
      const hour = dateTime.get("hour");
      return hour;
    }
  };

  const onTimeChange = ( timeData: any, dayIndex: number ) => {
    const { isStartTime, interval } = timeData;
    let time = "00:00";
    let dateTime = moment(`1990-01-01T${time}:00.000Z`).utc();

    if(interval === "-1") {
      time = "23:59";
      dateTime = moment(`1990-01-01T${time}:00.000Z`).utc();
    }
    else {
      dateTime = dateTime.add("h", interval);
    }
    const newDaysFilters = cloneDeep(daysFilters);

    if(isStartTime) {
      newDaysFilters[dayIndex].startTime = dateTime.format("HH:mm");
    }
    else {
      newDaysFilters[dayIndex].endTime = dateTime.format("HH:mm");
    }
    setDaysFilters(newDaysFilters);

    if(onValueChange) {
      onValueChange(newDaysFilters);
    }
  };

  return (
      <Col gridGap={20} id="DaysHoursFilterContainer">
        <Text color="accent2" fontSize="T200">
          {label}
        </Text>
        <Col gridGap={20}>
          {daysFilters.map(( filter, index ) => (
              <fieldset key={filter.day}>
                <Col
                    key={filter.day}
                    className="container-border"
                    gridGap={20}
                    padding='S200'
                >
                  <Row gridGap={10} alignItems="center">
                    <ToggleSwitch
                        onChange={( e: any ) => onToggleChange(e, index)}
                        checked={filter.isActive}
                    />
                    <Text>{t(filter.dayTranslationKey, capitalize(filter.day.toString()))}</Text>
                  </Row>
                  <TimeRange
                      id={`${filter.day}TimeRange`}
                      key={filter.day}
                      dayIndex={index}
                      disabled={!filter.isActive}
                      onChange={onTimeChange}
                      startTimeHours={getHours(filter.startTime)}
                      endTimeHours={getHours(filter.endTime)}
                  />
                </Col>
              </fieldset>
          ))}
        </Col>
      </Col>
  );
};

export default DaysHoursFilter;
