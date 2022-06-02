import React from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Image } from "@amzn/hvh-candidate-application-ui-components";
import { Text } from "@amzn/stencil-react-components/text";
import ScheduleCardBanner from "./ScheduleCardBanner";
import { CommonColors } from "../../../utils/colors";
import {
    IconCalendarFill,
    IconChevronRight,
    IconClockFill,
    IconDocument,
    IconGlobe,
    IconPaymentFill,
    IconSize
} from '@amzn/stencil-react-components/icons';
import { Link } from "@amzn/stencil-react-components/link";
import { QUERY_PARAMETER_NAME } from "../../../utils/enums/common";
import { QueryParamItem, Schedule } from "../../../utils/types/common";
import { renderScheduleFullAddress, routeToAppPageWithPath } from "../../../utils/helper";
import { JOB_CONFIRMATION } from "../../pageRoutes";

interface ScheduleCardProps {
    scheduleDetail: Schedule,
    displayOnly?: boolean
}

const ScheduleCard = ( props: ScheduleCardProps ) => {

    const { scheduleDetail, displayOnly } = props;

    const {
        image,
        bonusSchedule,
        hoursPerWeek,
        signOnBonus,
        firstDayOnSite,
        currencyCode,
        scheduleText,
        totalPayRate,
        tagLine,
        externalJobTitle,
        scheduleBannerText
    } = scheduleDetail;

    const handleClick = () => {
        if(!displayOnly) {
            const queryParamItem: QueryParamItem = {
                paramName: QUERY_PARAMETER_NAME.SCHEDULE_ID,
                paramValue: scheduleDetail.scheduleId
            }
            routeToAppPageWithPath(JOB_CONFIRMATION, [queryParamItem]);
        }
    }

    return (
        <Col
            className="scheduleCardContainer"
            padding={{ bottom: 'S300' }}
            onClick={handleClick}
        >
            <Row className="scheduleCardHeader" gridGap={12} padding="S300" backgroundColor={CommonColors.Neutral10}>
                <Col className="scheduleCardBannerContainer" gridGap={4}>
                    <Image
                        src={image}/>
                    {
                        bonusSchedule &&
                        <ScheduleCardBanner currencyCode={currencyCode} signOnBonus={signOnBonus}/>
                    }
                </Col>
                <Col width="auto" gridGap={10}>
                    <Text fontSize='T200'>{externalJobTitle}</Text>
                    <Text fontSize='T100'>{tagLine}</Text>
                </Col>
            </Row>
            <Row padding="S300" alignItems="center">
                <Col gridGap={8} width="95%">
                    <Row gridGap={5} alignItems="center">
                        <IconClockFill size={IconSize.ExtraSmall}/>
                        <Text fontSize="T100">{scheduleText}</Text>
                    </Row>
                    <Row gridGap={5} alignItems="center">
                        <IconCalendarFill size={IconSize.ExtraSmall}/>
                        <Text fontSize="T100">{`Possible Start Date: ${firstDayOnSite}`} <b>(or earlier!)</b></Text>
                    </Row>
                    <Row gridGap={5} alignItems="center">
                        <IconPaymentFill size={IconSize.ExtraSmall}/>
                        <Text fontSize="T100">{`${currencyCode}${totalPayRate} /hr`}</Text>
                    </Row>
                    <Row gridGap={5} alignItems="center">
                        <IconDocument size={IconSize.ExtraSmall}/>
                        <Text fontSize="T100">{`${hoursPerWeek}hrs/wk`}</Text>
                    </Row>
                    <Row gridGap={5} alignItems="center">
                        <IconGlobe size={IconSize.ExtraSmall}/>
                        <Text fontSize="T100">{renderScheduleFullAddress(scheduleDetail)}</Text>
                    </Row>
                </Col>
                {!displayOnly &&
                <Col>
                    <IconChevronRight/>
                </Col>}
            </Row>
            {
                scheduleBannerText &&
                <Row padding={{ left: 'S300', right: 'S300', bottom: 'S300' }}>
                    <Link fontSize='T100'>{scheduleBannerText}</Link>
                </Row>
            }
        </Col>
    )
}

export default ScheduleCard;
