import React from "react";
import { shallow } from "enzyme";
import routeData from 'react-router';
import { JobDescription } from "../../../../../src/components/us/jobOpportunity/JobDescription";
import { TEST_APPLICATION_ID, TEST_APPLICATION_STATE, TEST_CANDIDATE_STATE, TEST_JOB_ID, TEST_JOB_STATE } from "../../../../test-utils/test-data";

describe("JobDescription", () => {
  const mockLocation = {
    pathname: "/job-opportunities/job-description",
    search: `?jobId=${TEST_JOB_ID}&applicationId=${TEST_APPLICATION_ID}`,
    hash: '',
    state: null
  };

  it("should match snapshot", () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

    const shallowWrapper = shallow(
      <JobDescription
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
