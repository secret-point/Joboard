import React from "react";
import { shallow } from "enzyme";
import ApplicationSteps from "../../../../src/components/common/ApplicationSteps";

describe("ApplicationSteps", () => {
    it("should match snapshot", () => {
        const shallowWrapper = shallow(<ApplicationSteps/>);
    
        expect(shallowWrapper).toMatchSnapshot();
    });
});