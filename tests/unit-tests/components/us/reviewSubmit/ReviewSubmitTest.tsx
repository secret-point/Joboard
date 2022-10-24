import React from "react";
import { shallow } from "enzyme";
import { useLocation } from 'react-router-dom';
import { ReviewSubmit } from "../../../../../src/components/us/reviewSubmit/ReviewSubmit";
import { TEST_APPLICATION_ID, TEST_APPLICATION_STATE, TEST_CANDIDATE_STATE, TEST_JOB_ID, TEST_JOB_STATE, TEST_SCHEDULE_ID, TEST_SCHEDULE_STATE } from "../../../../test-utils/test-data";
import { act } from "react-dom/test-utils";
import * as boundUi from "../../../../../src/actions/UiActions/boundUi";
import * as workflowActions from "../../../../../src/actions/WorkflowActions/workflowActions";
import { CountryCode } from "../../../../../src/utils/enums/common";
import * as utilHelpers from "../../../../../src/utils/helper";

const getCountryCodeSpy = jest.spyOn(utilHelpers, "getCountryCode");

describe("ReviewSubmit", () => {
  const mockLocation = {
    pathname: "/review-submit",
    search: `?jobId=${TEST_JOB_ID}&applicationId=${TEST_APPLICATION_ID}&scheduleId=${TEST_SCHEDULE_ID}`,
    hash: '',
    state: null
  };

  beforeEach(() => {
    getCountryCodeSpy.mockReturnValue(CountryCode.US);
  })

  const mockUseLocation = useLocation as jest.Mock;
  mockUseLocation.mockReturnValue(mockLocation);

  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <ReviewSubmit
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });

  it("should call boundResetBannerMessage", () => {
    const shallowWrapper = shallow(
      <ReviewSubmit
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
      />);

    const spy = jest.spyOn(boundUi, 'boundResetBannerMessage');

    const submitButton = shallowWrapper.find('DebouncedButton').first();

    act(() => {
      submitButton.simulate('click');
    })

    expect(spy).toHaveBeenCalled();
  });

  it("should call boundResetBannerMessage", () => {
    const shallowWrapper = shallow(
      <ReviewSubmit
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
      />);

    const spy = jest.spyOn(workflowActions, 'onCompleteTaskHelper');

    const editButtons = shallowWrapper.find('Button');

    act(() => {
      editButtons.forEach(button => button.simulate('click'));
    })

    expect(spy).toHaveBeenCalledTimes(editButtons.length);
  });
});

