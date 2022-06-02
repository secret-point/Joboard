import React from "react";
import { InputWrapper, Select } from "@amzn/stencil-react-components/form";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Label, Text } from "@amzn/stencil-react-components/text";
import { FormInputItem } from "../../utils/types/common";

interface FormInputSelectProps {
    inputItem: FormInputItem,
    defaultValue: string,
    handleChange: Function
}

const FormInputSelect = ( props: FormInputSelectProps ) => {
    const { defaultValue, inputItem, handleChange } = props;
    const { labelText, required, toolTipText, id, errorMessage, hasError, name, selectOptions } = inputItem;

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
                    <Select
                        {...inputProps}

                        aria-label={name}
                        aria-invalid={hasError}
                        width="100%"
                        name={name}
                        id={id}
                        defaultValue={defaultValue}
                        aria-describedby={`introduction ${inputProps['aria-describedby']}`}
                        onChange={option => {
                            handleChange(option);
                        }}
                        options={selectOptions || []}
                        aria-required={required}
                    />
                )}
            </InputWrapper>
        </Col>
    )
}

export default FormInputSelect;
