import React, { useEffect } from 'react';
import { Col, Row } from "@amzn/stencil-react-components/layout";
import JobConfirmationCard from "../../common/jobOpportunity/JobConfirmationCard";
import { H4, Text } from '@amzn/stencil-react-components/text';
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { translate as t } from "../../../utils/translator";
import { connect } from "react-redux";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { useLocation } from "react-router";
import { getPageNameFromPath, parseQueryParamsArrayToSingleItem } from "../../../helpers/utils";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { CommonColors } from "../../../utils/colors";
import { IconArrowLeft, IconSize } from "@amzn/stencil-react-components/icons";
import { getLocale, routeToAppPageWithPath } from "../../../utils/helper";
import { JOB_OPPORTUNITIES } from "../../pageRoutes";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import queryString from "query-string";

interface MapStateToProps {
    schedule: ScheduleState
}

const JobConfirmation = ( props: MapStateToProps ) => {

    const { schedule } = props;
    const { search, pathname } = useLocation();
    const pageName = getPageNameFromPath(pathname);
    const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
    const scheduleDetail = schedule.scheduleDetail;
    const { scheduleId } = queryParams;

    useEffect(() => {
        boundGetScheduleDetail({
            locale: getLocale(),
            scheduleId: scheduleId
        })
    }, []);

    useEffect(() => {
        scheduleDetail && addMetricForPageLoad(pageName);
    }, [scheduleDetail]);

    return (
        <Col gridGap={10}>
            <Row
                gridGap={5}
                alignItems="center"
                width="fit-content"
                color={CommonColors.Blue70}
                padding='S200'
                onClick={() => {
                    routeToAppPageWithPath(JOB_OPPORTUNITIES);
                }}
                style={{ cursor: 'pointer' }}
            >
                <IconArrowLeft size={IconSize.ExtraSmall}/>
                <Text fontSize="T100" fontWeight="medium">
                    {
                        t('BB-JobOpportunity-back-to-indexPage-link', 'View Jobs')
                    }
                </Text>
            </Row>
            <Col className="jobConfirmationHeader" gridGap={8} padding={{ top: 'S300' }}>
                <H4>{scheduleDetail?.externalJobTitle}</H4>
                <Text fontSize='T200'>{scheduleDetail?.briefJobDescription}</Text>
            </Col>
            {scheduleDetail && <JobConfirmationCard schedule={scheduleDetail}/>}
            <Col className="selectJobButtonContainer" padding='S300'>
                <Button
                    onClick={() => {
                    }}
                    variant={ButtonVariant.Primary}
                >
                    {t('BB-JobOpportunity-select-job-button', 'Select this job')}
                </Button>
            </Col>
        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(JobConfirmation);
