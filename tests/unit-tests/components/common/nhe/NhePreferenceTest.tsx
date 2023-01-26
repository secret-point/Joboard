import { shallow } from "enzyme";
import React from "react";
import NhePreferenceWithStore, { NhePreferences } from "../../../../../src/components/common/nhe/NhePreferences";
import { mountWithStencil } from "@amzn/stencil-react-components/tests";
import { PAGE_ROUTES } from "../../../../../src/components/pageRoutes";
import {
  TEST_APPLICATION_DATA,
  TEST_APPLICATION_ID,
  TEST_APPLICATION_STATE,
  TEST_CANDIDATE_STATE,
  TEST_JOB,
  TEST_JOB_ID,
  TEST_JOB_STATE,
  TEST_NHE_STATE,
  TEST_SCHEDULE_ID,
  TestSavePossibleNheDateRequest
} from "../../../../test-utils/test-data";
import store from "../../../../../src/store/store";
import { Provider } from "react-redux";
import { useLocation } from "react-router-dom";
import * as nheBoundAction from "../../../../../src/actions/NheActions/boundNheAction";

const boundSetPossibleNhePreferenceRequestSpy = jest.spyOn(nheBoundAction, "boundSetPossibleNhePreferenceRequest");
describe("NhePreference Component", () => {
  const initStoreState = store.getState();
  let state: any;
  store.getState = () => state;

  const mockLocation = {
    pathname: "/nhe/nhe-preference",
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
      candidate: TEST_CANDIDATE_STATE,
      nhe: TEST_NHE_STATE
    };
    mockUseLocation.mockReturnValue(mockLocation);
    boundSetPossibleNhePreferenceRequestSpy.mockReset();
  });

  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <NhePreferences job={TEST_JOB} application={TEST_APPLICATION_DATA} candidate={TEST_CANDIDATE_STATE} nhe={TEST_NHE_STATE} />);

    expect(shallowWrapper).toMatchSnapshot();
  });

  test("it should redirect to Nhe when click to back to shift selection link", () => {
    window.location.hash = `#/${PAGE_ROUTES.NHE_PREFERENCES}`;
    const wrapper = mountWithStencil(
      <Provider store={store}>
        <NhePreferenceWithStore />
      </Provider>);
    const goBackToShiftSelectionButton = wrapper.find("Row.nhePreferenceLink");
    goBackToShiftSelectionButton.simulate("click");

    wrapper.update();
    expect(window.location.hash).toEqual(`#/${PAGE_ROUTES.NHE}`);
  });

  it("should display error if save preference button is clicked with invalid input", () => {
    let wrapper = mountWithStencil(
      <Provider store={store}>
        <NhePreferenceWithStore />
      </Provider>);
    const saveShiftPreference = wrapper.find("Button#saveNhePreference");
    saveShiftPreference.simulate("click");

    wrapper = wrapper.update();
    expect(wrapper.find("InputFooter#nheDateErrorContainer").text()).toContain("Please select at least one date.");
    expect(wrapper.find("InputFooter#nheTimeSlotErrorContainer").text()).toContain("Please select at least one time range.");
  });

  it("should update request if select Location input change ", () => {
    const wrapper = mountWithStencil(
      <Provider store={store}>
        <NhePreferenceWithStore />
      </Provider>);

    const nheSelectLocationInput = wrapper.find("select#nheSelectLocationInput");
    nheSelectLocationInput.simulate("change", { target: {
      label: "Templeton bridge",
      value: "Templeton bridge",
      checked: false
    } });

    expect(boundSetPossibleNhePreferenceRequestSpy).toHaveBeenCalledWith({
      ...TestSavePossibleNheDateRequest,
      possibleCities: [
        {
          ...TestSavePossibleNheDateRequest.possibleCities[0],
          checked: true
        },
        TestSavePossibleNheDateRequest.possibleCities[1]
      ]
    });
  });
});