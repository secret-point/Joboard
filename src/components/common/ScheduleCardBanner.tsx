import React from 'react';
import { Row } from "@amzn/stencil-react-components/layout";

interface ScheduleCardBannerProps {

}

const ScheduleCardBanner = ( props: ScheduleCardBannerProps ) => {

    return (
        <Row className="scheduleCardBanner">
            <div>Bonus: USD30</div>
        </Row>
    )
}

export default ScheduleCardBanner;
