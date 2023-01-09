import React from "react";
import { shallow } from "enzyme";
import { useLocation } from "react-router-dom";
import { Consent } from "../../../../../src/components/uk/consent/Consent";
import { TestInitUiState, TEST_JOB_ID, TEST_JOB_STATE, TEST_SCHEDULE_ID, TEST_SCHEDULE_STATE } from "../../../../test-utils/test-data";

describe("Consent", () => {
  const mockLocation = {
    pathname: "/consent",
    search: `?jobId=${TEST_JOB_ID}&scheduleId=${TEST_SCHEDULE_ID}`,
    hash: "",
    state: null
  };
  const mockUseLocation = useLocation as jest.Mock;
  mockUseLocation.mockReturnValue(mockLocation);

  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <Consent
        job={TEST_JOB_STATE}
        schedule={TEST_SCHEDULE_STATE}
        ui={TestInitUiState}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
