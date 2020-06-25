import { propertyOf, filter, isEmpty, set } from "lodash";
import IPayload from "../@types/IPayload";

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
      let dataKeyOutputValue =
        isContentContainsSteps && activeStepIndex !== undefined
          ? propertyOf(output[pageId][activeStepIndex])(dataKey)
          : propertyOf(output[pageId])(dataKey);
      if (!dataKeyOutputValue) {
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
