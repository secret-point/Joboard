import React from "react";
import { shallow } from "enzyme";
import { useLocation } from "react-router-dom";
import { Nhe } from "../../../../../src/components/uk/nhe/Nhe";
import {
  TEST_APPLICATION_ID,
  TEST_APPLICATION_STATE,
  TEST_CANDIDATE_STATE,
  TEST_JOB_ID,
  TEST_JOB_STATE,
  TEST_NHE_DATA_UK,
  TEST_NHE_STATE,
  TEST_SCHEDULE_ID,
  TEST_SCHEDULE_STATE,
  TestPossibleNheDates,
  TestSavePossibleNheDateRequest
} from "../../../../test-utils/test-data";

describe("Nhe", () => {
  const mockLocation = {
    pathname: "/nhe",
    search: `?jobId=${TEST_JOB_ID}&applicationId=${TEST_APPLICATION_ID}&scheduleId=${TEST_SCHEDULE_ID}`,
    hash: "",
    state: null
  };
  const mockUseLocation = useLocation as jest.Mock;
  mockUseLocation.mockReturnValue(mockLocation);

  it("should match snapshot with NHE Preference Card", () => {
    const shallowWrapper = shallow(
      <Nhe
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
        nhe={{
          ...TEST_NHE_STATE,
          results: {
            nheData: TEST_NHE_DATA_UK,
            possibleNhePreferences: TestPossibleNheDates
          },
          nhePreferenceRequest: TestSavePossibleNheDateRequest
        }
        }
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
  it("should match snapshot without NHE Preference Card", () => {
    const shallowWrapper = shallow(
      <Nhe
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
        nhe={{
          ...TEST_NHE_STATE,
          results: {
            nheData: TEST_NHE_DATA_UK.splice(0, 2),
            possibleNhePreferences: TestPossibleNheDates
          },
          nhePreferenceRequest: TestSavePossibleNheDateRequest
        }
        }
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
