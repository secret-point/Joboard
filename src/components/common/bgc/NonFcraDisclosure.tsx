import React, { useState } from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { H4, Text } from "@amzn/stencil-react-components/text";
import { NonFcraESignatureAcknowledgementList, US_StateSpecificNotices } from "../../../utils/constants/common";
import { translate as t } from "../../../utils/translator";
import InnerHTML from 'dangerously-set-html-content';
import { DetailedCheckbox, Input, InputWrapper } from "@amzn/stencil-react-components/form";
import { CommonColors } from "../../../utils/colors";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { NonFcraFormErrorStatus } from "../../../utils/types/common";
import { JobState } from "../../../reducers/job.reducer";
import { ApplicationState } from "../../../reducers/application.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { BGCState } from "../../../reducers/bgc.reducer";
import { connect } from "react-redux";
import get from 'lodash/get';
import { handleSubmitNonFcraBGC, validateNonFcraSignatures } from "../../../utils/helper";

interface MapStateToProps {
    job: JobState,
    application: ApplicationState,
    schedule: ScheduleState,
    bgc: BGCState
}

interface NonFcraDisclosureProps {

}

type NonFcraDisclosureMergedProps = MapStateToProps & NonFcraDisclosureProps;

const NonFcraDisclosure = ( props: NonFcraDisclosureMergedProps ) => {

    const { application, schedule, bgc } = props;
    const applicationData = application.results;
    const scheduleDetail = schedule.results.scheduleDetail;
    const { stepConfig } = bgc;
    const nonFcraQuestions = applicationData?.nonFcraQuestions;

    const [requestedCopyOfBGC, setRequestedCopyOfBGC] = useState(!!nonFcraQuestions?.requestedCopyOfBackgroundCheck);
    const [nonFcraAckEsign, setNonFcraAckEsign] = useState(nonFcraQuestions?.nonFcraAcknowledgementEsign.signature || '');
    const [nonFcraNoticeEsign, setNonFcraNoticeEsign] = useState(nonFcraQuestions?.nonFcraStateNoticeEsign.signature || '');
    const [isAckSignatureValid, setIsAckSignatureValid] = useState(true);
    const [isNoticeSignatureValid, setIsNoticeSignatureValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState(t('BB-BGC-non-fcra-acknowledgement-and-authorization-eSignature-input-error-text','eSignatures do not match. Please use the same text for each eSignature.'));

    const handleCLickNext = () => {
        if(applicationData) {
            const errorStatus: NonFcraFormErrorStatus =
                validateNonFcraSignatures(applicationData, nonFcraAckEsign.trim(), nonFcraNoticeEsign.trim());

            const { hasError, ackESignHasError, noticeESignHasError } = errorStatus;

            setIsNoticeSignatureValid(!noticeESignHasError);
            setIsAckSignatureValid(!ackESignHasError);

            if(hasError) {
                return;
            }

            handleSubmitNonFcraBGC(applicationData, nonFcraAckEsign, nonFcraNoticeEsign, requestedCopyOfBGC, stepConfig);
        }
    }
    return (
        <Col className="nonFcraContainer" gridGap={15}>
            <Text fontSize="T200">
                {t("BB-BGC_non-fcra-amazon-conduct-bgc-reminder-text","As disclosed and authorized by me in the separate Fair Credit Reporting Act Disclosure and Authorization Document, Amazon.com, Inc. or its subsidiaries or affiliates (\"Amazon\") will conduct a background check on me.")}
            </Text>
            <H4>{t("BB-BGC_fcra-eSignature-acknowledgement-title-text", "By my eSignature below, I acknowledge as follows:")}</H4>
            <Col gridGap={5}>
                <ul>
                    {
                        NonFcraESignatureAcknowledgementList.map(nonFcraESignatureItem => {
                            const { dataKeyDependency, dependencyValue, translationKey, title } = nonFcraESignatureItem;
                            const canDisplay = dataKeyDependency && dependencyValue ? get(scheduleDetail, dataKeyDependency) === dependencyValue.toString() : true;

                            return (
                                <>
                                    {
                                        canDisplay &&
                                        <li>
                                            <Text fontSize="T200">{t(translationKey, title)}</Text>
                                        </li>
                                    }
                                </>
                            )
                        })
                    }
                </ul>
            </Col>
            <Col gridGap={15} className="stateSpecificNoticeContainer">
                <H4>{t("BB-BGC-non-fcra-state-specific-notice-heading-title-text", "State Specific Notices")}</H4>
                <Text fontSize="T200">{t("BB-BGC-non-fcra-state-specific-notice-review-title-text", "Please review the applicable notice(s) below.")}</Text>
                <Col gridGap={10}>
                    {
                        US_StateSpecificNotices.map(stateNotice => {
                            const {
                                dataKeyDependency,
                                dependencyValue,
                                noticeText,
                                noticeTranslationKey
                            } = stateNotice;
                            const canDisplay = dataKeyDependency && dependencyValue ? get(scheduleDetail, dataKeyDependency || '') === dependencyValue.toString() : true;
                            const noticeTextValue: string = t(noticeTranslationKey, noticeText);
                            return (
                                <>
                                    {
                                        canDisplay &&
                                        <Text fontSize="T200">
                                            <InnerHTML className="stateNoticeText" html={noticeTextValue}/>
                                        </Text>
                                    }
                                </>
                            )
                        })
                    }
                </Col>
                <Col padding={{ top: "S200", bottom: 'S300' }}>
                    <DetailedCheckbox
                        titleText={t("BB-BGC-non-fcra-copy-of-bgc-request-radio-label-text", "I would like a free copy of my background check")}
                        checked={requestedCopyOfBGC}
                        onChange={() => setRequestedCopyOfBGC(!requestedCopyOfBGC)}
                    />
                </Col>
            </Col>
            <Col className="eSignatureContainer" gridGap={15}>
                <H4>{t("BB-BGC-non-fcra-esignature-certification-form-title", "eSignature")}</H4>
                <Text fontSize="T200">
                    {t("BB-BGC-non-fcra-acknowledgement-and-authorization-text", "By my eSignature below, I certify that I have read, understand and accept all statements in this Non-Fair Credit Reporting Act Acknowledgments And Authorizations For Background Check. Please signify your acceptance by entering the information requested in the fields below.")}
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
                            <Text color={CommonColors.Neutral70} fontSize="T200">
                                2/3
                            </Text>
                        </Row>
                    )}
                >
                    {inputProps =>
                        <Input
                            {...inputProps}
                            defaultValue={nonFcraQuestions?.nonFcraAcknowledgementEsign.signature || ''}
                            onChange={( e ) => setNonFcraAckEsign(e.target.value)}
                        />
                    }
                </InputWrapper>

                <Row>
                    <Text fontSize="T200">
                        {t("BB-BGC-non-fcra-applicable-notice-text", "By my eSignature below, I certify that I have read and understand any applicable state notices including the hyperlinks.")}
                    </Text>
                </Row>

                <InputWrapper
                    labelText={`${t("BB-BGC-non-fcra-applicable-notice-signature-input-label-text", "Please type your full name as eSignature")} *`}
                    id="fcraFullNameInputTwo"
                    required
                    error={!isNoticeSignatureValid}
                    footer={!isNoticeSignatureValid ? errorMessage : undefined}
                    renderLabel={() => (
                        <Row justifyContent="space-between" style={{ fontWeight: 400 }}>
                            <Text fontSize="T200">
                                {`${t("BB-BGC-non-fcra-applicable-notice-signature-input-label-text", "Please type your full name as eSignature")} *`}
                            </Text>
                            <Text color={CommonColors.Neutral70} fontSize="T200">
                                2/3
                            </Text>
                        </Row>
                    )}
                >
                    {inputProps =>
                        <Input
                            {...inputProps}
                            defaultValue={nonFcraQuestions?.nonFcraStateNoticeEsign.signature || ''}
                            onChange={e => setNonFcraNoticeEsign(e.target.value)}
                        />
                    }
                </InputWrapper>
            </Col>
            <Col padding={{ top: 'S300', bottom: 'S300' }}>
                <Button
                    variant={ButtonVariant.Primary}
                    onClick={handleCLickNext}
                >
                    {t("BB-BGC-non-fcra-form-page-next-button-text", "Next")}
                </Button>
            </Col>
        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(NonFcraDisclosure);