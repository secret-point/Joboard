import React from "react";
import { shallow } from "enzyme";
import { useLocation } from "react-router-dom";
import { GenericError } from "../../../../../src/components/uk/genericError/GenericError";

import { TEST_APPLICATION, TEST_CANDIDATE_STATE, TEST_JOB_ID, TEST_JOB_STATE, TEST_SCHEDULE_ID, TEST_SCHEDULE_STATE } from "../../../../test-utils/test-data";

describe("AmazonWithdraws", () => {
  const mockLocation = {
    pathname: "/amazon-withdraws",
    search: `?jobId=${TEST_JOB_ID}&scheduleId=${TEST_SCHEDULE_ID}`,
    hash: "",
    state: null
  };
  const mockUseLocation = useLocation as jest.Mock;
  mockUseLocation.mockReturnValue(mockLocation);

  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <GenericError
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        schedule={TEST_SCHEDULE_STATE}
        application={TEST_APPLICATION}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
