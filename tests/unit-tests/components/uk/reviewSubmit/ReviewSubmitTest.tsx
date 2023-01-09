import React from "react";
import { shallow } from "enzyme";
import { useLocation } from "react-router-dom";
import { ReviewSubmit } from "../../../../../src/components/uk/reviewSubmit/ReviewSubmit";
import {
  TEST_APPLICATION_ID,
  TEST_APPLICATION_STATE,
  TEST_CANDIDATE,
  TEST_CANDIDATE_STATE,
  TEST_JOB_ID,
  TEST_JOB_STATE,
  TEST_SCHEDULE_ID,
  TEST_SCHEDULE_STATE
} from "../../../../test-utils/test-data";
import * as utilHelpers from "../../../../../src/utils/helper";
import { CountryCode } from "../../../../../src/utils/enums/common";

const getCountryCodeSpy = jest.spyOn(utilHelpers, "getCountryCode");

describe("ReviewSubmit", () => {
  const mockLocation = {
    pathname: "/review-submit",
    search: `?jobId=${TEST_JOB_ID}&applicationId=${TEST_APPLICATION_ID}&scheduleId=${TEST_SCHEDULE_ID}`,
    hash: "",
    state: null
  };

  beforeEach(() => {
    getCountryCodeSpy.mockReturnValue(CountryCode.MX);
  });

  const mockUseLocation = useLocation as jest.Mock;
  mockUseLocation.mockReturnValue(mockLocation);

  it("should match snapshot", () => {
    const candidateState: any = TEST_CANDIDATE_STATE;
    candidateState.results.candidateData.selfIdentificationInfo = {
      ...TEST_CANDIDATE.selfIdentificationInfo,
      pronoun: "He",
      ethnicity: "Indigenous",
      gender: "Male"
    };

    const shallowWrapper = shallow(
      <ReviewSubmit
        candidate={candidateState}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
