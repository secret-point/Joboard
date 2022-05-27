import React, { useState } from 'react';
import { Col } from "@amzn/stencil-react-components/layout";
import { DetailedRadio } from "@amzn/stencil-react-components/form";
import { translate as t } from "../../../utils/translator";
import { ScheduleSortList } from "../../../utils/constants/common";

const SortSchedule = () => {

    const [sortBy, setSortBy] = useState();

    return (
        <Col gridGap="S300" minWidth='420px'>
            {
                ScheduleSortList.map(sortItem => (
                    <DetailedRadio
                        name={`sort-schedule-by`}
                        value={sortItem.value}
                        titleText={t(sortItem.translationKey, sortItem.title)}
                        onChange={e => setSortBy(e.target.value)}
                    />
                ))
            }
        </Col>
    )
}

export default SortSchedule;
