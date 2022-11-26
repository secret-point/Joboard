import React from "react";
import { shallow } from "enzyme";
import { StepHeader } from "../../../../src/components/common/StepHeader";
import { ApplicationStepList } from "../../../../src/utils/constants/common";

describe("StepHeader", () => {

  it("should match snapshot", () => {

    const shallowWrapper = shallow(
      <StepHeader
        jobTitle="Test Job Title"
        step = {ApplicationStepList[0]}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
