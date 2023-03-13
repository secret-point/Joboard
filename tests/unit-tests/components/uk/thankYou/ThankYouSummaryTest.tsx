import * as React from "react";
import { shallow } from "enzyme";
import { useLocation } from "react-router-dom";
import { ThankYouSummary } from "../../../../../src/components/uk/thankYou/ThankYouSummary";
import { CountryCode } from "../../../../../src/utils/enums/common";
import * as helper from "../../../../../src/utils/helper";
import {
  TEST_APPLICATION_ID,
  TEST_APPLICATION_STATE,
  TEST_CANDIDATE_STATE,
  TEST_JOB_ID,
  TEST_JOB_STATE,
  TEST_SCHEDULE_ID,
  TEST_SCHEDULE_STATE,
} from "../../../../test-utils/test-data";

describe("ThankYouSummary", () => {
  const mockLocation = {
    pathname: "/thank-you",
    search: `?jobId=${TEST_JOB_ID}&applicationId=${TEST_APPLICATION_ID}&scheduleId=${TEST_SCHEDULE_ID}`,
    hash: "",
    state: null
  };
  const mockUseLocation = useLocation as jest.Mock;
  mockUseLocation.mockReturnValue(mockLocation);

  // Unit test can't get Katal {{Country}} development value.
  const mockGetCountryCode = jest.spyOn(helper, "getCountryCode");
  mockGetCountryCode.mockReturnValue(CountryCode.US);

  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <ThankYouSummary
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
