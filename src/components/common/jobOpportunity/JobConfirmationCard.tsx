import React from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import {
    IconArrowRight,
    IconCalendarFill,
    IconClockFill,
    IconDocument,
    IconGlobe,
    IconPaymentFill,
    IconSize
} from '@amzn/stencil-react-components/icons';
import { Link } from "@amzn/stencil-react-components/link";
import VideoContainer from "../VideoContainer";
import { boundSetJobOpportunityPage } from "../../../actions/UiActions/boundUi";
import { JOB_OPPORTUNITY_PAGE } from "../../../utils/enums/common";
import { Schedule } from "../../../utils/types/common";
import { translate as t } from "../../../utils/translator";

interface JobConfirmationCardProps {
    schedule: Schedule
}

const JobConfirmationCard = ( props: JobConfirmationCardProps ) => {
    const { schedule } = props;

    const {
        hoursPerWeek,
        firstDayOnSite,
        currencyCode,
        postalCode,
        city,
        state,
        scheduleText,
        address,
        totalPayRate,
        jobPreviewVideo,
        scheduleBannerText
    } = schedule;

    return (
        <Col className="jobConfirmationCardContainer">
            <Row className="jobConfirmationHeader" gridGap={12}>
                <VideoContainer
                    id='jobVideo'
                    src={jobPreviewVideo}/>
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
                        <Text fontSize="T100">{`${address}, ${city}, ${state} ${postalCode}`}</Text>
                    </Row>
                </Col>
            </Row>
            {
                scheduleBannerText &&
                <Row padding={{ left: 'S300', right: 'S300', bottom: 'S300' }}>
                    <Link fontSize='T100'>{scheduleBannerText}</Link>
                </Row>
            }
            <Row
                gridGap={8}
                alignItems="center"
                padding={'S200'}
                className='jobDetailLink'
                onClick={() => {
                    boundSetJobOpportunityPage(JOB_OPPORTUNITY_PAGE.JOB_DESCRIPTION);
                }}
            >
                <Text fontWeight="medium">
                    {t('BB-JobOpportunity-go-to-jobDescription-link', 'Job requirement and benefits')}
                </Text>
                <IconArrowRight size={IconSize.ExtraSmall}/>
            </Row>
        </Col>
    )
}

export default JobConfirmationCard;
