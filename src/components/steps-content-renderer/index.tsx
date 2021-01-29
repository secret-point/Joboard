import React, { useState, useEffect } from "react";
import { Card } from "@amzn/stencil-react-components/card";
import { Col, Row } from "@amzn/stencil-react-components/layout";
import { Text } from "@amzn/stencil-react-components/text";
import { Button } from "@amzn/stencil-react-components/button";
import {
  IconPadlock,
  IconCheckCircle,
  IconPencil,
  IconCrossCircle
} from "@amzn/stencil-react-components/icons";
import RendererContainer from "../../containers/renderer";
import { getStatusForSteps } from "./../../helpers/steps-helper";
import { PENDING, IN_PROGRESS, COMPLETED } from "../../constants";
import { RESET_IS_UPDATE_ACTION_EXECUTED } from "../../actions/actions";
import { sendDataLayerAdobeAnalytics } from "../../actions/adobe-actions";
import { getDataForEventMetrics } from "../../helpers/adobe-helper";
import isEmpty from "lodash/isEmpty";

interface IStepContentRenderer {
  steps: any[];
  data: any;
  isUpdateActionExecuted: boolean;
  onAction: Function;
  setStepsCompleted: Function;
}

const StepContentRenderer: React.FC<IStepContentRenderer> = ({
  steps,
  data,
  isUpdateActionExecuted,
  onAction,
  setStepsCompleted
}) => {
  const [statuses, setStatuses] = useState<string[]>([]);
  const [editStatusIndex, SetEditStatusIndex] = useState<number>(-1);
  const [adobeMetricRecords, setAdobeMetricRecords] = useState<any>({});
  const [showCloseButton, setShowCloseButton] = useState<boolean>(false);

  const metric = (window as any).MetricsPublisher.newChildActionPublisherForMethod(
    "StepsLoad"
  );

  useEffect(() => {
    const adobeRecords: any = {};
    steps?.forEach(step => {
      adobeRecords[step.id] = false;
    });
    setAdobeMetricRecords(adobeRecords);
  }, []);

  useEffect(() => {
    const _statuses = getStatusForSteps(
      data,
      steps,
      editStatusIndex,
      isUpdateActionExecuted
    );
    setStatuses(_statuses);
    const arStatuses = _statuses.filter(v => v === COMPLETED);
    if (arStatuses.length === steps.length || arStatuses.length === 0) {
      setStepsCompleted(true);
    }
  }, [data, steps, editStatusIndex, isUpdateActionExecuted, setStepsCompleted]);

  useEffect(() => {
    if (!isEmpty(steps)) {
      statuses.forEach((status: any, index: number) => {
        if (
          status === IN_PROGRESS &&
          steps[index].id !== "fcra" &&
          !adobeMetricRecords[steps[index].id]
        ) {
          const dataLayer: any = getDataForEventMetrics(steps[index].id);
          if (!isEmpty(dataLayer)) {
            sendDataLayerAdobeAnalytics(dataLayer);
            adobeMetricRecords[steps[index].id] = true;
            setAdobeMetricRecords(adobeMetricRecords);
            metric.publishCounterMonitor(steps[index].id, 1);
          }
        }
      });
    }
  }, [statuses, steps, adobeMetricRecords, metric]);

  const onEdit = (index: number) => {
    onAction(RESET_IS_UPDATE_ACTION_EXECUTED, {
      data
    });

    const _statuses = [...statuses];
    _statuses[index] = IN_PROGRESS;
    let _editStatusIndex = editStatusIndex;
    if (index > -1) {
      _editStatusIndex = index;
    } else {
      _editStatusIndex = -1;
    }
    SetEditStatusIndex(_editStatusIndex);
    setStatuses(_statuses);

    const arStatuses = _statuses.filter(v => v === COMPLETED);
    if (arStatuses.length === steps.length) {
      setStepsCompleted(true);
      setShowCloseButton(false);
    } else {
      setStepsCompleted(false);
      setShowCloseButton(true);
    }
  };

  const onCloseStep = (index: number) => {
    const _statuses = [...statuses];
    _statuses[index] = COMPLETED;
    SetEditStatusIndex(-1);
    setStatuses(_statuses);
    setStepsCompleted(true);
    setShowCloseButton(false);
  };

  return (
    <Col gridGap="s">
      {steps.map((step, index) => {
        return (
          <Card key={index}>
            <Col width="100%" gridGap="s">
              <Col>
                <Row gridGap="m" justifyContent="space-between">
                  <Text fontSize="14px" color="#5C7274">
                    Step {index + 1} of {steps.length}
                  </Text>
                  {statuses[index] === IN_PROGRESS && showCloseButton && (
                    <Button onClick={() => onCloseStep(index)} tertiary>
                      <IconCrossCircle color="accent1" />
                    </Button>
                  )}
                </Row>
              </Col>
              <Row
                alignItems="center"
                gridGap="m"
                justifyContent="space-between"
              >
                <Col>
                  <Text fontSize="18px">{step.title}</Text>
                </Col>
                <Col>
                  {statuses[index] === PENDING && (
                    <IconPadlock color="accent3" />
                  )}
                  {statuses[index] === COMPLETED && (
                    <Row gridGap="s" alignItems="center">
                      <IconCheckCircle color="positive" />
                      <Button onClick={() => onEdit(index)} tertiary>
                        <IconPencil color="primary"></IconPencil>
                      </Button>
                    </Row>
                  )}
                </Col>
              </Row>
              {statuses[index] === IN_PROGRESS && (
                <RendererContainer
                  isContentContainsSteps={true}
                  activeStepIndex={index}
                  stepId={step.id}
                  stepsLength={steps.length}
                  type="content"
                />
              )}
            </Col>
          </Card>
        );
      })}
    </Col>
  );
};

export default StepContentRenderer;
