import React, { useEffect, useState } from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { H4, Text } from "@amzn/stencil-react-components/text";
import { DetailedRadio, Input, InputWrapper } from "@amzn/stencil-react-components/form";
import { FcraDisclosureConfigList, HasPreviouslyWorkedAtAmazonRadioConfig } from "../../../utils/constants/common";
import { FCRA_DISCLOSURE_TYPE } from "../../../utils/enums/common";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { connect } from "react-redux";
import { JobState } from "../../../reducers/job.reducer";
import { ApplicationState } from "../../../reducers/application.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { BGCState } from "../../../reducers/bgc.reducer";
import { checkAndBoundGetApplication, getLocale, handleSubmitFcraBGC, handleWithdrawFcraBGC, validateName } from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import { useLocation } from "react-router";
import {
    getPageNameFromPath,
    parseQueryParamsArrayToSingleItem,
    resetIsPageMetricsUpdated
} from "../../../helpers/utils";
import queryString from "query-string";
import { boundGetCandidateInfo } from "../../../actions/CandidateActions/boundCandidateActions";
import { boundGetScheduleDetail } from "../../../actions/ScheduleActions/boundScheduleActions";
import { boundGetJobDetail } from "../../../actions/JobActions/boundJobDetailActions";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { CommonColors } from "../../../utils/colors";
import { Status, StatusIndicator } from "@amzn/stencil-react-components/status-indicator";
import { ModalContent, WithModal } from "@amzn/stencil-react-components/modal";
import {boundResetBannerMessage} from "../../../actions/UiActions/boundUi";
import DebouncedButton from "../DebouncedButton";

interface MapStateToProps {
    job: JobState,
    application: ApplicationState,
    schedule: ScheduleState,
    bgc: BGCState
}

interface FcraDisclosureProps {

}

type FcraDisclosureMergedProps = MapStateToProps & FcraDisclosureProps;

export const FcraDisclosure = ( props: FcraDisclosureMergedProps ) => {
    const { job, application, schedule, bgc } = props;
    const { stepConfig } = bgc;
    const applicationData = application.results;
    const fcraQuestions = applicationData?.fcraQuestions;

    const [fcraResponse, setFcraResponse] = useState<FCRA_DISCLOSURE_TYPE | undefined>();
    const [eSignature, setESignature] = useState(fcraQuestions?.bgcDisclosureEsign?.signature || '');
    const [isSignatureValid, setIsSignatureValid] = useState(true);
    const [missingFcraResponse, setMissingFcraResponse] = useState(false);

    const { search, pathname } = useLocation();
    const pageName = getPageNameFromPath(pathname);
    const queryParams = parseQueryParamsArrayToSingleItem(queryString.parse(search));
    const { applicationId, jobId, scheduleId } = queryParams;
    const jobDetail = job.results;
    const scheduleDetail = schedule.results.scheduleDetail;

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

    const handleClickNext = (modalOpen: Function) => {
        boundResetBannerMessage();
        if (fcraResponse && fcraResponse === FCRA_DISCLOSURE_TYPE.DECLINE) {
            modalOpen();
            return;
        }

        const isFullNameValid = validateName(eSignature);

        if(!isFullNameValid) {
            setIsSignatureValid(false);
            return;
        }

        if(!fcraResponse) {
            setMissingFcraResponse(true);
            return;
        }

        if(applicationData) {
            handleSubmitFcraBGC(applicationData, stepConfig, eSignature, fcraResponse);
        }
    };

    const handleClickWithdrawApplication = () => {
        applicationData && handleWithdrawFcraBGC(applicationData, FCRA_DISCLOSURE_TYPE.DECLINE);
    };

    const renderModal = ({ close }: { close: () => void }) => (
        <ModalContent
            titleText=''
            buttons={[
                <Button
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
                </Button>
            ]}>
            <Text>
                {t("BB-BGC-fcra-disclosure-decline-modal-withdraw-application-description-text", "Your application will be withdrawn if you decline to conduct the background check.")}
            </Text>
        </ModalContent>
    );

    return (
        <Col className="FcraDisclosureContainer" gridGap={15}>
            <Col gridGap="S300" padding={{ top: 'S300' }}>
                <H4>{t("BB-BGC-fcra-disclosure-bgc-form-title", "Fair Credit Report Act Disclosure")}</H4>
                <Text>
                    {t("BB-BGC-fcra-disclosure-bgc-explanation-text", "In connection with your application for employment with Amazon.com, Inc. or its subsidiaries or affiliates ('Amazon'), we will procure a consumer report on you from a consumer reporting agency. This is commonly known as a \"background check\".")}
                </Text>
            </Col>
            <Col gridGap="S300" padding={{ top: 'S200' }}>
                {
                    FcraDisclosureConfigList.map(fcraItem => {
                        const defaultChecked = fcraItem.value === fcraResponse
                        return (
                          <DetailedRadio
                            key={fcraItem.value}
                            name="fcra-radio-col"
                            value={fcraItem.value}
                            titleText={t(fcraItem.titleTranslationKey, fcraItem.title)}
                            onChange={event => setFcraResponse(fcraItem.value)}
                            defaultChecked={defaultChecked}
                          />
                        )
                    })
                }
                {
                    missingFcraResponse &&
                    <Row padding="S300" backgroundColor={CommonColors.RED05}>
                        <StatusIndicator
                          messageText={missingFcraResponse ? HasPreviouslyWorkedAtAmazonRadioConfig.errorMessage || "" : ""}
                          status={Status.Negative}
                          iconAriaHidden={true}
                        />
                    </Row>
                }
            </Col>
            {
                fcraResponse === FCRA_DISCLOSURE_TYPE.ACCEPT &&
                <Col gridGap={15} padding={{ top: 'S200' }}>
                    <H4>{t("BB-BGC-fcra-provide-eSignature-form-heading-text", "Provide an e-Signature")}</H4>
                    <Text>
                        {t("BB-BGC-fcra-disclosure-signature-consent-notice-text", "By my eSignature below, I hereby authorize Amazon to procure the above consumer report now and throughout any employment or engagement I may have with Amazon Corporate.")}
                    </Text>
                    <InputWrapper
                        labelText={t("BB-BGC_fcra-disclosure-signature-input-label-text", "Type your full name here")}
                        id="fcraFullNameInput"
                        required
                        error={!isSignatureValid}
                        footer={!isSignatureValid ? t("BB-BGC_fcra-disclosure-signature-input-error-text", "Enter full name"): undefined}
                    >
                        {inputProps =>
                            <Input
                                {...inputProps}
                                onChange={e => {
                                    const value = e.target.value || '';
                                    setESignature(value.trim());
                                }}
                                defaultValue={fcraQuestions?.bgcDisclosureEsign?.signature || ''}
                            />
                        }
                    </InputWrapper>
                </Col>
            }
            {
                fcraResponse &&
                <Col padding={{ top: 'S300', bottom: 'S300' }}>
                    <WithModal
                        renderModal={renderModal}
                    >
                        {({ open }) => (
                            <DebouncedButton
                                variant={ButtonVariant.Primary}
                                onClick={() => handleClickNext(open)}
                            >
                                {t("BB-BGC-fcra-disclosure-bgc-form-next-btn", "Next")}
                            </DebouncedButton>
                        )}
                    </WithModal>
                </Col>
            }
        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(FcraDisclosure);
