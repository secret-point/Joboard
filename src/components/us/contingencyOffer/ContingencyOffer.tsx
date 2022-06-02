import React, { useEffect } from 'react';
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { connect } from "react-redux";
import { JobState } from "../../../reducers/job.reducer";
import { ApplicationState } from "../../../reducers/application.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { useLocation } from "react-router";
import { getPageNameFromPath, parseQueryParamsArrayToSingleItem } from "../../../helpers/utils";
import queryString from "query-string";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { Locale } from "../../../utils/types/common";
import { boundGetApplication } from "../../../actions/ApplicationActions/boundApplicationActions";
import { getLocale, routeToAppPageWithPath } from "../../../utils/helper";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import { H2, H3, Text, H4 } from '@amzn/stencil-react-components/text';
import { Popover } from "@amzn/stencil-react-components/popover";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import ScheduleCard from "../../common/jobOpportunity/ScheduleCard";
import InnerHTML from 'dangerously-set-html-content';
import ApplicationSteps from "../../common/ApplicationSteps";
import { BACKGROUND_CHECK, JOB_OPPORTUNITIES } from "../../pageRoutes";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";

interface MapStateToProps {
    job: JobState,
    application: ApplicationState,
    schedule: ScheduleState
}

interface ContingencyOfferProps {

}

type ContingencyOfferMergedProps = MapStateToProps & ContingencyOfferProps;

const ContingencyOffer = (props: ContingencyOfferMergedProps) => {
    const { job, application, schedule } = props;
    const { search, pathname } = useLocation();
    const pageName = getPageNameFromPath(pathname);
    const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
    const { applicationId, jobId, scheduleId } = queryParams;
    const jobDetail = job.results;
    const applicationData = application.results;
    const scheduleDetail = schedule.scheduleDetail;

    useEffect(() => {
        jobId && boundGetJobDetail({ jobId: jobId, locale: Locale.enUS })
        applicationId && boundGetApplication({ applicationId: applicationId, locale: Locale.enUS });
        scheduleId && boundGetScheduleDetail({
            locale: getLocale(),
            scheduleId: scheduleId
        })
    }, []);

    useEffect(() => {
        jobDetail && applicationData && scheduleDetail && addMetricForPageLoad(pageName);
    }, [jobDetail, applicationData, scheduleDetail]);

    return (
        <Col gridGap={10}>
            <Col gridGap={10}>
                <H2>Well done so far, {'name'}!</H2>
                <Text fontSize="T200">Here is the contingent offer for the job you picked.</Text>
            </Col>
            <Row>
                <Popover triggerText="What is a contingent offer?">
                    {({ close }) => (
                        <Col gridGap="S500">
                            <Text fontSize="T200">
                                As permitted by applicable law, your offer is contingent on successfully passing the required background check, drug screening (if applicable) and rehire eligibility check (if applicable), so it’s important that you complete the pre-employment steps on the next page. In some circumstances, your first day may be delayed due to pre-employment requirements not being completed in time. If this is the case, you can expect to hear from us soon.
                            </Text>
                            <Row justifyContent='flex-end'>
                                <Button onClick={close}>Close</Button>
                            </Row>
                        </Col>
                    )}
                </Popover>
            </Row>
            {scheduleDetail && <ScheduleCard scheduleDetail={scheduleDetail} displayOnly={true}/>}
            <Col className="jobDescriptionContainer">
                <H3>Job Requirement</H3>
                <Col>
                    <InnerHTML className="jobDescription" html={scheduleDetail?.jobDescription || ''}/>
                </Col>
            </Col>
            <Col
                className="contingencyOfferFooter"
                gridGap={15}
                padding={{top: 'S400', bottom: 'S400', left: 'S300', right: 'S300'}}
            >
                <H4>Remaining Steps</H4>
                <ApplicationSteps/>
                <Col gridGap={20} padding='S300'>
                    <Button
                        variant={ButtonVariant.Primary}
                        onClick={() => {
                            routeToAppPageWithPath(BACKGROUND_CHECK)
                        }}
                    >
                        Accept Offer
                    </Button>
                    <Button onClick={() => {
                        routeToAppPageWithPath(JOB_OPPORTUNITIES);
                    }}
                    >
                        Back to jobs
                    </Button>
                </Col>
            </Col>
        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(ContingencyOffer);
