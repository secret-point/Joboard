import React from "react";
import { shallow } from "enzyme";
import { dayHoursFilterValues, initScheduleStateFilters } from "../../../../../src/utils/constants/common";
import FilterScheduleUK from "../../../../../src/components/uk/jobOpportunity/FilterScheduleUK";
import { mountWithStencil } from "@amzn/stencil-react-components/tests";

describe("ShiftPreference Card", () => {

  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <FilterScheduleUK
        filters={{
          ...initScheduleStateFilters,
          daysHoursFilter: dayHoursFilterValues
        }}
        scheduleCount={5}
        supportedCities={["test1", "test2"]}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });

  it("should show error message on invalid date on startDate", () => {
    let wrapper = mountWithStencil(
      <FilterScheduleUK
        filters={{
          ...initScheduleStateFilters,
          daysHoursFilter: dayHoursFilterValues
        }}
        scheduleCount={5}
        supportedCities={["test1", "test2"]}
      />);
    const dateInput = wrapper.find("input#startDateBegin");
    dateInput.simulate("change", { target: { value: "20/20/20000" } });

    wrapper = wrapper.update();
    const errorMessage = wrapper.find("InputFooter#startDateBeginErrorMessage");
    expect(errorMessage.text()).toContain("Please select a valid date");
  });

  it("should show error message on invalid date on startEndDate", () => {
    let wrapper = mountWithStencil(
      <FilterScheduleUK
        filters={{
          ...initScheduleStateFilters,
          daysHoursFilter: dayHoursFilterValues
        }}
        scheduleCount={5}
        supportedCities={["test1", "test2"]}
      />);
    const dateInput = wrapper.find("input#startDateEnd");
    dateInput.simulate("change", { target: { value: "20/20/20000" } });

    wrapper = wrapper.update();
    const errorMessage = wrapper.find("InputFooter#startDateEndErrorMessage");
    expect(errorMessage.text()).toContain("Please select a valid date");
  });
});