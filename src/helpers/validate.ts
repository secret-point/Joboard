import { propertyOf, filter } from "lodash";

export const validateRequiredData = (
  config: any,
  outputData: any,
  pageId?: string
): boolean => {
  if (pageId) {
    const requiredDataForComponents = filter(config?.components || [], obj => {
      const data = propertyOf(obj)("properties.required");
      if (data) {
        return obj;
      }
    });

    let validComponents: any[] = [];
    requiredDataForComponents.forEach((component: any) => {
      const dataKey = propertyOf(component)("properties.dataKey");
      const dataKeyOutputValue = propertyOf(outputData[pageId])(dataKey);
      if (dataKeyOutputValue) {
        validComponents.push(component);
      }
    });
    return validComponents.length === requiredDataForComponents.length;
  } else {
    return true;
  }
};
