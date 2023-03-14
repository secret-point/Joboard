import React, { useState } from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Label, Text } from "@amzn/stencil-react-components/text";
import { translate as t } from "../../../utils/translator";
import { ScheduleStateFilters } from "../../../utils/types/common";
import FilterSchedule from "../../common/jobOpportunity/FilterSchedule";
import { Checkbox, InputWrapper, LabelPosition, InputFooter } from "@amzn/stencil-react-components/form";
import { PopupDatePicker } from "@amzn/stencil-react-components/date-picker";
import { isDateGreaterThanToday } from "../../../utils/helper";
import { boundUpdateScheduleFilters } from "../../../actions/ScheduleActions/boundScheduleActions";

interface FilterScheduleProps {
  filters: ScheduleStateFilters;
  supportedCities: string[];
  scheduleCount: number;
}

const FilterScheduleUK = ( props: FilterScheduleProps ) => {

  const { filters, supportedCities, scheduleCount } = props;
  const { city } = filters;
  const [startEndDate, setStartEndDate] = useState<string|undefined>(undefined);
  const [startBeginDate, setStartBeginDate] = useState<string|undefined>(undefined);
  const isStartDateValid = startBeginDate ? isDateGreaterThanToday(startBeginDate) : true;
  const isEndDateValid = startEndDate ? isDateGreaterThanToday(startEndDate) : true;

  const updateStartDate = ( key: string ) => {
    const newFilters = { ...filters };
    newFilters.startDateBegin = key;
    setStartBeginDate(key);

    isStartDateValid && boundUpdateScheduleFilters(newFilters);
  };

  const updateEndDate = ( key: string ) => {
    const newFilters = { ...filters };
    newFilters.startDateEnd = key;
    setStartEndDate(key);

    isEndDateValid && boundUpdateScheduleFilters(newFilters);
  };

  const updateCityCheckbox = (city: string) => {
    const newFilters = { ...filters };
    const currentCity = newFilters.city || [];
    if (currentCity.indexOf(city) > -1) {
      currentCity.splice(currentCity.indexOf(city), 1);
    } else {
      currentCity.push(city);
    }
    newFilters.city = currentCity;

    boundUpdateScheduleFilters(newFilters);
  };

  return (
    <Col gridGap={20}>
      <Col gridGap={10} width="100%" padding={{ right: "S300" }}>
        <Text textAlign="center">
          {t("BB-FilterSchedule-schedule-found-counter-text", `${scheduleCount} Schedule Found`, { scheduleCount: scheduleCount })}
        </Text>
        <Col gridGap={8}>
          <Text>Cities</Text>
          <Row gridGap={10}>
            {
              supportedCities?.map(cityItem => (
                <Row alignItems="end" key={cityItem} gridGap={8}>
                  <InputWrapper
                    labelText={""}
                    id={`checkbox-city-${cityItem}`}
                    labelPosition={LabelPosition.Top}
                  >
                    {inputProps => (
                      <Checkbox
                        name="city" {...inputProps}
                        checked={city && city.indexOf(cityItem) > -1}
                        onChange={() => updateCityCheckbox(cityItem)}
                      />
                    )}
                  </InputWrapper>
                  <Label htmlFor={`checkbox-city-${cityItem}`}>{cityItem}</Label>
                </Row>
              ))
            }
          </Row>
        </Col>
        <Col gridGap={8} padding={{ top: "S300" }}>
          <Text>{t("BB-FilterScheduleUk-start-date-between-title", "Start date between")}</Text>
          <Col padding={{ top: "S200" }}>
            <PopupDatePicker
              inputProps={{ width: "100%", error: !isStartDateValid }}
              isDateDisabled={value => !isDateGreaterThanToday(value)}
              value={startBeginDate}
              onChange={updateStartDate}
              id="startDateBegin"
            />
            {!isStartDateValid && (
              <InputFooter error={!isStartDateValid} id="startDateBeginErrorMessage">
                {t("BB-FilterScheduleUk-start-date-between-error-text", "Please select a valid date")}
              </InputFooter>
            )}
          </Col>
          <Col padding={{ top: "S200" }}>
            <PopupDatePicker
              inputProps={{ width: "100%", error: !isEndDateValid }}
              isDateDisabled={value => !isDateGreaterThanToday(value)}
              value={startEndDate}
              onChange={updateEndDate}
              id="startDateEnd"
            />
            {!isEndDateValid && (
              <InputFooter error={!isEndDateValid} id="startDateEndErrorMessage">
                {t("BB-FilterScheduleUk-end-date-between-error-text", "Please select a valid date")}
              </InputFooter>
            )}
          </Col>
        </Col>
      </Col>
      <FilterSchedule filters={filters} displayMilitaryTime />
    </Col>
  );
};

export default FilterScheduleUK;
