import React, { useEffect, useState } from "react";
import ComponentMap from "../component-map";
import { Col } from "@stencil-react/components/layout";
import set from "lodash/set";
import propertyOf from "lodash/propertyOf";
import isEmpty from "lodash/isEmpty";

type IComponent = {
  component: string;
  properties: any;
  Element: any;
};

export type IRendererProps = {
  gridGap?: string;
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
  isContentContainsSteps?: boolean;
  activeStepIndex?: number;
  stepId?: string;
  Render?: any;
  renderProps: any;
};

interface conditionShowComponentProps {
  dataKey: string;
  filter: Filter;
}

interface Filter {
  type: string;
  value: any;
  operator: string;
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
  errorMessage,
  isContentContainsSteps,
  activeStepIndex,
  stepId,
  renderProps,
  gridGap = "s",
  Render = Col
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
    candidateId,
    isContentContainsSteps,
    activeStepIndex,
    stepId
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
      const value = getValue(dataKey);
      if (filter.type === "object") {
        return !isEmpty(value);
      } else {
        return value === filter.value;
      }
    } else {
      // show component if show component properties are empty.
      return true;
    }
  };

  const getValue = (dataKey: string) => {
    let value = propertyOf(data)(dataKey);
    value = isEmpty(value) ? propertyOf(form.output[pageId])(dataKey) : value;
    value = isEmpty(value) ? propertyOf(form.application)(dataKey) : value;
    return value;
  };

  return (
    <Render data-testid={`renderer`} gridGap={gridGap} {...renderProps}>
      {componentList.map((component: any, index: number) => {
        const value =
          component.properties.value || getValue(component.properties.dataKey);
        const dataObject: any = {};
        if (component.componentValueProp) {
          dataObject[component.componentValueProp] =
            getValue(component.valueKey) || component.defaultValue;
        }
        if (showComponent(component.showComponentProperties)) {
          return (
            <component.Element
              key={`component-${index}`}
              {...component.properties}
              onValueChange={onValueChange}
              enableOnValidation={isDataValid}
              value={value}
              hasError={hasResponseError}
              errorMessage={component.properties.errorMessage || errorMessage}
              onButtonClick={onButtonClick}
              defaultValue={value}
              {...dataObject}
            />
          );
        } else {
          return <span key={`component-${index}`} />;
        }
      })}
    </Render>
  );
};

export default Renderer;
