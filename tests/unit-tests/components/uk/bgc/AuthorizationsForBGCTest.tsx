import React from "react";
import { shallow } from "enzyme";
import { AuthorizationForBGC } from "../../../../../src/components/uk/bgc/AuthorizationsForBGC";
import { TEST_APPLICATION_STATE, TEST_BGC_STATE, TEST_JOB_STATE, TEST_SCHEDULE_STATE } from "../../../../test-utils/test-data";

describe("AuthorizationsForBGC", () => {
  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <AuthorizationForBGC
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
        bgc={TEST_BGC_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
