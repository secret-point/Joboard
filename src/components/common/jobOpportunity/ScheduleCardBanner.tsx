import React from 'react';
import { Row } from "@amzn/stencil-react-components/layout";
import { getCountryCode, getCountryConfig } from '../../../countryExpansionConfig';
import { translate as t } from "../../../utils/translator";

interface ScheduleCardBannerProps {
  currencyCode: string;
  signOnBonus: number;
  signOnBonusL10N: string;
}

export const ScheduleCardBanner = (props: ScheduleCardBannerProps) => {
  const { currencyCode, signOnBonus, signOnBonusL10N } = props;

  const { renderScheduleCardBanner } = getCountryConfig(getCountryCode());

  return (
    <Row className="scheduleCardBanner">
      <div>
        {t("BB-Schedule-card-bonus-text", "Bonus:")} {renderScheduleCardBanner(currencyCode, signOnBonus, signOnBonusL10N)}
      </div>
    </Row>
  )
}

export default ScheduleCardBanner;
