import React, { ChangeEvent, useState } from "react";
import { AsYouType, isValidPhoneNumber, validatePhoneNumberLength, CountryCode as LibCountryCode } from "libphonenumber-js";
import { Input, InputWrapper, Select } from "@amzn/stencil-react-components/form";
import { Row, View } from "@amzn/stencil-react-components/layout";
import { Label, Text } from "@amzn/stencil-react-components/text";
import { FormInputItem, InputType } from "../../../../utils/types/common";
import { CountryPhoneCodes } from "../../../../constants/countryPhoneCode";
import { CountryCode } from "../../../../utils/enums/common";
import { translate as t } from "../../../../utils/translator";

interface FormPhoneNumberBgcProps {
  countryCode: CountryCode;
  formItem: FormInputItem;
  countryPhoneCodes: CountryPhoneCodes;
  changePhoneNumber: Function;
}

const FormPhoneNumberBgc = (props: FormPhoneNumberBgcProps) => {
  const {
    formItem: { id, labelText, hasError, defaultValue, name, toolTipText, required, labelTranslationKey, errorMessage, errorMessageTranslationKey, placeholder, placeholderTranslationKey },
    changePhoneNumber,
    countryPhoneCodes,
    countryCode
  } = props;

  const errorText = errorMessageTranslationKey && errorMessage ? t(errorMessageTranslationKey, errorMessage) : errorMessage;
  const placeholderText = placeholder && placeholderTranslationKey ? t(placeholderTranslationKey, placeholder) : placeholder;

  const [phoneCode, setPhoneCode] = useState(countryPhoneCodes[0].dial_code);
  const [phoneNumber, setPhoneNumber] = useState("");
  const _countryCode = countryCode as LibCountryCode;

  const handleChangePhoneCode = (phoneCode: string) => {
    setPhoneCode(phoneCode);
  };

  const handleInputPhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const formattedInput = new AsYouType(_countryCode).input(e.target.value);
    const isPhoneNumberTooLong = validatePhoneNumberLength(formattedInput, _countryCode) === "TOO_LONG";
    // There is a bug on AsYouType method, that doesn't change the input if the input format is ended with ")" character
    const isNotEndWithParantheses = formattedInput.slice(-1) === ")";

    if (!isPhoneNumberTooLong) {
      const _phoneNumber = isNotEndWithParantheses ? e.target.value : formattedInput;
      setPhoneNumber(_phoneNumber);
      changePhoneNumber(phoneCode + _phoneNumber);
    }
  };

  const isShowError = isValidPhoneNumber(phoneNumber, _countryCode) ? false : phoneNumber.length === 0 ? false : true;
  const renderPhoneCodes = countryPhoneCodes.map(phoneCode => phoneCode.dial_code);

  return (
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
        <>
          <View display="flex" justifyContent="space-between">
            <Select
              width={80}
              id={id}
              labelId={`${id}-label`}
              onChange={e => handleChangePhoneCode(e)}
              options={renderPhoneCodes}
              value={phoneCode}
            />
            <Input
              {...inputProps}

              aria-label={name}
              aria-invalid={hasError}
              width={"calc(100% - 100px)"}
              name={name}
              id={id}
              type={"text" as InputType}
              error={isShowError}
              aria-describedby={`introduction ${inputProps["aria-describedby"]}`}
              onChange={e => handleInputPhoneNumber(e)}
              value={phoneNumber}
              // {...(handleBlur && { onBlur: e => handleBlur(e) }) }
              defaultValue={defaultValue}
              max={new Date("2022-01-01T00:00").toDateString()}
              placeholder={placeholderText || ""}
            />
          </View>
        </>
      )}
    </InputWrapper>
  );
};

export default FormPhoneNumberBgc;
