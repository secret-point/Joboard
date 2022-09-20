import React from "react";
import {
  IconCalendarFill, IconClock, IconHourGlass,
  IconClockFill,
  IconGlobe,
  IconPaymentFill,
  IconMail,
  IconSize
} from '@amzn/stencil-react-components/icons';
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import { renderScheduleFullAddress, getFeatureFlagValue, getLocale } from "../../../utils/helper";
import { Schedule } from "../../../utils/types/common";
import { localeToLanguageList } from "../../../utils/constants/common";
import { FEATURE_FLAG } from "../../../utils/enums/common";
import { translate as t } from "../../../utils/translator";
import moment from "moment";

interface ScheduleDetailsProps {
  scheduleDetail: Schedule,
}

const ScheduleDetails = (props: ScheduleDetailsProps) => {

  const { scheduleDetail } = props;
  const requiredLanguages = scheduleDetail.requiredLanguage || [];
  const showRequiredLanguages = getFeatureFlagValue(FEATURE_FLAG.MLS) && requiredLanguages?.length > 0;

  const {
    hoursPerWeek,
    firstDayOnSite,
    firstDayOnSiteL10N,
    currencyCode,
    employmentType,
    scheduleText,
    employmentTypeL10N,
    totalPayRate,
    totalPayRateL10N
  } = scheduleDetail;

  const startDate = firstDayOnSiteL10N ? `${moment(firstDayOnSiteL10N,"MMM DD, YYYY" ).locale(getLocale()).format('MMM DD, YYYY')}`: firstDayOnSite;

  const renderRequiredLanguages = (schedule: Schedule): string => {
      const languageList: string[] = [];
      localeToLanguageList.forEach((item) => requiredLanguages?.includes(item.locale) ? languageList.push(t(item.translationKey, item.language)) : null);

      return languageList.join(', ');
  }

  return (
    <Col gridGap={8} width="95%">
      <Row gridGap={5} alignItems="center">
          <IconCalendarFill size={IconSize.ExtraSmall} />
          <Text fontSize="T200" fontWeight='bold'>{t("BB-Schedule-card-start-date","Start Date")}: </Text>
          <Text fontSize="T100">{startDate}</Text>
      </Row>

      <Row gridGap={5} alignItems="center">
          <IconClockFill size={IconSize.ExtraSmall} />
          <Text fontSize="T200" fontWeight='bold'>{t("BB-Schedule-card-shift","Shift")}: </Text>
          <Text fontSize="T100">{scheduleText}</Text>
      </Row>

      <Row gridGap={5} alignItems="center">
          <IconPaymentFill size={IconSize.ExtraSmall} />
          <Text fontSize="T200" fontWeight='bold'>{t("BB-Schedule-card-pay-rate","Pay rate")}: </Text>
          <Text fontSize="T100">{totalPayRateL10N || `${currencyCode}${totalPayRate}`} {t("BB-Schedule-card-total-pay-per-hour-text", "/hour")}</Text>
      </Row>

      <Row gridGap={5} alignItems="center">
          <IconHourGlass size={IconSize.ExtraSmall} />
          <Text fontSize="T200" fontWeight='bold'>{t("BB-Schedule-card-hours","Hours")}: </Text>
          <Text fontSize="T100">{hoursPerWeek} {t("BB-Schedule-card-hours-per-week-text", "hours/week")}</Text>
      </Row>

        {employmentTypeL10N ?
            <Row gridGap={5} alignItems="center">
                <IconClock size={IconSize.ExtraSmall}/>
                <Text fontSize="T200" fontWeight='bold'>{t("BB-Schedule-card-duration", "Duration")}: </Text>
                <Text fontSize="T100">{employmentTypeL10N || employmentType}</Text>
            </Row> : null
        }

        { showRequiredLanguages &&
            <Row gridGap={5} alignItems="center">
                <IconGlobe size={IconSize.ExtraSmall} />
                <Text fontSize="T200" fontWeight='bold'>{t(`BB-Schedule-card-languages-supported`, `Languages Supported`)}: </Text>
                <Text fontSize="T100">{renderRequiredLanguages(scheduleDetail)}</Text>
            </Row>
        }

      <Row gridGap={5} alignItems="center">
          <IconMail size={IconSize.ExtraSmall} />
          <Text fontSize="T200" fontWeight='bold'>{t("BB-Schedule-card-location","Location")}: </Text>
          <Text fontSize="T100">{renderScheduleFullAddress(scheduleDetail)}</Text>
      </Row>
    </Col>
  )
}

export default ScheduleDetails;
