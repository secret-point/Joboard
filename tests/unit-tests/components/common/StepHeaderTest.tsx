import React from "react";
import { shallow } from "enzyme";
import { StepHeader } from "../../../../src/components/common/StepHeader";
import { ApplicationStepListDefault } from "../../../../src/utils/constants/common";

describe("StepHeader", () => {

  it("should match snapshot", () => {

    const shallowWrapper = shallow(
      <StepHeader
        jobTitle="Test Job Title"
        step = {ApplicationStepListDefault[0]}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
