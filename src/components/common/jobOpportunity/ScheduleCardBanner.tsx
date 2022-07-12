import React from 'react';
import { Row } from "@amzn/stencil-react-components/layout";
import { translate as t } from "../../../utils/translator";

interface ScheduleCardBannerProps {
  currencyCode: string;
  signOnBonus: number;
  signOnBonusL10N: string;
}

const ScheduleCardBanner = (props: ScheduleCardBannerProps) => {
  const { currencyCode, signOnBonus, signOnBonusL10N } = props;

  return (
    <Row className="scheduleCardBanner">
      <div>
        {t("BB-Schedule-card-bonus-text", "Bonus:")} {signOnBonusL10N || `${currencyCode}${signOnBonus}`}
      </div>
    </Row>
  )
}

export default ScheduleCardBanner;
