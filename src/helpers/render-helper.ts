import moment from "moment";
import isEmpty from "lodash/isEmpty";

export const covertValueTo = (type: string, value: any) => {
  switch (type) {
    case "BOOL_TO_STRING": {
      if (!isEmpty(value)) {
        return value ? "yes" : "no";
      } else {
        return value;
      }
    }
    case "DATE_TO_STRING": {
      return isEmpty(value) ? value : moment(value).format("YYYY-MM-DD");
    }
    default:
      return value;
  }
};
