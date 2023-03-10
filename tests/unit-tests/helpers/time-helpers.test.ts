import { getDecimalHoursInHourAndMinutes } from "../../../src/helpers/time-helpers";

describe("Time helpers", () => {
  describe("getDecimalHoursInHourAndMinutes()", () => {
    it("returns singular hours ", () => {
      expect(getDecimalHoursInHourAndMinutes(1.3)).toEqual(
        "1hr and 18mins"
      );
    });
    it("hours and minutes", () => {
      expect(getDecimalHoursInHourAndMinutes(22.3)).toEqual(
        "22hrs and 18mins"
      );
      expect(getDecimalHoursInHourAndMinutes(40.5)).toEqual(
        "40hrs and 30mins"
      );
      expect(getDecimalHoursInHourAndMinutes(1.9)).toEqual("1hr and 54mins");

    });
    it("returns just hours ", () => {
      expect(getDecimalHoursInHourAndMinutes(1)).toEqual("1hr");
    });
    it("returns full hour when minuts are equal to 60 ", () => {
      expect(getDecimalHoursInHourAndMinutes(1.999)).toEqual("2hrs");
    });
    it("returns same decimals rounded the same way ", () => {
      expect(getDecimalHoursInHourAndMinutes(39.3)).toEqual(
        "39hrs and 18mins"
      );
      expect(getDecimalHoursInHourAndMinutes(22.3)).toEqual(
        "22hrs and 18mins"
      );
    });
    it("works fine for 2 decimal places", () => {
      expect(getDecimalHoursInHourAndMinutes(31.51)).toEqual(
        "31hrs and 31mins"
      );
    });
    it("works fine for 2 decimal places", () => {
      expect(getDecimalHoursInHourAndMinutes(31.51)).toEqual(
        "31hrs and 31mins"
      );
    });
    it("Returns only minutes when the time is less than an hour", () => {
      expect(getDecimalHoursInHourAndMinutes(0.51)).toEqual(
        "31mins"
      );
    });
    it("Returns only hours when minutes are 0", () => {
      expect(getDecimalHoursInHourAndMinutes(1.001)).toEqual(
        "1hr"
      );
    });
  });
  
});