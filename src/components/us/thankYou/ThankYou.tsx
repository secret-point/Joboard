import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { Card } from "@amzn/stencil-react-components/card";
import { FlyoutContent, RenderFlyoutFunctionParams, WithFlyout } from "@amzn/stencil-react-components/flyout";
import { DetailedRadio } from "@amzn/stencil-react-components/form";
import { IconArrowRight, IconSize } from "@amzn/stencil-react-components/icons";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import queryString from "query-string";
import InnerHTML from "dangerously-set-html-content";
import React, { ChangeEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { addMetricForPageLoad, postAdobeMetrics } from "../../../actions/AdobeActions/adobeActions";
import { boundUpdateApplicationDS } from "../../../actions/ApplicationActions/boundApplicationActions";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { onCompleteTaskHelper } from "../../../actions/WorkflowActions/workflowActions";
import {
  getPageNameFromPath,
  parseQueryParamsArrayToSingleItem,
  resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { ApplicationState } from "../../../reducers/application.reducer";
import { UpdateApplicationRequestDS } from "../../../utils/apiTypes";
import { CommonColors } from "../../../utils/colors";
import { UPDATE_APPLICATION_API_TYPE } from "../../../utils/enums/common";
import {
  checkAndBoundGetApplication,
  createUpdateApplicationRequest,
  formatDate, getLocale,
  validateUserId
} from "../../../utils/helper";
import { Application, FormInputItem } from "../../../utils/types/common";
import FormInputText from "../../common/FormInputText";
import Image from "../../common/Image";
import { translate as t } from "../../../utils/translator";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { JobState } from "../../../reducers/job.reducer";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import {boundResetBannerMessage} from "../../../actions/UiActions/boundUi";
import { METRIC_NAME } from "../../../constants/adobe-analytics";

interface MapStateToProps {
  application: ApplicationState;
  candidate: CandidateState,
  schedule: ScheduleState,
  job: JobState;
}

interface JobReferral {
  hasReferral: 'yes' | 'no';
  referralInfo?: string;
}

export const ThankYou = (props: MapStateToProps) => {
  const { application, candidate, schedule, job } = props;
  const { search, pathname } = useLocation();
  const pageName = getPageNameFromPath(pathname);
  const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
  const { applicationId, jobId, scheduleId } = queryParams;
  const applicationData = application.results;
  const scheduleDetail = schedule.results.scheduleDetail;
  const candidateData = candidate.results.candidateData;
  const jobDetail = job.results;
  const nheAppointment = applicationData?.nheAppointment;
  const location = applicationData?.nheAppointment?.location;

  const [hasReferral, setHasReferral] = useState(false);
  const [referralId, setReferralId] = useState("");

  const [formInputConfig, setFormInputConfig] = useState<FormInputItem>({
    hasError: false,
    labelText: "Please provide your referrer login ID (lower case letters only)",
    labelTranslationKey: "BB-ThankYou-referral-login-label-text",
    errorMessage: "Please provide your referrer login ID.",
    errorMessageTranslationKey: "BB-ThankYou-referral-login-empty-error-text",
    required: true,
    name: "referralInfo",
    id: "referral-employee-name",
    dataKey: "jobReferral.referralInfo",
    type: "text"
  });

  useEffect(() => {
    boundGetCandidateInfo();
  }, [])

  useEffect(() => {
    checkAndBoundGetApplication(applicationId);
  }, [applicationId]);

  useEffect(() => {
    scheduleId && scheduleId!== scheduleDetail?.scheduleId && boundGetScheduleDetail({
      locale: getLocale(),
      scheduleId: scheduleId
    })
  }, [scheduleDetail, scheduleId]);

  useEffect(() => {
    jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() })
  }, [jobDetail, jobId]);

  useEffect(() => {
    jobDetail && applicationData && candidateData && scheduleDetail && addMetricForPageLoad(pageName);

  }, [jobDetail, applicationData, candidateData, scheduleDetail, pageName]);

  useEffect(() => {
    return () => {
      //reset this so as it can emit new pageload event after being unmounted.
      resetIsPageMetricsUpdated(pageName);
    }
  },[pageName])

  const validateFormInput = (): boolean => {
    if (hasReferral) {
      let errorMessage = "";
      let errorMessageTranslationKey = "";

      if (!referralId) {
        errorMessage = "Please provide your referrer login ID.";
        errorMessageTranslationKey = "BB-ThankYou-referral-login-empty-error-text";
      } else if (!validateUserId(referralId)) {
        errorMessage = "User ID should contain only lower case letters and should be at least 4 letters long.";
        errorMessageTranslationKey = "BB-ThankYou-referral-login-regex-error-text";
      }

      if (errorMessage && errorMessageTranslationKey) {
        setFormInputConfig({
          ...formInputConfig,
          hasError: true,
          errorMessage,
          errorMessageTranslationKey
        });

        return false;
      }
    }

    return true;
  };

  const handleGetStarted = () => {
    boundResetBannerMessage();
    if (!validateFormInput()) {
      return;
    }

    if (applicationData) {
      const { THANK_YOU } = UPDATE_APPLICATION_API_TYPE;
      const jobReferral: JobReferral = {
        hasReferral: hasReferral ? "yes" : "no",
      };
      if (hasReferral) {
        jobReferral.referralInfo = referralId;
      }
      const payload = {
        jobReferral,
      };

      const request: UpdateApplicationRequestDS = createUpdateApplicationRequest(applicationData, THANK_YOU, payload);
      boundUpdateApplicationDS(request, (applicationData: Application) => {
        onCompleteTaskHelper(applicationData);
      });

      postAdobeMetrics({name: METRIC_NAME.THANK_YOU_SUBMIT});
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setReferralId(value);
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
          {t("BB-ThankYou-nhe-appointment-details-visit-us-text", "Visit us for a 30 minute session anytime between {startTime} - {endTime}.", { startTime: nheAppointment?.startTime, endTime: nheAppointment?.endTime })}
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
          <InnerHTML html={t("BB-ThankYou-nhe-appointment-flyout-acceptable-documents-text", "Click <a href='https://www.uscis.gov/i-9-central/form-i-9-acceptable-documents' target='_blank' rel='noopener noreferrer'>here</a> for a complete list of acceptable documents.")}/>
        </Text>

        <Text fontSize="T300">
          {t("BB-ThankYou-nhe-appointment-flyout-special-assistance-text", "Special assistance")}
        </Text>
        <Text fontSize="T100">
          <InnerHTML html={t("BB-ThankYou-nhe-appointment-flyout-accommodations-assistance-text", "If you require any accommodations, such as an ASL interpreter for the hiring event, please go to <a href='https://www.amazon.com/accommodations' target='_blank' rel='noopener noreferrer'>www.amazon.com/accommodations</a> and chat with us to request an interpreter. Please contact us immediately upon scheduling your appointment. We need at least 48 hours prior to your appointment to make arrangements.")}/>
        </Text>
      </Col>
    </FlyoutContent >
  );

  return (
    <Col gridGap="S300" padding={{ top: "S300" }}>
      <Image
        src="https://m.media-amazon.com/images/G/01/HVH-Kirin/BB/images/smiley_face.png"
        imgStyles={{ "width": "100%" }}
        aria-hidden="true"
      />
      <Image
        src="https://m.media-amazon.com/images/G/01/HVH-Kirin/BB/images/Icon1.png"
        aria-hidden="true"
        imgStyles={{
          "style": {
            "display": "block",
            "margin": "auto"
          }
        }}
      />

      <Text fontSize="T400" textAlign="center">
        {t("BB-ThankYou-thank-you-title-text", "Thank you for applying to Amazon!")}
      </Text>
      <Text fontSize="T100" textAlign="center">
        {t("BB-ThankYou-look-forward-next-steps-text", "We look forward to seeing you. Here are your next steps:")}
      </Text>

      <Card width="100%" padding="S300" isElevated={true}>
        <Col width="100%" padding="S300" gridGap={15}>
          <Text fontSize="T300" fontWeight="bold">
            {t("BB-ThankYou-referral-details-title-text", "Please provide referral details (if applicable)")}
          </Text>
          <Text fontSize="T200">
            {t("BB-ThankYou-referral-details-description-text", "Were you referred by an existing Amazon employee?")}
          </Text>

          <DetailedRadio
            name="has_referral-radio-col"
            titleText={t("BB-ThankYou-referral-details-yes-text", "Yes")}
            onChange={() => {
              setHasReferral(true);
            }}
          />
          <DetailedRadio
            name="has_referral-radio-col"
            titleText={t("BB-ThankYou-referral-details-no-text", "No")}
            onChange={() => {
              setHasReferral(false);
            }}
          />

          {
            hasReferral &&
            <FormInputText
              inputItem={formInputConfig}
              defaultValue=""
              handleChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
            />
          }

          <Text fontSize="T300" fontWeight="bold">
            {t("BB-ThankYou-start-pre-hire-activities-title-text", "Get started on pre-hire activities")}
          </Text>
          <Text fontSize="T100">
            {t("BB-ThankYou-fill-wotc-description-text", "Before your pre-hire appointment, fill out Work Opportunities Tax Credit Questionnaire.")}
          </Text>

          <Button variant={ButtonVariant.Primary} onClick={handleGetStarted}>
            {t("BB-ThankYou-get-started-button-text", "Let's get started")}
          </Button>
        </Col>
      </Card>

      <Card width="100%" padding="S300" isElevated={true}>
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
                      alignItems="center">
                      {t("BB-ThankYou-get-pre-hire-appointment-details-text", "Pre-hire appointment details")}
                      <IconArrowRight size={IconSize.ExtraSmall} />
                    </Row>
                  </Text>
                </Col>
              )}
            </WithFlyout>
          </Row>
        </Col>
      </Card>
    </Col >
  )
}

const mapStateToProps = (state: MapStateToProps) => {
  return state;
};

export default connect(mapStateToProps)(ThankYou);
