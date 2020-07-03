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
