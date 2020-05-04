import includes from "lodash/includes";
import { ApplicationState } from "../constants/ApplicationState";
import { IN_PROGRESS, PENDING, COMPLETED } from "../constants";

export const getBGCInfoStepsStatuses = (currentState: string) => {
  const statuses = {
    frca: PENDING,
    nonFrca: PENDING,
    bgcInfo: PENDING
  };

  if (currentState === ApplicationState.CONTINGENT_OFFER_ACCEPTED) {
    statuses.frca = IN_PROGRESS;
    statuses.nonFrca = PENDING;
    statuses.bgcInfo = PENDING;
  } else if (currentState === ApplicationState.FCRA_CONSENT_SAVED) {
    statuses.frca = COMPLETED;
    statuses.nonFrca = IN_PROGRESS;
    statuses.bgcInfo = PENDING;
  } else if (currentState === ApplicationState.NON_FCRA_CONSENT_SAVED) {
    statuses.frca = COMPLETED;
    statuses.nonFrca = COMPLETED;
    statuses.bgcInfo = IN_PROGRESS;
  } else if (
    currentState === ApplicationState.ADDITIONAL_BACKGROUND_INFO_SAVED ||
    currentState === ApplicationState.PRE_HIRE_APPOINTMENT_SCHEDULED ||
    currentState === ApplicationState.APPLICATION_CREATED
  ) {
    statuses.frca = COMPLETED;
    statuses.nonFrca = COMPLETED;
    statuses.bgcInfo = COMPLETED;
  }

  return statuses;
};

export const getStatusForSteps = (currentState: string, steps: any[]) => {
  const statuses: string[] = [];
  steps.forEach((step, index) => {
    const { activateStatus, completedStatuses } = step;
    let status = PENDING;
    if (currentState === activateStatus) {
      status = IN_PROGRESS;
    } else if (includes(completedStatuses, currentState)) {
      status = COMPLETED;
    } else {
      status = PENDING;
    }
    statuses.push(status);
  });

  return statuses;
};
