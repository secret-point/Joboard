import { getScheduleInUKFormat, FIXED_TERM_CONTRACT_STRING, FIXED_TERM_CONTRACT_WITH_END_DATE_STRING, getScheduleDuration, PERMANENT_CONTRACT_STRING } from "../../../src/helpers/schedule-helper";
import { HVH_LOCALE } from "../../../src/utils/constants/common";
import { Locale } from "../../../src/utils/types/common";
import { TEST_SCHEDULE } from "../../test-utils/test-data";

const sheduleWithEndDateRegular = {
  employmentType: "Regular",
  hireEndDate: "2022-12-31",
  scheduleId: "JOB-123"
};
const sheduleWithoutEndDateRegular = {
  ...sheduleWithEndDateRegular,
  hireEndDate: null
};
const sheduleWithEndDateSeasonal = {
  employmentType: "Seasonal",
  hireEndDate: "2022-12-31",
  scheduleId: "JOB-123"
};
const sheduleWithoutEndDateSeasonal = {
  ...sheduleWithEndDateSeasonal,
  hireEndDate: null
};

describe("schedule-helpers", () => {

  describe("getScheduleDuration", () => {
    test("Calculating the duration when Employment type is regular plus different variations of schedule  ", () => {
      const withEndDate = getScheduleDuration(sheduleWithEndDateRegular);
      expect(withEndDate).toContain(FIXED_TERM_CONTRACT_WITH_END_DATE_STRING);
  
      const withOutEndDate = getScheduleDuration(sheduleWithoutEndDateRegular);
      expect(withOutEndDate).toBe(PERMANENT_CONTRACT_STRING);
    });
    test("Calculating the duration when Employment type is Seasonal plus different variations of schedule  ", () => {
      const withEndDate = getScheduleDuration(sheduleWithEndDateSeasonal);
      expect(withEndDate).toBe(null);
  
      const withOutEndDate = getScheduleDuration(sheduleWithoutEndDateSeasonal);
      expect(withOutEndDate).toBe(FIXED_TERM_CONTRACT_STRING);
    });
  });

  describe("getScheduleInUKFormat", () => {
  
    const setLocaleToCookies = (locale: string) => Object.defineProperty(window.document, "cookie", {
      writable: true,
      value: `${HVH_LOCALE}=${locale}`,
    }); 

    test("getScheduleInUKFormat", () => {

      const scheduleData = {
        ...TEST_SCHEDULE, 
        hireEndDate: "2022-10-12"
      };
      setLocaleToCookies(Locale.enGB);
      const schedule = getScheduleInUKFormat(scheduleData);

      expect(schedule.duration).toBeDefined();
      expect(schedule.hireEndDate).toBe("Wednesday, 12 Oct 2022");

      expect(schedule.displayHireEndDate).toBeFalsy();
      expect(schedule.displayEmploymentType).toBeDefined();

    }); 
  });

});