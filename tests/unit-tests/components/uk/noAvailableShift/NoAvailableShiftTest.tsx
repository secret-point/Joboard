import React from "react";
import { shallow } from "enzyme";
import { useLocation } from "react-router-dom";
import { NoAvailableShift } from "../../../../../src/components/uk/noAvailableShift/NoAvailableShift";
import {
  TEST_APPLICATION_ID,
  TEST_APPLICATION_STATE,
  TEST_CANDIDATE_STATE,
  TEST_JOB_ID,
  TEST_JOB_STATE
} from "../../../../test-utils/test-data";

describe("NoAvailableShift", () => {
  const mockLocation = {
    pathname: "/no-available-shift",
    search: `?jobId=${TEST_JOB_ID}&applicationId=${TEST_APPLICATION_ID}`,
    hash: "",
    state: null
  };
  const mockUseLocation = useLocation as jest.Mock;
  mockUseLocation.mockReturnValue(mockLocation);

  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <NoAvailableShift
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
