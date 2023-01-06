import React from "react";
import isEmpty from "lodash/isEmpty";
import { MessageBanner } from "@amzn/stencil-react-components/message-banner";
import { ApplicationStepList } from "../../utils/constants/common";
import { translate as t } from "../../utils/translator";

const ApplicationSteps = () => {
  const steps = ApplicationStepList;

  return (
    <div id="applicationStepContainer" data-testid="applicationStepContainer">
      {isEmpty(steps) && <MessageBanner>Steps are missing</MessageBanner>}
      <div className="steps steps-vertical">
        {steps?.map((step, index) => (
          <div
            data-testid={`step-${index}`}
            key={step.title}
            className="steps-item"
          >
            <div className="steps-item-container">
              <div className="steps-item-tail" />
              <div className="steps-item-icon">
                <span className="steps-icon">{step.stepNumber}</span>
              </div>
              <div className="steps-item-content">
                <div className="steps-item-title">
                  {t(step.titleTranslationKey, step.title)}
                </div>
                <div className="steps-item-description">{step.description || ""}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationSteps;
