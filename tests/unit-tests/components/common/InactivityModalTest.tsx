import React from "react";
import { shallow } from "enzyme";
import InactivityModal from "../../../../src/components/common/InactivityModal";

describe("Inactivity Modal", () => {
  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <InactivityModal millisecondsToTimeout={2000} isOpen={false} setIsOpen={jest.fn()}>
        <div>Modal content</div>
      </InactivityModal>
    );

    expect(shallowWrapper).toMatchSnapshot();
  });
});