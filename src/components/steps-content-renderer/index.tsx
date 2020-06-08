import React, { useState, useEffect } from "react";
import { Card } from "@stencil-react/components/card";
import { Col, Row } from "@stencil-react/components/layout";
import { Text } from "@stencil-react/components/text";
import { Button } from "@stencil-react/components/button";
import {
  IconPadlock,
  IconCheckCircle,
  IconPencil
} from "@stencil-react/components/icons";
import RendererContainer from "../../containers/renderer";
import { getStatusForSteps } from "./../../helpers/steps-helper";
import { PENDING, IN_PROGRESS, COMPLETED } from "../../constants";
import { RESET_IS_UPDATE_ACTION_EXECUTED } from "../../actions/actions";

interface IStepContentRenderer {
  steps: any[];
  data: any;
  isUpdateActionExecuted: boolean;
  onAction: any;
}

const StepContentRenderer: React.FC<IStepContentRenderer> = ({
  steps,
  data,
  isUpdateActionExecuted,
  onAction
}) => {
  const [statuses, setStatuses] = useState<string[]>([]);
  const [editStatusIndex, SetEditStatusIndex] = useState<number>(-1);

  useEffect(() => {
    const _statuses = getStatusForSteps(
      data,
      steps,
      editStatusIndex,
      isUpdateActionExecuted
    );
    setStatuses(_statuses);
  }, [data, steps, editStatusIndex, isUpdateActionExecuted]);

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
  };

  return (
    <Col gridGap="s">
      {steps.map((step, index) => {
        return (
          <Card key={index}>
            <Col width="100%" gridGap="s">
              <Col>
                <Text fontSize="14px" color="#5C7274">
                  Step {index + 1} of {steps.length}
                </Text>
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