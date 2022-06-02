import React from "react";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Label, Text } from "@amzn/stencil-react-components/text";
import { Select } from "@amzn/stencil-react-components/form";
import { translate as t } from "../../../utils/translator";
import { DayHoursFilter, ScheduleStateFilters } from "../../../utils/types/common";
import DaysHoursFilter from "../daysHoursFilter/DaysHoursFilter";
import { DESIRED_WORK_HOURS } from "../../../utils/enums/common";
import { boundUpdateScheduleFilters } from "../../../actions/ScheduleActions/boundScheduleActions";

interface FilterScheduleProps {
    filters: ScheduleStateFilters
}

const FilterSchedule = ( props: FilterScheduleProps ) => {

    const { filters } = props;
    const { daysHoursFilter, maxHoursPerWeek } = filters;

    const updateMaxHoursPerWeek = ( key: DESIRED_WORK_HOURS ) => {
        const newFilters = { ...filters };
        newFilters.maxHoursPerWeek = key;
        boundUpdateScheduleFilters(newFilters);
    }

    const updateDaysHourFilter = ( dayHourFilters: DayHoursFilter[] ) => {
        const newFilters = { ...filters };
        newFilters.daysHoursFilter = dayHourFilters;
        boundUpdateScheduleFilters(newFilters);
    }

    return (
        <Col gridGap={20}>
            <Col gridGap={10} width="100%" padding={{ right: 'S300' }}>
                <Label htmlFor='desiredHoursSelect'>
                    {t("BB-FilterSchedule-desired-hour-select-label-text", "Desired hours per week")}
                </Label>
                <Select
                    id="desiredHoursSelect"
                    onChange={( option ) => updateMaxHoursPerWeek(option)}
                    options={Object.values(DESIRED_WORK_HOURS)}
                    renderOption={option => (
                        <Row width='100%'>
                            <Text>{t('BB-FilterSchedule-DesiredHours-Upto-hours', "Upto {hourNumber} hours", { hourNumber: option })}</Text>
                        </Row>
                    )}
                    defaultValue={maxHoursPerWeek}
                    renderNativeOption={option => t('BB-FilterSchedule-DesiredHours-Upto-hours', "Upto {hourNumber} hours", { hourNumber: option })}
                    renderSelectedValue={option => t('BB-FilterSchedule-DesiredHours-Upto-hours', "Upto {hourNumber} hours", { hourNumber: option })}
                    valueAccessor={option => option}
                    placeholder={t("BB-FilterSchedule-desired-hour-select-place-holder", "Select Desired Hours")}
                />
            </Col>
            <DaysHoursFilter
                defaultFilter={daysHoursFilter}
                label={t("BB-DaysHoursFilter-title-text", "Filter Schedules")}
                onValueChange={updateDaysHourFilter}
            />
        </Col>
    )
}

export default FilterSchedule;
