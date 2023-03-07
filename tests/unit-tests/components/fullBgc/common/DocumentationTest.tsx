import React from "react";
import { shallow } from "enzyme";
import { Documentation } from "../../../../../src/components/fullBgc/common/Documentation";
import { TEST_APPLICATION_STATE, TEST_FULL_BGC_STATE, TEST_JOB_STATE, TEST_SCHEDULE_STATE } from "../../../../test-utils/test-data";

describe("Documentation", () => {

  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <Documentation
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
        fullBgc={TEST_FULL_BGC_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
