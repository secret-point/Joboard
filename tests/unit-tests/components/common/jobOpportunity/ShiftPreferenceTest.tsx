import { shallow } from "enzyme";
import React from "react";
import ShiftPreference from "../../../../../src/components/common/jobOpportunity/ShiftPreference";
import { mountWithStencil } from "@amzn/stencil-react-components/tests";
import { PAGE_ROUTES } from "../../../../../src/components/pageRoutes";

describe("ShiftPreference Component", () => {
  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <ShiftPreference />);

    expect(shallowWrapper).toMatchSnapshot();
  });

  test("it should redirect to job opportunity when click to back to shift selection link", () => {
    window.location.hash = `#/${PAGE_ROUTES.SHIFT_PREFERENCE}`;
    const wrapper = mountWithStencil(<ShiftPreference />);
    const goBackToShiftSelectionButton = wrapper.find("Row.shiftPreferenceLink");
    goBackToShiftSelectionButton.simulate("click");

    wrapper.update();
    expect(window.location.hash).toEqual(`#/${PAGE_ROUTES.JOB_OPPORTUNITIES}`);
  });

  it("should display error if save preference button is clicked with invalid input", () => {
    let wrapper = mountWithStencil(<ShiftPreference />);
    const saveShiftPreference = wrapper.find("Button#saveShiftPreference");
    saveShiftPreference.simulate("click");

    wrapper = wrapper.update();
    expect(wrapper.find("InputFooter#hoursPerWeekErrorContainer").text()).toContain("Please select at least one option for the number of hours you are able to work per week.");
    expect(wrapper.find("InputFooter#worDaysErrorContainer").text()).toContain("Please select at least one day of the week that you are able to work.");
    expect(wrapper.find("InputFooter#shiftPatternErrorContainer").text()).toContain("Select at least one option.");
  });
});