import React from "react";
import { shallow } from "enzyme";
import NhePreferenceReview from "../../../../../src/components/common/nhe/NhePreferenceReview";
import {
  TestNhePreference
} from "../../../../test-utils/test-data";

describe("NhePreference Review", () => {
  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <NhePreferenceReview nhePreference={TestNhePreference} />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
