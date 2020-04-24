import React, { useEffect, useState } from "react";
import ComponentMap from "../component-map";
import { Col } from "@stencil-react/components/layout";
import set from "lodash/set";
import get from "lodash/get";

type IComponent = {
  component: string;
  properties: any;
  Element: any;
};

export type IRendererProps = {
  components?: IComponent[];
  pageId: string;
  outputData: any;
  onAction: Function;
  isDataValid: boolean;
  data?: any;
  currentPage: any;
  nextPage: any;
  urlParams: any;
  appConfig: any;
  pageOrder: any;
};

const Renderer: React.FC<IRendererProps> = ({
  components,
  pageId,
  onAction,
  outputData,
  isDataValid,
  data,
  nextPage,
  currentPage,
  urlParams,
  appConfig,
  pageOrder
}) => {
  const [form, setForm] = useState<any>({});
  const [componentList, setComponentsList] = useState<IComponent[]>([]);

  useEffect(() => {
    const _components: any[] = [];
    let _component: IComponent = {
      component: "",
      properties: {},
      Element: <span />
    };

    if (components) {
      components.forEach((componentDetails: any) => {
        _component = componentDetails;
        _component.Element = ComponentMap[componentDetails.component];
        if (_component.Element) {
          _components.push(_component);
        } else {
          console.error(`${componentDetails.component} is missing`);
        }
      });
    }
    setComponentsList(_components);

    setForm({ ...data });
  }, [components, outputData, data]);

  const onValueChange = (actionName: string, keyName: string, value: any) => {
    const formData = Object.assign({}, form);
    if (keyName && value) {
      set(formData, keyName, value);
      setForm(formData);
    }
    if (onAction && actionName) {
      onAction(actionName, {
        keyName,
        value,
        pageId,
        applicationData: data,
        urlParams
      });
    }
  };

  const onButtonClick = (actionName: string, options: any) => {
    const id = data?.application.id;
    onAction(actionName, {
      outputData: outputData,
      applicationData: data,
      pageId: id,
      currentPage,
      nextPage,
      urlParams,
      appConfig,
      pageOrder,
      ...options
    });
  };

  return (
    <Col data-testid={`renderer`} gridGap="s">
      {componentList.map((component: any, index: number) => (
        <component.Element
          key={`component-${index}`}
          {...component.properties}
          onValueChange={onValueChange}
          enableOnValidation={isDataValid}
          value={get(form, component.properties.dataKey)}
          onButtonClick={onButtonClick}
        />
      ))}
    </Col>
  );
};

export default Renderer;
