import { IN_PROGRESS, PENDING, COMPLETED } from "../constants";
import propertyOf from "lodash/propertyOf";
import isEmpty from "lodash/isEmpty";
import isNull from "lodash/isNull";

export const getStatusForSteps = (data: any, steps: any[]) => {
  const statuses: string[] = [];
  for (var step of steps) {
    const value = propertyOf(data)(step.completedDataKey);
    const isComplete = !isEmpty(value) && !isNull(value);
    if (isComplete) {
      statuses.push(COMPLETED);
    } else {
      statuses.push(PENDING);
    }
  }

  for (let i = 0; i < statuses.length; i++) {
    if (statuses[i] === PENDING) {
      statuses[i] = IN_PROGRESS;
      break;
    }
  }
  return statuses;
};
