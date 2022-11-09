import React from "react";
import { shallow } from "enzyme";
import { DragonStoneAppMX } from "../../../../src/components/mx/dspApp";
import { TEST_BANNER_MESSAGE } from "../../../test-utils/test-data";

describe("dspAppTest", () => {
    it("should match snapshot", () => {
        const shallowWrapper = shallow( <DragonStoneAppMX ui={{isLoading: false, bannerMessage: TEST_BANNER_MESSAGE}}/> );

        expect(shallowWrapper).toMatchSnapshot();
    })
})