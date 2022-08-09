import React from "react";
import { shallow } from "enzyme";
import routeData from 'react-router';
import { NoAvailableTimeSlots } from "../../../../../src/components/us/noAvailableTimeSlots/NoAvailableTimeSlots";
import { TEST_APPLICATION_ID, TEST_APPLICATION_STATE, TEST_APP_CONFIG_STATE, TEST_CANDIDATE_STATE, TEST_JOB_ID, TEST_JOB_STATE, TEST_SCHEDULE_ID, TEST_SCHEDULE_STATE } from "../../../../test-utils/test-data";

describe("NoAvailableTimeSlots", () => {
  const mockLocation = {
    pathname: "/no-available-time-slots",
    search: `?jobId=${TEST_JOB_ID}&applicationId=${TEST_APPLICATION_ID}&scheduleId=${TEST_SCHEDULE_ID}`,
    hash: '',
    state: null
  };

  it("should match snapshot", () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

    const shallowWrapper = shallow(
      <NoAvailableTimeSlots
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
        appConfig={TEST_APP_CONFIG_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
