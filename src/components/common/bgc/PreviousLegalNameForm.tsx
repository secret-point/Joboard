import React, { ChangeEvent, useState } from 'react';
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Input, InputWrapper } from "@amzn/stencil-react-components/form";
import { Text } from "@amzn/stencil-react-components/text";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";
import { JobState } from "../../../reducers/job.reducer";
import { ApplicationState } from "../../../reducers/application.reducer";
import { ScheduleState } from "../../../reducers/schedule.reducer";
import { BGCState } from "../../../reducers/bgc.reducer";
import { CandidateState } from "../../../reducers/candidate.reducer";
import { connect } from "react-redux";
import get from 'lodash/get';
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import { boundSetCandidatePatchRequest } from "../../../actions/CandidateActions/boundCandidateActions";
import { translate as t } from "../../../utils/translator";

interface MapStateToProps {
    job: JobState,
    application: ApplicationState,
    schedule: ScheduleState,
    bgc: BGCState
    candidate: CandidateState
}

interface PreviousLegalNameFormProps {

}

type PreviousLegalNameFormMergedProps = MapStateToProps & PreviousLegalNameFormProps;

const PreviousLegalNameForm = (props: PreviousLegalNameFormMergedProps) => {

    const { candidate } = props;
    const { formError, candidatePatchRequest } = candidate;
    const { candidateData } = candidate.results
    const additionalBgc = candidateData?.additionalBackgroundInfo;
    const previousLegalNames: string[] = additionalBgc?.previousLegalNames || [];

    const [showMorePreviousLegalNames, setShowMorePreviousLegalNames] = useState(false);
    const dataKeyAccessor = 'additionalBackgroundInfo.previousLegalNames';

    const handleUpdatePreviousName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const name = event.target.name;
        const dataIndex = name === 'previousLegalName0' ? 0 : name === 'previousLegalName1'? 1 : name === 'previousLegalName2' ? 2 : 0;
        const newCandidate = cloneDeep(candidatePatchRequest) || {} ;
        const currentNameList = get(newCandidate, dataKeyAccessor) || [] ;

        currentNameList[dataIndex] = value;
        set(newCandidate, dataKeyAccessor, currentNameList);
        boundSetCandidatePatchRequest(newCandidate);
    }

    return (
        <Col gridGap={15} padding={{top: 'S300'}}>
            <InputWrapper
                id="previousLegalNameInput"
                labelText={t("BB-BGC-additional-bgc-previous-legal-name-label-text", "Previous legal full name")}
                renderLabel={() => (
                    <Row justifyContent="space-between">
                        <Text fontSize="T200" fontWeight='bold'>{t("BB-BGC-additional-bgc-previous-legal-name-label-text", "Previous legal full name")}</Text>
                        <Text fontSize="T200">{t('BB-BGC-form-optional-input-label-text', 'Optional')}</Text>
                    </Row>
                )}
                error={false}
                required={false}
                // footer={t("BB-BGC-additional-bgc-previous-legal-name-error-text", "Please enter previously used legal full name following format: First Last")}
            >
                {inputProps =>
                    <Input
                        {...inputProps}
                        defaultValue={previousLegalNames.length > 0 ? previousLegalNames[0] : ''}
                        name='previousLegalName0'
                        onChange={handleUpdatePreviousName}
                    />
                }
            </InputWrapper>

            {
                !showMorePreviousLegalNames &&
                <Button
                    onClick={() => setShowMorePreviousLegalNames(true)}
                    variant={ButtonVariant.Tertiary}
                >
                    {`+ ${t("BB-BGC-additional-bgc-show-additional-previous-legal-names-button-text","Add / Show more previous names")}`}
                </Button>
            }

            {
                showMorePreviousLegalNames &&
                <Col gridGap={15}>
                    <InputWrapper
                        id="previousLegalName1Input"
                        labelText={t("BB-BGC-additional-bgc-previous-legal-name1-label-text", "Previous legal full name (1)")}
                        renderLabel={() => (
                            <Row justifyContent="space-between">
                                <Text fontSize="T200" fontWeight='bold'>{t("BB-BGC-additional-bgc-previous-legal-name1-label-text", "Previous legal full name (1)")}</Text>
                                <Text fontSize="T200">{t('BB-BGC-form-optional-input-label-text', 'Optional')}</Text>
                            </Row>
                        )}
                        // error={true}
                        // footer={t("BB-BGC-additional-bgc-previous-legal-name1-error-text", "Please enter previously used legal full name (1) following format: First Last")}
                    >
                        {inputProps =>
                            <Input
                                {...inputProps}
                                defaultValue={previousLegalNames.length > 0 ? previousLegalNames[1] : ''}
                                name='previousLegalName1'
                                onChange={handleUpdatePreviousName}
                            />
                        }
                    </InputWrapper>

                    <InputWrapper
                        id="previousLegalName2Input"
                        labelText={t("BB-BGC-additional-bgc-previous-legal-name1-label-text", "Previous legal full name (2)")}
                        renderLabel={() => (
                            <Row justifyContent="space-between">
                                <Text fontSize="T200" fontWeight='bold'>{t("BB-BGC-additional-bgc-previous-legal-name2-label-text", "Previous legal full name (2)")}</Text>
                                <Text fontSize="T200">{t('BB-BGC-form-optional-input-label-text', 'Optional')}</Text>
                            </Row>
                        )}
                        error={false}
                        // footer={t("BB-BGC-additional-bgc-previous-legal-name2-error-text", "Please enter previously used legal full name (2) following format: First Last")}
                    >
                        {inputProps =>
                            <Input
                                {...inputProps}
                                defaultValue={previousLegalNames.length > 0 ? previousLegalNames[2] : ''}
                                name='previousLegalName2'
                                onChange={handleUpdatePreviousName}
                            />
                        }
                    </InputWrapper>
                </Col>
            }

        </Col>
    )
}

const mapStateToProps = ( state: MapStateToProps ) => {
    return state;
};

export default connect(mapStateToProps)(PreviousLegalNameForm);
