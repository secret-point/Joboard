import React from "react";
import { shallow } from "enzyme";
import { useLocation } from 'react-router-dom';
import { PreConsent } from "../../../../../src/components/us/preConsent/PreConsent";
import { TEST_JOB_ID, TEST_JOB_STATE } from "../../../../test-utils/test-data";

describe("PreConsent", () => {
  const mockLocation = {
    pathname: "/pre-consent",
    search: `?jobId=${TEST_JOB_ID}}`,
    hash: '',
    state: null
  };
  const mockUseLocation = useLocation as jest.Mock;
  mockUseLocation.mockReturnValue(mockLocation);

  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <PreConsent
        job={TEST_JOB_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });
});
