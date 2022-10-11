import React from "react";
import {
    IconArrowRight,
    IconCalendarFill,
    IconClockFill,
    IconDocument,
    IconGlobe,
    IconPaymentFill,
    IconSize
} from '@amzn/stencil-react-components/icons';
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Link } from "@amzn/stencil-react-components/link";
import { Text } from "@amzn/stencil-react-components/text";
import { renderScheduleFullAddress, routeToAppPageWithPath } from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import { Schedule } from "../../../utils/types/common";
import { PAGE_ROUTES } from "../../pageRoutes";
import VideoContainer from "../VideoContainer";

interface JobConfirmationCardProps {
    schedule: Schedule;
}

const JobConfirmationCard = ( props: JobConfirmationCardProps ) => {
    const { schedule } = props;
    const { JOB_DESCRIPTION } = PAGE_ROUTES;

    const {
        hoursPerWeek,
        firstDayOnSite,
        currencyCode,
        scheduleText,
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
                        <IconClockFill size={IconSize.ExtraSmall} aria-hidden={true} />
                        <Text fontSize="T100">{scheduleText}</Text>
                    </Row>
                    <Row gridGap={5} alignItems="center">
                        <IconCalendarFill size={IconSize.ExtraSmall} aria-hidden={true} />
                        <Text fontSize="T100">
                            {`${t(`BB-Schedule-card-possible-start-date-text`, `Possible Start Date:`)} ${firstDayOnSite} `}
                            <b>{t("BB-Schedule-card-possible-start-date-or-earlier-text", "(or earlier!)")}</b></Text>
                    </Row>
                    <Row gridGap={5} alignItems="center">
                        <IconPaymentFill size={IconSize.ExtraSmall} aria-hidden={true} />
                        <Text fontSize="T100">{`${currencyCode}${totalPayRate} /hr`}</Text>
                    </Row>
                    <Row gridGap={5} alignItems="center">
                        <IconDocument size={IconSize.ExtraSmall} aria-hidden={true} />
                        <Text fontSize="T100">{`${hoursPerWeek}hrs/wk`}</Text>
                    </Row>
                    <Row gridGap={5} alignItems="center">
                        <IconGlobe size={IconSize.ExtraSmall} aria-hidden={true} />
                        <Text fontSize="T100">{renderScheduleFullAddress(schedule)}</Text>
                    </Row>
                </Col>
            </Row>
            {
                scheduleBannerText &&
                <Row
                  padding={{ left: 'S300', right: 'S300', bottom: 'S300' }}
                  className="scheduleBannerText"
                >
                    <Text fontSize='T100'>{scheduleBannerText}</Text>
                </Row>
            }
            <Row
                gridGap={8}
                alignItems="center"
                padding={'S200'}
                className='jobDetailLink'
                onClick={() => {
                    routeToAppPageWithPath(JOB_DESCRIPTION);
                }}
            >
                <Text fontWeight="medium">
                    {t('BB-JobOpportunity-go-to-jobDescription-link', 'Job requirement and benefits')}
                </Text>
                <IconArrowRight size={IconSize.ExtraSmall} aria-hidden={true} />
            </Row>
        </Col>
    )
}

export default JobConfirmationCard;
