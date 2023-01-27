import React from "react";
import { shallow } from "enzyme";
import CustomModal from "../../../../src/components/common/CustomModal";

describe("Custom Modal", () => {
  it("should match spanshot with modal close", () => {
    const wrapper = shallow(
      <CustomModal shouldOpen={false} setShouldOpen={jest.fn}>
        <div>Child props</div>
      </CustomModal>);
    expect(wrapper).toMatchSnapshot();
  });

  it("should match spnashot with modal open", () => {
    const wrapper = shallow(
      <CustomModal shouldOpen setShouldOpen={jest.fn}>
        <div>Child props</div>
      </CustomModal>);
    expect(wrapper).toMatchSnapshot();
  });
});