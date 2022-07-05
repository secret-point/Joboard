import { CREATE_APPLICATION_ERROR_CODE } from "../enums/common";

export const CreateApplicationErrorMessage: {[key: string]: string} = {
  [CREATE_APPLICATION_ERROR_CODE.APPLICATION_ALREADY_EXIST]: "Sorry, you have already applied for this job!",
  "DEFAULT": "Unable to create application."
}