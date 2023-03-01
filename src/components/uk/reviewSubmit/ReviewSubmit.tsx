import React, { useEffect, useState } from "react";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { IconPencil } from "@amzn/stencil-react-components/icons";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { H4, Text } from "@amzn/stencil-react-components/text";
import queryString from "query-string";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import {
  boundGetApplicationList,
  boundUpdateApplicationDS
} from "../../../actions/ApplicationActions/boundApplicationActions";
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
import {
  FEATURE_FLAG,
  UPDATE_APPLICATION_API_TYPE,
  WITHDRAW_REASON_CASE,
  WORKFLOW_STEP_NAME
} from "../../../utils/enums/common";
import {
  bulkWithdrawAndSubmitApplication,
  checkAndBoundGetApplication,
  createUpdateApplicationRequest,
  formatDate,
  getApplicationWithdrawalReason,
  getFeatureFlagValue,
  getLocale,
  goToCandidateDashboard,
  initiateScheduleDetailOnPageLoad
} from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import { Application } from "../../../utils/types/common";
import DebouncedButton from "../../common/DebouncedButton";
import { Card } from "@amzn/stencil-react-components/card";
import ScheduleCard from "../../common/jobOpportunity/ScheduleCard";
import CustomModal from "../../common/CustomModal";
import moment from "moment";
import { PAGE_ROUTES } from "../../pageRoutes";
import { getScheduleInUKFormat } from "../../../helpers/schedule-helper";

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
  const [showWithDrawModal, setShowWithdrawModal] = useState(false);
  const [activeApplicationsTobeWithdrawn, setActiveApplicationToBeWithdrawn] = useState<Application[]>([]);

  const jobDetail = job.results;
  const { candidateData } = candidate.results;
  let { scheduleDetail } = schedule.results;
  scheduleDetail = scheduleDetail && getScheduleInUKFormat(scheduleDetail);
  const applicationData = application.results;
  const activeApplicationList = application.applicationList;
  const nheAppointment = applicationData?.nheAppointment;
  const location = applicationData?.nheAppointment?.location;

  useEffect(() => {
    // Refresh and add scheduleId in the url from the jobSelected if it doesn't exist from the query param
    if (!scheduleId && applicationData) {
      initiateScheduleDetailOnPageLoad(applicationData, PAGE_ROUTES.REVIEW_SUBMIT);
    }
  }, [applicationData]);

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

  useEffect(() => {
    candidateData?.candidateId && boundGetApplicationList({ candidateId: candidateData.candidateId, status: "active" });
  }, [candidateData]);

  const handleBackToEdit = (stepName: WORKFLOW_STEP_NAME) => {
    boundResetBannerMessage();

    const isBackButton = true;
    if (applicationData) {
      onCompleteTaskHelper(applicationData, isBackButton, stepName);
    }
  };
  const submitApplication = (applicationData: Application) => {
    const { REVIEW_SUBMIT } = UPDATE_APPLICATION_API_TYPE;
    const payload = {
      jobId,
      scheduleId,
      scheduleDetails: JSON.stringify(scheduleDetail)
    };

    const isFeatureEnabled = getFeatureFlagValue(FEATURE_FLAG.BROKEN_APPLICATIONS_V2);
    if (isFeatureEnabled) {
      onCompleteTaskHelper(applicationData);
    } else {
      const request: UpdateApplicationRequestDS = createUpdateApplicationRequest(applicationData, REVIEW_SUBMIT, payload);
      boundUpdateApplicationDS(request, (applicationData: Application) => {
        onCompleteTaskHelper(applicationData);
      });
    }
  };
  const handleSubmitApplication = () => {
    boundResetBannerMessage();

    if (applicationData) {
      const activeApplicationsToWithdraw = activeApplicationList ? activeApplicationList.
        filter(application => {
          return application.applicationId !== applicationData?.applicationId && application.submitted && application.active;
        }) : [];

      setActiveApplicationToBeWithdrawn(activeApplicationsToWithdraw);

      if (activeApplicationsToWithdraw.length=== 0) {
        submitApplication(applicationData);
      } else {
        const withdrawReasons = activeApplicationsToWithdraw.map(app => getApplicationWithdrawalReason(applicationData, app));
        const shouldWarningShowModal = withdrawReasons.some(reason => Boolean(reason));
        const shouldWidthdrawWithoutWarning = shouldWarningShowModal && withdrawReasons.some(reason => {
          return reason === WITHDRAW_REASON_CASE.CASE_2;
        });

        if (shouldWidthdrawWithoutWarning) {
          bulkWithdrawAndSubmitApplication(activeApplicationsToWithdraw, () => {
            submitApplication(applicationData);
          });
        } else {
          setShowWithdrawModal(true);
        }
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
        {scheduleDetail && applicationData?.jobScheduleSelected?.scheduleId && (
          <Col gridGap="S300" id="jobDetailSection">
            <Text fontSize="T300">
              {t("BB-ReviewSubmit-job-details-section-title-text", "Job Details")}
            </Text>
            <ScheduleCard scheduleDetail={scheduleDetail} displayOnly />
          </Col>
        )}

        {
          // do not show shift preference if there is shift details
          applicationData?.shiftPreference && !applicationData?.jobScheduleSelected?.scheduleId && (
            <Col id="shiftPreferenceSection" gridGap="S300">
              <Row alignItems="center" justifyContent="space-between">
                <Text fontSize="T300">
                  {t("BB-ReviewSubmit-shift-preference-section-title-text", "Shift preferences")}
                </Text>

                <Button icon={<IconPencil aria-hidden />} variant={ButtonVariant.Tertiary} onClick={() => handleBackToEdit(WORKFLOW_STEP_NAME.JOB_OPPORTUNITIES)}>
                  {t("BB-ReviewSubmit-edit-button-text", "Edit")}
                </Button>
              </Row>
              <Card isElevated padding="S400">
                <Col>
                  <Row gridGap="S300" alignItems="center" padding={{ bottom: "S400" }}>
                    <Text fontWeight="bold" fontSize="T100">
                      {t("BB-rev-ew-submit-shift-preference-earliest-start-date-label", "Earliest start date")}:
                    </Text>
                    <Text fontSize="T100">
                      {moment(applicationData.shiftPreference.earliestStartDate, "DD/MM/YYYY").locale(getLocale()).format("DD MMM YYYY")}
                    </Text>
                  </Row>
                  <Col>
                    <Text fontWeight="bold" fontSize="T100">
                      {t("BB-rev-ew-submit-shift-preference-hours-per-week-label", "Hours per week")}:
                    </Text>
                    <ul>
                      {
                        applicationData.shiftPreference?.hoursPerWeekStrList.map(hourPerWeek => (
                          <li key={hourPerWeek} className="review-submit-list-item">
                            <Text fontSize="T100">{hourPerWeek}</Text>
                          </li>
                        ))
                      }
                    </ul>
                  </Col>
                  <Col>
                    <Text fontWeight="bold" fontSize="T100">
                      {t("BB-rev-ew-submit-shift-preference-days-of-week-label", "Days of week")}:
                    </Text>
                    <ul>
                      {
                        applicationData.shiftPreference?.daysOfWeek.map(day => (
                          <li key={day} className="review-submit-list-item">
                            <Text fontSize="T100">{day}</Text>
                          </li>
                        ))
                      }
                    </ul>
                  </Col>
                  <Row gridGap="S300" alignItems="center">
                    <Text fontWeight="bold" fontSize="T100">
                      {t("BB-rev-ew-submit-shift-preference-time-pattern-label", "Time pattern")}:
                    </Text>
                    <Text fontSize="T100">
                      {applicationData.shiftPreference.shiftTimePattern}
                    </Text>
                  </Row>
                </Col>
              </Card>
            </Col>
          )
        }

        {candidateData?.additionalBackgroundInfo && (
          <Col id="additionalInfoSection" gridGap="S300">
            <Row alignItems="center" justifyContent="space-between">
              <Text fontSize="T300">
                {t("BB-ReviewSubmit-additional-info-section-title-text", "Additional information")}
              </Text>

              <Button icon={<IconPencil aria-hidden />} variant={ButtonVariant.Tertiary}
                onClick={() => handleBackToEdit(WORKFLOW_STEP_NAME.ADDITIONAL_INFORMATION)}
              >
                {t("BB-ReviewSubmit-edit-button-text", "Edit")}
              </Button>
            </Row>
            <Card isElevated padding="S400">
              <Col gridGap="S300">
                <Text fontSize="T100">
                  {`${t("BB-review-submit-additional-info-address-label", "Address")}: ${candidateData.additionalBackgroundInfo.address.addressLine1}`}
                </Text>
                <Text fontSize="T100">
                  {`${t("BB-review-submit-additional-info-city-label", "City")}: ${candidateData.additionalBackgroundInfo.address.city}`}
                </Text>
                <Text fontSize="T100">
                  {`${t("BB-review-submit-additional-info-postal-code-label", "Postal code")}: ${candidateData.additionalBackgroundInfo.address.zipcode}`}
                </Text>
                <Text fontSize="T100">
                  {`${t("BB-review-submit-additional-info-country-label", "Country")}: ${candidateData.additionalBackgroundInfo.address.country}`}
                </Text>
                <Text fontSize="T100">
                  {`${t("BB-review-submit-additional-info-national-id-type-label", "National ID Type")}: ${candidateData.additionalBackgroundInfo.governmentIdType}`}
                </Text>
                <Text fontSize="T100">
                  {`${t("BB-review-submit-additional-info-national-id-number-label", "National ID Number")}: ${candidateData.additionalBackgroundInfo.idNumber}`}
                </Text>
                <Text fontSize="T100">
                  {`${t("BB-review-submit-additional-info-dob-label", "Date of birth")}: ${moment(candidateData.additionalBackgroundInfo.dateOfBirth, "YYYY-MM-DD").locale(getLocale()).format("DD MMM YYYY")}`}
                </Text>
                <Text fontSize="T100">
                  {`${t("BB-review-submit-additional-info-previous-worked-at-amazon-label", "Have you worked with Amazon in the past?")}: ${candidateData.additionalBackgroundInfo.hasPreviouslyWorkedAtAmazon ? "Yes" : "No"}`}
                </Text>
                <Row padding={{ top: "S300" }}>
                  <Text color={CommonColors.Neutral70} fontSize="T100">
                    {`* ${t("BB-review-submit-additional-info-temporary-id-number-notice", "If you have entered \"NO NI\" as your NI number, a temporary NI number is assigned based on your date of birth in the following format: \"TNDDMMYY\".")}`}
                  </Text>
                </Row>
              </Col>
            </Card>
          </Col>
        )}

        {
          applicationData?.nheAppointment && (
            <Col id="nheAppointmentSection" gridGap="S300">
              <Row alignItems="center" justifyContent="space-between">
                <Text fontSize="T300">
                  {t("BB-ReviewSubmit-pre-hire-appointment-section-title-text", "Pre-Hire Appointment")}
                </Text>

                <Button icon={<IconPencil aria-hidden />} variant={ButtonVariant.Tertiary} onClick={() => handleBackToEdit(WORKFLOW_STEP_NAME.NHE)}>
                  {t("BB-ReviewSubmit-edit-button-text", "Edit")}
                </Button>
              </Row>
              <Card isElevated padding="S400">
                <Col gridGap="S300">
                  <Row gridGap={5}>
                    <Text fontSize="T100">
                      {t("BB-ReviewSubmit-pre-hire-appointment-date-label", "Date")}:
                    </Text>
                    <Text fontSize="T100">
                      {formatDate(nheAppointment?.dateWithoutFormat, {
                        defaultDateFormat: "DD/MM/yyyy",
                        displayFormat: "dddd, MMM Do YYYY"
                      })}
                    </Text>
                  </Row>
                  <Row gridGap={5}>
                    <Text fontSize="T100">
                      {t("BB-ReviewSubmit-pre-hire-appointment-section-time-label", "Time:")} {moment(nheAppointment?.startTime, "hh:mm A").locale(getLocale()).format("HH:mm")} - {moment(nheAppointment?.endTime, "hh:mm A").locale(getLocale()).format("HH:mm")}
                    </Text>
                  </Row>

                  <Row gridGap={5}>
                    <Text fontSize="T100">
                      {t("BB-ReviewSubmit-pre-hire-appointment-meeting-details-label", "Meeting details")}:
                    </Text>
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
              </Card>
            </Col>
          )
        }
        {
          applicationData?.nhePreference && !applicationData?.nheAppointment && (
            <Col id="nhePreferenceSection" gridGap="S300">
              <Row alignItems="center" justifyContent="space-between">
                <Text fontSize="T300">
                  {t("BB-ReviewSubmit-nhe-preference-section-title-text", "Your pre-hire appointment availability")}
                </Text>

                <Button icon={<IconPencil aria-hidden />} variant={ButtonVariant.Tertiary} onClick={() => handleBackToEdit(WORKFLOW_STEP_NAME.NHE)}>
                  {t("BB-ReviewSubmit-edit-button-text", "Edit")}
                </Button>
              </Row>
              <Card isElevated padding="S400">
                <Col gridGap="S200">
                  <Col>
                    <Text fontWeight="bold" fontSize="T100">
                      {t("BB-review-submit-pre-hire-appointment-city-label", "City")}
                    </Text>
                    <ul>
                      {
                        applicationData.nhePreference?.locations.map(location => (
                          <li key={location} className="review-submit-list-item">
                            <Text fontSize="T100">{location}</Text>
                          </li>
                        ))
                      }
                    </ul>
                  </Col>
                  <Col>
                    <Text fontWeight="bold" fontSize="T100">
                      {t("BB-review-submit-pre-hire-appointment-dates-label", "Dates")}
                    </Text>
                    <ul>
                      {
                        applicationData.nhePreference?.preferredNHEDates.map(date => (
                          <li key={date} className="review-submit-list-item">
                            <Text fontSize="T100">{date}</Text>
                          </li>
                        ))
                      }
                    </ul>
                  </Col>
                  <Col>
                    <Text fontWeight="bold" fontSize="T100">
                      {t("BB-review-submit-pre-hire-appointment-time-label", "Time")}
                    </Text>
                    <ul>
                      {
                        applicationData.nhePreference?.preferredNHETimeIntervals.map(timeSlot => (
                          <li key={timeSlot} className="review-submit-list-item">
                            <Text fontSize="T100">{timeSlot}</Text>
                          </li>
                        ))
                      }
                    </ul>
                  </Col>
                </Col>
              </Card>
            </Col>
          )
        }
      </Col>
      <CustomModal shouldOpen={showWithDrawModal} setShouldOpen={setShowWithdrawModal}>
        <Col padding="S300" gridGap="S300">
          <H4 fontWeight="bold" textAlign="center">
            {t("BB-review-submit-withdraw-existing-application-notice-title", "Withdraw existing application?")}
          </H4>
          <Col padding={{ top: "S300" }} gridGap="S300">
            <Text>
              {t("BB-review-submit-withdraw-existing-application-notice-content-text", "You already have other active job application(s). If you submit this job application, your other job application(s) will be withdrawn. Would you like to submit this job application and withdraw other job application(s)?")}
            </Text>
            <Col
              padding={{ top: "S400" }}
              gridGap="S400"
            >
              <Button onClick={() => {
                goToCandidateDashboard();
                setShowWithdrawModal(false);
              }}
              >
                {t("BB-review-submit-withdraw-existing-application-go-to-dashboard-button", "No, go to existing application")}
              </Button>
              <Button
                variant={ButtonVariant.Primary}
                onClick={() => {
                  bulkWithdrawAndSubmitApplication(activeApplicationsTobeWithdrawn, () => {
                    applicationData && submitApplication(applicationData);
                  });
                  setShowWithdrawModal(false);
                }}
              >
                {t("BB-review-submit-withdraw-existing-application-notice-submit-application-button", "Yes, Submit new application")}
              </Button>
            </Col>
          </Col>
        </Col>
      </CustomModal>
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