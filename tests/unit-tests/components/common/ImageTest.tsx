import React from "react";
import { shallow } from "enzyme";
import Image from "../../../../src/components/common/Image";

describe("Image", () => {
    it("should match snapshot", () => {
        const shallowWrapper = shallow(
          <Image
            src="https://hiring.amazon.com/#/"
            isContainsOverlay={true}
            overlayText="Test Overlay Text"
            id="IMG001"
            imgStyles={{width: 200, height: 200}}
          />);
    
        expect(shallowWrapper).toMatchSnapshot();
    });
});