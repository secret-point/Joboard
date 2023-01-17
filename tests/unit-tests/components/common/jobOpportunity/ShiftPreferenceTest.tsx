import { shallow } from "enzyme";
import React from "react";
import ShiftPreferenceWithStore, {
  ShiftPreferences
} from "../../../../../src/components/common/jobOpportunity/ShiftPreferences";
import { mountWithStencil } from "@amzn/stencil-react-components/tests";
import { PAGE_ROUTES } from "../../../../../src/components/pageRoutes";
import {
  TEST_APPLICATION_DATA, TEST_APPLICATION_ID,
  TEST_APPLICATION_STATE,
  TEST_CANDIDATE_STATE,
  TEST_JOB, TEST_JOB_ID,
  TEST_JOB_STATE, TEST_SCHEDULE_ID
} from "../../../../test-utils/test-data";
import store from "../../../../../src/store/store";
import { Provider } from "react-redux";
import { useLocation } from "react-router-dom";

describe("ShiftPreference Component", () => {
  const initStoreState = store.getState();
  let state: any;
  store.getState = () => state;

  const mockLocation = {
    pathname: "/job-opportunities/shift-preference",
    search: `?jobId=${TEST_JOB_ID}&scheduleId=${TEST_SCHEDULE_ID}&applicationId=${TEST_APPLICATION_ID}`,
    hash: "",
    state: null
  };
  const mockUseLocation = useLocation as jest.Mock;

  beforeEach(() => {
    state = {
      ...initStoreState,
      application: TEST_APPLICATION_STATE,
      job: TEST_JOB_STATE,
      candidate: TEST_CANDIDATE_STATE
    };
    mockUseLocation.mockReturnValue(mockLocation);
  });

  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <ShiftPreferences job={TEST_JOB} application={TEST_APPLICATION_DATA} candidate={TEST_CANDIDATE_STATE} />);

    expect(shallowWrapper).toMatchSnapshot();
  });

  test("it should redirect to job opportunity when click to back to shift selection link", () => {
    window.location.hash = `#/${PAGE_ROUTES.SHIFT_PREFERENCE}`;
    const wrapper = mountWithStencil(
      <Provider store={store}>
        <ShiftPreferenceWithStore />
      </Provider>);
    const goBackToShiftSelectionButton = wrapper.find("Row.shiftPreferenceLink");
    goBackToShiftSelectionButton.simulate("click");

    wrapper.update();
    expect(window.location.hash).toEqual(`#/${PAGE_ROUTES.JOB_OPPORTUNITIES}`);
  });

  it("should display error if save preference button is clicked with invalid input", () => {
    let wrapper = mountWithStencil(
      <Provider store={store}>
        <ShiftPreferenceWithStore />
      </Provider>);
    const saveShiftPreference = wrapper.find("Button#saveShiftPreference");
    saveShiftPreference.simulate("click");

    wrapper = wrapper.update();
    expect(wrapper.find("InputFooter#hoursPerWeekErrorContainer").text()).toContain("Please select at least one option for the number of hours you are able to work per week.");
    expect(wrapper.find("InputFooter#worDaysErrorContainer").text()).toContain("Please select at least one day of the week that you are able to work.");
    expect(wrapper.find("InputFooter#shiftPatternErrorContainer").text()).toContain("Select at least one option.");
  });
});