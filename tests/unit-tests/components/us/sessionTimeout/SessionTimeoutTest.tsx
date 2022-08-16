import React from "react";
import { shallow } from "enzyme";
import routeData from 'react-router';
import { SessionTimeout } from "../../../../../src/components/us/sessionTimeout/SessionTimeout";
import { TEST_APPLICATION_ID, TEST_APPLICATION_STATE, TEST_CANDIDATE_STATE, TEST_JOB_ID, TEST_JOB_STATE, TEST_SCHEDULE_ID, TEST_SCHEDULE_STATE } from "../../../../test-utils/test-data";

describe("SessionTimeout", () => {
  const mockLocation = {
    pathname: "/session-timeout",
    search: `?jobId=${TEST_JOB_ID}&applicationId=${TEST_APPLICATION_ID}`,
    hash: '',
    state: null
  };

  it("should match snapshot", () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

    const shallowWrapper = shallow(
      <SessionTimeout
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
