import React from "react";
import { shallow } from "enzyme";
import { NheTimeSlotCard } from "../../../../../src/components/common/nhe/NheTimeSlotCard";
import { TEST_NHE_TIME_SLOT } from "../../../../test-utils/test-data";

describe("NheTimeSlotCard", () => {
  const callback = jest.fn();

  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <NheTimeSlotCard
        nheTimeSlot={TEST_NHE_TIME_SLOT}
        handleChange={callback}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
