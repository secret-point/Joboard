import React, { useEffect } from "react";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { IconPencil } from "@amzn/stencil-react-components/icons";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { H5, Text } from "@amzn/stencil-react-components/text";
import queryString from "query-string";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { boundUpdateApplicationDS } from "../../../actions/ApplicationActions/boundApplicationActions";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import { boundResetBannerMessage } from "../../../actions/UiActions/boundUi";
import { onCompleteTaskHelper } from "../../../actions/WorkflowActions/workflowActions";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { ApplicationState } from "../../../reducers/application.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { JobState } from "../../../reducers/job.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { UpdateApplicationRequestDS } from "../../../utils/apiTypes";
import { CommonColors } from "../../../utils/colors";
import { FEATURE_FLAG, UPDATE_APPLICATION_API_TYPE, WORKFLOW_STEP_NAME } from "../../../utils/enums/common";
import {
  checkAndBoundGetApplication,
  createUpdateApplicationRequest,
  formatDate,
  getCountryCode,
  getCountryMappedFeatureFlag,
  getLocale,
  isBrokenApplicationFeatureEnabled
} from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import { Application } from "../../../utils/types/common";
import DebouncedButton from "../../common/DebouncedButton";
import ScheduleDetails from "../../common/jobOpportunity/ScheduleDetails";

interface MapStateToProps {
  job: JobState;
  application: ApplicationState;
  schedule: ScheduleState;
  candidate: CandidateState;
}

export const ReviewSubmit = (props: MapStateToProps) => {
  const { job, application, schedule, candidate } = props;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId, jobId, scheduleId } = queryParams;

  const jobDetail = job.results;
  const { candidateData } = candidate.results;
  const { scheduleDetail } = schedule.results;

  const applicationData = application.results;
  const nheAppointment = applicationData?.nheAppointment;
  const location = applicationData?.nheAppointment?.location;

  useEffect(() => {
    boundGetCandidateInfo();
  }, []);

  useEffect(() => {
    scheduleId && scheduleId!== scheduleDetail?.scheduleId && boundGetScheduleDetail({
      locale: getLocale(),
      scheduleId: scheduleId
    });
  }, [scheduleDetail, scheduleId]);

  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() });
  }, [jobDetail, jobId]);

  useEffect(() => {
    checkAndBoundGetApplication(applicationId);
  }, [applicationId]);

  useEffect(() => {
    jobDetail && applicationData && candidateData && scheduleDetail && addMetricForPageLoad(pageName);

  }, [jobDetail, applicationData, candidateData, scheduleDetail, pageName]);

  useEffect(() => {
    return () => {
      // reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    };
  }, [pageName]);

  const handleBackToEdit = (stepName: WORKFLOW_STEP_NAME) => {
    boundResetBannerMessage();

    const isBackButton = true;
    if (applicationData) {
      onCompleteTaskHelper(applicationData, isBackButton, stepName);
    }
  };

  const handleSubmitApplication = () => {
    boundResetBannerMessage();

    if (applicationData) {
      const { REVIEW_SUBMIT } = UPDATE_APPLICATION_API_TYPE;
      const payload = {
        jobId,
        scheduleId,
        scheduleDetails: JSON.stringify(scheduleDetail)
      };

      const brokenApplicationFeatureFlagCountryMap = getCountryMappedFeatureFlag(FEATURE_FLAG.BROKEN_APPLICATIONS_V2);
      const countryCode = getCountryCode();
      const isFeatureEnabled = isBrokenApplicationFeatureEnabled(jobId, countryCode, brokenApplicationFeatureFlagCountryMap);
      if (isFeatureEnabled) {
        onCompleteTaskHelper(applicationData);
      } else {
        const request: UpdateApplicationRequestDS = createUpdateApplicationRequest(applicationData, REVIEW_SUBMIT, payload);
        boundUpdateApplicationDS(request, (applicationData: Application) => {
          onCompleteTaskHelper(applicationData);
        });
      }
    }
  };

  return (
    <Col gridGap="S300" padding={{ top: "S300" }}>
      <Row gridGap="S300" padding="S500" style={{ background: `${CommonColors.Blue05}` }}>
        <Text fontSize="T300">
          {jobDetail?.jobTitle || ""}
        </Text>
      </Row>

      <Text fontSize="T400">
        {t("BB-ReviewSubmit-header-title-text", "Review and Submit")}
      </Text>

      <Col gridGap="S400">
        <div>
          <Col gridGap="S300" id="jobDetailSection">
            <Text fontSize="T300">
              {t("BB-ReviewSubmit-job-details-section-title-text", "Job Details")}
            </Text>
            {scheduleDetail && <ScheduleDetails scheduleDetail={scheduleDetail} />}
          </Col>
        </div>

        <div id="additionalInfoSection">
          <Row alignItems="center" justifyContent="space-between">
            <Text fontSize="T300">
              {t("BB-ReviewSubmit-job-details-section-background-check-text", "Background check")}
            </Text>

            <Button icon={<IconPencil aria-hidden />} variant={ButtonVariant.Tertiary} onClick={() => handleBackToEdit(WORKFLOW_STEP_NAME.BGC)}>
              {t("BB-ReviewSubmit-edit-button-text", "Edit")}
            </Button>
          </Row>

          <Col gridGap="S300">
            <Text fontSize="T100" fontWeight="bold">
              {t("BB-ReviewSubmit-job-details-section-authorized-text", "Authorized")}
            </Text>

            {candidateData?.additionalBackgroundInfo && (
              <>
                <Text fontSize="S100">
                  {`Address: ${candidateData.additionalBackgroundInfo.address.addressLine1}`}
                </Text>
                <Text fontSize="S100">
                  {`City: ${candidateData.additionalBackgroundInfo.address.city}`}
                </Text>
                <Text fontSize="S100">
                  {`Postal code: ${candidateData.additionalBackgroundInfo.address.zipcode}`}
                </Text>
                <Text fontSize="S100">
                  {`Country: ${candidateData.additionalBackgroundInfo.address.country}`}
                </Text>
                <Text fontSize="S100">
                  {`National ID Type: ${candidateData.additionalBackgroundInfo.governmentIdType}`}
                </Text>
                <Text fontSize="S100">
                  {`National ID Number: ${candidateData.additionalBackgroundInfo.idNumber}`}
                </Text>
                <Text fontSize="S100">
                  {`Date of birth: ${candidateData.additionalBackgroundInfo.dateOfBirth}`}
                </Text>
                <Text fontSize="S100">
                  {`Have you worked with Amazon in the past?: ${candidateData.additionalBackgroundInfo.hasPreviouslyWorkedAtAmazon ? "Yes" : "No"}`}
                </Text>
              </>
            )}
            <Text color={CommonColors.Neutral70} fontSize="S100">
              {"* If you have entered \"NO NI\" as your NI number, a temporary NI number is assigned based on your date of birth in the following format: \"TNDDMMYY\"."}
            </Text>
          </Col>
        </div>

        {
          applicationData?.nheAppointment && (
            <div id="nheAppointmentSection">
              <Row alignItems="center" justifyContent="space-between">
                <Text fontSize="T300">
                  {t("BB-ReviewSubmit-pre-hire-appointment-section-title-text", "Pre-Hire Appointment")}
                </Text>

                <Button icon={<IconPencil aria-hidden />} variant={ButtonVariant.Tertiary} onClick={() => handleBackToEdit(WORKFLOW_STEP_NAME.NHE)}>
                  {t("BB-ReviewSubmit-edit-button-text", "Edit")}
                </Button>
              </Row>
              <Col gridGap="S300">
                <Row gridGap={5}>
                  <Text fontSize="T100">Date:</Text>
                  <Text fontSize="T100">
                    {formatDate(nheAppointment?.dateWithoutFormat, {
                      defaultDateFormat: "DD/MM/yyyy",
                      displayFormat: "dddd, MMM Do YYYY"
                    })}
                  </Text>
                </Row>
                <Row gridGap={5}>
                  <Text fontSize="T100">Time:</Text>
                  <Text fontSize="T100">
                    {t("BB-ReviewSubmit-pre-hire-appointment-section-hours-text", "Hours:")} {nheAppointment?.startTime} - {nheAppointment?.endTime}
                  </Text>
                </Row>

                <Row gridGap={5}>
                  <Text fontSize="T100">Meeting details:</Text>
                  <Text fontSize="T100">
                    {location && `${location.streetAddress} ${location.city} ${location.state} ${location.postalCode}, ${location.country}`}
                  </Text>
                </Row>
                <Row padding={{ top: "S100" }}>
                  <Text fontSize="T100">
                    {t("BB-ReviewSubmit-pre-hire-appointment-section-look-forward-text", "We look forward to seeing you at the time above.")}
                  </Text>
                </Row>
              </Col>
            </div>
          )
        }
        {
          applicationData?.nhePreference && (
            <div id="nhePreferenceSection">
              <Row alignItems="center" justifyContent="space-between">
                <Text fontSize="T300">
                  {t("BB-ReviewSubmit-nhe-preference-section-title-text", "Your pre-hire appointment availability")}
                </Text>

                <Button icon={<IconPencil aria-hidden />} variant={ButtonVariant.Tertiary} onClick={() => handleBackToEdit(WORKFLOW_STEP_NAME.NHE)}>
                  {t("BB-ReviewSubmit-edit-button-text", "Edit")}
                </Button>
              </Row>
              <Col gridGap="S300">
                <Col>
                  <H5 fontWeight="bold" fontSize="S100">City</H5>
                  <ul>
                    {
                      applicationData.nhePreference?.locations.map(location => (
                        <li key={location}>
                          <Text fontSize="S100">{location}</Text>
                        </li>
                      ))
                    }
                  </ul>
                </Col>
                <Col>
                  <H5 fontWeight="bold" fontSize="S100">Dates</H5>
                  <ul>
                    {
                      applicationData.nhePreference?.preferredNHEDates.map(date => (
                        <li key={date}>
                          <Text fontSize="S100">{date}</Text>
                        </li>
                      ))
                    }
                  </ul>
                </Col>

                <Col>
                  <H5 fontWeight="bold" fontSize="S100">Time</H5>
                  <ul>
                    {
                      applicationData.nhePreference?.preferredNHETimeIntervals.map(timeSlot => (
                        <li key={timeSlot}>
                          <Text fontSize="S100">{timeSlot}</Text>
                        </li>
                      ))
                    }
                  </ul>
                </Col>
              </Col>
            </div>
          )
        }
      </Col>

      <Col margin={{ top: "S300" }} gridGap="S300" padding="S500" style={{ background: `${CommonColors.Blue05}` }}>
        <DebouncedButton variant={ButtonVariant.Primary} onClick={handleSubmitApplication}>
          {t("BB-ReviewSubmit-submit-application-button-text", "Submit application")}
        </DebouncedButton>
      </Col>
    </Col>
  );
};

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(ReviewSubmit);
