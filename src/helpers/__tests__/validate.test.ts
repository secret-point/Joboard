import { validateRequiredData } from "../validate";

describe("Validate: ", () => {
  test("should validateRequiredData without requiredData", () => {
    const config = {
      components: [
        {
          component: "Text",
          properties: {
            text: "Sample Text"
          }
        }
      ]
    };

    const result = validateRequiredData(config, { consent: {} }, "consent");

    expect(result).toBe(true);
  });

  test("should validateRequiredData requiredData", () => {
    const config = {
      components: [
        {
          component: "Input",
          properties: {
            label: "Sample Input",
            required: true
          }
        }
      ]
    };

    const result = validateRequiredData(config, { consent: {} }, "consent");

    expect(result).toBe(false);
  });

  test("should validateRequiredData validated data", () => {
    const config = {
      components: [
        {
          component: "Input",
          properties: {
            label: "Sample Input",
            required: true,
            dataKey: "isUserConsent"
          }
        }
      ]
    };

    const result = validateRequiredData(
      config,
      {
        consent: {
          isUserConsent: true
        }
      },
      "consent"
    );

    expect(result).toBe(true);
  });
});
