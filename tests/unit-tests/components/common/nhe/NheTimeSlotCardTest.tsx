import React from "react";
import { shallow } from "enzyme";
import { NheTimeSlotCard } from "../../../../../src/components/common/nhe/NheTimeSlotCard";
import { TEST_NHE_TIME_SLOT } from "../../../../test-utils/test-data";
import * as utilHelper from "../../../../../src/utils/helper";
import { CountryCode } from "../../../../../src/utils/enums/common";

describe("NheTimeSlotCard", () => {
  const callback = jest.fn();
  const getCountryCodeSpy = jest.spyOn(utilHelper, "getCountryCode");

  describe("US", () => {
    it("should match snapshot", () => {
      getCountryCodeSpy.mockReturnValue("US" as CountryCode);
      const shallowWrapper = shallow(
        <NheTimeSlotCard
          nheTimeSlot={TEST_NHE_TIME_SLOT}
          handleChange={callback}
        />);
  
      expect(shallowWrapper).toMatchSnapshot();
    });
  });

  describe("MX", () => {
    it("should match snapshot", () => {
      getCountryCodeSpy.mockReturnValue("MX" as CountryCode);
      const shallowWrapper = shallow(
        <NheTimeSlotCard
          nheTimeSlot={TEST_NHE_TIME_SLOT}
          handleChange={callback}
        />);
  
      expect(shallowWrapper).toMatchSnapshot();
    });
  });
});
