import { getInitialData } from "../index";
import axios from "axios";

jest.mock("axios");
describe("Test Initial Config Service", () => {
  jest.mock("axios", () => ({ create: jest.fn() }));
  test("should get ", async () => {
    const get = jest.fn(() => Promise.resolve([]));
    axios.create.mockImplementation(() => ({ get }));
    const response = await getInitialData();
    expect(get).toHaveBeenCalled();
  });
});
