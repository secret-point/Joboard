import React from "react";
import { shallow } from "enzyme";
import routeData from 'react-router';
import { RehireEligibilityStatus } from "../../../../../src/components/us/rehireEligibilityStatus/RehireEligibilityStatus";
import { TEST_APPLICATION_ID, TEST_JOB_ID, TEST_WORKFLOW_STATE } from "../../../../test-utils/test-data";

describe("RehireEligibilityStatus", () => {
  const mockLocation = {
    pathname: "/rehire-eligibility-status",
    search: `?jobId=${TEST_JOB_ID}&applicationId=${TEST_APPLICATION_ID}`,
    hash: '',
    state: null
  };

  it("should match snapshot", () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

    const shallowWrapper = shallow(
      <RehireEligibilityStatus
        workflow={TEST_WORKFLOW_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
