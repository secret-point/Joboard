import React from "react";
import { shallow } from "enzyme";
import routeData from "react-router";
import { FcraDisclosure } from "../../../../../src/components/common/bgc/FcraDisclosure";
import {
  TEST_APPLICATION_ID,
  TEST_APPLICATION_STATE,
  TEST_BGC_STATE,
  TEST_JOB_ID,
  TEST_JOB_STATE,
  TEST_SCHEDULE_ID,
  TEST_SCHEDULE_STATE
} from "../../../../test-utils/test-data";

describe("FcraDisclosure", () => {
  const mockLocation = {
    pathname: "/bgc/fcra",
    search: `?jobId=${TEST_JOB_ID}&applicationId=${TEST_APPLICATION_ID}&scheduleId=${TEST_SCHEDULE_ID}`,
    hash: "",
    state: null
  };
  it("should match snapshot", () => {
    jest.spyOn(routeData, "useLocation").mockReturnValue(mockLocation);

    const shallowWrapper = shallow(
      <FcraDisclosure
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
        bgc={TEST_BGC_STATE}
      />
    );

    expect(shallowWrapper).toMatchSnapshot();
  });
});
