import { COMPLETED, IN_PROGRESS } from "../../../src/constants";
import { ApplicationStepListUK } from "../../../src/utils/constants/common";
import { APPLICATION_STEPS } from "../../../src/utils/enums/common";
import { getStatusForSteps, getStepsByTitle } from "./../../../src/helpers/steps-helper";

describe("Unit tests for steps helper", () => {

  test("Test getStatusForSteps with isUpdateActionExecuted false", () => {
    const data = {
      key: "value"
    };
    const steps = [
      {
        completedDataKey: "key"
      }
    ];

    const statuses = getStatusForSteps(data, steps, 0, false);

    expect(statuses.length).toBe(1);
    expect(statuses[0]).toBe(IN_PROGRESS);
  });

  test("Test getStatusForSteps with isUpdateActionExecuted true", () => {
    const data = {
      key: "value"
    };
    const steps = [
      {
        completedDataKey: "key"
      }
    ];

    const statuses = getStatusForSteps(data, steps, 0, true);

    expect(statuses.length).toBe(1);
    expect(statuses[0]).toBe(COMPLETED);
  });

  test("Test getStatusForSteps with completeDataKey not exist in data", () => {
    const data = {
      fakekey: "value"
    };
    const steps = [
      {
        completedDataKey: "key"
      }
    ];

    const statuses = getStatusForSteps(data, steps, 0, true);

    expect(statuses.length).toBe(1);
    expect(statuses[0]).toBe(IN_PROGRESS);
  });

  describe("getStepsByTitle", () => {
    it("Returns only the relevant step ", () => {
      const result = getStepsByTitle(ApplicationStepListUK, APPLICATION_STEPS.COMPLETE_AN_ASSESSMENT );
        
      expect(result.length).toBe(1);
      expect(result[0].title).toBe(APPLICATION_STEPS.COMPLETE_AN_ASSESSMENT);
    });

    it("Returns all steps except for the excluded one", () => {
      const result = getStepsByTitle(ApplicationStepListUK, APPLICATION_STEPS.COMPLETE_AN_ASSESSMENT, false );
        
      const titles = result.map(step => step.title );
      expect(result.length).toBe(3);
      expect(titles.includes(APPLICATION_STEPS.COMPLETE_AN_ASSESSMENT)).toBeFalsy();
    });
  });

});
