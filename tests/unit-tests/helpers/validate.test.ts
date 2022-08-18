import { validateRequiredData } from "../../../src/helpers/validate";
import { TEST_PAGE_ID, TEST_APPLICATION_DATA } from "../../../tests/test-utils/test-data";

describe("Validate: ", () => {
  const getComponentsWithoutRequiredData = () => {
    return [
      {
        component: "Text",
        properties: {
          text: "Sample Text"
        }
      }
    ];
  };

  const getComponentsWithRequiredData = (validData: boolean, showComponentProperties: boolean, filterType?: string) => {
    const validDataKey = "application.applicationId";
    const result:any = [
      {
        component: "Text",
        properties: {
          text: "Simple Text",
          required: true,
          dataKey: validData? validDataKey : "fakeKey",
          validationType: "SSN",
          requiredErrorMessage: "test error message",
          validationErrorMessage: "test validation message",
        }
      }
    ]
    if (showComponentProperties) {
      result[0]["showComponentProperties"] = {
        filter: {
          type : filterType || "object",
          value: {
            key:"value"
          }
        },
        dataKey: "application.applicationId"
      }
    }
    return result;
  };

  const getValidOutputData = (pageId: string) => {
    const output:any = {};
    output[pageId] = [
        {
          fakeKey: "value"
        }
      ];
      return output;
  };

  test("should validateRequiredData without requiredData should return true", () => {
    const components = getComponentsWithoutRequiredData();

    const result = validateRequiredData(components, TEST_PAGE_ID, {}, TEST_APPLICATION_DATA);

    expect(result.valid).toBe(true);
    expect(Object.keys(result.validComponents).length).toBe(0);
  });

  test("ValidateRequiredData without pageId should return true", () => {
    const components = getComponentsWithoutRequiredData();

    const result = validateRequiredData(components, "", {}, TEST_APPLICATION_DATA);

    expect(result.valid).toBe(true);
  })

  test("ValidateRequiredData with empty components should return true", () => {
    const components = null;

    const result = validateRequiredData(components, TEST_PAGE_ID, {}, TEST_APPLICATION_DATA);

    expect(result.valid).toBe(true);
  })

  test("ValidateRequiredData with requiredData when data is missing should return false", () => {
    const components = getComponentsWithRequiredData(false, false);

    const result = validateRequiredData(components, TEST_PAGE_ID, {}, TEST_APPLICATION_DATA);

    expect(result.valid).toBe(false);
  });

  test("ValidateRequiredData with requiredData when data is present should return true", () => {
    const components = getComponentsWithRequiredData(true, false);

    const result = validateRequiredData(components, TEST_PAGE_ID, {}, TEST_APPLICATION_DATA);

    expect(result.valid).toBe(true);
  });

  test("ValidateRequiredData with requiredData when data is present in steps should return true", () => {
    const components = getComponentsWithRequiredData(false, false);
    const output = getValidOutputData(TEST_PAGE_ID);

    const result = validateRequiredData(components, TEST_PAGE_ID, output, TEST_APPLICATION_DATA, true, 0);

    expect(result.valid).toBe(true);
  });

  test("ValidateRequiredData with requiredData when data is present and show component properties are present should return true", () => {
    const components = getComponentsWithRequiredData(true, true);

    const result = validateRequiredData(components, TEST_PAGE_ID, {}, TEST_APPLICATION_DATA);

    expect(result.valid).toBe(true);
  });

  test("ValidateRequiredData with requiredData when data is present and show component properties are present should return true", () => {
    const components = getComponentsWithRequiredData(true, true, "something else");

    const result = validateRequiredData(components, TEST_PAGE_ID, {}, TEST_APPLICATION_DATA);

    expect(result.valid).toBe(true);
  });

  test("ValidateRequiredData with requiredData when data is present and isValidation flag is on should return false", () => {
    const components = getComponentsWithRequiredData(true, true);
    components[0]["properties"]["validation"] = true;

    const result = validateRequiredData(components, TEST_PAGE_ID, {}, TEST_APPLICATION_DATA);

    expect(result.valid).toBe(false);
  });
});
