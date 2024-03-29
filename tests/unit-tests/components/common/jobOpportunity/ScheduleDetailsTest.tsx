import React from "react";
import { shallow } from "enzyme";
import { ScheduleDetails } from "../../../../../src/components/common/jobOpportunity/ScheduleDetails";
import { CountryCode } from "../../../../../src/utils/enums/common";
import * as helpers from "../../../../../src/utils/helper";
import { Schedule } from "../../../../../src/utils/types/common";
import { TEST_SCHEDULE } from "../../../../test-utils/test-data";

const getCountryCodeSpy = jest.spyOn(helpers, "getCountryCode");
const getFeatureFlagValueSpy = jest.spyOn(helpers, "getFeatureFlagValue");

describe("ScheduleDetails", () => {
  describe("country code US", () => {
    beforeEach(() => {
      getCountryCodeSpy.mockReturnValue(CountryCode.US);
      getFeatureFlagValueSpy.mockReturnValue(true);
    });

    it("should match snapshot", () => {
      const shallowWrapper = shallow(
        <ScheduleDetails
          scheduleDetail={TEST_SCHEDULE as Schedule}
        />);

      expect(shallowWrapper).toMatchSnapshot();
    });
  });

  describe("country code MX", () => {
    beforeEach(() => {
      getCountryCodeSpy.mockReturnValue(CountryCode.MX);
    });

    it("should match snapshot", () => {
      const shallowWrapper = shallow(
        <ScheduleDetails
          scheduleDetail={TEST_SCHEDULE as Schedule}
        />);

      expect(shallowWrapper).toMatchSnapshot();
    });
  });
  describe("country code UK", () => {
    beforeEach(() => {
      getCountryCodeSpy.mockReturnValue(CountryCode.UK);
    });

    it("should match snapshot", () => {
      const shallowWrapper = shallow(
        <ScheduleDetails
          scheduleDetail={{ ...TEST_SCHEDULE, duration: "test" } as Schedule}
        />);

      expect(shallowWrapper).toMatchSnapshot();
    });
  });
});
