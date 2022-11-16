import React from "react";
import { shallow } from "enzyme";
import { ScheduleCardBanner } from "../../../../../src/components/common/jobOpportunity/ScheduleCardBanner";
import * as countryExpansionConfig from "../../../../../src/countryExpansionConfig";
import { CountryCode } from "../../../../../src/utils/enums/common";

const getCountryCodeSpy = jest.spyOn(countryExpansionConfig, "getCountryCode");

describe("ScheduleCardBanner", () => {
  describe("country code US", () => {
    beforeEach(() => {
      getCountryCodeSpy.mockReturnValue(CountryCode.US);
    });

    it("should match snapshot", () => {
      const shallowWrapper = shallow(
        <ScheduleCardBanner
          currencyCode="USD"
          signOnBonus={5.00}
          signOnBonusL10N="$5.00"
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
        <ScheduleCardBanner
          currencyCode="MXN"
          signOnBonus={5.00}
          signOnBonusL10N="$5.00"
        />);

      expect(shallowWrapper).toMatchSnapshot();
    });
  });

  describe('country code CA', () => {
    beforeEach(() => {
      getCountryCodeSpy.mockReturnValue(CountryCode.CA);
    });

    it("should match snapshot", () => {
      const shallowWrapper = shallow(
        <ScheduleCardBanner
          currencyCode="CAD"
          signOnBonus={5.00}
          signOnBonusL10N="$5.00"
        />);

      expect(shallowWrapper).toMatchSnapshot();
    });
  });
});
