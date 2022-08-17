import React from "react";
import { shallow } from "enzyme";
import { TimeRange } from "../../../../../src/components/common/daysHoursFilter/TimeRange";
import { DAYS_OF_WEEK } from "../../../../../src/utils/enums/common";

describe("TimeRange", () => {
  const callback = jest.fn();

  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <TimeRange
        id="MONDAYTimeRange"
        key={DAYS_OF_WEEK.MONDAY}
        dayIndex={0}
        disabled={false}
        onChange={callback}
        startTimeHours={-1}
        endTimeHours={12}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
