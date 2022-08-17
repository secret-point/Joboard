import React from "react";
import { shallow } from "enzyme";
import { DaysHoursFilter } from "../../../../../src/components/common/daysHoursFilter/DaysHoursFilter";
import { TEST_DAYS_HOURS_FILTER } from "../../../../test-utils/test-data";

describe("DaysHoursFilter", () => {
  const callback = jest.fn();

  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <DaysHoursFilter
        defaultFilter={TEST_DAYS_HOURS_FILTER}
        label="Test Filter Schedules"
        onValueChange={callback}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
