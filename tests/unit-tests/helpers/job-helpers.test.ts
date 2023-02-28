import { FIXED_TERM_CONTRACT_STRING, FIXED_TERM_CONTRACT_WITH_END_DATE_STRING, getScheduleDuration, PERMANENT_CONTRACT_STRING } from "../../../src/helpers/job-helpers";

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

describe("job-helpers.ts", () => {
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
