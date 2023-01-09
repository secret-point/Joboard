import React from "react";
import { shallow } from "enzyme";
import { DragonStoneAppUS } from "../../../../src/components/us/dsApp";
import { TEST_APP_CONFIG, TestInitUiState } from "../../../test-utils/test-data";

describe("App", () => {
  test("snapshot", () => {
    const wrapper = shallow(<DragonStoneAppUS appConfig={TEST_APP_CONFIG} ui={TestInitUiState} />);
    expect(wrapper).toMatchSnapshot();
  });
});
