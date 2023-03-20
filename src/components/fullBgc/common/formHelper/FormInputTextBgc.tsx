import React from "react";
import { Input, InputWrapper } from "@amzn/stencil-react-components/form";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Label, Text } from "@amzn/stencil-react-components/text";
import { translate as t } from "../../../../utils/translator";
import { FormInputItem, InputType } from "../../../../utils/types/common";

interface FormInputTextBGCProps {
  inputItem: FormInputItem;
  defaultValue: string;
  handleChange: Function;
  handleBlur?: Function;
  disabled?: boolean;
  inputValue?: string;
  noMarginBottom?: boolean;
}

const FormInputTextBGC = ( props: FormInputTextBGCProps ) => {
  const { inputItem, handleChange, handleBlur, defaultValue, noMarginBottom } = props;
  const { labelText, required, toolTipText, id, errorMessage, hasError, name, inputType, labelTranslationKey, placeholderTranslationKey, errorMessageTranslationKey, placeholder } = inputItem;

  const errorText = errorMessageTranslationKey && errorMessage ? t(errorMessageTranslationKey, errorMessage) : errorMessage;
  const placeholderText = placeholder && placeholderTranslationKey ? t(placeholderTranslationKey, placeholder) : placeholder;

  return (
    <Col className="formInputItem">
      <InputWrapper
        labelText={labelTranslationKey ? t(labelTranslationKey, labelText) : labelText}
        id={id}
        required={!!required}
        tooltipText={toolTipText || ""}
        error={!!hasError}
        footer={hasError ? errorText || undefined : undefined}
        renderLabel={() => (
          <Label htmlFor={id}>
            <Row
              alignItems="center"
              id={`${id}-renderLabel`}
              gridGap={"S300"}
              dataTestId="formInputItem-renderLabel"
              width="100%"
            >
              <Row
                gridGap={8}
                justifyContent={required ? "flex-start" : "unset"}
                width="100%"
              >
                <Text fontSize="T200">{labelTranslationKey ? t(labelTranslationKey, labelText) : labelText}</Text>
                <Row>
                  {required && <Text color="red"> * </Text>}
                </Row>
              </Row>
            </Row>
          </Label>
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
            aria-describedby={`introduction ${inputProps["aria-describedby"]}`}
            onChange={e => handleChange(e)}
            {...(handleBlur && { onBlur: e => handleBlur(e) }) }
            defaultValue={defaultValue}
            max={new Date("2022-01-01T00:00").toDateString()}
            placeholder={placeholderText || ""}
            disabled={props.disabled}
            {...((props.inputValue !== undefined) && { value: props.inputValue })}
            margin={{ bottom: noMarginBottom ? 0 : 10 }}
          />
        )}
      </InputWrapper>
    </Col>
  );
};

export default FormInputTextBGC;
