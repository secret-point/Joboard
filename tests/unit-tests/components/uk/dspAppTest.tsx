import React from "react";
import { shallow } from "enzyme";
import { DragonStoneAppUK } from "../../../../src/components/uk/dspApp";
import { TEST_APP_CONFIG, TEST_BANNER_MESSAGE } from "../../../test-utils/test-data";

describe("dspAppTest", () => {
  it("should match snapshot", () => {
    const shallowWrapper = shallow(<DragonStoneAppUK ui={{ isLoading: false, bannerMessage: TEST_BANNER_MESSAGE }} appConfig={TEST_APP_CONFIG} />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});