import { getScheduleInUKFormat } from "../../../src/helpers/schedule-helper";
import { HVH_LOCALE } from "../../../src/utils/constants/common";
import { Locale } from "../../../src/utils/types/common";
import { TEST_SCHEDULE } from "../../test-utils/test-data";

describe("schedule-helpers", () => {
  
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