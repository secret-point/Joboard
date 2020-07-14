import React, { useEffect, useState, useCallback } from "react";
import ComponentMap from "../component-map";
import { Col } from "@amzn/stencil-react-components/layout";
import set from "lodash/set";
import propertyOf from "lodash/propertyOf";
import isEmpty from "lodash/isEmpty";
import { History } from "history";
import { covertValueTo } from "../../helpers/render-helper";
import { validateRequiredData } from "../../helpers/validate";
import merge from "lodash/merge";
import { isArray } from "lodash";

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
  output: any;
};

interface conditionShowComponentProps {
  dataKey: any;
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
  data,
  currentPage,
  urlParams,
  appConfig,
  pageOrder,
  candidateId,
  isContentContainsSteps,
  activeStepIndex,
  stepId,
  stepsLength,
  renderProps,
  history,
  output,
  gridGap = "s",
  Render = Col
}) => {
  const [form, setForm] = useState<any>({});
  const [componentList, setComponentsList] = useState<IComponent[]>([]);
  const [validations, setValidations] = useState<any>({});

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

  const getInitialValidations = useCallback((component: any) => {
    const required = propertyOf(component)("properties.required");
    const requiredErrorMessage = propertyOf(component)(
      "properties.requiredErrorMessage"
    );
    if (required) {
      return {
        hasError: false,
        errorMessage: requiredErrorMessage
      };
    }
  }, []);

  const getValueFromStoreOutput = useCallback(
    (outputData: any, dataKey: string, type: string) => {
      let value = propertyOf(outputData[pageId])(dataKey);
      if (type) {
        value = covertValueTo(type, value);
      }
      return value;
    },
    [pageId]
  );

  useEffect(() => {
    const _components: any[] = [];
    let _component: IComponent = {
      component: "",
      properties: {},
      Element: <span />
    };

    const formData: any = {};
    const formValidations: any = {};
    if (components) {
      components.forEach((componentDetails: any) => {
        _component = componentDetails;
        _component.Element = ComponentMap[componentDetails.component];
        if (_component.Element) {
          if (componentDetails.properties.valueKey) {
            const {
              valueKey,
              covertValueTo,
              dataKey
            } = componentDetails.properties;
            let value = getValueFromStoreOutput(
              data.output,
              dataKey,
              covertValueTo
            );
            if (!value) {
              value = getValueFromServiceData(data, valueKey, covertValueTo);
            }
            set(formData, dataKey, value);
            const componentValidation = getInitialValidations(componentDetails);
            if (componentValidation) {
              set(
                formValidations,
                componentDetails.properties.dataKey,
                componentValidation
              );
            }
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
    setValidations(formValidations);
  }, [
    components,
    data,
    output,
    getValueFromServiceData,
    getInitialValidations,
    getValueFromStoreOutput
  ]);

  const commonProps = {
    data,
    pageId,
    currentPage,
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

  const constructOutput = useCallback(() => {
    let output = {
      [pageId]: form
    };
    if (isContentContainsSteps && activeStepIndex !== undefined) {
      output = {};
      output[pageId] = {
        [activeStepIndex]: form
      };
    }
    return output;
  }, [isContentContainsSteps, activeStepIndex, pageId, form]);

  const onValueChange = useCallback(
    (actionName: string, keyName: string, value: any, options?: any) => {
      const formData = Object.assign({}, form);
      if (keyName) {
        set(formData, keyName, value);
        setForm(formData);
        console.log("formData", formData);
        set(validations, `${keyName}.hasError`, false);
      }
      if (onAction && actionName !== "ON_VALUE_CHANGE") {
        let output = constructOutput();
        onAction(actionName, {
          keyName,
          value,
          options,
          output: output,
          ...commonProps
        });
      }
    },
    [form, onAction, commonProps, validations, constructOutput]
  );

  const onButtonClick = (actionName: string, options: any) => {
    let formData = constructOutput();
    let _output = merge(output, formData);
    console.log(formData, _output);
    const validationData = validateRequiredData(
      componentList,
      pageId,
      _output,
      data,
      isContentContainsSteps,
      activeStepIndex
    );

    if (validationData.valid) {
      onAction(actionName, {
        output: _output,
        ...commonProps,
        ...options
      });
    } else {
      setValidations(validationData.validComponents);
    }
  };

  const showComponent = (
    showComponentProperties: conditionShowComponentProps
  ) => {
    if (showComponentProperties) {
      const { dataKey, filter } = showComponentProperties;
      const dataKeyIsArray = isArray(dataKey);
      let value = !dataKeyIsArray ? getValue(dataKey) : "";
      if (dataKeyIsArray) {
        for (let i = 0; i < dataKey.length; i++) {
          value = getValue(dataKey[i]);
          console.log(dataKey[i], value);
          if (isEmpty(value)) {
            break;
          }
        }
      }

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
    value = isEmpty(value) ? propertyOf(output[pageId])(dataKey) : value;
    if (
      isContentContainsSteps &&
      activeStepIndex !== undefined &&
      output[pageId]
    ) {
      value = isEmpty(value)
        ? propertyOf(output[pageId][activeStepIndex])(dataKey)
        : value;
    }
    value = isEmpty(value) ? propertyOf(data.output[pageId])(dataKey) : value;
    value = isEmpty(value) ? propertyOf(data.application)(dataKey) : value;
    return value;
  };

  const getValidationValue = (dataKey: string) => {
    let value = propertyOf(validations)(dataKey);
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
        const componentValidation = getValidationValue(
          component.properties.dataKey
        );
        return (
          showComponent(component.showComponentProperties) && (
            <component.Element
              key={`component-${index}`}
              {...component.properties}
              onValueChange={onValueChange}
              enableOnValidation={true}
              value={value}
              hasError={componentValidation?.hasError}
              errorMessage={componentValidation?.errorMessage}
              errorText={componentValidation?.errorMessage}
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
