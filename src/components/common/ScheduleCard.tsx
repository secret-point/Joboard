import React from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Image } from "@amzn/hvh-candidate-application-ui-components";
import { Text } from "@amzn/stencil-react-components/text";
import ScheduleCardBanner from "./ScheduleCardBanner";
import { CommonColors } from "../../utils/colors";
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

interface ScheduleCardProps {
    //TODO will define props after integration
}

const ScheduleCard = ( props: ScheduleCardProps ) => {

    return (
        <Col className="scheduleCardContainer" padding={{ bottom: 'S200' }}>
            <Row className="scheduleCardHeader" gridGap={12} padding="S200" backgroundColor={CommonColors.Neutral10}>
                <Col className="scheduleCardBannerContainer" gridGap={4}>
                    <Image
                        src="https://m.media-amazon.com/images/G/01/HVHJobDetails/I_Sortation_Center_Associate._CB639922427_.svg"/>
                    <ScheduleCardBanner/>
                </Col>
                <Col width="auto" gridGap={10}>
                    <Text fontSize='T200'>Amazon Warehouse Tools</Text>
                    <Text fontSize='T100'>Work at Delivery Station</Text>
                </Col>
            </Row>
            <Row padding="S200" alignItems="center">
                <Col gridGap={6} width="95%">
                    <Row gridGap={5} alignItems="center">
                        <IconClockFill size={IconSize.ExtraSmall}/>
                        <Text fontSize="T100">Sat, sun, Mon, Tue, Wed 09:30am - 02:15pm</Text>
                    </Row>
                    <Row gridGap={5} alignItems="center">
                        <IconCalendarFill size={IconSize.ExtraSmall}/>
                        <Text fontSize="T100">Posible Start Date: 2029-02-03 <b>(or earlier!)</b></Text>
                    </Row>
                    <Row gridGap={5} alignItems="center">
                        <IconPaymentFill size={IconSize.ExtraSmall}/>
                        <Text fontSize="T100">USD17.00 /hr</Text>
                    </Row>
                    <Row gridGap={5} alignItems="center">
                        <IconDocument size={IconSize.ExtraSmall}/>
                        <Text fontSize="T100">23hrs/wk</Text>
                    </Row>
                    <Row gridGap={5} alignItems="center">
                        <IconGlobe size={IconSize.ExtraSmall}/>
                        <Text fontSize="T100">1414 S Council Rd, Oklahoma City, OK 73179</Text>
                    </Row>
                </Col>
                <Col>
                    <IconChevronRight/>
                </Col>
            </Row>
            <Row padding={{ left: 'S200', right: 'S200' }}>
                <Link fontSize='T100'>Additional $30 bonus schedule and 25$ Surge pay</Link>
            </Row>
        </Col>
    )
}

export default ScheduleCard;
