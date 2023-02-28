import { get12hrTimeStringLocalized, getLocalizedDateFormat, getLocalizedTimeFormat, getLocalizedDate, getLocalizedTime, getLocalizedTimezone } from "../../../src/helpers/localization-helpers";
import { log } from "../../../src/helpers/log-helper";
import { DEFAULT_OUTPUT_DATE_FORMAT, DEFAULT_OUTPUT_TIME_FORMAT, HVH_LOCALE } from "../../../src/utils/constants/common";
import { Locale } from "../../../src/utils/types/common";

jest.mock("../../../src/helpers/log-helper", () => {
  const originalModule = jest.requireActual("../../../src/helpers/log-helper");

  return {
    __esModule: true,
    ...originalModule,
    log: jest.fn()
  };
});

describe("localization-helper functions", () => {

  const setLocaleToCookies = (locale: string) => Object.defineProperty(window.document, "cookie", {
    writable: true,
    value: `${HVH_LOCALE}=${locale}`,
  }); 

  afterEach(() => {
    setLocaleToCookies("");
    jest.resetAllMocks();
  });

  const INVALID_LOCALE = "nope";
  const VALID_SCHEDULE_TEXT = "Mon, Tue, Wed 10:00am - 01:00pm";
  const NOTHING_TO_TRANSFORM = "example of nothing to trasnform";

  const US_SCHEDULE_TEXT = "Mon, Tue, Wed 10:00 AM - 1:00 PM";
  const GB_SCHEDULE_TEXT = "Mon, Tue, Wed 10:00 - 13:00";

  const INVALID_INPUT_TIME = "10:98PM";
  const VALID_INPUT_TIME = "01:30pm";

  const INVALID_INPUT_DATE = "200-200-12";
  const DEFAULT_INPUT_DATE = "2021-10-17";
  const US_OUTPUT_DATE = "Oct 17, 2021";
  const US_OUTPUT_TIME = "1:30 PM";

  const UK_OUTPUT_DATE = "Sunday, 17 Oct 2021";
  const UK_OUTPUT_TIME = "13:30";

  const DEFAULT_OUTPUT_DATE = US_OUTPUT_DATE;

  it("returns the string with 12hrs format text in the localised format", () => {
    
    const USLocalizedScheduleText = get12hrTimeStringLocalized(
      VALID_SCHEDULE_TEXT,
    );

    setLocaleToCookies(Locale.enGB);

    const GBLocalizedScheduleText = get12hrTimeStringLocalized(
      VALID_SCHEDULE_TEXT
    );

    const randomString = get12hrTimeStringLocalized(
      NOTHING_TO_TRANSFORM,
    );

    const withInvalidTimeString = get12hrTimeStringLocalized(
      INVALID_INPUT_TIME
    );

    expect(USLocalizedScheduleText).toBe(US_SCHEDULE_TEXT);
    expect(GBLocalizedScheduleText).toBe(GB_SCHEDULE_TEXT);
    expect(randomString).toBe(NOTHING_TO_TRANSFORM);

    expect(withInvalidTimeString).toBe(INVALID_INPUT_TIME);
  });

  it("returns the right date format according to the locale", () => {

    const defaultDateFormatIfLocaleInvalid = getLocalizedDateFormat("ar-LB" as Locale);

    expect(defaultDateFormatIfLocaleInvalid).toEqual(
      DEFAULT_OUTPUT_DATE_FORMAT
    );
    expect(getLocalizedDateFormat(Locale.enGB)).toEqual("dddd, D MMM YYYY");
  });

  it("returns the right time format according to the locale", () => {
    const defaultFormatIfLocaleInvalid = getLocalizedTimeFormat(INVALID_LOCALE as Locale);

    expect(defaultFormatIfLocaleInvalid).toEqual(
      DEFAULT_OUTPUT_TIME_FORMAT
    );

    expect(getLocalizedTimeFormat(Locale.enUS)).toEqual("h:mm A");
  });

  it("getLocalizedDate() returns the localized DATE according to the locale", () => {

    setLocaleToCookies(Locale.enGB);
    const ukDate = getLocalizedDate(DEFAULT_INPUT_DATE);
    expect(ukDate).toEqual(UK_OUTPUT_DATE);

    // For an undefined locale, return the same string
    setLocaleToCookies("ar-LB");
    const lebanseseDate = getLocalizedDate(DEFAULT_INPUT_DATE, "ar-LB");
    expect(lebanseseDate).toEqual(DEFAULT_INPUT_DATE);

    setLocaleToCookies("");
    const differentInputFormat = getLocalizedDate(
      "17/10/2021",
      "DD/MM/YYYY"
    );
    expect(differentInputFormat).toEqual("Oct 17, 2021");

    const withInvalidLocale = getLocalizedDate(DEFAULT_INPUT_DATE);
    expect(withInvalidLocale).toEqual(DEFAULT_OUTPUT_DATE);

    expect(log).toHaveBeenCalled();

    const withInvalidString = getLocalizedDate(
      INVALID_INPUT_DATE,
      Locale.enGB
    );
    expect(withInvalidString).toEqual(INVALID_INPUT_DATE);
    expect(log).toHaveBeenCalled();
    expect(log).toHaveBeenCalledWith(
      "Invalid date string, returning the original string instead:",
      INVALID_INPUT_DATE
    );
  });

  it("getLocalizedTime() returns the localized TIME according to the locale", () => {
    setLocaleToCookies(Locale.enGB);
    const ukTime = getLocalizedTime(VALID_INPUT_TIME);
    expect(ukTime).toEqual(UK_OUTPUT_TIME);
    
    setLocaleToCookies("ar-LB");
    const lebanseseTime = getLocalizedTime(VALID_INPUT_TIME, "ar-LB");

    expect(lebanseseTime).toEqual(VALID_INPUT_TIME);

    setLocaleToCookies("");
    const withInvalidLocale = getLocalizedTime(
      VALID_INPUT_TIME
    );
    expect(withInvalidLocale).toEqual(US_OUTPUT_TIME);

    const differentInputFormat = getLocalizedTime(
      "13:30",
      "HH:mm"
    );
    expect(differentInputFormat).toEqual(US_OUTPUT_TIME);
  });
 
  it("getLocalizedTimezone() returns the timezone according to the locale", () => {
    expect(getLocalizedTimezone(Locale.enGB)).toEqual("Europe/London");
    expect(getLocalizedTimezone("invalid" as Locale)).toEqual("GMT");
  });
});
