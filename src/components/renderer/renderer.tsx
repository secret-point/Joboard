import React, { useEffect, useState, useCallback } from "react";
import ComponentMap from "../component-map";
import { Col } from "@stencil-react/components/layout";
import set from "lodash/set";
import propertyOf from "lodash/propertyOf";
import isEmpty from "lodash/isEmpty";
import { History } from "history";
import { covertValueTo } from "../../helpers/render-helper";

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
  stepsLength: number;
  Render?: any;
  renderProps: any;
  history: History;
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
  stepsLength,
  renderProps,
  history,
  gridGap = "s",
  Render = Col
}) => {
  const [form, setForm] = useState<any>({});
  const [componentList, setComponentsList] = useState<IComponent[]>([]);

  const getValueFromServiceData = useCallback(
    (serviceData: any, valueKey: string, type: string) => {
      let value = propertyOf(serviceData)(valueKey);
      if (type) {
        value = covertValueTo(type, value);
      }
      return value;
    },
    []
  );

  useEffect(() => {
    const _components: any[] = [];
    let _component: IComponent = {
      component: "",
      properties: {},
      Element: <span />
    };

    const formData: any = {};
    if (components) {
      components.forEach((componentDetails: any) => {
        _component = componentDetails;
        _component.Element = ComponentMap[componentDetails.component];
        if (_component.Element) {
          if (componentDetails.properties.valueKey) {
            const value = getValueFromServiceData(
              data,
              componentDetails.properties.valueKey,
              componentDetails.properties.covertValueTo
            );
            set(formData, componentDetails.properties.dataKey, value);
          }
          _components.push(_component);
        } else {
          console.error(`${componentDetails.component} is missing`);
        }
      });
    }
    if (!isEmpty(formData)) {
      setForm(formData);
    }
    setComponentsList(_components);
  }, [components, data, getValueFromServiceData]);

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
    stepId,
    stepsLength,
    history
  };

  const onValueChange = useCallback(
    (actionName: string, keyName: string, value: any, options?: any) => {
      const formData = Object.assign({}, form);
      console.log(actionName, keyName, value);
      if (keyName && value) {
        set(formData, keyName, value);
        setForm(formData);
      }
      if (onAction && actionName !== "ON_VALUE_CHANGE") {
        onAction(actionName, {
          keyName,
          value,
          options,
          ...commonProps
        });
      }
    },
    [form, onAction, commonProps]
  );

  const onButtonClick = (actionName: string, options: any) => {
    let output = {
      [pageId]: form
    };
    if (isContentContainsSteps && activeStepIndex) {
      output = {};
      output[pageId] = {
        [activeStepIndex]: form
      };
    }
    onAction(actionName, {
      output,
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
    value = isEmpty(value) ? propertyOf(form)(dataKey) : value;
    value = isEmpty(value) ? propertyOf(data.output[pageId])(dataKey) : value;
    value = isEmpty(value) ? propertyOf(data.application)(dataKey) : value;
    return value;
  };

  return (
    <Render data-testid={`renderer`} gridGap={gridGap} {...renderProps}>
      {componentList.map((component: any, index: number) => {
        let value =
          getValue(component.properties.dataKey) || component.properties.value;
        const dataObject: any = {};
        if (component.componentValueProp) {
          dataObject[component.componentValueProp] =
            getValue(component.valueKey) || component.defaultValue;
        }

        return (
          showComponent(component.showComponentProperties) && (
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
          )
        );
      })}
    </Render>
  );
};

export default Renderer;
