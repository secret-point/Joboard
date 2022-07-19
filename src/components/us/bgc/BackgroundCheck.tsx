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
import {
    boundGetApplication,
    boundUpdateApplicationDS
} from "../../../actions/ApplicationActions/boundApplicationActions";
import {
    bgcShouldDisplayContinue,
    createUpdateApplicationRequest,
    getLocale,
    handleUInitiateBGCStep,
    routeToAppPageWithPath
} from "../../../utils/helper";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { ApplicationStepList } from "../../../utils/constants/common";
import { connect } from "react-redux";
import { H4, Text } from "@amzn/stencil-react-components/text";
import { BGCState } from "../../../reducers/bgc.reducer";
import {
    BGC_STEPS,
    INFO_CARD_STEP_STATUS,
    PROXY_APPLICATION_STATE,
    UPDATE_APPLICATION_API_TYPE
} from "../../../utils/enums/common";
import { CommonColors } from "../../../utils/colors";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import NonFcraDisclosure from "../../common/bgc/NonFcraDisclosure";
import AdditionalBGCInfo from "../../common/bgc/AdditionalBGCInfo";
import { PAGE_ROUTES } from "../../pageRoutes";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { UpdateApplicationRequestDS } from "../../../utils/apiTypes";
import { Application } from "../../../utils/types/common";
import { onCompleteTaskHelper } from "../../../actions/WorkflowActions/workflowActions";
import { translate as t } from "../../../utils/translator";
import InfoStepCard from "../../common/InfoStepCard";

interface MapStateToProps {
    job: JobState,
    application: ApplicationState,
    schedule: ScheduleState,
    bgc: BGCState,
    candidate: CandidateState
}

interface BackgroundCheckProps {

}

type BackgroundCheckMergedProps = MapStateToProps & BackgroundCheckProps;

const BackgroundCheck = ( props: BackgroundCheckMergedProps ) => {

    const { job, application, schedule, bgc, candidate } = props;
    const { search, pathname } = useLocation();
    const pageName = getPageNameFromPath(pathname);
    const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
    const { applicationId, jobId, scheduleId } = queryParams;
    const jobDetail = job.results;
    const applicationData = application.results;
    const { stepConfig } = bgc;
    const scheduleDetail = schedule.results.scheduleDetail;
    const { candidateData } = candidate.results;
    const { BACKGROUND_CHECK_FCRA } = PAGE_ROUTES;

    useEffect(() => {
        boundGetCandidateInfo();
    },[])

    useEffect(() => {
        scheduleId && boundGetScheduleDetail({
            locale: getLocale(),
            scheduleId: scheduleId
        })
    }, [scheduleId]);

    // Don't refetch data if id is not changing
    useEffect(() => {
        jobId && jobId !== jobDetail?.jobId && boundGetJobDetail({ jobId: jobId, locale: getLocale() })
    }, [jobId]);

    useEffect(() => {
        applicationId && boundGetApplication({ applicationId: applicationId, locale: getLocale() });
    }, [applicationId]);

    useEffect(() => {
        jobDetail && applicationData && scheduleDetail && addMetricForPageLoad(pageName);
    }, [jobDetail, applicationData]);

    useEffect(() => {
        if(applicationData && candidateData) {
            handleUInitiateBGCStep(applicationData, candidateData);
        }
    }, [candidateData, applicationData])

    const handleContinue = () => {
        if(applicationData) {
            const { BGC } = UPDATE_APPLICATION_API_TYPE;
            const payload = {
                state: PROXY_APPLICATION_STATE.ADDITIONAL_BACKGROUND_INFO_SAVED
            }
            const request: UpdateApplicationRequestDS = createUpdateApplicationRequest(applicationData, BGC, payload);
            boundUpdateApplicationDS(request, (applicationData: Application)=>{
                onCompleteTaskHelper(applicationData);
            });
        }
    }

    const renderFCRAExpandedContent = (): React.ReactNode => {
        return (
            <>
                <Col gridGap={15}>
                    <Text
                        fontSize="T200"
                        color={CommonColors.Neutral70}
                    >
                        {t('BB-BGC-page-fcra-subtitle-text','Please answer a few questions using the link below.')}
                    </Text>
                    <Col padding='S300'>
                        <Button
                            variant={ButtonVariant.Primary}
                            onClick={() => routeToAppPageWithPath(BACKGROUND_CHECK_FCRA)}
                        >
                            {stepConfig[BGC_STEPS.FCRA].status === INFO_CARD_STEP_STATUS.ACTIVE ?
                                t("BB-BGC-page-fcra-get-started-btn", "Get Started") :
                                t("BB-BGC-page-fcra-edit-form-btn","Edit Form")
                            }
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
                <H4>{t('BB-BGC-page-content-title', 'Background Check')}</H4>
                <Text fontSize="T200">
                    {t('BB-BGC-page-provide-authorization-and-information-notice', 'Please provide authorization and information needed for a background check.')}
                </Text>
            </Col>

            <InfoStepCard
                title={t('BB-BGC-page-fcra-step-card-title', 'Fair Credit Report Act Disclosure')}
                expandedContent={renderFCRAExpandedContent()}
                stepName={BGC_STEPS.FCRA}
                infoCardStepStatus={stepConfig[BGC_STEPS.FCRA]}
                stepIndex={1}
            />

            <InfoStepCard
                title={t('BB-BGC-page-nonfcra-step-card-title', 'Non-Fair Credit Reporting Act Acknowledgments and Authorizations for Background Check')}
                expandedContent={<NonFcraDisclosure/>}
                stepName={BGC_STEPS.NON_FCRA}
                infoCardStepStatus={stepConfig[BGC_STEPS.NON_FCRA]}
                stepIndex={2}
            />

            <InfoStepCard
                title={t('BB-BGC-page-additional-bgc-step-card-title', 'Additional Background Information')}
                expandedContent={<AdditionalBGCInfo/>}
                stepName={BGC_STEPS.ADDITIONAL_BGC}
                infoCardStepStatus={stepConfig[BGC_STEPS.ADDITIONAL_BGC]}
                stepIndex={3}
            />
            <Col padding={{top: 'S300'}}>
                {
                    bgcShouldDisplayContinue(stepConfig) &&
                        <Button
                            variant={ButtonVariant.Primary}
                            onClick={handleContinue}
                        >
                            {t('BB-BGC-page-continue-button', 'Continue')}
                        </Button>
                }
            </Col>
        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(BackgroundCheck);
