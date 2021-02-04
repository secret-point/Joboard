import * as helper from "../render-helper"
import moment from "moment";

describe("Unit Tests for render helper", () => {

    beforeEach(() => {})
    afterEach(() => {})

    test("test covertValueTo with bool to string", () => {
        let value = helper.covertValueTo("BOOL_TO_STRING", true);
        expect(value).toBe("yes");
        value = helper.covertValueTo("BOOL_TO_STRING", false);
        expect(value).toBe("no");
        value = helper.covertValueTo("BOOL_TO_STRING", "string");
        expect(value).toBe("string");
    });

    test("test covertValueTo with date to string", () => {
        let value = helper.covertValueTo("DATE_TO_STRING", "01/02/2021");
        expect(value).toBe("2021-01-02");
        value = helper.covertValueTo("DATE_TO_STRING", "");
        expect(value).toBe("");
    });

    test("test covertValueTo with other type should return value directly", () => {
        let value = helper.covertValueTo("XX_TO_XX", "value");
        expect(value).toBe("value");
    });

    test("test validation with SSN", () => {
        let result = helper.validation("111111111", "SSN");
        expect(result).toBe(true);
        result = helper.validation("badssn", "SSN");
        expect(result).toBe(false);
    });

    test("test validation with zip code", () => {
        let result = helper.validation("10001", "ZIPCODE");
        expect(result).toBe(true);
        result = helper.validation("badzipcode", "ZIPCODE");
        expect(result).toBe(false);
    });

    test("test validation with date of birth", () => {
        const nineteenYearsOld = moment().utc().subtract(19,"years");
        let result = helper.validation(nineteenYearsOld.format("YYYY-MM-DD"), "DATE_OF_BIRTH");
        expect(result).toBe(true);
        
        const nineYearsOld = moment().utc().subtract(9,"years");
        result = helper.validation(nineYearsOld.format("YYYY-MM-DD"), "DATE_OF_BIRTH");
        expect(result).toBe(false);
    });

    test("test validation with legal name", () => {
        let result = helper.validation("John Smith", "LEGAL_NAME");
        expect(result).toBe(true);
        
        result = helper.validation("", "LEGAL_NAME");
        expect(result).toBe(true);

        result = helper.validation("John", "LEGAL_NAME");
        expect(result).toBe(false);
    });

    test("test validation with regex", () => {
        let result = helper.validation("", "REGEX", true, { });
        expect(result).toBe(true);
        
        result = helper.validation("123323534", "REGEX", false, { regex: "^[0-9]*$" });
        expect(result).toBe(true);

        result = helper.validation("abcdefg", "REGEX", false, { regex: "^[0-9]*$" });
        expect(result).toBe(false);

        result = helper.validation("abcdefg", "REGEX", false, { regex: "" });
        expect(result).toBe(true);
    });

    test("test validation with at least one", () => {
        let data = [{ checked: true }];
        let result = helper.validation(data, "AT_LEAST_ONE");
        expect(result).toBe(true);

        data = [];
        result = helper.validation(data, "AT_LEAST_ONE");
        expect(result).toBe(false);

        data = [{checked: false}];
        result = helper.validation(data, "AT_LEAST_ONE");
        expect(result).toBe(false);

        data = [{checked: false}, {checked: true}];
        result = helper.validation(data, "AT_LEAST_ONE");
        expect(result).toBe(true);
    });

    test("test validation with invalid type", () => {
        let result = helper.validation("value", "XXXXXX");
        expect(result).toBe(true);
    });
});