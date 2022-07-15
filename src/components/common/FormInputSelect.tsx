import React from "react";
import {
    InputWrapper,
    RenderNativeOptionFunction,
    RenderOptionFunction,
    Select,
    ValueAccessor
} from "@amzn/stencil-react-components/form";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Label, Text } from "@amzn/stencil-react-components/text";
import { FormInputItem, i18nSelectOption } from "../../utils/types/common";
import { isI18nSelectOption } from "../../utils/helper";
import { mapI18nStringKey, translate as t } from "../../utils/translator";
import { useTranslation } from "react-i18next";

interface FormInputSelectProps {
    inputItem: FormInputItem,
    defaultValue?: string | i18nSelectOption,
    handleChange: Function,
    renderOption?: RenderOptionFunction,
    renderNativeOption?: RenderNativeOptionFunction,
    valueAccessor?: ValueAccessor<any>
}

const FormInputSelect = ( props: FormInputSelectProps ) => {
    let { renderOption, renderNativeOption } = props;
    const { defaultValue, inputItem, handleChange } = props;
    const { labelText, required, toolTipText, id, errorMessage, hasError, name, selectOptions, placeholder, placeholderTranslationKey, errorMessageTranslationKey, labelTranslationKey } = inputItem;

    const useTrans = useTranslation();
    const errorText = errorMessageTranslationKey && errorMessage ? t(errorMessageTranslationKey, errorMessage) : errorMessage;
    const placeholderText = placeholder && placeholderTranslationKey ? t(placeholderTranslationKey, placeholder) : placeholder;

    if (isI18nSelectOption(selectOptions?.[0])){
        // Need useTranslation hook to avoid render error
        if (!renderOption) renderOption = (option: i18nSelectOption) => useTrans.t(mapI18nStringKey(option.translationKey), option.showValue)
        if (!renderNativeOption) renderNativeOption = (option: i18nSelectOption) => useTrans.t(mapI18nStringKey(option.translationKey), option.showValue)
    }

    return (
        <Col className="formInputItem">
            <InputWrapper
                labelText={labelTranslationKey  ? t(labelTranslationKey, labelText) : labelText}
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
                        placeholder={placeholderText || ''}
                    >
                        <Label htmlFor={id} style={{ width: '100%' }}>
                            <Row
                                gridGap={8}
                                justifyContent={required ? 'flex-start' : 'space-between'}
                                width="100%"
                            >
                                <Text fontWeight='bold'>{!!labelTranslationKey ? t(labelTranslationKey, labelText): labelText}</Text>
                                <Row>
                                    {required ? <Text color='red'> * </Text> : <Text>{t('BB-BGC-form-optional-input-label-text', 'Optional')}</Text>}
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
                        onChange={option => handleChange(option)}
                        options={selectOptions || []}
                        aria-required={required}
                        renderOption={renderOption}
                        renderNativeOption={renderNativeOption}
                    />
                )}
            </InputWrapper>
        </Col>
    )
}

export default FormInputSelect;
