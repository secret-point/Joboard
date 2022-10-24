import Cookies from "js-cookie";
import {
  AWAIT_TIMEOUT,
  awaitWithTimeout,
  checkAndBoundGetApplication,
  formatFlexibleTrainingDate,
  formatMonthlyBasePayHelper,
  getCountryCodeByCountryName,
  getKeyMapFromDetailedRadioItemList,
  isAdditionalBgcInfoValid,
  isAddressValid,
  isI18nSelectOption,
  isNewBBuiPath,
  isSelfIdentificationInfoValid,
  isSelfIdentificationInfoValidBeforeDisability,
  parseQueryParamsArrayToSingleItem,
  processAssessmentUrl,
  reverseMappingTranslate,
  setEpicApiCallErrorMessage,
  showErrorMessage
} from "../../../src/utils/helper";
import { MX_SelfIdPronounsItems, newBBUIPathName, SelfIdGenderRadioItems } from "../../../src/utils/constants/common";
import * as boundUi from "../../../src/actions//UiActions/boundUi";
import * as boundApplicationActions from "../../../src/actions/ApplicationActions/boundApplicationActions";
import {
  TEST_APPLICATION_ID,
  TEST_ASSESSMENT_URL,
  TEST_BACKGROUND_INFO,
  TEST_CANDIDATE_ADDRESS,
  TEST_JOB_ID,
  TEST_SELF_IDENTIFICATION
} from "../../test-utils/test-data";
import { CountryCode } from "../../../src/utils/enums/common";

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
});

describe("formatMonthlyBasePayHelper", ()=>{

  it("should return correct format with no decimals", ()=>{
    expect(formatMonthlyBasePayHelper(55, 'USD')).toEqual('$55');
  });

  it("should return correct format with decimals", ()=>{
    expect(formatMonthlyBasePayHelper(40.10, 'USD')).toEqual('$40.10');
  });

  it("should return null", ()=>{
    expect(formatMonthlyBasePayHelper(null, 'USD')).toEqual(null);
    expect(formatMonthlyBasePayHelper(54)).toEqual(null);
    expect(formatMonthlyBasePayHelper()).toEqual(null);
  });
});

describe("parseQueryParamsArrayToSingleItem", ()=>{

  it("should parse query items to single param", ()=>{
    const queryParams = {
      "jobId": ["JOB-1234"],
      "requisitionId": "Req-000"
    };
    expect(parseQueryParamsArrayToSingleItem(queryParams)).toEqual({ jobId: 'JOB-1234', requisitionId: 'Req-000' });
  });
});

describe("showErrorMessage", ()=>{
  it("should call boundSetBannerMessage", ()=>{
    const spy = jest.spyOn(boundUi, 'boundSetBannerMessage');

    showErrorMessage({
      translationKey: "BB-websocket-error-message-internal-server-error",
      value: "Something went wrong with the websocket server. Please try again or refresh the browser.",
    });

    expect(spy).toHaveBeenCalled();
  });
});

describe("reverseMappingTranslate", ()=>{

  it("should return empty string with undefined or empty string passed", ()=>{
    expect(reverseMappingTranslate(undefined)).toEqual("");
    expect(reverseMappingTranslate("")).toEqual("");
  })

  it("should return empty string with invalid key", ()=>{
    expect(reverseMappingTranslate("test-key")).toEqual("");
  })

  it("should return correct value", ()=>{
    expect(reverseMappingTranslate("I choose not to self-identify", CountryCode.US)).toEqual("I choose not to self-identify");
    //TODO might need to update when translations come back
    expect(reverseMappingTranslate("She", CountryCode.MX)).toEqual("She");
  })
})

describe("checkAndBoundGetApplication", ()=>{
  it("should call boundGetApplication", ()=>{
    const spy = jest.spyOn(boundApplicationActions, "boundGetApplication");

    checkAndBoundGetApplication("TEST-ID-0001");

    expect(spy).toHaveBeenCalled();
  })
})

describe("isSelfIdentificationInfoValidBeforeDisability", ()=>{
  
  it("should return false", ()=>{
    expect(isSelfIdentificationInfoValidBeforeDisability()).toEqual(false)
  })

  it("should return true", ()=>{

    expect(isSelfIdentificationInfoValidBeforeDisability(TEST_SELF_IDENTIFICATION)).toEqual(true)
  })
})

describe("isSelfIdentificationInfoValid", ()=>{
  it("should return false", ()=>{
    expect(isSelfIdentificationInfoValid()).toEqual(false);
  })

  it("should return true", ()=>{
    expect(isSelfIdentificationInfoValid(TEST_SELF_IDENTIFICATION)).toEqual(true);
  })
})

describe("isAdditionalBgcInfoValid", ()=>{
  it("returns false", ()=>{
    expect(isAdditionalBgcInfoValid()).toEqual(false);
  })

  it("returns true", ()=>{
    expect(isAdditionalBgcInfoValid(TEST_BACKGROUND_INFO)).toEqual(true);
  })
});

describe("isAddressValid", ()=>{

  it("should return false", ()=>{
    expect(isAddressValid()).toEqual(false);
  })

  it("should return true", ()=>{
    expect(isAddressValid(TEST_CANDIDATE_ADDRESS)).toEqual(true);
  })
})

describe("isNewBBuiPath", ()=>{

  it("returns false", ()=>{
    expect(isNewBBuiPath("", newBBUIPathName.US )).toEqual(false);
  })

})

describe("isI18nSelectOption", ()=>{
  it("return true", ()=>{
    expect(isI18nSelectOption({translationKey: 'testkey', value: 'test', showValue: true})).toBeTruthy();
  })
})

describe("setEpicApiCallErrorMessage", ()=>{
  it("should call boundSetBannerMessage", ()=>{
    const spy = jest.spyOn(boundUi, 'boundSetBannerMessage');

    setEpicApiCallErrorMessage({
      translationKey: "BB-get-application-error-message-internal-server-error",
      value: "Something went wrong with the server. Please try again or refresh the browser."
    });

    expect(spy).toHaveBeenCalled()

  })
})

test("getKeyMapFromDetailedRadioItemList", () => {
  expect(getKeyMapFromDetailedRadioItemList(MX_SelfIdPronounsItems)).toEqual({
    "He": "BB-SelfId-equal-opportunity-form-pronoun-mx-he-title-text",
    "She": "BB-SelfId-equal-opportunity-form-pronoun-mx-she-title-text",
    "They": "BB-SelfId-equal-opportunity-form-pronoun-mx-they-title-text",
    "Other": "BB-SelfId-equal-opportunity-form-pronoun-mx-other-title-text",
    "Prefer not to say": "BB-SelfId-equal-opportunity-form-pronoun-mx-prefer-not-to-say-title-text"
  });

  expect(getKeyMapFromDetailedRadioItemList(SelfIdGenderRadioItems)).toEqual({
    "Male": "BB-SelfId-equal-opportunity-form-gender-male-text",
    "Female": "BB-SelfId-equal-opportunity-form-gender-female-text",
    "I choose not to self-identify": "BB-SelfId-equal-opportunity-form-gender-choose-not-to-identify-text"
  });
})