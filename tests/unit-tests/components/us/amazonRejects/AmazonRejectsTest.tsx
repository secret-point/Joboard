import { shallow } from "enzyme";
import React from "react";
import routeData from 'react-router';
import { AmazonRejects } from "../../../../../src/components/us/amazonRejects/AmazonRejects";
import { TEST_APPLICATION_ID, TEST_APPLICATION_STATE, TEST_CANDIDATE_STATE, TEST_JOB_ID, TEST_JOB_STATE, TEST_SCHEDULE_ID, TEST_SCHEDULE_STATE } from "../../../../test-utils/test-data";

describe("AmazonRejects", () => {
  const mockLocation = {
    pathname: "/amazon-rejects",
    search: `?jobId=${TEST_JOB_ID}&applicationId=${TEST_APPLICATION_ID}&scheduleId=${TEST_SCHEDULE_ID}`,
    hash: '',
    state: null
  };

  it("should match snapshot", () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

    const shallowWrapper = shallow(
      <AmazonRejects
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
