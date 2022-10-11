import React from "react";
import { shallow } from "enzyme";
import { useLocation } from "react-router-dom";
import { SelfIdentification } from "../../../../../src/components/mx/selfIdentification/SelfIdentification";
import {
  TEST_APPLICATION_ID,
  TEST_APPLICATION_STATE,
  TEST_CANDIDATE_STATE,
  TEST_JOB_ID,
  TEST_JOB_STATE,
  TEST_SCHEDULE_ID,
  TEST_SCHEDULE_STATE,
  TEST_SELF_IDENTIFICATION_STATE
} from "../../../../test-utils/test-data";

describe("SelfIdentification", () => {
  const mockLocation = {
    pathname: "/self-identification",
    search: `?jobId=${TEST_JOB_ID}&applicationId=${TEST_APPLICATION_ID}&scheduleId=${TEST_SCHEDULE_ID}`,
    hash: '',
    state: null
  };
  const mockUseLocation = useLocation as jest.Mock;
  mockUseLocation.mockReturnValue(mockLocation);

  it("should match snapshot", () => {

    const shallowWrapper = shallow(
      <SelfIdentification
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
        selfIdentification={TEST_SELF_IDENTIFICATION_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
