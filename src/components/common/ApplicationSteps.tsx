import React from "react";
import isEmpty from "lodash/isEmpty";
import { MessageBanner } from "@amzn/stencil-react-components/message-banner";
import { ApplicationStepListMap } from "../../utils/constants/common";
import { translate as t } from "../../utils/translator";
import { CountryCode } from "../../utils/enums/common";
import { ApplicationStep } from "../../utils/types/common";

const ApplicationSteps = ({ steps = ApplicationStepListMap[CountryCode.US] }: {steps?: ApplicationStep[]}) => {
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
                <span className="steps-icon">{step?.customIndex ?? index + 1}</span>
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
