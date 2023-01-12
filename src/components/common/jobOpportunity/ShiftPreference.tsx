import React, { useState } from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { H5, Text } from "@amzn/stencil-react-components/text";
import { translate as t } from "../../../utils/translator";
import { IconArrowLeft, IconSize } from "@amzn/stencil-react-components/icons";
import { PopupDatePicker } from "@amzn/stencil-react-components/date-picker";
import { isDateGreaterThanToday, routeToAppPageWithPath } from "../../../utils/helper";
import { Checkbox, InputFooter, InputWrapper, LabelPosition, Radio } from "@amzn/stencil-react-components/form";
import { CommonColors } from "../../../utils/colors";
import {
  shiftPreferenceShiftPattern,
  shiftPreferenceWeekDays,
  shiftPreferenceWeekendDays,
  shiftPreferenceWorkHour
} from "../../../utils/constants/common";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { PAGE_ROUTES } from "../../pageRoutes";
import { ShiftPreferenceWorkHour } from "../../../utils/types/common";

const ShiftPreference = () => {

  const [startDate, setStartDate] = useState();
  const [hoursPerWeek, setHoursPerWeek] = useState<ShiftPreferenceWorkHour[]>([]);
  const [workDays, setWorkDays] = useState<string[]>([]);
  const [shiftPattern, setShiftPattern] = useState();
  const [startDateValid, setStartDateValid] = useState(true);
  const [shiftPatternValid, setShiftPatternValid] = useState(true);
  const [hourPerWeekValid, setHourserWeekValid] = useState(true);
  const [workDaysValid, setWorkDaysValid] = useState(true);

  const updateHoursPerWeek = (value: ShiftPreferenceWorkHour) => {
    const newHoursPerWeek = hoursPerWeek || [];

    newHoursPerWeek.forEach((item, index) => {
      if (item.maximumvalue === value.maximumvalue && item.minimumValue === value.minimumValue) {
        newHoursPerWeek.splice(index, 1);
      } else {
        newHoursPerWeek.push(value);
      }
    });

    setHoursPerWeek(newHoursPerWeek);
  };

  const updateWorkDays = (value: string) => {
    const newWorkDays = workDays || [];

    if (newWorkDays.indexOf(value) > -1) {
      newWorkDays.splice(newWorkDays.indexOf(value), 1);
    } else {
      newWorkDays.push(value);
    }

    setWorkDays(newWorkDays);
  };

  const handleSavePreference = () => {
    // Validate start date and shift pattern as they are required
    setStartDateValid(isDateGreaterThanToday(startDate));
    setShiftPatternValid(!!shiftPattern);
    setHourserWeekValid(hoursPerWeek.length > 0);
    setWorkDaysValid(workDays.length > 0);

    // Bound update application
  };

  return (
    <Col gridGap={10}>
      <Row padding={{ top: "S400" }}>
        <Row
          className="shiftPreferenceLink"
          gridGap={8}
          onClick={ () => {
            routeToAppPageWithPath(PAGE_ROUTES.JOB_OPPORTUNITIES);
          }}

        >
          <IconArrowLeft size={IconSize.Medium} fontSize="T100" aria-hidden />
          <Text fontWeight="medium" fontSize="T200">
            {t("BB-JobOpportunity-Go-To-shift-selection-Link", "Go back to shift selection")}
          </Text>
        </Row>
      </Row>
      <Col padding={{ top: "S300" }} gridGap={8}>
        <H5>
          Specify your job preferences
        </H5>
        <Col padding={{ top: "S200" }}>
          <InputWrapper
            id="startDateEnd"
            labelText="Select the earliest start date"
            required
            error={!startDateValid}
            footer={!startDateValid ? "Please select a start date in the future" : undefined}
          >
            {inputProps => (
              <PopupDatePicker
                inputProps={{ ...inputProps, width: "100%" }}
                isDateDisabled={value => !isDateGreaterThanToday(value)}
                onChange={setStartDate}
              />
            )}
          </InputWrapper>
        </Col>
      </Col>
      <Col gridGap={10} padding={{ top: "S300" }}>
        <Text fontSize="T200" color={!hourPerWeekValid ? CommonColors.RED70 : "auto"}>
          Select the number of hours that you are able to work per week *
        </Text>
        <Text fontSize="T100" color={CommonColors.Neutral70}>
          Your visa may restrict the number of hours per week that you are legally authorised to work. If this is the case, choose the options that correspond to your visa restrictions.
        </Text>
        <Col gridGap={10} padding={{ top: "S300" }}>
          {
            shiftPreferenceWorkHour.map(workHour => (
              <InputWrapper
                id={`shiftWorkHour-${workHour.displayValue}`}
                labelText={workHour.displayValue}
                labelPosition={LabelPosition.Trailing}
                key={workHour.displayValue}
              >
                {inputProps => (
                  <Checkbox
                    name={workHour.displayValue}
                    {...inputProps}
                    onChange={() => updateHoursPerWeek(workHour.value)}
                  />
                )}
              </InputWrapper>
            ))
          }
        </Col>
        {!hourPerWeekValid && (
          <InputFooter error={!hourPerWeekValid} id="hoursPerWeekErrorContainer">
            Please select at least one option for the number of hours you are able to work per week.
          </InputFooter>
        )}
      </Col>
      <Col gridGap={10} padding={{ top: "S300" }}>
        <Text fontSize="T200" color={!workDaysValid ? CommonColors.RED70 : "auto"}>
          Select all the days of the week that you are able to work *
        </Text>
        <Text fontSize="T100" color={CommonColors.Neutral70}>
          Please note, most of our shift patterns will include at least one day of the weekend and shift preferences are not guaranteed
        </Text>
        <Col padding={{ top: "S200" }} gridGap={10}>
          <Text fontSize="T100" color={CommonColors.Neutral70}>WEEKENDS</Text>
          <Col gridGap={10}>
            {
              shiftPreferenceWeekendDays.map(day => (
                <InputWrapper
                  id={`shiftWeekendDays-${day.displayValue}`}
                  labelText={day.displayValue}
                  labelPosition={LabelPosition.Trailing}
                  key={day.displayValue}
                >
                  {inputProps => (
                    <Checkbox
                      name={day.displayValue}
                      {...inputProps}
                      onChange={() => updateWorkDays(day.value)}
                    />
                  )}
                </InputWrapper>
              ))
            }
          </Col>
        </Col>
        <Col padding={{ top: "S200" }} gridGap={10}>
          <Text fontSize="T100" color={CommonColors.Neutral70}>WEEKDAYS</Text>
          <Col gridGap={10}>
            {
              shiftPreferenceWeekDays.map(day => (
                <InputWrapper
                  id={`shiftWeekdays-${day.displayValue}`}
                  labelText={day.displayValue}
                  labelPosition={LabelPosition.Trailing}
                  key={day.displayValue}
                >
                  {inputProps => (
                    <Checkbox
                      name={day.displayValue}
                      {...inputProps}
                      onChange={() => updateWorkDays(day.value)}
                    />
                  )}
                </InputWrapper>
              ))
            }
          </Col>
        </Col>
        {!workDaysValid && (
          <InputFooter error={!workDaysValid} id="worDaysErrorContainer">
            Please select at least one day of the week that you are able to work.
          </InputFooter>
        )}
      </Col>
      <Col gridGap={10} padding={{ top: "S300" }}>
        <Text fontSize="T200" color={!shiftPatternValid ? CommonColors.RED70 : "auto"}>
          Select the shift pattern that you are able to work *
        </Text>
        <Col gridGap={10}>
          {
            shiftPreferenceShiftPattern.map(shiftPattern => (
              <InputWrapper
                id={`shiftWeekendDays-${shiftPattern.displayValue}`}
                labelText={shiftPattern.displayValue}
                labelPosition={LabelPosition.Trailing}
                key={shiftPattern.displayValue}
              >
                {inputProps => (
                  <Radio
                    name="shift-pattern"
                    {...inputProps}
                    onChange={() => setShiftPattern(shiftPattern.value)}
                  />
                )}
              </InputWrapper>
            ))
          }
          {!shiftPatternValid && (
            <InputFooter error={!shiftPatternValid} id="shiftPatternErrorContainer">
              Select at least one option.
            </InputFooter>
          )}
        </Col>
      </Col>
      <Col padding={{ top: "S400" }}>
        <Button
          variant={ButtonVariant.Primary}
          style={{ width: "100%" }}
          onClick={handleSavePreference}
          id="saveShiftPreference"
        >
          {t("BB-shift-preference-save-button", "Save Preferences")}
        </Button>
      </Col>
    </Col>
  );
};

export default ShiftPreference;