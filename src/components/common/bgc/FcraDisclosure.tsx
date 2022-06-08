import React, { useState } from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import { H4, Text } from "@amzn/stencil-react-components/text";
import { DetailedRadio, Input, InputWrapper } from "@amzn/stencil-react-components/form";
import { FcraDisclosureConfigList } from "../../../utils/constants/common";
import { FCRA_DISCLOSURE_TYPE } from "../../../utils/enums/common";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { connect } from "react-redux";
import { JobState } from "../../../reducers/job.reducer";
import { ApplicationState } from "../../../reducers/application.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { BGCState } from "../../../reducers/bgc.reducer";
import { handleSubmitFcraBGC, validateName } from "../../../utils/helper";
import { translate as t } from "../../../utils/translator";

interface MapStateToProps {
    job: JobState,
    application: ApplicationState,
    schedule: ScheduleState,
    bgc: BGCState
}

interface FcraDisclosureProps {

}

type FcraDisclosureMergedProps = MapStateToProps & FcraDisclosureProps;

const FcraDisclosure = ( props: FcraDisclosureMergedProps ) => {
    const { bgc, application } = props;
    const { stepConfig } = bgc;
    const { completedSteps } = stepConfig;
    const applicationData = application.results;
    const fcraQuestions = applicationData?.fcraQuestions;

    const [fcraResponse, setFcraResponse] = useState<FCRA_DISCLOSURE_TYPE | undefined>(fcraQuestions?.bgcDisclosure);
    const [eSignature, setESignature] = useState(fcraQuestions?.bgcDisclosureEsign.signature || '');
    const [isSignatureValid, setIsSignatureValid] = useState(true);

    const handleClickNext = () => {
        const isFullNameValid = validateName(eSignature);

        if(isFullNameValid && !!fcraResponse) {
            setIsSignatureValid(true);
            return;
        }

        if(applicationData) {
            handleSubmitFcraBGC(applicationData, stepConfig, eSignature, fcraResponse);
        }
    }

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
                    FcraDisclosureConfigList.map(fcraItem => (
                        <DetailedRadio
                            name="fcra-radio-col"
                            value={fcraItem.value}
                            titleText={t(fcraItem.titleTranslationKey, fcraItem.title)}
                            onChange={event => setFcraResponse(fcraItem.value)}
                            defaultChecked={fcraItem.value === fcraResponse}
                        />
                    ))
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
                                    setESignature(e.target.value);
                                }}
                                defaultValue={fcraQuestions?.bgcDisclosureEsign.signature || ''}
                            />
                        }
                    </InputWrapper>
                </Col>
            }
            <Col padding={{ top: 'S300', bottom: 'S300' }}>
                <Button
                    variant={ButtonVariant.Primary}
                    onClick={handleClickNext}
                >
                    {t("BB-BGC-fcra-disclosure-bgc-form-next-btn", "Next")}
                </Button>
            </Col>
        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(FcraDisclosure);
