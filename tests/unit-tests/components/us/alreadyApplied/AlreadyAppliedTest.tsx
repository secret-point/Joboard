import React from "react";
import { ReactWrapper, shallow } from "enzyme";
import { mountWithStencil } from "@amzn/stencil-react-components/tests";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { Router } from "react-router";
import routeData from 'react-router';
import { AlreadyApplied } from "../../../../../src/components/us/alreadyApplied/AlreadyApplied";
import store from "../../../../../src/store/store";
import { TEST_APP_CONFIG, TEST_CANDIDATE_STATE, TEST_JOB2_ID, TEST_JOB_STATE } from "../../../../test-utils/test-data";

describe("AlreadyApplied", () => {
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
          <AlreadyApplied candidate={TEST_CANDIDATE_STATE} job={TEST_JOB_STATE} />
        </Router>
      </Provider>
    );
  });

  it("should match snapshot", () => {
    // mock useLocation instead of using Router history to generate better snapshot
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);
    const shallowWrapper = shallow(<AlreadyApplied candidate={TEST_CANDIDATE_STATE} job={TEST_JOB_STATE} />);

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
