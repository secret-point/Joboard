import React, { ChangeEvent, useEffect, useState } from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import { DetailedRadio } from "@amzn/stencil-react-components/form";
import { CommonColors } from "../../../utils/colors";
import FormInputText from "../FormInputText";
import {
  HasPreviouslyWorkedAtAmazonRadioConfig,
  PreviousWorkedAtAmazonBGCFormConfig
} from "../../../utils/constants/common";
import { JobState } from "../../../reducers/job.reducer";
import { ApplicationState } from "../../../reducers/application.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { BGCState } from "../../../reducers/bgc.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { connect } from "react-redux";
import get from "lodash/get";
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import { boundSetCandidatePatchRequest } from "../../../actions/CandidateActions/boundCandidateActions";
import { translate as t } from "../../../utils/translator";
import { Status, StatusIndicator } from "@amzn/stencil-react-components/status-indicator";
import isNil from "lodash/isNil";

interface MapStateToProps {
    job: JobState,
    application: ApplicationState,
    schedule: ScheduleState,
    bgc: BGCState
    candidate: CandidateState
}

interface PreviousWorkedAtAmazonFormProps {

}

type PreviousWorkedAtAmazonFormMergedProps = MapStateToProps & PreviousWorkedAtAmazonFormProps;

export const PreviousWorkedAtAmazonForm = (props: PreviousWorkedAtAmazonFormMergedProps) => {

    const { candidate } = props;
    const { candidatePatchRequest, formError } = candidate;
    const { candidateData } = candidate.results
    const additionalBgc = candidateData?.additionalBackgroundInfo;

    const [hasWorkedAtAmazon, setHasWorkedAtAmazon] = useState(additionalBgc?.hasPreviouslyWorkedAtAmazon);

    const handleCheckRadio = (value: boolean) => {
        const newCandidate = cloneDeep(candidatePatchRequest) || {} ;
        set(newCandidate, 'additionalBackgroundInfo.hasPreviouslyWorkedAtAmazon', value);
        boundSetCandidatePatchRequest(newCandidate);
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>, dataKey: string) => {
        const value = event.target.value;
        const newCandidate = cloneDeep(candidatePatchRequest) || {} ;
        set(newCandidate, dataKey, value);
        boundSetCandidatePatchRequest(newCandidate);
    }

    useEffect(() => {
      setHasWorkedAtAmazon(additionalBgc?.hasPreviouslyWorkedAtAmazon);
    }, [JSON.stringify(additionalBgc)])

    const missingHasPreviouslyWorkedAtAmazon = get(formError, HasPreviouslyWorkedAtAmazonRadioConfig.dataKey) && isNil(hasWorkedAtAmazon);
    return (
        <Col gridGap={15} padding={{ top: 'S300' }}>
            <Row
                gridGap={8}
                width="100%"
            >
                <Text fontWeight='bold'>
                    {t('BB-BGC-additional-previous-worked-at-Amazon-title-text', 'Have you previously worked at an Amazon building?')}
                </Text>
                <Text color='red'> * </Text>
            </Row>
            <DetailedRadio
                name="worked_at_Amazon-record-radio-col"
                titleText={t("BB-BGC-additional-accept-previous-worked-at-Amazon-radio-label-text", "Yes")}
                onChange={() => {
                    setHasWorkedAtAmazon(true);
                    handleCheckRadio(true);
                }}
                error={missingHasPreviouslyWorkedAtAmazon}
                defaultChecked={additionalBgc?.hasPreviouslyWorkedAtAmazon === true}
            />

            <DetailedRadio
                name="worked_at_Amazon-record-radio-col"
                titleText={t("BB-BGC-additional-decline-previous-worked-at-Amazon-radio-label-text", "No")}
                onChange={() => {
                    setHasWorkedAtAmazon(false);
                    handleCheckRadio(false);
                }}
                error={missingHasPreviouslyWorkedAtAmazon}
                defaultChecked={additionalBgc?.hasPreviouslyWorkedAtAmazon === false}
            />
          {
            missingHasPreviouslyWorkedAtAmazon &&
            <Row padding="S300" backgroundColor={CommonColors.RED05}>
              <StatusIndicator
                messageText={t(HasPreviouslyWorkedAtAmazonRadioConfig.errorMessageTranslationKey || "", HasPreviouslyWorkedAtAmazonRadioConfig.errorMessage || "")}
                status={Status.Negative}
                iconAriaHidden={true}
              />
            </Row>
          }
            {
                hasWorkedAtAmazon &&
                <Col gridGap={15}>
                    <Row>
                        <Text
                            fontWeight="medium"
                            color={CommonColors.Blue70}
                            style={{ cursor: 'pointer' }}
                        >
                            {t('BB-BGC-additional-what-to-include-in-previous-Amazon-experience-form-title',"What Information to include")}
                        </Text>
                    </Row>
                    {
                        PreviousWorkedAtAmazonBGCFormConfig.map(config => {
                          config.hasError = get(formError, config.dataKey);
                          return (
                            <FormInputText
                              inputItem={config}
                              defaultValue={get(candidateData, config.dataKey) || ''}
                              handleChange={ (e: ChangeEvent<HTMLInputElement>) => handleInputChange(e,  config.dataKey)}
                              key={config.dataKey}
                            />
                          )
                        })
                    }
                </Col>
            }
        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(PreviousWorkedAtAmazonForm);
