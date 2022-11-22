import React from "react";
import { shallow } from "enzyme";
import { AdditionalBGCInfo } from "../../../../../src/components/common/bgc/AdditionalBGCInfo";
import {
  TEST_APPLICATION_STATE,
  TEST_APP_CONFIG,
  TEST_BGC_STATE,
  TEST_CANDIDATE_STATE,
  TEST_JOB_STATE,
  TEST_SCHEDULE_STATE,
  TEST_CANDIDATE
} from "../../../../test-utils/test-data";
import * as utilHelper from "../../../../../src/utils/helper";

const shouldPrefillAdditionalBgcInfoSpy = jest.spyOn(utilHelper, "shouldPrefillAdditionalBgcInfo");

describe("AdditionalBGCInfo", () => {

  beforeEach(() => {
    shouldPrefillAdditionalBgcInfoSpy.mockReset();
  })

  it("should match snapshot - if address country is USA", () => {
    shouldPrefillAdditionalBgcInfoSpy.mockReturnValue(true);

    const shallowWrapper = shallow(
      <AdditionalBGCInfo
        candidate={{
          ...TEST_CANDIDATE_STATE,
          candidatePatchRequest: {
            additionalBackgroundInfo: TEST_CANDIDATE.additionalBackgroundInfo
          }
        }}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
        appConfig={TEST_APP_CONFIG}
        bgc={TEST_BGC_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });

  it("should match snapshot - if address country is Canada", () => {
    shouldPrefillAdditionalBgcInfoSpy.mockReturnValue(false);

    const shallowWrapper = shallow(
      <AdditionalBGCInfo
        candidate={
          {
            ...TEST_CANDIDATE_STATE,
            candidatePatchRequest: {
              additionalBackgroundInfo: TEST_CANDIDATE.additionalBackgroundInfo
            }
          }
        }
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
        appConfig={TEST_APP_CONFIG}
        bgc={TEST_BGC_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
