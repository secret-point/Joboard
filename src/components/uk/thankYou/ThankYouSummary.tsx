import React, { useEffect } from "react";
import { ButtonVariant } from "@amzn/stencil-react-components/button";
import { Card } from "@amzn/stencil-react-components/card";
import { FlyoutContent, RenderFlyoutFunctionParams, WithFlyout } from "@amzn/stencil-react-components/flyout";
import { IconArrowRight, IconSize } from "@amzn/stencil-react-components/icons";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import InnerHTML from "dangerously-set-html-content";
import queryString from "query-string";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  redirectToDashboard,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { ApplicationState } from "../../../reducers/application.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { JobState } from "../../../reducers/job.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { CommonColors } from "../../../utils/colors";
import {
  checkAndBoundGetApplication,
  formatDate,
  getLocale,
  initiateScheduleDetailOnPageLoad
} from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import DebouncedButton from "../../common/DebouncedButton";
import { PAGE_ROUTES } from "../../pageRoutes";
import NhePreferenceReview from "../../common/nhe/NhePreferenceReview";

interface MapStateToProps {
  application: ApplicationState;
  candidate: CandidateState;
  schedule: ScheduleState;
  job: JobState;
}

export const ThankYouSummary = (props: MapStateToProps) => {
  const { application, candidate, schedule, job } = props;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId, jobId, scheduleId } = queryParams;
  const applicationData = application.results;
  const { scheduleDetail } = schedule.results;
  const { candidateData, shiftPreferencesData: candidateShiftPreferences } = candidate.results;
  const jobDetail = job.results;
  const nheAppointment = applicationData?.nheAppointment;
  const location = applicationData?.nheAppointment?.location;
  const startTime = nheAppointment?.startTime;
  const endTime = nheAppointment?.endTime;

  useEffect(() => {
    // Refresh and add scheduleId in the url from the jobSelected if it doesn't exist from the query param
    if (!scheduleId && applicationData) {
      initiateScheduleDetailOnPageLoad(applicationData, PAGE_ROUTES.THANK_YOU);
    }
  }, [applicationData]);

  useEffect(() => {
    boundGetCandidateInfo();
  }, []);

  useEffect(() => {
    checkAndBoundGetApplication(applicationId);
  }, [applicationId]);

  useEffect(() => {
    scheduleId && scheduleId!== scheduleDetail?.scheduleId && boundGetScheduleDetail({
      locale: getLocale(),
      scheduleId: scheduleId
    });
  }, [scheduleDetail, scheduleId]);

  useEffect(() => {
    if (jobId) {
      jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() });
    }
  }, [jobDetail, jobId]);

  useEffect(() => {
    jobDetail && applicationData && candidateData && scheduleDetail && addMetricForPageLoad(pageName);

  }, [jobDetail, applicationData, candidateData, scheduleDetail, pageName]);

  useEffect(() => {
    return () => {
      // reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    };
  }, [pageName]);

  const handleGoToDashboard = () => {
    redirectToDashboard();
  };

  const renderNheAppointmentDetails = () => {
    return (
      <>
        <Text fontSize="T300" fontWeight="bold">
          {t("BB-Kondo-ThankYou-nhe-appointment-details-title-text", "Pre-hire appointment details")}
        </Text>

        <Text fontSize="T100">
          {t("BB-Kondo-ThankYou-nhe-appointment-details-date-label", "Date")}: {formatDate(nheAppointment?.dateWithoutFormat, {
            defaultDateFormat: "DD/MM/yyyy",
            displayFormat: "dddd, D MMM"
          })}
        </Text>
        <Text fontSize="T100">
          {t("BB-Kondo-ThankYou-nhe-appointment-details-time-label", "Time")}: {`${startTime} - ${endTime}`}
        </Text>
        <Text fontSize="T100">
          {t("BB-Kondo-ThankYou-nhe-appointment-details-meeting-details-label", "Meeting details")}: {location && `${location.streetAddress} ${location.city} ${location.postalCode}, United Kingdom`}
        </Text>
      </>
    );
  };

  const renderFlyout = ({ close }: RenderFlyoutFunctionParams) => (
    <FlyoutContent
      titleText={t("BB-ThankYou-nhe-appointment-flyout-title-text", "Pre-hire appointment")}
      onCloseButtonClick={close}
    >
      <Col width="100%" padding="S300" gridGap={15}>
        {renderNheAppointmentDetails()}

        <Text fontSize="T300" fontWeight="bold">
          {t("BB-ThankYou-nhe-appointment-flyout-things-to-bring-text", "Things to bring")}
        </Text>
        <ul className="ul-list">
          <li>
            <Text fontSize="T100">
              {t("BB-ThankYou-nhe-appointment-flyout-original-unexpired-photoid-text", "Original unexpired photo ID")}
            </Text>
          </li>
          <li>
            <Text fontSize="T100">
              {t("BB-ThankYou-nhe-appointment-flyout-original-unexpired-work-authorization-document-text", "Original unexpired work authorization document")}
            </Text>
          </li>
        </ul>

        <Text fontSize="T100">
          <InnerHTML html={t("BB-Kondo-ThankYou-nhe-appointment-flyout-acceptable-documents-text", "Click <a href='https://glspub.s3-us-west-2.amazonaws.com/Work+Authorization/UK+Employee+Guide/index.html' target='_blank' rel='noopener noreferrer'>here</a> for a complete list of acceptable documents.")} />
        </Text>

        <Text fontSize="T300" fontWeight="bold">
          {t("BB-ThankYou-nhe-appointment-flyout-special-assistance-text", "Special assistance")}
        </Text>
        <Text fontSize="T100">
          <InnerHTML html={t("BB-Kondo-ThankYou-nhe-appointment-flyout-accommodations-assistance-text", "If you have a disability and consider that you may require an adjustment to Amazon's recruitment process, please contact us to discuss on 0808 164 9427 or by email at myapplication@amazon.co.uk")} />
        </Text>
      </Col>
    </FlyoutContent>
  );

  // temporarily look for either application OR candidate shift preferences at the thank-you summary so candidates
  // who may have submitted with application shift preferences but loaded when candidate shift preferences is toggled
  // on still get the correct experience
  const hasShiftPreferences = applicationData?.shiftPreference ?? candidateShiftPreferences;
  return (
    <Col gridGap="S300" padding={{ top: "S300" }}>

      {/* when shift preference selected and no shift selected, https://sim.amazon.com/issues/Kondo_QA_Issue-51 */}
      { !applicationData?.jobScheduleSelected.scheduleId && hasShiftPreferences && (
        <Col gridGap="S300">
          <Text fontSize="T400">
            {t("BB-Kondo-ThankYou-with-shift-preference-title-text", "Thank you for submitting your shift preferences!")}
          </Text>
          <Text>
            {t("BB-Kondo-ThankYou-with-shift-preference-content-text", "We'll contact you as soon as we find a shift that works for you with your chosen preferences.")}
          </Text>
        </Col>
      )}

      {/* when shift is selected and nhePreference selected */}
      { scheduleDetail && applicationData?.nhePreference && !applicationData?.nheAppointment && (
        <Col gridGap="S300">
          <Text fontSize="T400">
            {t("BB-Kondo-ThankYou-with-nhe-preference-title-text", "Thank you for submitting your pre-hire appointment preferences!")}
          </Text>
          <Text fontSize="T200">
            {t("BB-Kondo-ThankYou-with-nhe-preference-content-text", "We'll contact you as soon as we find a pre-hire appointment that works for you with your chosen preferences.")}
          </Text>
          <NhePreferenceReview nhePreference={applicationData?.nhePreference} />
        </Col>
      )}

      {/* when shift is selected and nhe appointment is selected */}
      { scheduleDetail && applicationData?.nheAppointment && (
        <Col gridGap="S300">
          <Text fontSize="T400">
            {t("BB-ThankYou-thank-you-title-text", "Thank you for applying to Amazon!")}
          </Text>
          <Text fontSize="T200">
            {t("BB-Kondo-ThankYou-description-text", "You will receive an email from us providing further information on the next steps in your application. We look forward to seeing you at your pre-hire appointment.")}
          </Text>

          <Card width="100%" padding="S300" isElevated>
            <Col width="100%" padding="S300" gridGap={15}>
              {renderNheAppointmentDetails()}

              <Row className="border-top-row">
                <WithFlyout renderFlyout={renderFlyout}>
                  {({ open }) => (
                    <Col alignItems="flex-start">
                      <Text
                        color={CommonColors.Blue70}
                        style={{ cursor: "pointer" }}
                        fontWeight="bold"
                        onClick={open}
                      >
                        <Row
                          gridGap={8}
                          alignItems="center"
                        >
                          {t("BB-Kondo-ThankYou-more-details-text", "More details")}
                          <IconArrowRight size={IconSize.ExtraSmall} aria-hidden />
                        </Row>
                      </Text>
                    </Col>
                  )}
                </WithFlyout>
              </Row>
            </Col>
          </Card>
        </Col>
      )}

      <DebouncedButton variant={ButtonVariant.Primary} onClick={handleGoToDashboard}>
        {t("BB-Kondo-ThankYou-return-to-dashboard-text", "Return to dashboard")}
      </DebouncedButton>
    </Col>
  );
};

export const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(ThankYouSummary);
