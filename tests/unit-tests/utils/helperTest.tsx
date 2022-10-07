import Cookies from "js-cookie";
import {
  AWAIT_TIMEOUT,
  awaitWithTimeout,
  formatFlexibleTrainingDate,
  getCountryCodeByCountryName,
  processAssessmentUrl
} from "../../../src/utils/helper";
import { TEST_APPLICATION_ID, TEST_ASSESSMENT_URL, TEST_JOB_ID } from "../../test-utils/test-data";

describe('processAssessmentUrl', () => {
  const locale = 'en-US';

  beforeEach(() => {
    Cookies.get = jest.fn().mockImplementationOnce(() => locale);
  });

  it('should return empty string if assessment url is empty', () => {
    const url = processAssessmentUrl("", TEST_APPLICATION_ID, TEST_JOB_ID);
    expect(url).toBe("");
  });

  it('should return the correct assessment url', () => {
    const url = processAssessmentUrl(TEST_ASSESSMENT_URL, TEST_APPLICATION_ID, TEST_JOB_ID);

    const redirectStr = `applicationId=${TEST_APPLICATION_ID}&jobId=${TEST_JOB_ID}`;
    expect(url).toEqual(`${TEST_ASSESSMENT_URL}?locale=${locale}&redirect=${encodeURIComponent(redirectStr)}`);
  });

  it('should return the correct assessment url with 3rd party query param', () => {
    const thridPartyQueryParam = 'cmpid=cpm-test-id&tid=t-test-id';
    window.location.hash = `#/test-page-name?${thridPartyQueryParam}&no_3rd_party=test`;
    const testUrl = `${TEST_ASSESSMENT_URL}`;
    const url = processAssessmentUrl(testUrl, TEST_APPLICATION_ID, TEST_JOB_ID);

    const redirectStr = `applicationId=${TEST_APPLICATION_ID}&jobId=${TEST_JOB_ID}&${thridPartyQueryParam}`;
    expect(url).toEqual(`${TEST_ASSESSMENT_URL}?locale=${locale}&redirect=${encodeURIComponent(redirectStr)}`);
  });
});

test("getCountryCodeByCountryName", () => {
  expect(getCountryCodeByCountryName("")).toEqual("");
  expect(getCountryCodeByCountryName("United States")).toEqual("US");
  expect(getCountryCodeByCountryName("custom")).toEqual("");
});

describe('awaitWithTimeout', () => {
  let promise: Promise<any>;

  beforeEach(() => {
    promise = new Promise((res) => setTimeout(() => res('result'), 100));
  });

  it('should return promise result if not timeout', async () => {
    const res = await awaitWithTimeout(promise, 1000);
    expect(res).toEqual('result');
  });

  it('should throw timeout error if timeout', async () => {
    await expect(awaitWithTimeout(promise, 10))
      .rejects
      .toThrow(AWAIT_TIMEOUT);
  });

  it('should not throw timeout error if suppressed', async () => {
    await expect(awaitWithTimeout(promise, 10, true))
      .resolves
      .toBeUndefined();
  });
});

describe("formatFlexibleTrainingDate", () => {
  expect(formatFlexibleTrainingDate("2022-10-10 3:30 AM - 8:30 AM")).toEqual("Oct 10, 2022 03:30 AM - 08:30 AM");
  expect(formatFlexibleTrainingDate("2022-10-11 8:30 PM - 9:30 PM")).toEqual("Oct 11, 2022 08:30 PM - 09:30 PM");
  expect(formatFlexibleTrainingDate("2022-10-11 10:30 PM - 11:30 PM")).toEqual("Oct 11, 2022 10:30 PM - 11:30 PM");
  expect(formatFlexibleTrainingDate("")).toEqual("");
  expect(formatFlexibleTrainingDate("2022-10-1 8:30 PM - 9:30 PM")).toEqual("");
  expect(formatFlexibleTrainingDate("2022-10-1 8:30 PM 9:30 PM")).toEqual("");
  expect(formatFlexibleTrainingDate("2022-10-1")).toEqual("");
  expect(formatFlexibleTrainingDate("8:30 PM 9:30 PM")).toEqual("");
  expect(formatFlexibleTrainingDate("8:30 PM - 9:30 PM")).toEqual("");
})
