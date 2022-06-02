import React, { useState } from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import { DetailedRadio } from "@amzn/stencil-react-components/form";
import { CommonColors } from "../../../utils/colors";
import FormInputText from "../FormInputText";
import { PreviousWorkedAtAmazonBGCFormConfig } from "../../../utils/constants/common";

const PreviousWorkedAtAmazonForm = () => {

    const [hasCriminalRecordWithinSevenYears, setHasCriminalRecordWithinSevenYears] = useState(false);

    return (
        <Col gridGap={15} padding={{ top: 'S300' }}>
            <Row
                gridGap={8}
                width="100%"
            >
                <Text fontWeight='bold'>
                    Have you previously worked at an Amazon building?
                </Text>
                <Text color='red'> * </Text>
            </Row>
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
                    {
                        PreviousWorkedAtAmazonBGCFormConfig.map(config => (
                            <FormInputText
                                inputItem={config}
                                defaultValue={''}
                                handleChange={() => {
                                }}
                            />
                        ))
                    }
                </Col>
            }
        </Col>
    )
}

export default PreviousWorkedAtAmazonForm;
