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
  checkAndBoundGetApplication, formatDate, getLocale
} from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import DebouncedButton from "../../common/DebouncedButton";

interface MapStateToProps {
  application: ApplicationState;
  candidate: CandidateState;
  schedule: ScheduleState;
  job: JobState;
}

export const ThankYou = (props: MapStateToProps) => {
  const { application, candidate, schedule, job } = props;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId, jobId, scheduleId } = queryParams;
  const applicationData = application.results;
  const { scheduleDetail } = schedule.results;
  const { candidateData } = candidate.results;
  const jobDetail = job.results;
  const nheAppointment = applicationData?.nheAppointment;
  const location = applicationData?.nheAppointment?.location;
  const startTime = nheAppointment?.startTime;
  const endTime = nheAppointment?.endTime;

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
          {formatDate(nheAppointment?.dateWithoutFormat, {
            defaultDateFormat: "DD/MM/yyyy",
            displayFormat: "ddd MMM DD"
          })}
        </Text>

        <Text fontSize="T100" fontWeight="bold">
          {location && `${location.streetAddress} ${location.city} ${location.state} ${location.postalCode}`}
        </Text>

        <Text fontSize="T100" color={CommonColors.Neutral70}>
          {t("BB-ThankYou-nhe-appointment-details-visit-us-text", `Visit us for a 30 minute session anytime between ${startTime} - ${endTime}.`, { startTime: startTime, endTime: endTime })}
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
        <Text fontSize="T200">
          {t("BB-ThankYou-nhe-appointment-flyout-appointment-details-title-text", "Appointment details")}
        </Text>

        {renderNheAppointmentDetails()}

        <Text fontSize="T300">
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

        <Text fontSize="T300">
          {t("BB-ThankYou-nhe-appointment-flyout-special-assistance-text", "Special assistance")}
        </Text>
        <Text fontSize="T100">
          <InnerHTML html={t("BB-Kondo-ThankYou-nhe-appointment-flyout-accommodations-assistance-text", "If you have a disability and consider that you may require an adjustment to Amazon's recruitment process, please contact us to discuss on 0808 164 9427 or by email at myapplication@amazon.co.uk")} />
        </Text>
      </Col>
    </FlyoutContent>
  );

  return (
    <Col gridGap="S300" padding={{ top: "S300" }}>
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

      <DebouncedButton variant={ButtonVariant.Primary} onClick={handleGoToDashboard}>
        {t("BB-Kondo-ThankYou-return-to-dashboard-text", "Return to dashboard")}
      </DebouncedButton>
    </Col>
  );
};

export const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(ThankYou);
