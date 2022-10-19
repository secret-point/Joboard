import React from "react";
import { shallow } from "enzyme";
import { BannerMessage } from "../../../../src/components/common/BannerMessage";
import { TEST_BANNER_MESSAGE } from "../../../test-utils/test-data";

describe("BannerMessage", () => {
    it("should match snapshot", () => {
        const shallowWrapper = shallow(<BannerMessage bannerMessage={TEST_BANNER_MESSAGE}/>);
    
        expect(shallowWrapper).toMatchSnapshot();
    });
});