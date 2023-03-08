import React from "react";
import { mountWithStencil } from "@amzn/stencil-react-components/tests";
import { ReactWrapper, shallow } from "enzyme";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { Router, useLocation } from "react-router-dom";
import store from "../../../../../src/store/store";
import {
  TEST_APP_CONFIG,
  TEST_APPLICATION_STATE,
  TEST_JOB2_ID,
  TEST_JOB_STATE,
  TEST_SCHEDULE_STATE
} from "../../../../test-utils/test-data";
import {
  AlreadyAppliedButCanBeReset
} from "../../../../../src/components/us/alreadyApplied/AlreadyAppliedButCanBeReset";

describe("AlreadyAppliedButCanBeReset", () => {
  const initStoreState = store.getState();
  let wrapper: ReactWrapper;
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

    beforeEach(() => {
      window.location.assign = jest.fn();

      state = {
        ...initStoreState,
        appConfig: {
          ...initStoreState.appConfig,
          results: {
            ...initStoreState.appConfig.results,
            envConfig: TEST_APP_CONFIG
          }
        }
      };

        const history = createMemoryHistory();
         history.location = {
           ...history.location,
           ...mockLocation
         };

         wrapper = mountWithStencil(
           <Provider store={store}>
             <Router history={history}>
               <AlreadyAppliedButCanBeReset application={TEST_APPLICATION_STATE} job={TEST_JOB_STATE} schedule={TEST_SCHEDULE_STATE} />
             </Router>
           </Provider>
         );
  });

  it("should match snapshot", () => {
    const shallowWrapper = shallow(<AlreadyAppliedButCanBeReset application={TEST_APPLICATION_STATE} job={TEST_JOB_STATE} schedule={TEST_SCHEDULE_STATE} />);

    expect(shallowWrapper).toMatchSnapshot();
  });

  it("should redirect to dashboard if click on the return to dashboard button", () => {
    const button = wrapper.find('button[data-test-id="button-dashboard"]');
    button.simulate('click');

    expect(window.location.assign).toBeCalledWith(
      expect.stringContaining("/myApplications")
    );
  });
});
