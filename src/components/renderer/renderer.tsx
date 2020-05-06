import React, { useEffect, useState } from "react";
import ComponentMap from "../component-map";
import { Col } from "@stencil-react/components/layout";
import set from "lodash/set";
import get from "lodash/get";
import propertyOf from "lodash/propertyOf";

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
  candidateId: string;
  hasResponseError: boolean;
  errorMessage: string;
};

interface conditionShowComponentProps {
  dataKey: string;
  filter: Filter;
}

interface Filter {
  type: string;
  value: string;
}

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
  pageOrder,
  candidateId,
  hasResponseError,
  errorMessage
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

  const commonProps = {
    data,
    pageId,
    currentPage,
    nextPage,
    urlParams,
    appConfig,
    pageOrder,
    candidateId
  };

  const onValueChange = (actionName: string, keyName: string, value: any) => {
    const formData = Object.assign({}, form);
    if (keyName && value) {
      set(formData.output[pageId], keyName, value);
      setForm(formData);
    }
    if (onAction && actionName) {
      onAction(actionName, {
        keyName,
        value,
        ...commonProps
      });
    }
  };

  const onButtonClick = (actionName: string, options: any) => {
    const id = data?.application.id;
    onAction(actionName, {
      ...commonProps,
      ...options
    });
  };

  const showComponent = (
    showComponentProperties: conditionShowComponentProps
  ) => {
    if (showComponentProperties) {
      const { dataKey, filter } = showComponentProperties;
      const value = propertyOf(data.output[pageId])(dataKey);
      return value === filter.value;
    } else {
      // show component if show component properties are empty.
      return true;
    }
  };

  return (
    <Col data-testid={`renderer`} gridGap="s">
      {componentList.map((component: any, index: number) => {
        if (showComponent(component.showComponentProperties)) {
          return (
            <component.Element
              key={`component-${index}`}
              {...component.properties}
              onValueChange={onValueChange}
              enableOnValidation={isDataValid}
              value={
                component.properties.value ||
                get(form, component.properties.dataKey)
              }
              hasError={hasResponseError}
              errorMessage={component.properties.errorMessage || errorMessage}
              onButtonClick={onButtonClick}
            />
          );
        }
      })}
    </Col>
  );
};

export default Renderer;
