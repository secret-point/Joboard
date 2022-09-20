import axios from 'axios';
import * as helper from "../../../src/helpers/axios-helper"

jest.mock('axios', () => {
  return {
    create: jest.fn(() => ({
      get: jest.fn(() => Promise.resolve({ data: 'data' })),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() }
      }
    }))
  }
});

describe("Unit tests for axios helper", () => {
  beforeEach(() => {
    window.localStorage.setItem("accessToken", "token");
  }),

  afterEach(() => {
    window.localStorage.clear();
  });

  it("should ggt getAccessToken", () => {
    const token = helper.getAccessToken();
    expect(token).toBe("token");
  });

  it("should set up request and response interceptors", () => {
    const client = helper.axiosHelper();
    expect(client.interceptors.request.use).toHaveBeenCalled();
    expect(client.interceptors.response.use).toHaveBeenCalled();
  });

  it("should get correct response", async () => {
    const client = helper.axiosHelper();
    const response = await client.get('url');
    expect(response.data).toBe('data');
  });

  it("should set correct request header", async () => {
    const config = {
      headers: []
    };
    const resConfig = helper.requestHandler(config);
    expect(resConfig.headers["bb-ui-version"]).toBe("bb-ui-v2");
  });
});
