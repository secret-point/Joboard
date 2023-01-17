import React from "react";
import { shallow } from "enzyme";
import { useLocation } from "react-router-dom";
import { ContingentOffer } from "../../../../../src/components/uk/contingentOffer/ContingentOffer";
import { TestInitUiState, TEST_APPLICATION_ID, TEST_APPLICATION_STATE, TEST_CANDIDATE_STATE, TEST_JOB_ID, TEST_JOB_STATE, TEST_SCHEDULE_ID, TEST_SCHEDULE_STATE } from "../../../../test-utils/test-data";

describe("ContingentOffer", () => {
  const mockLocation = {
    pathname: "/contingent-offer",
    search: `?jobId=${TEST_JOB_ID}&applicationId=${TEST_APPLICATION_ID}&scheduleId=${TEST_SCHEDULE_ID}`,
    hash: "",
    state: null
  };
  const mockUseLocation = useLocation as jest.Mock;
  mockUseLocation.mockReturnValue(mockLocation);

  it("should match snapshot", () => {

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