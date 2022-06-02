import React, { useEffect } from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import StepHeader from "../../common/StepHeader";
import { JobState } from "../../../reducers/job.reducer";
import { ApplicationState } from "../../../reducers/application.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { useLocation } from "react-router";
import { getPageNameFromPath, parseQueryParamsArrayToSingleItem } from "../../../helpers/utils";
import queryString from "query-string";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { Locale } from "../../../utils/types/common";
import { boundGetApplication } from "../../../actions/ApplicationActions/boundApplicationActions";
import { GetScheduleListByJobIdRequest } from "../../../utils/apiTypes";
import { getLocale, routeToAppPageWithPath } from "../../../utils/helper";
import { boundGetScheduleListByJobId } from "../../../actions/ScheduleActions/boundScheduleActions";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { ApplicationStepList } from "../../../utils/constants/common";
import { connect } from "react-redux";
import { H4, Text } from "@amzn/stencil-react-components/text";
import BGCStepCard from "../../common/bgc/BGCStepCard";
import { BGCState } from "../../../reducers/bgc.reducer";
import { BGC_STEP_STATUS, BGC_STEPS } from "../../../utils/enums/common";
import { CommonColors } from "../../../utils/colors";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import NonFcraDisclosure from "../../common/bgc/NonFcraDisclosure";
import AdditionalBGCInfo from "../../common/bgc/AdditionalBGCInfo";
import { BACKGROUND_CHECK_FCRA } from "../../pageRoutes";

interface MapStateToProps {
    job: JobState,
    application: ApplicationState,
    schedule: ScheduleState,
    bgc: BGCState
}

interface BackgroundCheckProps {

}

type BackgroundCheckMergedProps = MapStateToProps & BackgroundCheckProps;

const BackgroundCheck = ( props: BackgroundCheckMergedProps ) => {

    const { job, application, schedule, bgc } = props;
    const { search, pathname } = useLocation();
    const pageName = getPageNameFromPath(pathname);
    const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
    const { applicationId, jobId } = queryParams;
    const jobDetail = job.results;
    const applicationData = application.results;
    const { stepConfig } = bgc;
    const { pageStatus } = stepConfig;

    useEffect(() => {
        jobId && boundGetJobDetail({ jobId: jobId, locale: Locale.enUS })
        applicationId && boundGetApplication({ applicationId: applicationId, locale: Locale.enUS });
        const request: GetScheduleListByJobIdRequest = {
            jobId,
            applicationId,
            locale: getLocale()
        }
        boundGetScheduleListByJobId(request);
    }, []);

    useEffect(() => {
        jobDetail && applicationData && addMetricForPageLoad(pageName);
    }, [jobDetail, applicationData]);

    const renderFCRAExpandedContent = (): React.ReactNode => {
        return (
            <>
                <Col gridGap={15}>
                    <Text
                        fontSize="T200"
                        color={CommonColors.Neutral70}
                    >
                        Please answer a few questions using the link below.
                    </Text>
                    <Col padding='S300'>
                        <Button
                            variant={ButtonVariant.Primary}
                            onClick={() => routeToAppPageWithPath(BACKGROUND_CHECK_FCRA)}
                        >
                            {pageStatus.FCRA === BGC_STEP_STATUS.ACTIVE ? 'Get Started' : 'Edit Information'}
                        </Button>

                    </Col>
                </Col>
            </>

        )
    }

    return (
        <Col className="bgcContainer" gridGap={15}>
            <StepHeader jobTitle={jobDetail?.jobTitle || ''} step={ApplicationStepList[1]}/>
            <Col gridGap={15}>
                <H4>Background Check</H4>
                <Text fontSize="T200">Please provide authorization and information needed for a background check.</Text>
            </Col>

            <BGCStepCard
                title='Fair Credit Report Act Disclosure'
                expandedContent={renderFCRAExpandedContent()}
                stepName={BGC_STEPS.FCRA}
                stepStatus={pageStatus.FCRA}
                stepIndex={1}
                editMode={false}
            />

            <BGCStepCard
                title='Non-Fair Credit Reporting Act Acknowledgments and Authorizations for Background Check'
                expandedContent={<NonFcraDisclosure/>}
                stepName={BGC_STEPS.NON_FCRA}
                stepStatus={pageStatus.NON_FCRA}
                stepIndex={2}
                editMode={false}
            />

            <BGCStepCard
                title='Additional background information'
                expandedContent={<AdditionalBGCInfo/>}
                stepName={BGC_STEPS.ADDITIONAL_BGC}
                stepStatus={pageStatus.ADDITIONAL_BGC}
                stepIndex={3}
                editMode={false}
            />
        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(BackgroundCheck);
