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
import ICandidateApplication from "../../@types/ICandidateApplication";
import RendererContainer from "../../containers/renderer";
import { getStatusForSteps } from "./../../helpers/steps-helper";
import { PENDING, IN_PROGRESS, COMPLETED } from "../../constants";

interface IStepContentRenderer {
  steps: any[];
  data: any;
}

const StepContentRenderer: React.FC<IStepContentRenderer> = ({
  steps,
  data
}) => {
  const [statuses, setStatuses] = useState<string[]>([]);

  useEffect(() => {
    const _statuses = getStatusForSteps(data, steps);
    setStatuses(_statuses);
  }, [data, steps]);

  const onEdit = (index: number) => {
    const _statuses = [...statuses];
    _statuses[index] = IN_PROGRESS;
    setStatuses(_statuses);
  };

  return (
    <Col gridGap="s">
      {steps.map((step, index) => {
        return (
          <Card key={index}>
            <Col width="100%" gridGap="s">
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
