import { shallow } from "enzyme";
import React from "react";
import FilterSchedule from "../../../../../src/components/common/jobOpportunity/FilterSchedule";
import { dayHoursFilterValues, initScheduleStateFilters } from "../../../../../src/utils/constants/common";

describe("ShiftPreference Card", () => {
  it("should match snapshot - without Military display", () => {
    const shallowWrapper = shallow(
      <FilterSchedule displayMilitaryTime={false} filters={{
        ...initScheduleStateFilters,
        daysHoursFilter: dayHoursFilterValues
      }}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });

  it("should match snapshot - with Military display", () => {
    const shallowWrapper = shallow(
      <FilterSchedule displayMilitaryTime filters={{
        ...initScheduleStateFilters,
        daysHoursFilter: dayHoursFilterValues
      }}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});