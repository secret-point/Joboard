import React from "react";
import { shallow } from "enzyme";
import { useLocation } from 'react-router-dom';
import { ThankYou } from "../../../../../src/components/us/thankYou/ThankYou";
import * as helper from '../../../../../src/utils/helper'
import { CountryCode } from "../../../../../src/utils/constants/common";
import { TEST_APPLICATION_ID, TEST_APPLICATION_STATE, TEST_CANDIDATE_STATE, TEST_JOB_ID, TEST_JOB_STATE, TEST_SCHEDULE_ID, TEST_SCHEDULE_STATE, TEST_THANK_YOU_STATE } from "../../../../test-utils/test-data";

describe("ThankYou", () => {
  const mockLocation = {
    pathname: "/thank-you",
    search: `?jobId=${TEST_JOB_ID}&applicationId=${TEST_APPLICATION_ID}&scheduleId=${TEST_SCHEDULE_ID}`,
    hash: '',
    state: null
  };
  const mockUseLocation = useLocation as jest.Mock;
  mockUseLocation.mockReturnValue(mockLocation);

  // Unit test can't get Katal {{Country}} development value.
  const mockGetCountryCode = jest.spyOn(helper, 'getCountryCode')
  mockGetCountryCode.mockReturnValue(CountryCode.US);

  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <ThankYou
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
        thankYou={TEST_THANK_YOU_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
