import { ofType } from "redux-observable";
import { from, Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/internal/operators";
import {
  actionValidateAmazonLoginIdFailed,
  actionValidateAmazonLoginIdSuccess
} from "../actions/ThankYouActions/thankYouActions";
import { THANK_YOU_ACTION_TYPES, ValidateAmamzonLoginIDAction } from "../actions/ThankYouActions/thankYouActionTypes";
import BBServiceIntegrationService from "../services/bb-service-integtation-service";
import { ValidateAmazonLoginIDErrorMessages } from "../utils/api/errorMessages";
import { VALIDATE_AMAZON_LOGIN_ID_ERROR_CODE } from "../utils/enums/common";
import { epicSwitchMapHelper } from "./helper";

export const ValidateAmazonLoginIDEpic = (action$: Observable<any>) => {
  return action$.pipe(
    ofType(THANK_YOU_ACTION_TYPES.VALIDATE_AMAZON_LOGIN_ID),
    switchMap((action: ValidateAmamzonLoginIDAction) =>
      from(new BBServiceIntegrationService().validateAmazonLoginId(action.payload.loginId))
        .pipe(
          switchMap(epicSwitchMapHelper),
          switchMap(async (response) => {
            return response;
          }),
          map(() => {
            if (action.onSuccess) {
              action.onSuccess();
            }
            return actionValidateAmazonLoginIdSuccess();
          }),
          catchError((error: any) => {
            const errorCode = ValidateAmazonLoginIDErrorMessages[error.errorCode] ?
              error.errorCode : VALIDATE_AMAZON_LOGIN_ID_ERROR_CODE.REFERRAL_VALIDATION_ERROR;
            if (action.onError) {
              action.onError(errorCode);
            }
            return of(actionValidateAmazonLoginIdFailed());
          })
        )
    )
  );
};
