import * as React from "react";
import { shallow } from "enzyme";
import { useLocation } from "react-router-dom";
import { ThankYouSummary } from "../../../../../src/components/uk/thankYou/ThankYouSummary";
import { CountryCode } from "../../../../../src/utils/enums/common";
import * as helper from "../../../../../src/utils/helper";
import {
  NHE_TIMESLOT,
  TEST_APPLICATION,
  TEST_APPLICATION_ID,
  TEST_APPLICATION_STATE,
  TEST_CANDIDATE_STATE,
  TEST_JOB_ID,
  TEST_JOB_STATE,
  TEST_SCHEDULE_ID,
  TEST_SCHEDULE_STATE,
  TEST_SHIFT_PREFERENCE,
  TestNhePreference
} from "../../../../test-utils/test-data";
import { Application } from "../../../../../src/utils/types/common";
import { mountWithStencil } from "@amzn/stencil-react-components/tests";

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
  beforeEach(() => {
    mockGetCountryCode.mockReturnValue(CountryCode.US);
  });

  it("should match snapshot - with nhe appointment", () => {
    const shallowWrapper = shallow(
      <ThankYouSummary
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
    shallowWrapper.unmount();
  });

  it("should match snapshot - with nhe Preferences", () => {
    const shallowWrapper = shallow(
      <ThankYouSummary
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={{
          ...TEST_APPLICATION_STATE,
          results: {
            ...TEST_APPLICATION_STATE.results as Application,
            nheAppointment: undefined,
            nhePreference: TestNhePreference
          }
        }}
        schedule={TEST_SCHEDULE_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
    shallowWrapper.unmount();
  });

  it("should match snapshot - with shift Preferences when application has shift preference", () => {
    const shallowWrapper = shallow(
      <ThankYouSummary
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={{
          ...TEST_APPLICATION_STATE,
          results: {
            ...TEST_APPLICATION_STATE.results as Application,
            nheAppointment: undefined,
            shiftPreference: TEST_SHIFT_PREFERENCE
          }
        }}
        schedule={TEST_SCHEDULE_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
    shallowWrapper.unmount();
  });

  it("should match snapshot - with shift Preferences when application has no shift, nhe preference and nhe appointment", () => {
    const shallowWrapper = shallow(
      <ThankYouSummary
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={{
          ...TEST_APPLICATION_STATE,
          results: {
            ...TEST_APPLICATION_STATE.results as Application,
            nheAppointment: undefined,
          }
        }}
        schedule={TEST_SCHEDULE_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
    shallowWrapper.unmount();
  });

  it("should render date in UK format for NHE appointment", () => {
    const testApplication = {...TEST_APPLICATION_STATE, results: {...TEST_APPLICATION, nheAppointment: {...NHE_TIMESLOT, startTime: "12:30 PM",
    endTime: "01:30 PM",}}}
    const wrapper = mountWithStencil(<ThankYouSummary
      candidate={TEST_CANDIDATE_STATE}
      job={TEST_JOB_STATE}
      application={testApplication}
      schedule={TEST_SCHEDULE_STATE}
    />);

    expect(wrapper.find('div[data-test-id="nheDetailsTime"]').text()).toBe(`Time: 12:30 - 13:30`);
  });

  afterEach(() => {
    mockGetCountryCode.mockReset();
  });
});
