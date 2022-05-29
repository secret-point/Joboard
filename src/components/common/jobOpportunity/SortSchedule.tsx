import React from 'react';
import { Col } from "@amzn/stencil-react-components/layout";
import { DetailedRadio } from "@amzn/stencil-react-components/form";
import { translate as t } from "../../../utils/translator";
import { ScheduleSortList } from "../../../utils/constants/common";
import { ScheduleStateFilters } from "../../../reducers/schedule.reducer";
import { SCHEDULE_FILTER_TYPE } from "../../../utils/enums/common";
import { boundUpdateScheduleFilters } from "../../../actions/ScheduleActions/boundScheduleActions";

interface SortScheduleProps {
    filters: ScheduleStateFilters
}

const SortSchedule = (props: SortScheduleProps) => {

    const { filters } = props;
    const { sortKey } = filters;

    const updateSortKey = (key: SCHEDULE_FILTER_TYPE) => {
        const newFilters = { ...filters };
        newFilters.sortKey = key;
        boundUpdateScheduleFilters(newFilters);
    }

    return (
        <Col gridGap="S300" minWidth='420px'>
            {
                ScheduleSortList.map(sortItem => (
                    <DetailedRadio
                        name={`sort-schedule-by`}
                        value={sortItem.value}
                        titleText={t(sortItem.translationKey, sortItem.title)}
                        onChange={e => updateSortKey(sortItem.value)}
                        checked={sortItem.value === sortKey}
                    />
                ))
            }
        </Col>
    )
}

export default SortSchedule;
