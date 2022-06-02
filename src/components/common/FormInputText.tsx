import { Input, InputWrapper } from "@amzn/stencil-react-components/form";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Label, Text } from "@amzn/stencil-react-components/text";
import React from "react";
import { FormInputItem, InputType } from "../../utils/types/common";

interface FormInputTextProps {
    inputItem: FormInputItem,
    defaultValue: string,
    handleChange: Function
}

const FormInputText = ( props: FormInputTextProps ) => {
    const { inputItem, handleChange, defaultValue } = props;
    const { labelText, required, toolTipText, id, errorMessage, hasError, name, inputType } = inputItem;

    return (
        <Col className="formInputItem">
            <InputWrapper
                labelText={labelText}
                id={id}
                required={!!required}
                tooltipText={toolTipText || ''}
                error={!!hasError}
                footer={hasError ? errorMessage || undefined : undefined}
                renderLabel={() => (
                    <Row
                        alignItems="center"
                        id={`${id}-renderLabel`}
                        gridGap={"S300"}
                        dataTestId='formInputItem-renderLabel'
                        width="100%"
                    >
                        <Label htmlFor={id} style={{ width: '100%' }}>
                            <Row
                                gridGap={8}
                                justifyContent={required ? 'flex-start' : 'space-between'}
                                width="100%"
                            >
                                <Text fontWeight='bold'>{labelText}</Text>
                                <Row>
                                    {required ? <Text color='red'> * </Text> : <Text>Optional</Text>}
                                </Row>
                            </Row>
                        </Label>
                    </Row>
                )}
            >
                {inputProps => (
                    <Input
                        {...inputProps}

                        aria-label={name}
                        aria-invalid={hasError}
                        width="100%"
                        name={name}
                        id={id}
                        type={inputType as InputType}
                        aria-describedby={`introduction ${inputProps['aria-describedby']}`}
                        onChange={e => handleChange(e)}
                        defaultValue={defaultValue}
                        max={new Date("2022-01-01T00:00").toDateString()}
                    />
                )}
            </InputWrapper>
        </Col>
    )
}

export default FormInputText;
