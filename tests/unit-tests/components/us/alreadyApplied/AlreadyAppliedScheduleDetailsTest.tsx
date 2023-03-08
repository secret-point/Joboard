import React from "react";
import { shallow } from "enzyme";
import { useLocation } from "react-router-dom";
import store from "../../../../../src/store/store";
import {
  TEST_APP_CONFIG,
  TEST_JOB2_ID,
  TEST_SCHEDULE
} from "../../../../test-utils/test-data";
import ScheduleDetails from "../../../../../src/components/us/alreadyApplied/AlreadyAppliedScheduleDetails";

describe("ScheduleDetails", () => {
  const initStoreState = store.getState();
  let state: any;
  store.getState = () => state;

  const mockLocation = {
    pathname: "/already-applied",
    search: `?jobId=${TEST_JOB2_ID}`,
    hash: '',
    state: null
  };
  const mockUseLocation = useLocation as jest.Mock;
  mockUseLocation.mockReturnValue(mockLocation);

  beforeEach(() => {
    window.location.assign = jest.fn();

    state = {
      ...initStoreState,
      appConfig: {
        ...initStoreState.appConfig,
        results: {
          ...initStoreState.appConfig.results,
          envConfig: TEST_APP_CONFIG
        }
      }
    };
  });

  it("should match snapshot", () => {
    const shallowWrapper = shallow(<ScheduleDetails scheduleDetail={TEST_SCHEDULE} />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
