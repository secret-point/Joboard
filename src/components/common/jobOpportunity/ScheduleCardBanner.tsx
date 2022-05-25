import React from 'react';
import { Row } from "@amzn/stencil-react-components/layout";

interface ScheduleCardBannerProps {
    currencyCode: string;
    signOnBonus: number;
}

const ScheduleCardBanner = ( props: ScheduleCardBannerProps ) => {
    const { currencyCode, signOnBonus } = props;

    return (
        <Row className="scheduleCardBanner">
            <div>{`Bonus: ${currencyCode}${signOnBonus}`}</div>
        </Row>
    )
}

export default ScheduleCardBanner;
