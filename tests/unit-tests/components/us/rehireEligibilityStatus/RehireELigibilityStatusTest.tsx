import React from "react";
import { shallow } from "enzyme";
import { useLocation } from 'react-router-dom';
import { RehireEligibilityStatus } from "../../../../../src/components/us/rehireEligibilityStatus/RehireEligibilityStatus";
import { TEST_APPLICATION_ID, TEST_JOB_ID, TEST_WORKFLOW_STATE } from "../../../../test-utils/test-data";

describe("RehireEligibilityStatus", () => {
  const mockLocation = {
    pathname: "/rehire-eligibility-status",
    search: `?jobId=${TEST_JOB_ID}&applicationId=${TEST_APPLICATION_ID}`,
    hash: '',
    state: null
  };
  const mockUseLocation = useLocation as jest.Mock;
  mockUseLocation.mockReturnValue(mockLocation);

  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <RehireEligibilityStatus
        workflow={TEST_WORKFLOW_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
