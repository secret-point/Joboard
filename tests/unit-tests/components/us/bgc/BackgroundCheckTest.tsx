import React from "react";
import { shallow } from "enzyme";
import { useLocation } from "react-router-dom";
import { BackgroundCheck } from "../../../../../src/components/us/bgc/BackgroundCheck";
import {
  TEST_APPLICATION_ID,
  TEST_APPLICATION_STATE,
  TEST_BGC_STATE,
  TEST_CANDIDATE,
  TEST_CANDIDATE_STATE,
  TEST_JOB_ID,
  TEST_JOB_STATE,
  TEST_SCHEDULE_ID,
  TEST_SCHEDULE_STATE
} from "../../../../test-utils/test-data";
import * as utilHelper from "../../../../../src/utils/helper";

const shouldPrefillAdditionalBgcInfoSpy = jest.spyOn(utilHelper, "shouldPrefillAdditionalBgcInfo");

describe("BackgroundCheck", () => {
  const mockLocation = {
    pathname: "/bgc",
    search: `?jobId=${TEST_JOB_ID}&applicationId=${TEST_APPLICATION_ID}&scheduleId=${TEST_SCHEDULE_ID}`,
    hash: '',
    state: null
  };
  const mockUseLocation = useLocation as jest.Mock;
  mockUseLocation.mockReturnValue(mockLocation);

  beforeEach(() => {
    shouldPrefillAdditionalBgcInfoSpy.mockReset();
  });

  it("should match snapshot  - if address country is USA", () => {
    shouldPrefillAdditionalBgcInfoSpy.mockReturnValue(true);

    const shallowWrapper = shallow(
      <BackgroundCheck
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
        bgc={TEST_BGC_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });

  it("should match snapshot  - if address country is Canada", () => {
    shouldPrefillAdditionalBgcInfoSpy.mockReturnValue(false);

    const shallowWrapper = shallow(
      <BackgroundCheck
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
        bgc={TEST_BGC_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
