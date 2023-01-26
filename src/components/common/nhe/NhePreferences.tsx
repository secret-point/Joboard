import React, { useEffect, useState } from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { H4, Label, Text } from "@amzn/stencil-react-components/text";
import { translate as t } from "../../../utils/translator";
import { IconArrowLeft, IconSize } from "@amzn/stencil-react-components/icons";
import {
  checkAndBoundGetApplication,
  getLocale,
  routeToAppPageWithPath,
  selectPossibleNhePreference
} from "../../../utils/helper";
import {
  Checkbox,
  FormWrapper,
  InputFooter,
  InputWrapper,
  LabelPosition,
  Select
} from "@amzn/stencil-react-components/form";
import { CommonColors } from "../../../utils/colors";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { PAGE_ROUTES } from "../../pageRoutes";
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
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { connect } from "react-redux";
import { Status, StatusIndicator, StatusIndicatorColorScheme } from "@amzn/stencil-react-components/status-indicator";
import {
  boundGetPossibleNhePreference,
  boundSetPossibleNhePreferenceRequest
} from "../../../actions/NheActions/boundNheAction";
import { NheState } from "../../../reducers/nhe.reducer";
import { Application, SavePossibleNhePreferenceRequest } from "../../../utils/types/common";
import { UPDATE_APPLICATION_API_TYPE } from "../../../utils/enums/common";
import { UpdateApplicationRequestDS } from "../../../utils/apiTypes";
import { boundUpdateApplicationDS } from "../../../actions/ApplicationActions/boundApplicationActions";
import { onCompleteTaskHelper } from "../../../actions/WorkflowActions/workflowActions";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";

interface MapStateToProps {
  job: JobState;
  application: ApplicationState;
  candidate: CandidateState;
  nhe: NheState;
}
export const NhePreferences = (props: MapStateToProps) => {

  const { job, application, candidate, nhe } = props;
  const { search, pathname } = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId, jobId, scheduleId } = queryParams;
  const jobDetail = job.results;
  const applicationData = application.results;
  const { candidateData } = candidate.results;
  const schedulePreferenceRequest = nhe.nhePreferenceRequest;
  const { possibleNhePreferences } = nhe.results;
  const { possibleNHEDates, possibleNHETimeSlots, possibleCities } = schedulePreferenceRequest;
  const [isNheCityInValid, setIsNheCityInValid] = useState();
  const [isNheDateInValid, setIsNheDateInValid] = useState();
  const [isNheTimeSlotInValid, setIsNheTimeSlotInValid] = useState();

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
    boundGetPossibleNhePreference({ applicationId, scheduleId } );
  }, []);

  useEffect(() => {
    // Page will emit page load event once both pros are available but
    // will not emit new event on props change once it has emitted pageload event previously
    jobDetail && applicationData && candidateData && addMetricForPageLoad(pageName);

  }, [jobDetail, applicationData, candidateData]);

  useEffect(() => {
    const request: SavePossibleNhePreferenceRequest = {
      possibleNHEDates: possibleNhePreferences.dates,
      possibleNHETimeSlots: possibleNhePreferences.timeslots,
      possibleCities: possibleNhePreferences.cityPass
    };

    boundSetPossibleNhePreferenceRequest(request);
  }, [possibleNhePreferences]);

  useEffect(() => {
    return () => {
      // reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    };
  }, []);

  const handleSavePreference = () => {
    // Validate start date and shift pattern as they are required
    const selectedCity = possibleCities.find(item => item.checked);
    const selectedTimeSlot = possibleNHETimeSlots.find(item => item.checked);
    const selectedDate = possibleNHEDates.find(item => item.checked);
    const isFormValid = !!selectedCity && !!selectedDate && !!selectedTimeSlot;

    setIsNheCityInValid(!selectedCity);
    setIsNheTimeSlotInValid(!selectedTimeSlot);
    setIsNheDateInValid(!selectedDate);

    if (isFormValid) {
      const request: UpdateApplicationRequestDS = {
        applicationId: applicationId,
        type: UPDATE_APPLICATION_API_TYPE.NHE_PREFERENCES,
        payload: schedulePreferenceRequest
      };

      boundUpdateApplicationDS(request, (applicationData: Application) => {
        onCompleteTaskHelper(applicationData);
      });
    }
  };

  return (
    <Col gridGap={10}>
      <Row padding={{ top: "S400" }}>
        <Row
          className="nhePreferenceLink"
          gridGap={8}
          onClick={ () => {
            routeToAppPageWithPath(PAGE_ROUTES.NHE);
          }}
        >
          <IconArrowLeft size={IconSize.Medium} fontSize="T100" aria-hidden />
          <Text fontWeight="medium" fontSize="T200">
            {t("BB-kondo-Go-To-nhe-Link", "Back")}
          </Text>
        </Row>
      </Row>
      <Col padding={{ top: "S300" }} gridGap={8}>
        <Col gridGap={20}>
          <H4>
            {t("BB-nhePreference-title-text", "Specify your pre-hire appointment availability")}
          </H4>
          <Text>
            {t("BB-nhe-preference-notice-text", "You can select a location, date and time frame that you are available on. We will reach out to you within 1 business day confirming your appointment. Please arrive at the pre-hire event location on date and time specified in appointment confirmation communication. We look forward to seeing you soon.")}
          </Text>
        </Col>
        {possibleCities.length > 0 && (
          <Col padding={{ top: "S200" }} gridGap="S300">
            <Label htmlFor="nheLocationSelectInput" color={isNheCityInValid ? CommonColors.RED70 : "inherit"}>
              {t("BB-nhePreference-location-input-label-text", "Location")} *
            </Label>
            <Select
              id="nheSelectLocationInput"
              options={possibleCities}
              error={isNheCityInValid}
              value={possibleCities.find(item => item.checked)}
              renderOption={option => (
                <Text>
                  {option.label}
                </Text>
              )}
              onChange={(option) => {
                const selectedItem = { ...option, checked: !option.checked };
                const newConfig = selectPossibleNhePreference(possibleCities, selectedItem, true);
                const request: SavePossibleNhePreferenceRequest = {
                  ...schedulePreferenceRequest,
                  possibleCities: newConfig
                };

                boundSetPossibleNhePreferenceRequest(request);
              }}
            />
            {isNheCityInValid && (
              <Row padding="S300" backgroundColor={CommonColors.RED05}>
                <StatusIndicator
                  messageText={t("BB-nhePreference-location-error-text", "Please select the location.")}
                  colorScheme={StatusIndicatorColorScheme.Default}
                  status={Status.Negative}
                />
              </Row>
            )}
          </Col>
        )}
      </Col>
      {possibleNHEDates.length > 0 && (
        <Col gridGap={10} padding={{ top: "S300" }}>
          <fieldset className="borderlessFieldset">
            <legend>
              <Text fontSize="T200" color={isNheDateInValid ? CommonColors.RED70 : "inherit"}>
                {t("BB-nhePreference-date-label-text", "Date")} *
              </Text>
            </legend>
            <FormWrapper>
              {
                possibleNHEDates.map(date => (
                  <InputWrapper
                    id={`nhePreferenceDate-${date.label}`}
                    labelText={date.label}
                    labelPosition={LabelPosition.Trailing}
                    key={date.label}
                  >
                    {inputProps => (
                      <Checkbox
                        name={date.label}
                        {...inputProps}
                        onChange={() => {
                          const selectedItem = { ...date, checked: !date.checked };
                          const newConfig = selectPossibleNhePreference(possibleNHEDates, selectedItem);
                          const request: SavePossibleNhePreferenceRequest = {
                            ...schedulePreferenceRequest,
                            possibleNHEDates: newConfig
                          };

                          boundSetPossibleNhePreferenceRequest(request);
                        }}
                        checked={date.checked}
                      />
                    )}
                  </InputWrapper>
                ))
              }
            </FormWrapper>
          </fieldset>

          {isNheDateInValid && (
            <InputFooter error id="nheDateErrorContainer">
              {t("BB-nhePreference-date-error-text", "Please select at least one date.")}
            </InputFooter>
          )}
        </Col>
      )}
      {possibleNHETimeSlots.length > 0 && (
        <Col gridGap={10} padding={{ top: "S300" }}>
          <fieldset className="borderlessFieldset">
            <legend>
              <Text fontSize="T200" color={isNheTimeSlotInValid ? CommonColors.RED70 : "inherit"}>
                {t("BB-nhePreference-timeslot-label-text", "Time")} *
              </Text>
            </legend>
            <FormWrapper>
              {
                possibleNHETimeSlots.map(timeSlot => (
                  <InputWrapper
                    id={`nhePreferenceTimeRange-${timeSlot.label}`}
                    labelText={timeSlot.label}
                    labelPosition={LabelPosition.Trailing}
                    key={timeSlot.label}
                  >
                    {inputProps => (
                      <Checkbox
                        name={timeSlot.label}
                        {...inputProps}
                        onChange={() => {
                          const selectedItem = { ...timeSlot, checked: !timeSlot.checked };
                          const newConfig = selectPossibleNhePreference(possibleNHETimeSlots, selectedItem);
                          const request: SavePossibleNhePreferenceRequest = {
                            ...schedulePreferenceRequest,
                            possibleNHETimeSlots: newConfig
                          };

                          boundSetPossibleNhePreferenceRequest(request);
                        }}
                        checked={timeSlot.checked}
                      />
                    )}
                  </InputWrapper>
                ))
              }
            </FormWrapper>
          </fieldset>

          {isNheTimeSlotInValid && (
            <InputFooter error id="nheTimeSlotErrorContainer">
              {t("BB-nhePreference-timeslot-error-text", "Please select at least one time range.")}
            </InputFooter>
          )}
        </Col>
      )}
      <Col padding={{ top: "S400" }} gridGap={20}>
        <Button
          variant={ButtonVariant.Primary}
          style={{ width: "100%" }}
          onClick={handleSavePreference}
          id="saveNhePreference"
        >
          {t("BB-nhe-preference-save-button", "Save Preferences")}
        </Button>
        <Row gridGap={5} alignItems="center" alignSelf="center">
          <Text textAlign="center" fontSize="T200">
            {t("BB-nhe-preference-go-to-nhe-notice-text", "If you would like to go back to the previous page and select an available slot")},
          </Text>
          <Row className="nhePreferenceBackLink" onClick={() => routeToAppPageWithPath(PAGE_ROUTES.NHE)}>
            <Text>
              {t("BB-nhe-preference-click-here-text", "click here.")}
            </Text>
          </Row>
        </Row>
      </Col>
    </Col>
  );
};

export const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(NhePreferences);