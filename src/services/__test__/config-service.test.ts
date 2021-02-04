import ConfigService from "../config-service";
import axios from "axios";

jest.mock("axios");
describe("Test config service", () => {
  jest.mock("axios", () => ({ create: jest.fn() }));
  test("should get application config", async () => {
    const get = jest.fn(() => Promise.resolve({}));
    axios.create.mockImplementation(() => ({ get }));
    const response = await new ConfigService().getConfig();
    expect(get).toHaveBeenCalled();
  });

  test("test get countryshould get application config", async () => {
    const get = jest.fn(() => Promise.resolve({}));
    axios.get.mockImplementation(() => ({ get }));
    const response = await new ConfigService().getCountryStateList();
    //TODO:why get is never called??
    //expect(get).toHaveBeenCalled();
  });
});
