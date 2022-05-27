import React, { useEffect, useState } from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Label, Text } from "@amzn/stencil-react-components/text";
import { Select } from "@amzn/stencil-react-components/form";
import { DaysHoursDefaultFilters, DesiredHoursPerWeekList } from "../../../utils/constants/common";
import { translate as t } from "../../../utils/translator";
import { DesiredHoursPerWeek } from "../../../utils/types/common";
import DaysHoursFilter from "../daysHoursFilter/DaysHoursFilter";

const FilterSchedule = () => {

    const [desiredHour, setDesiredHour] = useState<DesiredHoursPerWeek>();
    const [daysHour, setDaysHour] = useState();

    useEffect(() => {
        console.log(daysHour, 'daysHour', desiredHour?.value)
    })
    return (
        <Col gridGap={20}>
            <Col gridGap={10} width="100%" padding={{ right: 'S300' }}>
                <Label htmlFor='desiredHoursSelect'>
                    {t("BB-FilterSchedule-desired-hour-select-label-text", "Desired hours per week")}
                </Label>
                <Select
                    id="desiredHoursSelect"
                    onChange={( option ) => setDesiredHour(option)}
                    options={DesiredHoursPerWeekList}
                    renderOption={option => (
                        <Row width='100%'>
                            <Text> {t(option.translationKey, option.title)}</Text>
                        </Row>
                    )}
                    renderNativeOption={option => t(option.translationKey, option.title)}
                    renderSelectedValue={option => t(option.translationKey, option.title)}
                    valueAccessor={option => t(option.translationKey, option.title)}
                    placeholder={t("BB-FilterSchedule-desired-hour-select-place-holder", "Select Desired Hours")}
                />
            </Col>
            <DaysHoursFilter
                defaultFilter={DaysHoursDefaultFilters}
                label={t("BB-DaysHoursFilter-title-text", "Filter Schedules")}
                onValueChange={setDaysHour}
            />
        </Col>
    )
}

export default FilterSchedule;
