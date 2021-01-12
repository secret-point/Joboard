import AppReducers from "../app-reducer";
import { LOAD_INIT_DATA } from "../../actions";
import { UPDATE_VALUE_CHANGE, ON_UPDATE_PAGE_ID } from "../../actions/actions";
import {
  ON_RESPONSE_ERROR,
  ON_REMOVE_ERROR
} from "../../actions/error-actions";
import { GET_REQUISITION_HEADER_INFO } from "../../actions/requisition-actions";

let state: any = {};

describe("Test App Reducer", () => {
  test("tests for LOAD_INIT_DATA", () => {
    state = AppReducers(undefined, {
      type: LOAD_INIT_DATA,
      payload: [
        {
          authenticationURL: "http://auth-url"
        },
        {
          pageOrder: [
            {
              id: "consent"
            },
            {
              id: "bgc"
            }
          ]
        }
      ]
    });

    expect(state.pageOrder.length).toBe(2);
    expect(state.appConfig.authenticationURL).toBe("http://auth-url");
  });

  test("tests for ON_UPDATE_PAGE_ID", () => {
    state = AppReducers(state, {
      type: UPDATE_VALUE_CHANGE,
      payload: {
        keyName: "sample",
        pageId: "consent",
        value: "value"
      }
    });

    expect(state.data.output.consent.sample).toBe("value");
  });

  test("tests for ON_UPDATE_PAGE_ID", () => {
    state = AppReducers(state, {
      type: ON_UPDATE_PAGE_ID,
      payload: {
        updatedPageId: "consent",
        page: {
          pageConfig: {
            id: "consent"
          }
        }
      }
    });

    expect(state.currentPage.id).toBe("consent");
    expect(state.nextPage.id).toBe("bgc");
  });

  test("tests for ON_RESPONSE_ERROR", () => {
    state = AppReducers(state, {
      type: ON_RESPONSE_ERROR,
      payload: {
        errorMessage: "Sample Error"
      }
    });

    expect(state.errorMessage).toBe("Sample Error");
    expect(state.hasResponseError).toBe(true);
  });

  test("tests for ON_REMOVE_ERROR", () => {
    state = AppReducers(state, {
      type: ON_REMOVE_ERROR,
      payload: {
        errorMessage: "Sample Error"
      }
    });

    expect(state.errorMessage).toBe(null);
    expect(state.hasResponseError).toBe(false);
  });

  test("tests for GET_REQUISITION_HEADER_INFO", () => {
    state = AppReducers(state, {
      type: GET_REQUISITION_HEADER_INFO,
      payload: {
        requisitionId: "123123",
        jobTitle: "Sample Title",
        questions: ["Sample Questions"],
        locationCode: "1198",
        requisitionStatus: "XX",
        requisitionType: "YY",
        isCandidatePreferencesEnabled: true
      }
    });

    expect(state.data.requisition.consentInfo.requisitionId).toBe("123123");
    expect(state.data.requisition.consentInfo.jobTitle).toBe("Sample Title");
    expect(state.data.requisition.consentInfo.locationCode).toBe("1198");
    expect(state.data.requisition.consentInfo.requisitionStatus).toBe("XX");
    expect(state.data.requisition.consentInfo.requisitionType).toBe("YY");
    expect(
      state.data.requisition.consentInfo.isCandidatePreferencesEnabled
    ).toBe(true);

    expect(state.data.requisition.consentInfo.questions.length).toBe(1);
    expect(state.data.requisition.consentInfo.questions[0]).toBe(
      "Sample Questions"
    );
  });
});
