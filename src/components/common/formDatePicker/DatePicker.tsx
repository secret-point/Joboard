import React, { useEffect, useState } from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { InputWrapper, } from "@amzn/stencil-react-components/form";
import { Label, Text } from "@amzn/stencil-react-components/text";
import { PopupDatePicker } from "@amzn/stencil-react-components/date-picker";
import moment from "moment";
import YearMonthPicker from "./YearMonthPicket";
import { FormInputItem } from "../../../utils/types/common";
import { PopoverPosition } from "@amzn/stencil-react-components/popover";
import { translate as t } from "../../../utils/translator";

type RenderPopupContentProps = {
    calendar: React.ReactNode;
    legend: React.ReactNode;
};

interface DatePickerProps {
    inputItem: FormInputItem,
    defaultValue: string,
    handleChange: Function
}

const DatePicker = ( props: DatePickerProps ) => {
    const { inputItem, defaultValue: value, handleChange } = props;
    const {
        hasError,
        id = "date-picker-box",
        name,
        dataKey,
        required,
        labelText,
        toolTipText,
        errorMessage,
        placeholder,
        placeholderTranslationKey,
        errorMessageTranslationKey,
        labelTranslationKey
    } = inputItem;

    const errorText = errorMessageTranslationKey && errorMessage ? t(errorMessageTranslationKey, errorMessage) : errorMessage;
    const placeholderText = placeholder && placeholderTranslationKey ? t(placeholderTranslationKey, placeholder) : placeholder;

    const [date, setDate] = useState<string | undefined>(undefined);
    const [month, setMonth] = useState<string>("");
    const [year, setYear] = useState<string>("");

    useEffect(() => {
        const dateFromValue = value ? moment(value) : moment();
        setMonth(dateFromValue.format("MM"));
        setYear(dateFromValue.format("yyyy"));
        if(value) {
            setDate(dateFromValue.format("yyyy-MM-DD"));
        }
    }, [value]);

    const onYearMonthChange = ( value: number, unit: any ) => {
        if(unit === "M") {
            setMonth(value.toString());
        }
        else {
            setYear(value.toString());
        }

        if(date) {
            const selectedDate = moment(date).set(unit, value).format("yyyy-MM-DD");
            onDateChange(selectedDate);
        }
        else {
            const selectedDate = moment().set(unit, value).format("yyyy-MM-DD");
            onDateChange(selectedDate);
        }
    };

    const renderPopupContent = ( params: RenderPopupContentProps ) => {
        const { calendar, legend, } = params;
        return (
            <Col gridGap={15} alignItems="center">
                {calendar}
                <YearMonthPicker month={month} year={year} onChange={onYearMonthChange}/>
                {legend}
            </Col>

        )
    };

    const onDateChange = ( value: string ) => {
        setDate(value);
        if(handleChange) {
            handleChange(value)
        }
    };

    return (
        <Col gridGap={5} maxWidth="100%" className="formInputItem">
            <InputWrapper
                labelText={labelTranslationKey ? t(labelTranslationKey, labelText) : labelText}
                id={id}
                tooltipText={toolTipText}
                error={hasError}
                footer={hasError ? t(errorMessageTranslationKey || "", errorMessage || "") : undefined}
                data-testid={`input-wrapper-${id}`}
                required={required}
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
                {( inputProps ) => (
                    <PopupDatePicker
                        {...inputProps}
                        id={id}
                        aria-label={name}
                        aria-describedby={`introduction ${inputProps["aria-describedby"]}`}
                        name={name}
                        value={date}
                        onChange={onDateChange}
                        data-testid={`date-picker-test-id-${id}`}
                        popoverProps={{
                            shouldCloseOnFocusLeave: true,
                            shouldFocusOnOpen: true,
                            position: PopoverPosition.TopLeading,
                        }}
                        error={hasError}
                        renderPopupContent={renderPopupContent}
                        inputProps={{
                            ...inputProps,
                            autoComplete: "off",
                            width: "100%",
                            error: hasError,
                        }}
                    />
                )}
            </InputWrapper>
        </Col>
    );
};

export default DatePicker;

