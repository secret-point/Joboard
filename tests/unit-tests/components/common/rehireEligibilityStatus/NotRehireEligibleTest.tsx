import React from "react";
import { shallow } from "enzyme";
import NotRehireEligible from "../../../../../src/components/common/rehireEligibilityStatus/NotRehireEligible";


describe("NotRehireEligible", () => {
    it("should match snapshot", () => {
        const shallowWrapper = shallow(<NotRehireEligible/>);
    
        expect(shallowWrapper).toMatchSnapshot();
    });
});