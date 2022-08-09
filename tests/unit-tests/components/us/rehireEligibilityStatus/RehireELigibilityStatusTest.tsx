import React from "react";
import { shallow } from "enzyme";
import routeData from 'react-router';
import { RehireEligibilityStatus } from "../../../../../src/components/us/rehireEligibilityStatus/RehireEligibilityStatus";
import { TEST_APPLICATION_ID, TEST_APPLICATION_STATE, TEST_CANDIDATE_STATE, TEST_JOB_ID, TEST_JOB_STATE, TEST_WORKFLOW_STATE } from "../../../../test-utils/test-data";

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
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        workflow={TEST_WORKFLOW_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
