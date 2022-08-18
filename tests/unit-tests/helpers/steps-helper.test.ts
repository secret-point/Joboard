import { COMPLETED, IN_PROGRESS } from '../../../src/constants';
import { getStatusForSteps } from './../../../src/helpers/steps-helper';

describe("Unit tests for steps helper", () => {

    test("Test getStatusForSteps with isUpdateActionExecuted false", () => {
        const data = {
            key:"value"
        };
        const steps = [
            {
                completedDataKey:"key"
            }
        ];

        const statuses = getStatusForSteps(data, steps, 0, false);

        expect(statuses.length).toBe(1);
        expect(statuses[0]).toBe(IN_PROGRESS);
    })

    test("Test getStatusForSteps with isUpdateActionExecuted true", () => {
        const data = {
            key:"value"
        };
        const steps = [
            {
                completedDataKey:"key"
            }
        ];

        const statuses = getStatusForSteps(data, steps, 0, true);

        expect(statuses.length).toBe(1);
        expect(statuses[0]).toBe(COMPLETED);
    })

    test("Test getStatusForSteps with completeDataKey not exist in data", () => {
        const data = {
            fakekey:"value"
        };
        const steps = [
            {
                completedDataKey:"key"
            }
        ];

        const statuses = getStatusForSteps(data, steps, 0, true);

        expect(statuses.length).toBe(1);
        expect(statuses[0]).toBe(IN_PROGRESS);
    })

})
