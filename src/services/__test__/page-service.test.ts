import PageService from "../page-service";
import axios from "axios";

jest.mock("axios");
describe("Test page service", () => {
  jest.mock("axios", () => ({ create: jest.fn() }));
  test("should get page config without config path", async () => {
    const get = jest.fn(() => Promise.resolve({}));
    axios.create.mockImplementation(() => ({ get }));
    await new PageService().getPageConfig();
    expect(get).toHaveBeenCalled();
  });

  test("should get page config with config path", async () => {
    const get = jest.fn(() => Promise.resolve({}));
    axios.create.mockImplementation(() => ({ get }));
    await new PageService().getPageConfig("Config.json");
    expect(get).toHaveBeenCalled();
  });
});
