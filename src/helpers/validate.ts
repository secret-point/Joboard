import { propertyOf, filter, set, isEmpty } from "lodash";

const getValue = (
  output: any,
  dataKey: string,
  pageId: string,
  isContentContainsSteps?: boolean,
  activeStepIndex?: number
) => {
  return isContentContainsSteps && activeStepIndex !== undefined
    ? propertyOf(output[pageId][activeStepIndex])(dataKey)
    : propertyOf(output[pageId])(dataKey);
};

const isComponentRendered = (
  output: any,
  pageId: string,
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
  isContentContainsSteps?: boolean,
  activeStepIndex?: number
) => {
  if (pageId) {
    const requiredDataForComponents = filter(components || [], obj => {
      const data = propertyOf(obj)("properties.required");
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
        isContentContainsSteps,
        activeStepIndex
      );
      isContentContainsSteps && activeStepIndex !== undefined
        ? propertyOf(output[pageId][activeStepIndex])(dataKey)
        : propertyOf(output[pageId])(dataKey);
      if (component.showComponentProperties) {
        componentRendered = isComponentRendered(
          output,
          pageId,
          component.showComponentProperties,
          isContentContainsSteps,
          activeStepIndex
        );
      }
      if (!dataKeyOutputValue && componentRendered) {
        set(validComponents, dataKey, {
          hasError: true,
          errorMessage: requiredErrorMessage
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
