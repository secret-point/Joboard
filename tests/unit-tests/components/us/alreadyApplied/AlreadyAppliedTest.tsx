import React from "react";
import { shallow } from "enzyme";
import { useLocation } from "react-router-dom";
import { AlreadyApplied } from "../../../../../src/components/us/alreadyApplied/AlreadyApplied";
import store from "../../../../../src/store/store";
import {
  TEST_APPLICATION_STATE,
  TEST_JOB2_ID,
  TEST_JOB_STATE
} from "../../../../test-utils/test-data";
import { CREATE_APPLICATION_ERROR_CODE } from "../../../../../src/utils/enums/common";

describe("AlreadyApplied", () => {
  let state: any;
  store.getState = () => state;

  const mockLocation = {
    pathname: "/already-applied",
    search: `?jobId=${TEST_JOB2_ID}`,
    hash: '',
    state: null
  };
  const mockUseLocation = useLocation as jest.Mock;
  mockUseLocation.mockReturnValue(mockLocation);

  it("should match snapshot for APPLICATION_ALREADY_EXIST_CAN_BE_RESET", () => {
    const application = TEST_APPLICATION_STATE;
    application.errorCode = CREATE_APPLICATION_ERROR_CODE.APPLICATION_ALREADY_EXIST_CAN_BE_RESET
    const shallowWrapper = shallow(<AlreadyApplied application={application} job={TEST_JOB_STATE} />);

    expect(shallowWrapper).toMatchSnapshot();
  });

  it("should match snapshot for APPLICATION_ALREADY_EXIST", () => {
    const application = TEST_APPLICATION_STATE;
    application.errorCode = CREATE_APPLICATION_ERROR_CODE.APPLICATION_ALREADY_EXIST
    const shallowWrapper = shallow(<AlreadyApplied application={application} job={TEST_JOB_STATE} />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
