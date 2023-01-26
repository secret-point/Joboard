import { shallow } from "enzyme";
import React from "react";
import { PAGE_ROUTES } from "../../../../../src/components/pageRoutes";
import { mountWithStencil } from "@amzn/stencil-react-components/tests";
import NhePreferenceCard from "../../../../../src/components/common/nhe/NhePreferenceCard";

describe("NhePreference Card", () => {
  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <NhePreferenceCard />);

    expect(shallowWrapper).toMatchSnapshot();
  });

  it("it should open nhe preference on click", () => {
    window.location.hash = `#/${PAGE_ROUTES.NHE}`;
    const wrapper = mountWithStencil(<NhePreferenceCard />);
    const goBackToShiftSelectionButton = wrapper.find("Row.nhePreferenceLink");
    goBackToShiftSelectionButton.simulate("click");

    wrapper.update();
    expect(window.location.hash).toEqual(`#/${PAGE_ROUTES.NHE_PREFERENCES}`);
  });
});