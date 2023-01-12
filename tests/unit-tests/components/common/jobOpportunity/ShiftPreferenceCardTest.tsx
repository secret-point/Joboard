import { shallow } from "enzyme";
import React from "react";
import ShiftPreferenceCard from "../../../../../src/components/common/jobOpportunity/ShiftPreferenceCard";
import { PAGE_ROUTES } from "../../../../../src/components/pageRoutes";
import { mountWithStencil } from "@amzn/stencil-react-components/tests";

describe("ShiftPreference Card", () => {
  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <ShiftPreferenceCard />);

    expect(shallowWrapper).toMatchSnapshot();
  });

  it("it should open shift preference on click", () => {
    window.location.hash = `#/${PAGE_ROUTES.JOB_OPPORTUNITIES}`;
    const wrapper = mountWithStencil(<ShiftPreferenceCard />);
    const goBackToShiftSelectionButton = wrapper.find("Row.shiftPreferenceLink");
    goBackToShiftSelectionButton.simulate("click");

    wrapper.update();
    expect(window.location.hash).toEqual(`#/${PAGE_ROUTES.SHIFT_PREFERENCE}`);
  });
});