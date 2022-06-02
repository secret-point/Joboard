import React, { useState } from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { H4, Text } from "@amzn/stencil-react-components/text";
import { NonFcraESignatureAcknowledgementList, US_StateSpecificNotices } from "../../../utils/constants/common";
import { translate as t } from "../../../utils/translator";
import InnerHTML from 'dangerously-set-html-content';
import { DetailedCheckbox, Input, InputWrapper } from "@amzn/stencil-react-components/form";
import { CommonColors } from "../../../utils/colors";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { BgcStepConfig } from "../../../utils/types/common";
import { BGC_STEP_STATUS, BGC_STEPS } from "../../../utils/enums/common";
import { boundUpdateStepConfigAction } from "../../../actions/BGC_Actions/boundBGCActions";
import { JobState } from "../../../reducers/job.reducer";
import { ApplicationState } from "../../../reducers/application.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { BGCState } from "../../../reducers/bgc.reducer";
import { connect } from "react-redux";

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

    const { bgc } = props;
    const { stepConfig } = bgc;
    const { activeStep, pageStatus, completedSteps } = stepConfig;
    const [requestedCopyOfBGC, setRequestedCopyOfBGC] = useState(false);

    const handleClickNext = () => {
        const request: BgcStepConfig = {
            activeStep: BGC_STEPS.NON_FCRA,
            completedSteps: [...completedSteps, BGC_STEPS.NON_FCRA],
            pageStatus: {
                ...pageStatus,
                [BGC_STEPS.NON_FCRA]: BGC_STEP_STATUS.COMPLETED,
                [BGC_STEPS.ADDITIONAL_BGC]: BGC_STEP_STATUS.ACTIVE,
            }
        }

        boundUpdateStepConfigAction(request);
    }

    return (
        <Col className="nonFcraContainer" gridGap={15}>
            <Text>
                As disclosed and authorized by me in the separate Fair Credit Reporting Act Disclosure and Authorization
                Document, Amazon.com, Inc. or its subsidiaries or affiliates (“Amazon”) will conduct a background check
                on me.
            </Text>
            <H4>By my eSignature below, I acknowledge as follows:</H4>
            <Col gridGap={5}>
                <ul>
                    {
                        NonFcraESignatureAcknowledgementList.map(nonFcraESignatureItem => (
                            <li>
                                <Text>{t(nonFcraESignatureItem.translationKey, nonFcraESignatureItem.title)}</Text>
                            </li>
                        ))
                    }
                </ul>
            </Col>
            <Col gridGap={15} className="stateSpecificNoticeContainer">
                <H4>State Specific Notices</H4>
                <Text>Please review the applicable notice(s) below.</Text>
                <Col gridGap={10}>
                    {
                        US_StateSpecificNotices.map(stateNotice => (
                            <Text>
                                <InnerHTML className="stateNoticeText" html={stateNotice.noticeText}/>
                            </Text>
                        ))
                    }
                </Col>
                <Col padding={{ top: "S200", bottom: 'S300' }}>
                    <DetailedCheckbox
                        titleText="I would like a free copy of my background check"
                        checked={requestedCopyOfBGC}
                        onChange={() => setRequestedCopyOfBGC(!requestedCopyOfBGC)}
                    />
                </Col>
            </Col>
            <Col className="eSignatureContainer" gridGap={15}>
                <H4>eSignature</H4>
                <Text>
                    By my eSignature below, I certify that I have read, understand and accept all statements in this
                    Non-Fair Credit Reporting Act Acknowledgments And Authorizations For Background Check. Please
                    signify your acceptance by entering the information requested in the fields below.
                </Text>
                <InputWrapper
                    labelText="Please type your full name as eSignature"
                    id="fcraFullNameInputOne"
                    required
                    error={false}
                    // footer="Please sign your name here"
                    renderLabel={() => (
                        <Row justifyContent="space-between" style={{ fontWeight: 400 }}>
                            <Text fontSize="T200">
                                Please type your full name as eSignature *
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
                        />
                    }
                </InputWrapper>

                <Row>
                    <Text>
                        By my eSignature below, I certify that I have read and understand any applicable state notices
                        including the hyperlinks.
                    </Text>
                </Row>

                <InputWrapper
                    labelText="Please type your full name as eSignature"
                    id="fcraFullNameInputTwo"
                    required
                    error={false}
                    // footer="Please sign your name here"
                    renderLabel={() => (
                        <Row justifyContent="space-between" style={{ fontWeight: 400 }}>
                            <Text fontSize="T200">
                                Please type your full name as eSignature *
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
                        />
                    }
                </InputWrapper>
            </Col>
            <Col padding={{ top: 'S300', bottom: 'S300' }}>
                <Button
                    variant={ButtonVariant.Primary}
                    onClick={handleClickNext}
                >
                    Next
                </Button>
            </Col>
        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(NonFcraDisclosure);
