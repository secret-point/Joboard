import React, { useEffect, useState } from "react";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { Input, InputWrapper } from "@amzn/stencil-react-components/form";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { ModalContent, WithModal } from "@amzn/stencil-react-components/modal";
import { useBreakpoints } from "@amzn/stencil-react-components/responsive";
import { H3, Text } from "@amzn/stencil-react-components/text";
import InnerHTML from "dangerously-set-html-content";
import queryString from "query-string";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import { boundResetBannerMessage } from "../../../actions/UiActions/boundUi";
import {
    getPageNameFromPath,
    parseQueryParamsArrayToSingleItem,
    resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import { ApplicationState } from "../../../reducers/application.reducer";
import { BGCState } from "../../../reducers/bgc.reducer";
import { JobState } from "../../../reducers/job.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { FCRA_DISCLOSURE_TYPE } from "../../../utils/enums/common";
import { checkAndBoundGetApplication, getLocale, handleSubmitFcraBGC, handleWithdrawFcraBGC, hideHeaderFooter, showHeaderFooter, validateName } from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import DebouncedButton from "../DebouncedButton";
import { BgcStepConfig } from "../../../utils/types/common";

interface MapStateToProps {
    job: JobState;
    application: ApplicationState;
    schedule: ScheduleState;
    bgc: BGCState;
}

interface FcraDisclosureProps {

}

type FcraDisclosureMergedProps = MapStateToProps & FcraDisclosureProps;

export const FcraDisclosure = ( props: FcraDisclosureMergedProps ) => {
    const { job, application, schedule, bgc } = props;
    const stepConfig = bgc.stepConfig as BgcStepConfig;
    const applicationData = application.results;
    const fcraQuestions = applicationData?.fcraQuestions;

    const [fcraResponse, setFcraResponse] = useState<FCRA_DISCLOSURE_TYPE | undefined>();
    const [eSignature, setESignature] = useState(fcraQuestions?.bgcDisclosureEsign?.signature || '');
    const [isSignatureValid, setIsSignatureValid] = useState(true);

    const { search, pathname } = useLocation();
    const pageName = getPageNameFromPath(pathname);
    const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
    const { applicationId, jobId, scheduleId } = queryParams;
    const jobDetail = job.results;
    const { scheduleDetail } = schedule.results;
    const { matches } = useBreakpoints();

    useEffect(() => {
        hideHeaderFooter();
        return () => {
            showHeaderFooter();
        };
    }, []);

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
    }, [jobDetail, jobId]);

    useEffect(() => {
        checkAndBoundGetApplication(applicationId);
    }, [applicationId]);

    useEffect(() => {
        jobDetail && applicationData && scheduleDetail && addMetricForPageLoad(pageName);
    }, [jobDetail, applicationData, scheduleDetail, pageName]);

    useEffect(() => {
        return () => {
            //reset this so as it can emit new pageload event after being unmounted.
            resetIsPageMetricsUpdated(pageName);
        }
    }, [pageName]);

    useEffect(() => {
        setFcraResponse(fcraQuestions?.bgcDisclosure);
        setESignature(fcraQuestions?.bgcDisclosureEsign?.signature || "");
    }, [fcraQuestions])

    const handleClickAuthorize = () => {
        boundResetBannerMessage();

        const isFullNameValid = validateName(eSignature);

        if(!isFullNameValid) {
            setIsSignatureValid(false);
            return;
        }

        if(applicationData) {
            handleSubmitFcraBGC(applicationData, stepConfig, eSignature, FCRA_DISCLOSURE_TYPE.ACCEPT);
        }
    };

    const handleClickDecline = (modalOpen: Function) => {
        boundResetBannerMessage();
        modalOpen();
    };

    const handleClickWithdrawApplication = () => {
        applicationData && handleWithdrawFcraBGC(applicationData, FCRA_DISCLOSURE_TYPE.DECLINE);
    };

    const renderModal = ({ close }: { close: () => void }) => (
        <ModalContent
            titleText=''
            buttons={[
                <DebouncedButton
                    dataTestId="withdraw-application-button"
                    key="fcra-disclosure-decline-modal-btn"
                    variant={ButtonVariant.Primary}
                    isDestructive
                    onClick={() => {
                        boundResetBannerMessage();
                        close();
                        handleClickWithdrawApplication();
                    }}
                >
                    {t("BB-BGC-fcra-disclosure-decline-modal-withdraw-application-btn-text", "Withdraw application")}
                </DebouncedButton>
            ]}>
            <Text>
                {t("BB-BGC-fcra-disclosure-decline-modal-withdraw-application-description-text", "Your application will be withdrawn if you decline to conduct the background check.")}
            </Text>
        </ModalContent>
    );

    const renderDeclineButton = () => (
        <WithModal renderModal={renderModal}>
            {({ open }) => (
                <Button
                    variant={ButtonVariant.Secondary}
                    onClick={() => handleClickDecline(open)}
                    dataTestId="fcra-decline-btn"
                >
                    {t("BB-BGC-fcra-disclosure-bgc-form-decline-btn", "I decline")}
                </Button>
            )}
        </WithModal>
    );

    const renderAuthorizeButton = () => (
        <DebouncedButton
            variant={ButtonVariant.Primary}
            onClick={() => handleClickAuthorize()}
            dataTestId="fcra-authorize-btn"
        >
            {t("BB-BGC-fcra-disclosure-bgc-form-authorize-btn", "I authorize")}
        </DebouncedButton>
    );

    return (
        <Col className="FcraDisclosureContainer" gridGap={15}>
            <Col gridGap="S300" padding={{ top: 'S300' }}>
                <H3>{t("BB-BGC-fcra-disclosure-bgc-form-title", "Fair Credit Reporting Act Consumer Report Disclosure")}</H3>
                <Text>
                    {t("BB-BGC-fcra-disclosure-bgc-explanation-paragraph1-text", "This disclosure intends to notify you that in connection with your offer of employment with Amazon.com, Inc., its subsidiaries, or its affiliates (collectively, \"Amazon\"), Amazon will request a consumer report, also referred to as a \"background check report,\" about you.")}
                </Text>

                <Text>
                    <InnerHTML html={t("BB-BGC-fcra-disclosure-bgc-explanation-paragraph2-text", "By <strong>typing my full name and clicking \"I authorize\"</strong> below, I authorize Amazon to request consumer reports about me now and throughout any employment I may have with Amazon.")}/>
                </Text>

                <InputWrapper
                    labelText={t("BB-BGC_fcra-disclosure-signature-input-label-text", "Full name")}
                    id="fcraFullNameInput"
                    required
                    error={!isSignatureValid}
                    footer={!isSignatureValid ? t("BB-BGC_fcra-disclosure-signature-input-error-text", "Please enter a valid full name following format: First Last"): undefined}
                >
                    {inputProps =>
                        <Input
                            {...inputProps}
                            dataTestId="fcra-full-name-input"
                            onChange={e => {
                                const value = e.target.value || '';
                                setESignature(value.trim());
                            }}
                            defaultValue={fcraQuestions?.bgcDisclosureEsign?.signature || ''}
                        />
                    }
                </InputWrapper>

                <Col gridGap="S300" padding={{ top: 'S300', bottom: 'S300' }}>
                    {
                        matches.s ?
                            <Col gridGap="S300">
                                {renderAuthorizeButton()}
                                {renderDeclineButton()}
                            </Col>
                        :
                            <Row justifyContent="flex-end" gridGap="S300">
                                {renderDeclineButton()}
                                {renderAuthorizeButton()}
                            </Row>
                    }
                </Col>
            </Col>
        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(FcraDisclosure);
