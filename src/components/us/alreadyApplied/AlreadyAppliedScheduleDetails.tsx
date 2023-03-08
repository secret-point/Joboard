import React from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import moment from "moment";
import { PayRateType } from "../../../countryExpansionConfig";
import { localeToLanguageList } from "../../../utils/constants/common";
import { FEATURE_FLAG } from "../../../utils/enums/common";
import {
  formatMonthlyBasePayHelper,
  getCountryCode,
  getFeatureFlagValue,
  getLocale,
  getPayRateCountryConfig,
  getSpanishLocaleDateFormatter,
  showRequiredLanguageByCountry
} from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import { Schedule } from "../../../utils/types/common";
import { Card } from "@amzn/stencil-react-components/card";

interface ScheduleDetailsProps {
  scheduleDetail: Schedule;
}

export const AlreadyAppliedScheduleDetails = (props: ScheduleDetailsProps) => {

  const { scheduleDetail } = props;
  const requiredLanguages = scheduleDetail?.requiredLanguage || [];
  const showRequiredLanguages = getFeatureFlagValue(FEATURE_FLAG.MLS) && requiredLanguages?.length > 0;

  const {
    hoursPerWeek,
    firstDayOnSite,
    currencyCode,
    scheduleText,
    totalPayRate,
    totalPayRateL10N,
    monthlyBasePay,
    monthlyBasePayL10N,
    scheduleBannerText
  } = scheduleDetail;

  const renderStartDate = () => {
    const startDate = `${moment(firstDayOnSite).locale(getLocale()).format("MMM DD, YYYY")}`;
    return getSpanishLocaleDateFormatter(startDate);
  };

  const renderRequiredLanguages = (): string => {
    const languageList: string[] = [];

    localeToLanguageList.forEach((item) => {
      requiredLanguages?.includes(item.locale) ? languageList.push(t(item.translationKey, item.language)) : null;
    });

    return languageList.join(", ");
  };

  const renderPayRateByLocale = () => {
    if (getPayRateCountryConfig(getCountryCode()).payRateType === PayRateType.monthMax) {
      const monthlyRate = monthlyBasePayL10N ? monthlyBasePayL10N : formatMonthlyBasePayHelper(monthlyBasePay, currencyCode);
      const formattedMonthlyRate = currencyCode && monthlyRate ? `${currencyCode}${monthlyRate}` : null;
      return formattedMonthlyRate ? t("BB-Schedule-card-total-pay-per-month-text", `Up to ${formattedMonthlyRate}/month`, { formattedMonthlyRate }) : t("BB-Schedule-card-not-applicable", "N/A");
    }
    return `${totalPayRateL10N || currencyCode + totalPayRate}`;

  };

  return (
    <Card padding="S300" flexDirection="column">
      <Col gridGap="S200">
        <Row gridGap="S300" alignItems="center">
          <Text fontSize="T100" fontWeight="bold">{t("BB-Schedule-card-hours", "Hours")}: </Text>
          <Text fontSize="T100">{hoursPerWeek} {t("BB-Schedule-card-hours-per-week-text", "hours/week")}</Text>
        </Row>

        <Row gridGap="S300" alignItems="center">
          <Text fontSize="T100">{scheduleText}</Text>
        </Row>

        {showRequiredLanguages && showRequiredLanguageByCountry(getCountryCode()) && (
          <Row gridGap="S300" alignItems="center">
            <Text fontSize="T100" fontWeight="bold">
              {t("BB-Schedule-card-languages-supported", "Languages Supported")}:
            </Text>
            <Text fontSize="T100">{renderRequiredLanguages()}</Text>
          </Row>
        )}
        <Row gridGap="S300" alignItems="center">
          <Row width="65%" gridGap="S300">
            <Text fontSize="T100" fontWeight="bold">{t("BB-Schedule-card-start-date", "Start Date")}: </Text>
            <Text fontSize="T100">{renderStartDate()}</Text>
          </Row>
          <Row width="%35">
            <Text fontSize="T300" fontWeight="bold">{renderPayRateByLocale()}</Text>
            <Row alignSelf="end"><Text fontSize="T100">{t("BB-Schedule-card-total-pay-per-hour-text", "/hour")}</Text></Row>
          </Row>
        </Row>
        { scheduleBannerText && (
          <Row padding={{ top: "S300" }} className="scheduleBannerText">
            <Text fontSize="T100">{scheduleBannerText}</Text>
          </Row>
        )}
      </Col>
    </Card>
  );
};

export default AlreadyAppliedScheduleDetails;
