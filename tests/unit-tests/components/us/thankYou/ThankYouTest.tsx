import * as React from "react";
import { shallow } from "enzyme";
import { useLocation } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { mapStateToProps, ThankYou } from "../../../../../src/components/us/thankYou/ThankYou";
import * as helper from "../../../../../src/utils/helper";
import { CountryCode } from "../../../../../src/utils/enums/common";
import * as boundUi from "../../../../../src/actions/UiActions/boundUi";
import {
  TEST_APPLICATION_ID,
  TEST_APPLICATION_STATE,
  TEST_CANDIDATE_STATE,
  TEST_JOB_ID,
  TEST_JOB_STATE,
  TEST_SCHEDULE_ID,
  TEST_SCHEDULE_STATE,
  TEST_THANK_YOU_STATE
} from "../../../../test-utils/test-data";

describe("ThankYou", () => {
  const mockLocation = {
    pathname: "/thank-you",
    search: `?jobId=${TEST_JOB_ID}&applicationId=${TEST_APPLICATION_ID}&scheduleId=${TEST_SCHEDULE_ID}`,
    hash: '',
    state: null
  };
  const mockUseLocation = useLocation as jest.Mock;
  mockUseLocation.mockReturnValue(mockLocation);

  // Unit test can't get Katal {{Country}} development value.
  const mockGetCountryCode = jest.spyOn(helper, 'getCountryCode')
  mockGetCountryCode.mockReturnValue(CountryCode.US);


  it("should match snapshot", () => {
    const shallowWrapper = shallow(
      <ThankYou
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
        thankYou={TEST_THANK_YOU_STATE}
      />);

    expect(shallowWrapper).toMatchSnapshot();
  });

  it("should call boundResetBannerMessage", () => {
    const shallowWrapper = shallow(
      <ThankYou
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
        thankYou={TEST_THANK_YOU_STATE}
      />);

    const spy = jest.spyOn(boundUi, 'boundResetBannerMessage');

    const debouncedButton = shallowWrapper.find('DebouncedButton').first();

    act(() => {
      debouncedButton.simulate('click');
    });

    expect(spy).toHaveBeenCalled();
  });

  it("should update referralId", () => {

    const spy = jest.spyOn(helper, "validateUserIdFormat");

    const wrapper = shallow(
      <ThankYou
        candidate={TEST_CANDIDATE_STATE}
        job={TEST_JOB_STATE}
        application={TEST_APPLICATION_STATE}
        schedule={TEST_SCHEDULE_STATE}
        thankYou={TEST_THANK_YOU_STATE}
      />);

    const detailedRadio = wrapper.find('DetailedRadio').first();
    detailedRadio.simulate('change', { target: { value: true } });
   
    const formInputText = wrapper.find('FormInputText').first();
    formInputText.prop('handleChange')({ target: { value: 'REF_001' } })
    
    const debouncedButton = wrapper.find('DebouncedButton').first();
    debouncedButton.simulate('click');
    
    expect(spy).toHaveBeenCalledWith('REF_001');
  });

  it("should match", () => {
    const thankYouProps = {
      candidate: TEST_CANDIDATE_STATE,
      job: TEST_JOB_STATE,
      application: TEST_APPLICATION_STATE,
      schedule: TEST_SCHEDULE_STATE,
      thankYou: TEST_THANK_YOU_STATE
    };
    expect(mapStateToProps(thankYouProps)).toEqual(thankYouProps);
  });
});
