import React, { useEffect, useState } from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Label, Text } from "@amzn/stencil-react-components/text";
import { DetailedRadio, InputWrapper, TextAreaWithRecommendedLength } from "@amzn/stencil-react-components/form";
import { CommonColors } from "../../../utils/colors";
import {
    ConvictionDetailConfig,
    ConvictionInfoRadioConfig,
    CriminalConvictionConfigList
} from "../../../utils/constants/common";
import { JobState } from "../../../reducers/job.reducer";
import { ApplicationState } from "../../../reducers/application.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { BGCState } from "../../../reducers/bgc.reducer";
import { connect } from "react-redux";
import { CandidateState } from "../../../reducers/candidate.reducer";
import set from "lodash/set";
import { boundSetCandidatePatchRequest } from "../../../actions/CandidateActions/boundCandidateActions";
import cloneDeep from "lodash/cloneDeep";
import { translate as t } from "../../../utils/translator";
import isNil from "lodash/isNil";
import get from "lodash/get";
import { Status, StatusIndicator } from "@amzn/stencil-react-components/status-indicator";

interface MapStateToProps {
    job: JobState,
    application: ApplicationState,
    schedule: ScheduleState,
    bgc: BGCState
    candidate: CandidateState
}

interface CriminalRecordFormProps {

}

type CriminalRecordFormMergedProps = MapStateToProps & CriminalRecordFormProps;

const CriminalRecordForm = ( props: CriminalRecordFormMergedProps ) => {

    const { candidate } = props;
    const { candidatePatchRequest, formError } = candidate;
    const { candidateData } = candidate.results
    const additionalBgc = candidateData?.additionalBackgroundInfo;

    const [hasCriminalRecord, setHasCriminalRecord] = useState(additionalBgc?.hasCriminalRecordWithinSevenYears);

    useEffect(() => {
        setHasCriminalRecord(additionalBgc?.hasCriminalRecordWithinSevenYears);
    }, [additionalBgc])

    const missingCriminalRecord = get(formError, ConvictionInfoRadioConfig.dataKey) && isNil(hasCriminalRecord);
    const missingConvictionDetails = get(formError, ConvictionDetailConfig.dataKey);

    return (
        <Col gridGap={15}>
            <Text>
                {t('BB-BGC-criminal-record-within-seven-years-question-text', 'Have you been convicted of misdemeanor or felony or been released from prison or parole from a misdemeanor or felony conviction in last seven (7) years?')}
            </Text>
            {
                CriminalConvictionConfigList.map(item => (
                    <DetailedRadio
                        name="criminal-conviction-radio-col"
                        value={`${item.value}`}
                        titleText={t(item.titleTranslationKey, item.title)}
                        onChange={() => {
                            setHasCriminalRecord(item.value);
                            const newCandidate = cloneDeep(candidatePatchRequest) || {} ;
                            set(newCandidate, item.dataKey, item.value);

                            //reset criminal details when selected no
                            if(!item.value) {
                                set(newCandidate, 'additionalBackgroundInfo.convictionDetails', null);
                            }

                            boundSetCandidatePatchRequest(newCandidate);
                        }}
                        defaultChecked={item.value === additionalBgc?.hasCriminalRecordWithinSevenYears}
                        error={missingCriminalRecord}
                    />
                ))
            }
            {missingCriminalRecord  &&
            <Row padding="S300" backgroundColor={CommonColors.RED05}>
                <StatusIndicator
                  messageText={t(ConvictionInfoRadioConfig.errorMessageTranslationKey || "", ConvictionInfoRadioConfig.errorMessage || "" )}
                  status={Status.Negative}
                  iconAriaHidden={true}
                />
            </Row>}
            {
                hasCriminalRecord &&
                <Col gridGap={15}>
                    <Row>
                        <Text
                            fontWeight="medium"
                            color={CommonColors.Blue70}
                            style={{ cursor: 'pointer' }}
                        >
                            What Information to include
                        </Text>
                    </Row>
                    <InputWrapper
                        id="text-area-wrl-id-1"
                        labelText={t(ConvictionDetailConfig.labelTranslationKey || "",ConvictionDetailConfig.labelText)}
                        error={missingConvictionDetails}
                        renderLabel={() => (
                            <Row
                                alignItems="center"
                                id={`criminal-record-renderLabel`}
                                gridGap={"S300"}
                                dataTestId='formInputItem-renderLabel'
                                width="100%"
                            >
                                <Label htmlFor="criminal-record-renderLabel-label" style={{ width: '100%' }}>
                                    <Row
                                        gridGap={8}
                                        justifyContent='space-between'
                                        width="100%"
                                    >
                                        <Text fontWeight='bold'>
                                            {t(ConvictionDetailConfig.labelTranslationKey || "",ConvictionDetailConfig.labelText)}
                                        </Text>
                                        {
                                            ConvictionDetailConfig.required &&
                                              <Row>
                                                  <Text color='red'> * </Text>
                                              </Row>
                                        }
                                    </Row>
                                </Label>
                            </Row>
                        )}
                    >
                        {textAreaProps => (
                            <TextAreaWithRecommendedLength
                                {...textAreaProps}
                                recommendedWordCount={500}
                                defaultValue={additionalBgc?.convictionDetails || ''}
                                onChange={(e) => {
                                    const newCandidate = cloneDeep(candidatePatchRequest) || {} ;
                                    set(newCandidate, 'additionalBackgroundInfo.convictionDetails', e.target.value);
                                    boundSetCandidatePatchRequest(newCandidate);
                                }}
                                error={missingConvictionDetails}
                            />
                        )}
                    </InputWrapper>
                    {
                        missingConvictionDetails &&
                        <Row padding="S300" backgroundColor={CommonColors.RED05}>
                            <StatusIndicator
                              messageText={t(ConvictionDetailConfig.errorMessageTranslationKey || "", ConvictionDetailConfig.errorMessage || "" )}
                              status={Status.Negative}
                              iconAriaHidden={true}
                            />
                        </Row>
                    }
                </Col>
            }
        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(CriminalRecordForm);
