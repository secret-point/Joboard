import React from "react";
import { shallow } from "enzyme";
import Days365NotRehireEligible from "../../../../../src/components/common/rehireEligibilityStatus/Days365NotRehireEligible";
import { TEST_JOB2 } from "../../../../test-utils/test-data";


describe("Days365NotRehireEligible", () => {
    it("should match snapshot with jobDetail", () => {
        const shallowWrapper = shallow(<Days365NotRehireEligible jobDetail={ TEST_JOB2 }/>);
    
        expect(shallowWrapper).toMatchSnapshot();
    });

    it("should match snapshot without jobDetail", () => {
        const shallowWrapper = shallow(<Days365NotRehireEligible/>);
    
        expect(shallowWrapper).toMatchSnapshot();
    });
});