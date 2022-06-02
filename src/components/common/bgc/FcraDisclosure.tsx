import React, { useState } from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import { H4, Text } from "@amzn/stencil-react-components/text";
import { DetailedRadio, Input, InputWrapper } from "@amzn/stencil-react-components/form";
import { FcraDisclosureConfigList } from "../../../utils/constants/common";
import { BGC_STEP_STATUS, BGC_STEPS, FCRA_DISCLOSURE_TYPE } from "../../../utils/enums/common";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { connect } from "react-redux";
import { JobState } from "../../../reducers/job.reducer";
import { ApplicationState } from "../../../reducers/application.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { BGCState } from "../../../reducers/bgc.reducer";
import { BgcStepConfig } from "../../../utils/types/common";
import { boundUpdateStepConfigAction } from "../../../actions/BGC_Actions/boundBGCActions";
import { routeToAppPageWithPath } from "../../../utils/helper";
import { BACKGROUND_CHECK } from "../../pageRoutes";

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
    const { bgc } = props;
    const { stepConfig } = bgc;
    const { activeStep, pageStatus, completedSteps } = stepConfig;
    const [fcraResponse, setFcraResponse] = useState(FCRA_DISCLOSURE_TYPE.ACCEPT.toString());
    const [eSignature, setESignature] = useState();

    const handleClickNext = () => {
        const request: BgcStepConfig = {
            activeStep: BGC_STEPS.NON_FCRA,
            completedSteps: [...completedSteps, BGC_STEPS.FCRA],
            pageStatus: {
                ...pageStatus,
                [BGC_STEPS.FCRA]: BGC_STEP_STATUS.COMPLETED,
                [BGC_STEPS.NON_FCRA]: BGC_STEP_STATUS.ACTIVE,
            }
        }

        boundUpdateStepConfigAction(request);
        routeToAppPageWithPath(BACKGROUND_CHECK);
    }

    return (
        <Col className="FcraDisclosureContainer" gridGap={15}>
            <Col gridGap="S300" padding={{ top: 'S300' }}>
                <H4>Fair Credit Report Act Disclosure</H4>
                <Text>
                    In connection with your application for employment with Amazon.com, Inc. or its subsidiaries or
                    affiliates ("Amazon"), we will procure a consumer report on you from a consumer reporting agency.
                    This is commonly known as a "background check".
                </Text>
            </Col>
            <Col gridGap="S300" padding={{ top: 'S200' }}>
                {
                    FcraDisclosureConfigList.map(fcraItem => (
                        <DetailedRadio
                            name="fcra-radio-col"
                            value={fcraItem.value}
                            titleText={fcraItem.title}
                            onChange={event => setFcraResponse(event.target.value)}
                            defaultChecked={fcraItem.value === fcraResponse}
                        />
                    ))
                }
            </Col>
            {
                fcraResponse === FCRA_DISCLOSURE_TYPE.ACCEPT &&
                <Col gridGap={15} padding={{ top: 'S200' }}>
                    <H4> Provide an e-Signature</H4>
                    <Text>
                        By my eSignature below, I hereby authorize Amazon to procure the above consumer report now and
                        throughout any employment or engagement I may have with Amazon Corporate.
                    </Text>
                    <InputWrapper
                        labelText="Type your full name here"
                        id="fcraFullNameInput"
                        required
                    >
                        {inputProps =>
                            <Input
                                {...inputProps}
                                onChange={e => {
                                    setESignature(e.target.value);
                                }}
                            />
                        }
                    </InputWrapper>
                </Col>
            }
            <Col padding={{ top: 'S300', bottom: 'S300' }}>
                <Button
                    variant={ButtonVariant.Primary}
                    onClick={handleClickNext}
                    disabled={!eSignature && fcraResponse === FCRA_DISCLOSURE_TYPE.ACCEPT}
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

export default connect(mapStateToProps)(FcraDisclosure);
