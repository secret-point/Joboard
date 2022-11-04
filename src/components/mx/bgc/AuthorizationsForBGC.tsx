import React, { useEffect, useState } from "react";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { DetailedCheckbox, Input, InputWrapper } from "@amzn/stencil-react-components/form";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { H4, Text } from "@amzn/stencil-react-components/text";
import InnerHTML from 'dangerously-set-html-content';
import get from 'lodash/get';
import { connect } from "react-redux";
import { addMetricForPageLoad } from "../../../actions/AdobeActions/adobeActions";
import { boundResetBannerMessage } from "../../../actions/UiActions/boundUi";
import { METRIC_NAME } from "../../../constants/adobe-analytics";
import { resetIsPageMetricsUpdated } from "../../../helpers/utils";
import { ApplicationState } from "../../../reducers/application.reducer";
import { BGCState } from "../../../reducers/bgc.reducer";
import { JobState } from "../../../reducers/job.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { CommonColors } from "../../../utils/colors";
import { NonFcraESignatureAcknowledgementList, US_StateSpecificNotices } from "../../../utils/constants/common";
import { BGC_VENDOR_TYPE } from "../../../utils/enums/common";
import {
    handleMXSubmitNonFcraBGC,
    handleSubmitNonFcraBGC,
    validateMXNonFcraSignatures,
    validateNonFcraSignatures
} from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";
import { NonFcraFormErrorStatus , BgcMXStepConfig } from "../../../utils/types/common";
import DebouncedButton from "../../common/DebouncedButton";

interface MapStateToProps {
    job: JobState;
    application: ApplicationState;
    schedule: ScheduleState;
    bgc: BGCState;
}

interface NonFcraDisclosureProps {

}

type NonFcraDisclosureMergedProps = MapStateToProps & NonFcraDisclosureProps;

export const AuthorizationForBGC = ( props: NonFcraDisclosureMergedProps ) => {
    const { application, schedule, bgc } = props;
    const applicationData = application.results;
    const { scheduleDetail } = schedule.results;
    const stepConfig = bgc.stepConfig as BgcMXStepConfig;
    const nonFcraQuestions = applicationData?.nonFcraQuestions;

    const [requestedCopyOfBGC, setRequestedCopyOfBGC] = useState(!!nonFcraQuestions?.requestedCopyOfBackgroundCheck);
    const [nonFcraAckEsign, setNonFcraAckEsign] = useState(nonFcraQuestions?.nonFcraAcknowledgementEsign.signature || '');
    const [isAckSignatureValid, setIsAckSignatureValid] = useState(true);
    const [isNoticeSignatureValid, setIsNoticeSignatureValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState(t("BB-BGC-MX-authorization-eSignature-input-error-text", "Please enter a valid full name following format: First Last"));

    const pageName = METRIC_NAME.NON_FCRA;

    useEffect(() => {
        // Page will emit page load event once both pros are available but
        // will not emit new event on props change once it has emitted pageload event previously
        scheduleDetail && applicationData && addMetricForPageLoad(pageName);
    }, [applicationData, scheduleDetail, pageName]);

    useEffect(() => {
        return () => {
            // reset this so as it can emit new pageload event after being unmounted.
            resetIsPageMetricsUpdated(pageName);
        }
    }, [pageName]);

    const handleCLickNext = () => {
        boundResetBannerMessage();
        if(applicationData) {
            const errorStatus: NonFcraFormErrorStatus =
                validateMXNonFcraSignatures(applicationData, nonFcraAckEsign.trim());

            const { hasError, ackESignHasError } = errorStatus;

            setIsAckSignatureValid(!ackESignHasError);

            if(hasError) {
                return;
            }

            //get bgc vendor name from schedule detail. otherwise default to Accurate
            const bgcVendorType = scheduleDetail?.bgcVendorName || BGC_VENDOR_TYPE.ACCURATE;

            handleMXSubmitNonFcraBGC(applicationData, nonFcraAckEsign, requestedCopyOfBGC, stepConfig, bgcVendorType);
        }
    }
    return (
        <Col className="nonFcraContainer" gridGap={15}>
            <Text fontSize="T200">
                {t("BB-BGC_background-authorizations-amazon-conduct-bgc-reminder-text","Amazon.com, Inc. or its subsidiaries or affiliates (\"Amazon\") will conduct a background check on me.")}
            </Text>
            <H4>{t("BB-BGC_fcra-eSignature-acknowledgement-title-text", "By my eSignature below, I acknowledge as follows:")}</H4>
            <Col padding="S300">
                <Text fontSize="T200" lineHeight={1.5}>
                    <InnerHTML html={t("BB-MX-BGC-page-authorizations-for-background-check-content", "I hereby authorize <b>Servicios Comerciales Amazon Mexico, S. de R.L. de C.V.</b> (hereinafter the “Company”) to obtain information regarding my educational, medical (including illegal drug and/or alcohol testing), family, credit, criminal in case the same are necessary according to the position that I have applied for and employment background (hereinafter the “Background Check”), in virtue of the recruitment and selection process in which I am a candidate, either by itself or through third party companies or any other individual or entity acting in the name and pursuant to the instructions of the Company, so that it can be able to evaluate my experience, knowledge, health, aptitudes and skills to guarantee that I can safely develop the functions required for the position for which I am applying. In virtue of the above, I understand and accept that any offer of employment and/or hiring if such is the case is subject to the verification of the information provided by me or third parties in the course of my recruitment and selection process to the satisfaction of the Company and I hereby authorize such third parties including former employers, to provide the required information and/or documents.  Likewise, I hereby accept and acknowledge that this Background Check may be performed at any time after I grant my authorization and, in case of being hired, during my labor relationship with the Company.")}/>
                </Text>
            </Col>
            <Col className="eSignatureContainer" gridGap={15}>
                <Text fontSize="T200">
                    {t("BB-BGC-authorization-text", "By my eSignature below, I certify that I have read, understand and accept all statements in this Authorizations For Background Check, Medical Check and Drug Test. Please signify your acceptance by entering the information requested in the fields below.")}
                </Text>
                <InputWrapper
                    labelText={`${t("BB-BGC-non-fcra-acknowledgement-and-authorization-eSignature-input-label-text", "Please type your full name as eSignature")} *`}
                    id="fcraFullNameInputOne"
                    required
                    error={!isAckSignatureValid}
                    footer={!isAckSignatureValid ? errorMessage: undefined}
                    renderLabel={() => (
                        <Row justifyContent="space-between" style={{ fontWeight: 400 }}>
                            <Text fontSize="T200">
                                {`${t("BB-BGC-non-fcra-acknowledgement-and-authorization-eSignature-input-label-text", "Please type your full name as eSignature")} *`}
                            </Text>
                        </Row>
                    )}
                >
                    {inputProps =>
                        <Input
                            {...inputProps}
                            defaultValue={nonFcraQuestions?.nonFcraAcknowledgementEsign.signature || ''}
                            onChange={( e ) => {
                                const value = e.target.value || '';
                                setNonFcraAckEsign(value.trim());
                            }}
                        />
                    }
                </InputWrapper>
            </Col>
            <Col padding={{ top: 'S300', bottom: 'S300' }}>
                <DebouncedButton
                    variant={ButtonVariant.Primary}
                    onClick={handleCLickNext}
                >
                    {t("BB-BGC-non-fcra-form-page-next-button-text", "Next")}
                </DebouncedButton>
            </Col>
        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(AuthorizationForBGC);
