import React from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import { Card } from "@amzn/stencil-react-components/card";
import { Text } from "@amzn/stencil-react-components/text";
import { NHEPreferences } from "../../../utils/types/common";
import { translate as t } from "../../../utils/translator";

interface NhePreferenceReviewProps {
  nhePreference: NHEPreferences;
}

export const NhePreferenceReview = (props: NhePreferenceReviewProps) => {
  const { nhePreference } = props;
  const { locations, preferredNHEDates, preferredNHETimeIntervals } = nhePreference;

  return (
    <Card width="100%" padding="S300" isElevated>
      <Col width="100%" padding="S300" gridGap={15}>
        <Text fontSize="T400" fontWeight="bold">
          {t("BB-nhe-preference-review-title-text", "Pre-hire appointment preferences")}
        </Text>
        <Text fontWeight="bold">
          {t("BB-nhe-preference-review-preferred-city-text", "Preferred city")}
        </Text>
        <ul className="ul-list">
          {
            locations?.map(location => (
              <li key={location}><Text fontSize="T200">{location}</Text></li>
            ))
          }
        </ul>
        <Text fontWeight="bold">
          {t("BB-nhe-preference-review-preferred-dates-text", "Preferred date(s)")}
        </Text>
        <ul className="ul-list">
          {
            preferredNHEDates?.map(date => (
              <li key={date}><Text fontSize="T200">{date}</Text></li>
            ))
          }
        </ul>
        <Text fontWeight="bold">
          {t("BB-nhe-preference-review-preferred-times-text", "Preferred time(s)")}
        </Text>
        <ul className="ul-list">
          {
            preferredNHETimeIntervals?.map(time => (
              <li key={time}><Text fontSize="T200">{time}</Text></li>
            ))
          }
        </ul>
      </Col>
    </Card>
  );
};

export default NhePreferenceReview;
