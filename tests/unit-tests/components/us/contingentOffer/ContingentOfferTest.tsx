import React from "react";
import { shallow } from "enzyme";
import routeData from 'react-router';
import { ContingentOffer } from "../../../../../src/components/us/contingentOffer/ContingentOffer";
import { TestInitUiState, TEST_APPLICATION_ID, TEST_APPLICATION_STATE, TEST_CANDIDATE_STATE, TEST_JOB_ID, TEST_JOB_STATE, TEST_SCHEDULE_ID, TEST_SCHEDULE_STATE } from "../../../../test-utils/test-data";

describe("ContingentOffer", () => {
  const mockLocation = {
    pathname: "/contingent-offer",
    search: `?jobId=${TEST_JOB_ID}&applicationId=${TEST_APPLICATION_ID}&scheduleId=${TEST_SCHEDULE_ID}`,
    hash: '',
    state: null
  };

  it("should match snapshot", () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);

    const shallowWrapper = shallow(
      <ContingentOffer
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
        ui={TestInitUiState}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
