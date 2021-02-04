import * as helper from "../axios-helper"
import axios from "axios";


describe("Unit tests for axios helper", () => {
    beforeEach(() => {
        window.localStorage.setItem("accessToken", "token");
    }),

    afterEach(() => {
        window.localStorage.clear();
    });
    test("Test getAccessToken", () => {
        const token = helper.getAccessToken();
        expect(token).toBe("token");
    });

    test("Test axios handle success object", async () => {
        const client = helper.axiosHelper();
        //TODO: How to mock axios and test interceptors
    });
});