import React, { useEffect } from "react";
import RendererContainer from "../../containers/renderer";
import { Col, Row, View } from "@stencil-react/components/layout";
import { Card } from "@stencil-react/components/card";
import propertyOf from "lodash/propertyOf";
import { Text } from "@stencil-react/components/text";
import { Button } from "@stencil-react/components/button";
import Icon from "../icon";

interface IPanelComponent {
  panel: any;
  data: any;
  onButtonClick: Function;
}

export interface Filter {
  type: string;
  value: string;
}

export interface showOnProps {
  dataKey: string;
  filter: Filter;
}

const PanelComponent: React.FC<IPanelComponent> = ({
  panel,
  onButtonClick
}) => {
  const onActionButtonClick = () => {
    const { actionProps } = panel;
    onButtonClick(actionProps.action, { options: actionProps.options });
  };

  const onLaunchButtonClick = () => {
    const { launchProps } = panel;
    onButtonClick(launchProps.action, { options: launchProps.options });
  };

  return (
    <Card padding={0}>
      <Col gridGap={10}>
        {panel.titleProps && (
          <View padding={15}>
            <Row gridGap="s" alignItems="center" justifyContent="space-between">
              <Text
                fontSize={panel.titleProps.fontSize}
                color={panel.titleProps.color}
              >
                {panel.titleProps.title}
              </Text>
              {panel.actionProps && (
                <Button onClick={onActionButtonClick} tertiary>
                  <Row gridGap={8} alignItems="center">
                    {panel.actionProps.showIcon && (
                      <Icon icon={panel.actionProps.icon} />
                    )}
                    {panel.actionProps.label}
                  </Row>
                </Button>
              )}
            </Row>
          </View>
        )}
        <View className="card-content">
          <RendererContainer
            isContentContainsPanel={true}
            panelId={panel.id}
            type="content"
          />
        </View>
        {panel.launchProps && (
          <View className="card-launch-action">
            <Button tertiary onClick={onLaunchButtonClick}>
              <Row gridGap={8} alignItems="center">
                <Text>Launch</Text>
                {panel.launchProps.showIcon && (
                  <Icon icon={panel.launchProps.icon} />
                )}
              </Row>
            </Button>
          </View>
        )}
      </Col>
    </Card>
  );
};

export default PanelComponent;
