import React from "react";
import { shallow } from "enzyme";
import { NonFcraDisclosure } from "../../../../../src/components/common/bgc/NonFcraDisclosure";
import { TEST_APPLICATION_STATE, TEST_BGC_STATE, TEST_JOB_STATE, TEST_SCHEDULE_STATE } from "../../../../test-utils/test-data";

describe("NonFcraDisclosure", () => {

  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <NonFcraDisclosure
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
        bgc={TEST_BGC_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
