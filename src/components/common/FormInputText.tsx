import { Input, InputWrapper } from "@amzn/stencil-react-components/form";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Label, Text } from "@amzn/stencil-react-components/text";
import React from "react";
import { FormInputItem, InputType } from "../../utils/types/common";
import { translate as t } from "../../utils/translator";

interface FormInputTextProps {
    inputItem: FormInputItem,
    defaultValue: string,
    handleChange: Function
    disabled?: boolean
    inputValue?: string
}

const FormInputText = ( props: FormInputTextProps ) => {
    const { inputItem, handleChange, defaultValue } = props;
    const { labelText, required, toolTipText, id, errorMessage, hasError, name, inputType, labelTranslationKey, placeholderTranslationKey, errorMessageTranslationKey, placeholder } = inputItem;

    const errorText = errorMessageTranslationKey && errorMessage ? t(errorMessageTranslationKey, errorMessage) : errorMessage;
    const placeholderText = placeholder && placeholderTranslationKey ? t(placeholderTranslationKey, placeholder) : placeholder;

    return (
        <Col className="formInputItem">
            <InputWrapper
                labelText={labelTranslationKey ? t(labelTranslationKey, labelText) : labelText}
                id={id}
                required={!!required}
                tooltipText={toolTipText || ''}
                error={!!hasError}
                footer={hasError ? errorText || undefined : undefined}
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
                                <Text fontWeight='bold'>{labelTranslationKey ? t(labelTranslationKey, labelText) : labelText}</Text>
                                <Row>
                                    {required ? <Text color='red'> * </Text> : <Text>{t('BB-BGC-form-optional-input-label-text', 'Optional')}</Text>}
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
                        placeholder={placeholderText || ''}
                        disabled={props.disabled}
                        {...((props.inputValue !== undefined) && { value: props.inputValue })}
                    />
                )}
            </InputWrapper>
        </Col>
    )
}

export default FormInputText;
