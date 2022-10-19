import React from "react";
import { shallow } from "enzyme";
import DetailedRadioError from "../../../../src/components/common/DetailedRadioError";

describe("DetailedRadioError", () => {
    it("should match snapshot", () => {
        const shallowWrapper = shallow(<DetailedRadioError/>);
    
        expect(shallowWrapper).toMatchSnapshot();
    });
});