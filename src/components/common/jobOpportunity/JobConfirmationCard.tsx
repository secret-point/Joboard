import React from "react";
import {
  IconArrowRight,
  IconCalendarFill,
  IconClockFill,
  IconDocument,
  IconGlobe,
  IconPaymentFill,
  IconSize
} from "@amzn/stencil-react-components/icons";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import { PayRateType } from "../../../countryExpansionConfig";
import {
  formatMonthlyBasePayHelper,
  getCountryCode,
  getPayRateCountryConfig,
  renderScheduleFullAddress,
  routeToAppPageWithPath
} from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import { Schedule } from "../../../utils/types/common";
import { PAGE_ROUTES } from "../../pageRoutes";
import VideoContainer from "../VideoContainer";
import ScheduleDetails from "./ScheduleDetails";
import { getScheduleInUKFormat } from "../../../helpers/schedule-helper";
import { CountryCode } from "../../../utils/enums/common";

interface JobConfirmationCardProps {
  schedule: Schedule;
}

const JobConfirmationCard = ( props: JobConfirmationCardProps ) => {
  let { schedule } = props;
  const { JOB_DESCRIPTION } = PAGE_ROUTES;

  // TODO: this is a temporary solution to the fact that in the US and MX the schedule details have a different format in the jobOpportunity page and and the jobConfirmation page whereas in the UK they have the same format. 
  const isUk = getCountryCode() === CountryCode.UK ;
  schedule = isUk ? getScheduleInUKFormat(schedule): schedule;

  const {
    hoursPerWeek,
    firstDayOnSite,
    currencyCode,
    scheduleText,
    totalPayRate,
    jobPreviewVideo,
    scheduleBannerText,
    monthlyBasePay,
    monthlyBasePayL10N,
    totalPayRateL10N
  } = schedule;

  const renderPayRateByLocale = () => {
    if (getPayRateCountryConfig(getCountryCode()).payRateType === PayRateType.monthMax) {
      const monthlyRate = monthlyBasePayL10N ? monthlyBasePayL10N : formatMonthlyBasePayHelper(monthlyBasePay, currencyCode);
      const formattedMonthlyRate = currencyCode && monthlyRate ? `${currencyCode}${monthlyRate}` : null;
      return formattedMonthlyRate ? `${formattedMonthlyRate}/${t("BB-JobOpportunity-pay-rate-month", "month", { formattedMonthlyRate })}` : t("BB-Schedule-card-not-applicable", "N/A");
    } 
    return `${totalPayRateL10N || currencyCode + totalPayRate} /${t("BB-JobOpportunity-pay-rate-hr", "hr")}`;
        
  };

  return (
    <Col className="jobConfirmationCardContainer">
      <Row className="jobConfirmationHeader" gridGap={12}>
        <VideoContainer
          id="jobVideo"
          src={jobPreviewVideo}
        />
      </Row>
      {
        isUk ?
          <Row padding={"S300"}><ScheduleDetails scheduleDetail={schedule} /></Row> : (
            <Row padding="S300" alignItems="center">
              <Col gridGap={8} width="95%">
                <Row gridGap={5} alignItems="center">
                  <IconClockFill size={IconSize.ExtraSmall} aria-hidden />
                  <Text fontSize="T100">{scheduleText}</Text>
                </Row>
                <Row gridGap={5} alignItems="center">
                  <IconCalendarFill size={IconSize.ExtraSmall} aria-hidden />
                  <Text fontSize="T100">
                    {`${t("BB-Schedule-card-possible-start-date-text", "Possible Start Date:")} ${firstDayOnSite} `}
                    <b>{t("BB-Schedule-card-possible-start-date-or-earlier-text", "(or earlier!)")}</b>
                  </Text>
                </Row>
                <Row gridGap={5} alignItems="center">
                  <IconPaymentFill size={IconSize.ExtraSmall} aria-hidden />
                  <Text fontSize="T100">{renderPayRateByLocale()}</Text>
                </Row>
                <Row gridGap={5} alignItems="center">
                  <IconDocument size={IconSize.ExtraSmall} aria-hidden />
                  <Text fontSize="T100">{hoursPerWeek} {t("BB-Schedule-card-hours-per-week-text", "hours/week")}</Text>
                </Row>
                <Row gridGap={5} alignItems="center">
                  <IconGlobe size={IconSize.ExtraSmall} aria-hidden />
                  <Text fontSize="T100">{renderScheduleFullAddress(schedule)}</Text>
                </Row>
              </Col>
            </Row>
          )}
      {
        scheduleBannerText && (
          <Row
            padding={{ left: "S300", right: "S300", bottom: "S300" }}
            className="scheduleBannerText"
          >
            <Text fontSize="T100">{scheduleBannerText}</Text>
          </Row>
        )}
      <Row
        gridGap={8}
        alignItems="center"
        padding={"S200"}
        className="jobDetailLink"
        onClick={() => {
          routeToAppPageWithPath(JOB_DESCRIPTION);
        }}
      >
        <Text fontWeight="medium">
          {t("BB-JobOpportunity-go-to-jobDescription-link", "Job requirement and benefits")}
        </Text>
        <IconArrowRight size={IconSize.ExtraSmall} aria-hidden />
      </Row>
    </Col>
  );
};

export default JobConfirmationCard;
