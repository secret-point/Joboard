import React, { useState } from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import { DetailedRadio, InputWrapper, TextAreaWithRecommendedLength } from "@amzn/stencil-react-components/form";
import { CommonColors } from "../../../utils/colors";

const CriminalRecordForm = () => {

    const [hasCriminalRecordWithinSevenYears, setHasCriminalRecordWithinSevenYears] = useState(false);

    return (
        <Col gridGap={15}>
            <Text>
                Have you been convicted of misdemeanor or felony or been released from prison or parole from a
                misdemeanor or felony conviction in last seven (7) years?
            </Text>
            <DetailedRadio
                name="criminal-record-radio-col"
                titleText="Yes"
                onChange={() => setHasCriminalRecordWithinSevenYears(true)}
                checked={hasCriminalRecordWithinSevenYears}
            />

            <DetailedRadio
                name="criminal-record-radio-col"
                titleText="No"
                onChange={() => setHasCriminalRecordWithinSevenYears(false)}
                checked={!hasCriminalRecordWithinSevenYears}
            />
            {
                hasCriminalRecordWithinSevenYears &&
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
                        labelText="Provide city, country, state of conviction, date, nature of the offense, along with sentencing information"
                    >
                        {textAreaProps => (
                            <TextAreaWithRecommendedLength
                                recommendedWordCount={500}
                                {...textAreaProps}
                            />
                        )}
                    </InputWrapper>
                </Col>
            }
        </Col>
    )
}

export default CriminalRecordForm;
