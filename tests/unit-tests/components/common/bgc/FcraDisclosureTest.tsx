import React from "react";
import { StencilProvider } from "@amzn/stencil-react-components/context";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { mount, ReactWrapper, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { useLocation } from "react-router-dom";
import * as boundApplicationActions from '../../../../../src/actions/ApplicationActions/boundApplicationActions';
import { FcraDisclosure } from "../../../../../src/components/common/bgc/FcraDisclosure";
import store from "../../../../../src/store/store";
import {
  TEST_APPLICATION,
  TEST_APPLICATION_ID,
  TEST_APPLICATION_STATE, TEST_BGC_STATE,
  TEST_CANDIDATE,
  TEST_JOB,
  TEST_JOB_ID,
  TEST_JOB_STATE,
  TEST_SCHEDULE,
  TEST_SCHEDULE_ID,
  TEST_SCHEDULE_STATE
} from "../../../../test-utils/test-data";
import { mockGetApplicationApi, mockGetCandidateApi, mockGetJobApi, mockGetScheduleDetailsApi } from "../../../../test-utils/test-helper";

const boundUpdateApplicationDSSpy = jest.spyOn(boundApplicationActions, "boundUpdateApplicationDS");

jest.useFakeTimers();

describe("FcraDisclosure", () => {
  const mockLocation = {
    pathname: "/bgc/fcra",
    search: `?jobId=${TEST_JOB_ID}&applicationId=${TEST_APPLICATION_ID}&scheduleId=${TEST_SCHEDULE_ID}`,
    hash: "",
    state: null
  };
  const mockUseLocation = useLocation as jest.Mock;
  mockUseLocation.mockReturnValue(mockLocation);

  describe("snapshot", () => {
    it("should match snapshot", () => {
      const shallowWrapper = shallow(
        <FcraDisclosure
          job={TEST_JOB_STATE}
          application={TEST_APPLICATION_STATE}
          schedule={TEST_SCHEDULE_STATE}
          bgc={TEST_BGC_STATE}
        />
      );

      expect(shallowWrapper).toMatchSnapshot();
    });
  });

  describe("when rendering", () => {
    const apiMock = new MockAdapter(axios);
    let wrapper: ReactWrapper;
    let declineButton: ReactWrapper;
    let authorizeButton: ReactWrapper;
    let fullNameInput: ReactWrapper;

    beforeEach(async () => {
      mockGetCandidateApi(apiMock, TEST_CANDIDATE);
      mockGetApplicationApi(apiMock, TEST_APPLICATION);
      mockGetScheduleDetailsApi(apiMock, TEST_SCHEDULE);
      mockGetJobApi(apiMock, TEST_JOB);

      wrapper = mount(<Provider store={store}>
        <StencilProvider>
          <FcraDisclosure
            job={TEST_JOB_STATE}
            application={TEST_APPLICATION_STATE}
            schedule={TEST_SCHEDULE_STATE}
            bgc={TEST_BGC_STATE}
            />
        </StencilProvider>
      </Provider>);

      declineButton = wrapper.find('button[data-test-id="fcra-decline-btn"]');
      authorizeButton = wrapper.find('button[data-test-id="fcra-authorize-btn"]');
      fullNameInput = wrapper.find('input[data-test-id="fcra-full-name-input"]');
    });

    afterEach(() => {
      apiMock.reset();
      boundUpdateApplicationDSSpy.mockReset();
      wrapper.unmount();
    });

    it("should open modal if decline button is clicked", async () => {
      declineButton.simulate('click');
      const withdrawButton = wrapper.find('button[data-test-id="withdraw-application-button"]');
      expect(withdrawButton.exists()).toBeTruthy();
    });

    it("should have withdraw called", async () => {
      declineButton.simulate('click');
      const withdrawButton = wrapper.find('button[data-test-id="withdraw-application-button"]');
      await act(async () => {
        withdrawButton.simulate('click');
        jest.runAllTimers();
      });
      wrapper.update();
      expect(boundUpdateApplicationDSSpy).toHaveBeenCalled();
    });

    it("should check name present if authorize is clicked", async () => {
      expect(wrapper.find("#fcraFullNameInput-footer").exists()).toBeFalsy();
      await act(async () => {
        authorizeButton.simulate('click');
        jest.runAllTimers();
      });
      wrapper.update();
      expect(wrapper.find("#fcraFullNameInput-footer").at(0).text()).toContain("Please enter a valid full name following format: First Last");
      expect(boundUpdateApplicationDSSpy).not.toHaveBeenCalled();
    });

    it("should check name valid if authorize is clicked", async () => {
      fullNameInput.simulate('change', { target: { value: "invalid123" } });
      await act(async () => {
        authorizeButton.simulate('click');
        jest.runAllTimers();
      });
      wrapper.update();
      expect(wrapper.find("#fcraFullNameInput-footer").at(0).text()).toContain("Please enter a valid full name following format: First Last");
      expect(boundUpdateApplicationDSSpy).not.toHaveBeenCalled();
    });

    it("should have update application called if authorize is clicked", async () => {
      fullNameInput.simulate('change', { target: { value: "Foo Bar" } });
      await act(async () => {
        authorizeButton.simulate('click');
        jest.runAllTimers();
      });
      wrapper.update();
      expect(boundUpdateApplicationDSSpy).toHaveBeenCalled();
    });
  });
});
