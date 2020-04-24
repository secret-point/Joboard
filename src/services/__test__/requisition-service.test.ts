import RequisitionService from "../requisition-service";
import axios from "axios";

jest.mock("axios");
describe("Test RequisitionService", () => {
  jest.mock("axios", () => ({ create: jest.fn() }));
  test("should get requisition header info", async () => {
    const get = jest.fn(() => Promise.resolve({}));
    axios.create.mockImplementation(() => ({ get }));
    await new RequisitionService().getRequisitionHeaderInfo("123213");
    expect(get).toHaveBeenCalled();
  });

  test("should get disqualified questions", async () => {
    const get = jest.fn(() => Promise.resolve({}));
    axios.create.mockImplementation(() => ({ get }));
    await new RequisitionService().getDisqualifiedQuestions("123213");
    expect(get).toHaveBeenCalled();
  });
});
