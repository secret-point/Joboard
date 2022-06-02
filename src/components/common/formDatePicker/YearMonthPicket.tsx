import React from "react";
import { Select } from "@amzn/stencil-react-components/form";
import { Row } from "@amzn/stencil-react-components/layout";
import moment from "moment";
import range from "lodash/range";
import { Text } from "@amzn/stencil-react-components/text";

interface YearMonthPickerProps {
    month: string;
    year: string;
    onChange: Function;
}

const YearMonthPicker = ( props: YearMonthPickerProps ) => {
    const { month, year, onChange } = props;

    const onYearMonthChange = ( param: any ) => {
        const { name, value } = param;
        const selectedValue = name === "M" ? parseInt(value) - 1 : value;
        onChange(selectedValue, name);
    };

    const currentYear = moment().get("year");

    return (
        <Row gridGap={15} width="90%" padding={{ bottom: 'S300', right: 'S300', left: 'S300' }}>
            <Select
                name="M"
                defaultValue={parseInt(month)}
                onChange={option => {
                    console.log(option, ' test month', month, range(0, 12))
                    const param = {
                        value: option,
                        name: "M"
                    }
                    onYearMonthChange(param)
                }
                }
                options={range(1, 13)}
                renderOption={( value: number ) => (
                    <Text>
                        {moment().set("M", value - 1).format("MMMM")}
                    </Text>
                )}
                renderSelectedValue={( value: number ) => (
                    <Text>
                        {moment().set("M", value - 1).format("MMMM")}
                    </Text>
                )}
                renderNativeOption={( value: number ) => moment().set("M", value - 1).format("MMMM")}
                valueAccessor={( value: number ) => `${value - 1}`}
                width="60%"
                listMaxHeight={350}
                noOptionsText="Month"
            />
            <Select
                name="Y"
                defaultValue={parseInt(year)}
                onChange={option => {
                    const param = {
                        value: option,
                        name: "Y"
                    }
                    onYearMonthChange(param)
                }}
                options={range(currentYear - 100, currentYear + 1)}
                width="40%"
                listMaxHeight={350}
                noOptionsText="Year"
            />
        </Row>
    );
};

export default YearMonthPicker;
