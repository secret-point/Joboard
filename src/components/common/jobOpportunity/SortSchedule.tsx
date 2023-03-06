import React from "react";
import { Col } from "@amzn/stencil-react-components/layout";
import { DetailedRadio } from "@amzn/stencil-react-components/form";
import { translate as t } from "../../../utils/translator";
import { SCHEDULE_FILTER_TYPE } from "../../../utils/enums/common";
import { boundUpdateScheduleFilters } from "../../../actions/ScheduleActions/boundScheduleActions";
import { ScheduleStateFilters } from "../../../utils/types/common";
import { getScheduleSortList } from "../../../countryExpansionConfig";

interface SortScheduleProps {
  filters: ScheduleStateFilters;
}

const SortSchedule = (props: SortScheduleProps) => {

  const { filters } = props;
  const { sortKey } = filters;

  const updateSortKey = (key: SCHEDULE_FILTER_TYPE) => {
    const newFilters = { ...filters };
    newFilters.sortKey = key;
    boundUpdateScheduleFilters(newFilters);
  };

  return (
    <Col gridGap="S300" className="sortScheduleContainer">
      {
        getScheduleSortList().map(sortItem => (
          <DetailedRadio
            key={sortItem.value}
            name={"sort-schedule-by"}
            value={sortItem.value}
            titleText={t(sortItem.translationKey, sortItem.title)}
            onChange={() => updateSortKey(sortItem.value)}
            checked={sortItem.value === sortKey}
          />
        ))
      }
    </Col>
  );
};

export default SortSchedule;
