import React, { useState } from 'react';
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Input, InputWrapper } from "@amzn/stencil-react-components/form";
import { Text } from "@amzn/stencil-react-components/text";
import { Button, ButtonVariant } from "@amzn/stencil-react-components/button";

const PreviousLegalNameForm = () => {

    const [showMorePreviousLegalNames, setShowMorePreviousLegalNames] = useState(false);

    return (
        <Col gridGap={15}>
            <InputWrapper
                id="text-area-wrl-id-1"
                labelText="Previous legal full name"
                renderLabel={() => (
                    <Row justifyContent="space-between">
                        <Text fontSize="T200">Previous full name</Text>
                        <Text fontSize="T200">Optional</Text>
                    </Row>
                )}
                error={false}
                // footer="Please enter previously used legal full name following format: First Last"
            >
                {inputProps =>
                    <Input
                        {...inputProps}
                    />
                }
            </InputWrapper>

            {
                !showMorePreviousLegalNames &&
                <Button
                    onClick={() => setShowMorePreviousLegalNames(true)}
                    variant={ButtonVariant.Tertiary}
                >
                    + Add/Show more previous names
                </Button>
            }

            {
                showMorePreviousLegalNames &&
                <Col gridGap={15}>
                    <InputWrapper
                        id="text-area-wrl-id-1"
                        labelText="Previous legal full name (1)"
                        renderLabel={() => (
                            <Row justifyContent="space-between">
                                <Text fontSize="T200">Previous full name (1)</Text>
                                <Text fontSize="T200">Optional</Text>
                            </Row>
                        )}
                        // error={true}
                        // footer="Please enter previously used legal full name following format: First Last"
                    >
                        {inputProps =>
                            <Input
                                {...inputProps}
                            />
                        }
                    </InputWrapper>

                    <InputWrapper
                        id="text-area-wrl-id-1"
                        labelText="Previous legal full name (2)"
                        renderLabel={() => (
                            <Row justifyContent="space-between">
                                <Text fontSize="T200">Previous full name (2)</Text>
                                <Text fontSize="T200">Optional</Text>
                            </Row>
                        )}
                        error={false}
                        // footer="Please enter previously used legal full name following format: First Last"
                    >
                        {inputProps =>
                            <Input
                                {...inputProps}
                            />
                        }
                    </InputWrapper>
                </Col>
            }

        </Col>
    )
}

export default PreviousLegalNameForm;
