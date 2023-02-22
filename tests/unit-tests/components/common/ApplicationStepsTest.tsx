import React from "react";
import { shallow } from "enzyme";
import { render } from "@testing-library/react";

import ApplicationSteps from "../../../../src/components/common/ApplicationSteps";
import { APPLICATION_STEPS } from "../../../../src/utils/enums/common";
import { ApplicationStep } from "../../../../src/utils/types/common";

describe("ApplicationSteps", () => {

  it("should match snapshot", () => {
    const shallowWrapper = shallow(<ApplicationSteps />);
    expect(shallowWrapper).toMatchSnapshot();
  });

  it("Component renders the steps using their indexes as stepNumber + 1", () => {
    const { getByTestId } = render(<ApplicationSteps />);

    const applicationStepContainer = getByTestId("applicationStepContainer");
    const step1 = applicationStepContainer.querySelectorAll(".steps-item-container")[0]?.textContent;
    const step3 = applicationStepContainer.querySelectorAll(".steps-item-container")[2]?.textContent;
    const selectJobStep = `1${APPLICATION_STEPS.SELECT_JOB}`;
    const nheStep = `3${APPLICATION_STEPS.SCHEDULE_PRE_HIRE_APPOINTMENT}`;
    expect(step1).toBe(selectJobStep);
    expect(step3).toBe(nheStep);

  });
  it("Given a step with a customIndex, it should be used instead of the regular intex", () => {
    const { getByTestId } = render(<ApplicationSteps steps={[{ title: "test", customIndex: 2 }] as ApplicationStep[]} />);

    const applicationStepContainer = getByTestId("applicationStepContainer");
    const step = applicationStepContainer.querySelectorAll(".steps-item-container")[0]?.textContent;
  
    expect(step).toBe("2test");

  });

});