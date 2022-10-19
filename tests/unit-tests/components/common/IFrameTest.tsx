import React from "react";
import { shallow } from "enzyme";
import IFrame from "../../../../src/components/common/IFrame";

describe("IFrame", () => {
    it("should match snapshot", () => {
        const shallowWrapper = shallow(<IFrame src="https://hiring.amazon.com/#/" title="IFrame Test"/>);
    
        expect(shallowWrapper).toMatchSnapshot();
    });
});