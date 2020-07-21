import moment from "moment";
import isEmpty from "lodash/isEmpty";
import isBoolean from "lodash/isBoolean";

export const covertValueTo = (type: string, value: any) => {
  switch (type) {
    case "BOOL_TO_STRING": {
      if (isBoolean(value)) {
        return value ? "yes" : "no";
      } else {
        return value;
      }
    }
    case "DATE_TO_STRING": {
      return isEmpty(value)
        ? value
        : moment(value)
            .utc()
            .format("YYYY-MM-DD");
    }
    default:
      return value;
  }
};

export const validation = (value: any, type: string) => {
  switch (type) {
    case "SSN": {
      //9 digit number, in format xxx-xx-xxxx
      const regex = new RegExp(
        /^(?!000|666)[0-8][0-9]{2}(?!00)[0-9]{2}(?!0000)[0-9]{4}$/
      );
      return regex.test(value);
    }
    case "ZIPCODE": {
      //5 digit number, eg 20171 or 20171-4567
      const regex = new RegExp(/^[0-9]{5}(?:-[0-9]{4})?$/);
      return regex.test(value);
    }
    case "DATE_OF_BIRTH": {
      //According to SF rule: DoB should not be within 10 yrs: today - 10 years.
      let tenYearsFromNow = moment()
        .utc()
        .subtract(18, "years");
      if (moment(value).utc() <= tenYearsFromNow) {
        return true;
      } else {
        return false;
      }
    }
  }
};
