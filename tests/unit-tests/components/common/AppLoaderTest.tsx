import React from "react";
import { shallow } from "enzyme";
import { AppLoader } from "../../../../src/components/common/AppLoader";

describe("AppLoader", () => {
    it("should match snapshot", () => {
        const shallowWrapper = shallow(<AppLoader ui={{isLoading: true}} loaderText={"Loading..."}/>);
    
        expect(shallowWrapper).toMatchSnapshot();
    });
});