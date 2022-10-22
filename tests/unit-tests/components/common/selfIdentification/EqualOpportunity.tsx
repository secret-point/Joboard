import * as utilHelpers from "../../../../../src/utils/helper";
import { CountryCode } from "../../../../../src/utils/enums/common";
import { shallow } from "enzyme";
import { EqualOpportunityForm } from "../../../../../src/components/common/self-Identification/Equal-opportunity-form";
import {
  TEST_APPLICATION_STATE,
  TEST_CANDIDATE_STATE,
  TEST_SELF_IDENTIFICATION_STATE
} from "../../../../test-utils/test-data";
import React from "react";

const getCountryCodeSpy = jest.spyOn(utilHelpers, "getCountryCode");

describe("Equal Opportunity Form", () => {

  beforeEach(() => {
    getCountryCodeSpy.mockReset()
  })

  describe("Country MX", () => {
    beforeEach(() => {
      getCountryCodeSpy.mockReturnValue(CountryCode.MX);
    })

    it("should match snapshot when country is MX", function() {
      const wrapper = shallow(<EqualOpportunityForm
        candidate={TEST_CANDIDATE_STATE}
        application={TEST_APPLICATION_STATE}
        selfIdentification={TEST_SELF_IDENTIFICATION_STATE}
      />);
      expect(wrapper).toMatchSnapshot();
    })
  })


  describe("Country US", () => {
    beforeEach(() => {
      getCountryCodeSpy.mockReturnValue(CountryCode.US);
    })

    it("should match snapshot when country is US", function() {
      const wrapper = shallow(<EqualOpportunityForm
        candidate={TEST_CANDIDATE_STATE}
        application={TEST_APPLICATION_STATE}
        selfIdentification={TEST_SELF_IDENTIFICATION_STATE}
      />);
      expect(wrapper).toMatchSnapshot();
    });
  })
})