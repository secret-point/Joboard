import React from "react";
import { shallow } from "enzyme";
import JobConfirmationCard from "../../../../../src/components/common/jobOpportunity/JobConfirmationCard";
import { CountryCode } from "../../../../../src/utils/enums/common";
import * as helpers from "../../../../../src/utils/helper";
import { Schedule } from "../../../../../src/utils/types/common";
import { TEST_SCHEDULE } from "../../../../test-utils/test-data";

const getCountryCodeSpy = jest.spyOn(helpers, "getCountryCode");

describe("ScheduleDetails", () => {
  describe("country code US", () => {
    beforeEach(() => {
      getCountryCodeSpy.mockReturnValue(CountryCode.US);
    });

    it("should match snapshot", () => {
      const shallowWrapper = shallow(
        <JobConfirmationCard
        schedule={TEST_SCHEDULE as Schedule}
        />);

      expect(shallowWrapper).toMatchSnapshot();
    });
  });

  describe('country code MX', () => {
    beforeEach(() => {
      getCountryCodeSpy.mockReturnValue(CountryCode.MX);
    });

    it("should match snapshot", () => {
      const shallowWrapper = shallow(
        <JobConfirmationCard
        schedule={TEST_SCHEDULE as Schedule}
        />);

      expect(shallowWrapper).toMatchSnapshot();
    });
  });
});