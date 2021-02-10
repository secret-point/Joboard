import moment from "moment";
import isEmpty from "lodash/isEmpty";
import isBoolean from "lodash/isBoolean";
import includes from "lodash/includes";

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

export const validation = (
  value: any,
  type: string,
  isOptional?: boolean,
  validationProps?: any
) => {
  switch (type) {
    case "SSN": {
      if (value && value.includes("*")) {
        var reg = new RegExp(/[*]{5}\d{4}$/);
        return reg.test(value);
      }
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
    case "LEGAL_NAME": {
      if (!value) {
        return true;
      } else {
        const stringArray = value.split(" ");
        const hasEmptyString = includes(stringArray, "");
        if (stringArray.length === 2 && !hasEmptyString) {
          return true;
        } else {
          return false;
        }
      }
    }
    case "REGEX": {
      if (isOptional && !value) {
        return true;
      } else {
        const { regex } = validationProps;
        if (regex) {
          const decodeRegex = decodeURI(regex);
          const regExp = new RegExp(decodeRegex);
          return regExp.test(value);
        } else {
          return true;
        }
      }
    }
    case "AT_LEAST_ONE": {
      if (value && value.length > 0) {
        let oneChecked = false;
        value.forEach((item: { checked: boolean }) => {
          if (item.checked) {
            oneChecked = true;
          }
        });
        return oneChecked;
      } else {
        return false;
      }
    }
    default: {
      console.log("Missing validation type");
      return true;
    }
  }
};
