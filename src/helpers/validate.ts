import { propertyOf, filter, set, isEmpty } from "lodash";
import { ApplicationData } from "../@types/IPayload";
import { validation } from "../helpers/render-helper";

const getValue = (
  output: any,
  dataKey: string,
  pageId: string,
  data: ApplicationData,
  isContentContainsSteps?: boolean,
  activeStepIndex?: number
) => {
  let value = propertyOf(output)(dataKey);
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
  value = isEmpty(value) ? propertyOf(data)(dataKey) : value;
  value = isEmpty(value) ? propertyOf(data.output[pageId])(dataKey) : value;
  return value;
};

const isComponentRendered = (
  output: any,
  pageId: string,
  data: ApplicationData,
  showComponentProperties?: any,
  isContentContainsSteps?: boolean,
  activeStepIndex?: number
) => {
  if (showComponentProperties) {
    const { dataKey, filter } = showComponentProperties;
    const value = getValue(
      output,
      dataKey,
      pageId,
      data,
      isContentContainsSteps,
      activeStepIndex
    );
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

export const validateRequiredData = (
  components: any,
  pageId: string,
  output: any,
  data: ApplicationData,
  isContentContainsSteps?: boolean,
  activeStepIndex?: number
) => {
  if (pageId) {
    const requiredDataForComponents = filter(components || [], obj => {
      const data =
        propertyOf(obj)("properties.required") ||
        propertyOf(obj)("properties.validation");
      if (data) {
        return obj;
      }
    });
    let validComponents: any = {};
    let result = true;
    requiredDataForComponents.forEach((component: any) => {
      const dataKey = propertyOf(component)("properties.dataKey");
      const requiredErrorMessage = propertyOf(component)(
        "properties.requiredErrorMessage"
      );
      let componentRendered = true;
      let dataKeyOutputValue = getValue(
        output,
        dataKey,
        pageId,
        data,
        isContentContainsSteps,
        activeStepIndex
      );
      const validationErrorMessage = propertyOf(component)(
        "properties.validationErrorMessage"
      );
      const validationType = propertyOf(component)("properties.validationType");
      const isValidation = propertyOf(component)("properties.validation");
      const isOptional = propertyOf(component)("properties.optional");
      const isRequired = propertyOf(component)("properties.required");
      const validationProps = propertyOf(component)(
        "properties.validationProps"
      );
      let dataKeyValidate = validation(
        dataKeyOutputValue,
        validationType,
        isOptional,
        validationProps
      );

      if (component.showComponentProperties) {
        componentRendered = isComponentRendered(
          output,
          pageId,
          data,
          component.showComponentProperties,
          isContentContainsSteps,
          activeStepIndex
        );
      }
      if (!dataKeyOutputValue && isRequired && componentRendered) {
        set(validComponents, dataKey, {
          hasError: true,
          errorMessage: requiredErrorMessage
        });
        result = false;
      } else if (isValidation && !dataKeyValidate && componentRendered) {
        //if the component need value validation and validation failed
        set(validComponents, dataKey, {
          hasError: true,
          errorMessage: validationErrorMessage
        });
        result = false;
      } else {
        set(validComponents, dataKey, {
          hasError: false,
          errorMessage: requiredErrorMessage
        });
      }
    });
    return {
      valid: result,
      validComponents
    };
  } else {
    return {
      valid: true
    };
  }
};
