import React, { useEffect, useState } from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { H5, Text } from "@amzn/stencil-react-components/text";
import { translate as t } from "../../../utils/translator";
import { IconArrowLeft, IconSize } from "@amzn/stencil-react-components/icons";
import { PopupDatePicker } from "@amzn/stencil-react-components/date-picker";
import {
  checkAndBoundGetApplication,
  getLocale,
  isDateGreaterThanToday,
  routeToAppPageWithPath,
  UpdateHoursPerWeekHelper
} from "../../../utils/helper";
import { Checkbox, InputFooter, InputWrapper, LabelPosition, Radio } from "@amzn/stencil-react-components/form";
import { CommonColors } from "../../../utils/colors";
import {
  shiftPreferenceShiftPattern,
  shiftPreferencesCandidateWeekDays,
  shiftPreferencesCandidateWeekendDays,
  shiftPreferenceWorkHour
} from "../../../utils/constants/common";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { PAGE_ROUTES } from "../../pageRoutes";
import { Application, ShiftPreferenceWorkHour } from "../../../utils/types/common";
import { JobState } from "../../../reducers/job.reducer";
import { ApplicationState } from "../../../reducers/application.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { useLocation } from "react-router-dom";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import queryString from "query-string";
import {
  boundGetCandidateInfo,
  boundUpdateCandidateShiftPreferencesRequest
} from "../../../actions/CandidateActions/boundCandidateActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import {
  SHORTENED_DAYS_OF_WEEK,
  SHIFT_PATTERN,
  WORKFLOW_STEP_NAME
} from "../../../utils/enums/common";
import { connect } from "react-redux";
import moment from "moment";
import { onCompleteTaskHelper } from "../../../actions/WorkflowActions/workflowActions";
import { CandidateShiftPreferences as ShiftPreferencesType } from "../../../@types/shift-preferences";

interface MapStateToProps {
  job: JobState;
  application: ApplicationState;
  candidate: CandidateState;
}
export const CandidateShiftPreferences = (props: MapStateToProps) => {

  const { job, application, candidate } = props;
  const { search, pathname } = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId, jobId } = queryParams;
  const jobDetail = job.results;
  const applicationData = application.results;
  const { shiftPreferencesData } = candidate.results;

  useEffect(() => {
    boundGetCandidateInfo();
  }, []);

  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() });
  }, [jobDetail, jobId]);

  useEffect(() => {
    checkAndBoundGetApplication(applicationId);
  }, [applicationId]);

  useEffect(() => {
    // Page will emit page load event once both pros are available but
    // will not emit new event on props change once it has emitted pageload event previously
    jobDetail && applicationData && shiftPreferencesData && addMetricForPageLoad(pageName);

  }, [jobDetail, applicationData, shiftPreferencesData]);

  useEffect(() => {
    return () => {
      // reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    };
  }, []);

  const [earliestStartDate, setEarliestStartDate] = useState(shiftPreferencesData?.earliestStartDate);
  const [preferredDaysToWork, setPreferredDaysToWork] = useState<SHORTENED_DAYS_OF_WEEK[]>(shiftPreferencesData?.preferredDaysToWork ?? []);
  const [hoursPerWeek, setHoursPerWeek] = useState<ShiftPreferenceWorkHour[]>(shiftPreferencesData?.hoursPerWeek ?? []);
  const [shiftTimePattern, setShiftTimePattern] = useState(shiftPreferencesData?.shiftTimePattern);

  const [startDateValid, setStartDateValid] = useState(true);
  const [shiftPatternValid, setShiftPatternValid] = useState(true);
  const [hourPerWeekValid, setHourPerWeekValid] = useState(true);
  const [workDaysValid, setWorkDaysValid] = useState(true);

  const updateHoursPerWeek = (value: ShiftPreferenceWorkHour) => {
    setHoursPerWeek(UpdateHoursPerWeekHelper(hoursPerWeek || [], value));
  };

  const updateWorkDays = (value: SHORTENED_DAYS_OF_WEEK) => {
    const newWorkDays = preferredDaysToWork ?? [];

    if (newWorkDays.indexOf(value) > -1) {
      newWorkDays.splice(newWorkDays.indexOf(value), 1);
    } else {
      newWorkDays.push(value);
    }

    setPreferredDaysToWork(preferredDaysToWork);
  };

  const handleSavePreference = () => {
    // Validate start date and shift pattern as they are required
    const isStartDateValid = isDateGreaterThanToday(earliestStartDate as any);
    const isShiftPatternValid = !!shiftTimePattern;
    const isHourPerWeekValid = hoursPerWeek.length > 0;
    const isWorkDaysValid = preferredDaysToWork.length > 0;
    const formIsValid = isShiftPatternValid && isWorkDaysValid && isHourPerWeekValid && isStartDateValid;

    setStartDateValid(isStartDateValid);
    setShiftPatternValid(isShiftPatternValid);
    setHourPerWeekValid(isHourPerWeekValid);
    setWorkDaysValid(isWorkDaysValid);

    if (formIsValid) {
      const request: ShiftPreferencesType = {
        earliestStartDate: moment(earliestStartDate).format("DD/MM/YYYY"),
        preferredDaysToWork,
        hoursPerWeek,
        shiftTimePattern: shiftTimePattern as any as SHIFT_PATTERN,
      };

      boundUpdateCandidateShiftPreferencesRequest(request, (applicationData: Application) => {
        onCompleteTaskHelper(applicationData, true, WORKFLOW_STEP_NAME.ADDITIONAL_INFORMATION);
      });
    }
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
          {t("BB-shiftPreference-title-text", "Specify your job preferences")}
        </H5>
        <Col padding={{ top: "S200" }}>
          <InputWrapper
            id="startDateEnd"
            labelText={t("BB-ShiftPreference-start-date-label-text", "Select the earliest start date")}
            required
            error={!startDateValid}
            footer={!startDateValid ?
              t("BB-shiftPreference-start-date-error-text", "Please select a start date in the future") : undefined}
          >
            {inputProps => (
              <PopupDatePicker
                inputProps={{ ...inputProps, width: "100%" }}
                isDateDisabled={value => !isDateGreaterThanToday(value)}
                onChange={setEarliestStartDate}
              />
            )}
          </InputWrapper>
        </Col>
      </Col>
      <Col gridGap={10} padding={{ top: "S300" }}>
        <Text fontSize="T200" color={!hourPerWeekValid ? CommonColors.RED70 : "inherit"}>
          {t("BB-ShiftPreference-hours-per-week-label-text", "Select the number of hours that you are able to work per week")} *
        </Text>
        <Text fontSize="T100" color={CommonColors.Neutral70}>
          {t("BB-ShiftPreference-hours-per-week-label-text2", "Your visa may restrict the number of hours per week that you are legally authorised to work. If this is the case, choose the options that correspond to your visa restrictions.")}
        </Text>
        <Col gridGap={10} padding={{ top: "S300" }}>
          {
            shiftPreferenceWorkHour.map(workHour => (
              <InputWrapper
                id={`shiftWorkHour-${workHour.displayValue}`}
                labelText={t(workHour.translationKey, workHour.displayValue)}
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
            {t("BB-ShiftPreference-hours-per-week-error-text", "Please select at least one option for the number of hours you are able to work per week.")}
          </InputFooter>
        )}
      </Col>
      <Col gridGap={10} padding={{ top: "S300" }}>
        <Text fontSize="T200" color={!workDaysValid ? CommonColors.RED70 : "inherit"}>
          {t("BB-ShiftPreference-workDays-label-text", "Select all the days of the week that you are able to work")} *
        </Text>
        <Text fontSize="T100" color={CommonColors.Neutral70}>
          {t("BB-ShiftPreference-workDays-label-text2", "Please note, most of our shift patterns will include at least one day of the weekend and shift preferences are not guaranteed.")}
        </Text>
        <Col padding={{ top: "S200" }} gridGap={10}>
          <Text fontSize="T100" color={CommonColors.Neutral70}>
            {t("BB-Weekends-text", "WEEKENDS")}
          </Text>
          <Col gridGap={10}>
            {
              shiftPreferencesCandidateWeekendDays.map(day => (
                <InputWrapper
                  id={`shiftWeekendDays-${day.displayValue}`}
                  labelText={t(day.translationKey, day.displayValue)}
                  labelPosition={LabelPosition.Trailing}
                  key={day.displayValue}
                >
                  {inputProps => (
                    <Checkbox
                      name={day.displayValue}
                      {...inputProps}
                      onChange={() => updateWorkDays(day.value as SHORTENED_DAYS_OF_WEEK)}
                    />
                  )}
                </InputWrapper>
              ))
            }
          </Col>
        </Col>
        <Col padding={{ top: "S200" }} gridGap={10}>
          <Text fontSize="T100" color={CommonColors.Neutral70}>
            {t("BB-Weekdays-text", "WEEKDAYS")}
          </Text>
          <Col gridGap={10}>
            {
              shiftPreferencesCandidateWeekDays.map(day => (
                <InputWrapper
                  id={`shiftWeekdays-${day.displayValue}`}
                  labelText={t(day.translationKey, day.displayValue)}
                  labelPosition={LabelPosition.Trailing}
                  key={day.displayValue}
                >
                  {inputProps => (
                    <Checkbox
                      name={day.displayValue}
                      {...inputProps}
                      onChange={() => updateWorkDays(day.value as SHORTENED_DAYS_OF_WEEK)}
                    />
                  )}
                </InputWrapper>
              ))
            }
          </Col>
        </Col>
        {!workDaysValid && (
          <InputFooter error={!workDaysValid} id="worDaysErrorContainer">
            {t("BB-ShiftPreference-wordDays-error-text", "Please select at least one day of the week that you are able to work.")}
          </InputFooter>
        )}
      </Col>
      <Col gridGap={10} padding={{ top: "S300" }}>
        <Text fontSize="T200" color={!shiftPatternValid ? CommonColors.RED70 : "inherit"}>
          {t("BB-ShiftPreference-shift-pattern-label-text", "Select the shift pattern that you are able to work")} *
        </Text>
        <Col gridGap={10}>
          {
            shiftPreferenceShiftPattern.map(shiftPattern => (
              <InputWrapper
                id={`shiftWeekendDays-${shiftPattern.displayValue}`}
                labelText={t(shiftPattern.translationKey, shiftPattern.displayValue)}
                labelPosition={LabelPosition.Trailing}
                key={shiftPattern.displayValue}
              >
                {inputProps => (
                  <Radio
                    name="shift-pattern"
                    {...inputProps}
                    onChange={() => setShiftTimePattern(shiftPattern.value as SHIFT_PATTERN)}
                  />
                )}
              </InputWrapper>
            ))
          }
          {!shiftPatternValid && (
            <InputFooter error={!shiftPatternValid} id="shiftPatternErrorContainer">
              {t("BB-ShiftPreference-shiftPattern-error-text", "Select at least one option.")}
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

export const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(CandidateShiftPreferences);