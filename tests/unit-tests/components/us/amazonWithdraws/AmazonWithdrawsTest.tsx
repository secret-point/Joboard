import React from "react";
import { shallow } from "enzyme";
import routeData from 'react-router';
import { AmazonWithdraws } from "../../../../../src/components/us/amazonWithdraws/AmazonWithdraws";
import { TEST_CANDIDATE_STATE, TEST_JOB_ID, TEST_JOB_STATE, TEST_SCHEDULE_ID, TEST_SCHEDULE_STATE } from "../../../../test-utils/test-data";

describe("AmazonWithdraws", () => {
  const mockLocation = {
    pathname: "/amazon-withdraws",
    search: `?jobId=${TEST_JOB_ID}&scheduleId=${TEST_SCHEDULE_ID}`,
    hash: '',
    state: null
  };

  it("should match snapshot", () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

    const shallowWrapper = shallow(
      <AmazonWithdraws
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        schedule={TEST_SCHEDULE_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
