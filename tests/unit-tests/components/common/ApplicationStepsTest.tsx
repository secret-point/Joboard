import React from "react";
import { shallow } from "enzyme";
import { render } from "@testing-library/react"
import { APPLICATION_STEPS } from "../../../../src/utils/enums/common";
import ApplicationSteps from "../../../../src/components/common/ApplicationSteps";

describe("ApplicationSteps", () => {

    it("should match snapshot", () => {
        const shallowWrapper = shallow(<ApplicationSteps />);
        expect(shallowWrapper).toMatchSnapshot();
    });

    it("Given the withAssessment is true, the Assesssment step should be present and a total of 4 steps are displayed", () => {
        const { getByText, getByTestId } = render(<ApplicationSteps withAssessment={true} />);

        const assessment_step = getByText(APPLICATION_STEPS.COMPLETE_AN_ASSESSMENT);
        const steps = getByTestId("applicationStepContainer").querySelectorAll(".steps-item");
        expect(assessment_step).toBeInTheDocument();
        expect(steps.length).toBe(4);

    });
    it("Given the bypassAssessment flag is false, the Assesssment step should NOT be present and a total of 3 steps are displayed", () => {
        const { queryByText, getByTestId } = render(<ApplicationSteps withAssessment={false} />);

        const assessment_step = queryByText(APPLICATION_STEPS.COMPLETE_AN_ASSESSMENT);
        const steps = getByTestId("applicationStepContainer").querySelectorAll(".steps-item");
        expect(assessment_step).not.toBeInTheDocument();
        expect(steps.length).toBe(3);

    });

});