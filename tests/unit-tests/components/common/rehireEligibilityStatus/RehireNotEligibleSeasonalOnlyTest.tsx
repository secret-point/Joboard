import React from "react";
import { shallow } from "enzyme";
import RehireNotEligibleSeasonalOnly from "../../../../../src/components/common/rehireEligibilityStatus/RehireNotEligibleSeasonalOnly";
import { TEST_JOB2 } from "../../../../test-utils/test-data";


describe("RehireNotEligibleSeasonalOnly", () => {
    it("should match snapshot with jobDetail", () => {
        const shallowWrapper = shallow(<RehireNotEligibleSeasonalOnly jobDetail={ TEST_JOB2 }/>);
    
        expect(shallowWrapper).toMatchSnapshot();
    });

    it("should match snapshot without jobDetail", () => {
        const shallowWrapper = shallow(<RehireNotEligibleSeasonalOnly/>);
    
        expect(shallowWrapper).toMatchSnapshot();
    });
});