import React from "react";
import { shallow } from "enzyme";
import routeData from 'react-router';
import { ApplicationIdNull } from "../../../../../src/components/us/applicationIdNull/ApplicationIdNull";
import { TEST_APPLICATION_ID, TEST_APPLICATION_STATE, TEST_CANDIDATE_STATE, TEST_JOB_ID, TEST_JOB_STATE, TEST_SCHEDULE_ID } from "../../../../test-utils/test-data";

describe("ApplicationIdNull", () => {
  const mockLocation = {
    pathname: "/applicationId-null",
    search: `?jobId=${TEST_JOB_ID}&applicationId=${TEST_APPLICATION_ID}&scheduleId=${TEST_SCHEDULE_ID}`,
    hash: '',
    state: null
  };

  it("should match snapshot", () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

    const shallowWrapper = shallow(
      <ApplicationIdNull
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
