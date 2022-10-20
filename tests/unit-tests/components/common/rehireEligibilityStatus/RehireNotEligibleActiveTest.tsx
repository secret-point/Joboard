import React from "react";
import { shallow } from "enzyme";
import RehireNotEligibleActive from "../../../../../src/components/common/rehireEligibilityStatus/RehireNotEligibleActive";


describe("RehireNotEligibleActive", () => {
    it("should match snapshot", () => {
        const shallowWrapper = shallow(<RehireNotEligibleActive/>);
    
        expect(shallowWrapper).toMatchSnapshot();
    });
});