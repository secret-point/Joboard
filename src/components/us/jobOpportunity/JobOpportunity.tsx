import React from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import StepHeader from "../../common/StepHeader";
import { Image } from "@amzn/hvh-candidate-application-ui-components";
import { IconArrowLeft, IconHourGlass, IconSize, IconSort } from '@amzn/stencil-react-components/icons';
import { Text } from "@amzn/stencil-react-components/text";
import ScheduleCard from "../../common/ScheduleCard";

const JobOpportunity = () => {
    return (
        <Col id='jobOpportunityContainer'>
            <StepHeader jobTitle="Amazon Associate" applicationStep="" stepAction="1. Select job"/>
            <Col id="jobOpportunityHeaderImageContainer">
                <Image
                    id="jobOpportunityHeaderImage"
                    src="https://m.media-amazon.com/images/G/01/HVH-CandidateApplication/jobs/20170525PrimeNowUWA2_15-min.jpg"
                    aria-hidden="true"
                />
                <Col id="jobOpportunityHeaderImageOverlay">
                    {/*May need to add overlay content in future*/}
                </Col>
            </Col>

            <Col padding='S300'>
                <Row>
                    <Row className="backToJobDashboardLink" gridGap={5}>
                        <IconArrowLeft size={IconSize.ExtraSmall} fontSize='T100'/>
                        <Text fontWeight="medium" fontSize='T200'>Go Back to Jobs Dashboard</Text>
                    </Row>
                </Row>

                <Col className="scheduleListContainer" padding={{ top: 'S500' }}>
                    <Row className="scheduleListActionContainer">
                        <Row className="scheduleListActionItem" gridGap={5}>
                            <IconHourGlass size={IconSize.ExtraSmall} fontSize='T100'/>
                            <Text fontWeight="medium" fontSize='T100'>Filter</Text>
                        </Row>
                        <Row className="scheduleListActionItem" gridGap={5}>
                            <IconSort size={IconSize.ExtraSmall} fontSize='0.8em'/>
                            <Text fontWeight="medium" fontSize='0.8em'>Sort</Text>
                        </Row>
                    </Row>

                    <ScheduleCard/>
                    <ScheduleCard/>
                    <ScheduleCard/>
                </Col>
            </Col>
        </Col>
    )
}

export default JobOpportunity;
