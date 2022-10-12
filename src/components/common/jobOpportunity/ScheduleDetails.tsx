import React from "react";
import {
  IconCalendarFill,
  IconClock,
  IconClockFill,
  IconGlobe,
  IconHourGlass,
  IconPaymentFill,
  IconSize
} from "@amzn/stencil-react-components/icons";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import moment from "moment";
import { CommonColors } from "../../../utils/colors";
import { localeToLanguageList } from "../../../utils/constants/common";
import { FEATURE_FLAG } from "../../../utils/enums/common";
import {
  formatFlexibleTrainingDate,
  getFeatureFlagValue,
  getLocale,
  renderScheduleFullAddress,
  getLocaleDateFormatFix
} from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import { Schedule } from "../../../utils/types/common";
import { LocationIcon } from "../../../images";

interface ScheduleDetailsProps {
  scheduleDetail: Schedule;
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
    totalPayRateL10N,
    parsedTrainingDate
  } = scheduleDetail;

  const renderStartDate = () => {
    const startDate = `${moment(firstDayOnSiteL10N || firstDayOnSite).locale(getLocale()).format('MMM DD, YYYY')}`;
    return getLocaleDateFormatFix(startDate);
  }

  const shift = t("BB-Schedule-card-shift-required-dates","Required training dates");

  const renderShiftDate = () => {
    const datesList: string[] = [];
    const shiftDate = parsedTrainingDate?.split('\n')
    shiftDate?.forEach((item) => {
      const dateValue = formatFlexibleTrainingDate(item)
      datesList.push(dateValue)
    });

    return datesList.map( (dateItem) => (<Text fontSize="T100" key={dateItem}>{dateItem}</Text>))
  }

  const renderRequiredLanguages = (): string => {
    const languageList: string[] = [];

    localeToLanguageList.forEach((item) => {
      requiredLanguages?.includes(item.locale) ? languageList.push(t(item.translationKey, item.language)) : null;
    });

    return languageList.join(", ");
  };

  return (
    <Col gridGap={10} width="95%">
      <Row gridGap={10} alignItems="center">
        <IconCalendarFill size={IconSize.ExtraSmall} aria-hidden={true} />
        <Row gridGap={3} alignItems="center">
          <Text fontSize="T200" fontWeight='bold'>{t("BB-Schedule-card-start-date","Start Date")}: </Text>
          <Text fontSize="T100">{renderStartDate()}</Text>
        </Row>
      </Row>

      <Row gridGap={10} alignItems="center">
        <IconClockFill size={IconSize.ExtraSmall} aria-hidden={true} />
        <Row gridGap={3} alignItems="center">
          <Text fontSize="T200" fontWeight='bold'>{t("BB-Schedule-card-shift","Shift")}: </Text>
          <Text fontSize="T100">{scheduleText}</Text>
        </Row>
      </Row>

      {parsedTrainingDate &&
        <Col gridGap={5} alignItems="left" padding={{ left:'S400' }} >
          <Text fontSize="T200" style={{ fontStyle:"italic" }}>{shift}</Text>
          {renderShiftDate()}
        </Col>
      }

      <Row gridGap={10} alignItems="center">
        <IconPaymentFill size={IconSize.ExtraSmall} aria-hidden={true} />
        <Row gridGap={3} alignItems="center">
          <Text fontSize="T200" fontWeight='bold'>{t("BB-Schedule-card-pay-rate","Pay rate")}: </Text>
          <Text fontSize="T100">{totalPayRateL10N || `${currencyCode}${totalPayRate}`} {t("BB-Schedule-card-total-pay-per-hour-text", "/hour")}</Text>
        </Row>
      </Row>

      <Row gridGap={10} alignItems="center">
        <IconHourGlass size={IconSize.ExtraSmall} aria-hidden={true} />
        <Row gridGap={3} alignItems="center">
          <Text fontSize="T200" fontWeight='bold'>{t("BB-Schedule-card-hours","Hours")}: </Text>
          <Text fontSize="T100">{hoursPerWeek} {t("BB-Schedule-card-hours-per-week-text", "hours/week")}</Text>
        </Row>
      </Row>

      {employmentTypeL10N &&
        <Row gridGap={10} alignItems="center">
          <IconClock size={IconSize.ExtraSmall} aria-hidden={true} />
          <Row gridGap={3} alignItems="center">
            <Text fontSize="T200" fontWeight='bold'>{t("BB-Schedule-card-duration", "Duration")}: </Text>
            <Text fontSize="T100">{employmentTypeL10N || employmentType}</Text>
          </Row>
        </Row>
      }

      {showRequiredLanguages &&
      <Row gridGap={10} alignItems="center">
        <IconGlobe size={IconSize.ExtraSmall} aria-hidden={true} />
        <Row gridGap={3} alignItems="center">
          <Text fontSize="T200" fontWeight="bold">
            {t(`BB-Schedule-card-languages-supported`, `Languages Supported`)}:
          </Text>
          <Text fontSize="T100">{renderRequiredLanguages()}</Text>
        </Row>
      </Row>
      }

      <Row gridGap={10} alignItems="center">
        <Row>
          <img src={LocationIcon} height="20px" width="20px"/>
        </Row>
        <Row gridGap={3} alignItems="center">
          <Text fontSize="T200" fontWeight="bold">{t("BB-Schedule-card-location", "Location")}: </Text>
          <Text color={CommonColors.Blue70} fontSize="T100">{renderScheduleFullAddress(scheduleDetail)}</Text>
        </Row>
      </Row>
    </Col>
  )
}

export default ScheduleDetails;
