import moment from "moment";

export const covertValueTo = (type: string, value: any) => {
  switch (type) {
    case "BOOL_TO_STRING": {
      return value ? "yes" : "no";
    }
    case "DATE_TO_STRING": {
      return moment(value).format("YYYY-MM-DD");
    }
    default:
      return value;
  }
};
