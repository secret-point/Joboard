import { shallow } from "enzyme";
import React from "react";
import ShiftPreferencesWrapperWithStore, {
    ShiftPreferences
} from "../../../../../src/components/common/jobOpportunity/ShiftPreferences";
import { mountWithStencil } from "@amzn/stencil-react-components/tests";
import { PAGE_ROUTES } from "../../../../../src/components/pageRoutes";
import {getFeatureFlagValue} from "../../../../../src/utils/helper";
import {
    TEST_APPLICATION_ID,
    TEST_APPLICATION_STATE,
    TEST_CANDIDATE_STATE,
    TEST_JOB_ID,
    TEST_JOB_STATE, TEST_SCHEDULE_ID
} from "../../../../test-utils/test-data";
import store from "../../../../../src/store/store";
import { Provider } from "react-redux";
import { useLocation } from "react-router-dom";
import {ApplicationShiftPreferences} from "../../../../../src/components/common/jobOpportunity/ApplicationShiftPreferences";
import {CandidateShiftPreferences} from "../../../../../src/components/common/jobOpportunity/CandidateShiftPreferences";

import Mock = jest.Mock;

jest.mock('../../../../../src/utils/helper',()=>{
    const actual = jest.requireActual('../../../../../src/utils/helper');
    return {
        ...actual,
        getFeatureFlagValue:jest.fn(),
    }
});

describe("ShiftPreferencesWrapper Component", () => {
    let getFeatureFlagValueMock = getFeatureFlagValue as Mock;
    const initStoreState = store.getState();
    let state: any;
    store.getState = () => state;

    const mockLocation = {
        pathname: "/job-opportunities/shift-preference",
        search: `?jobId=${TEST_JOB_ID}&scheduleId=${TEST_SCHEDULE_ID}&applicationId=${TEST_APPLICATION_ID}`,
        hash: "",
        state: null
    };
    const mockUseLocation = useLocation as jest.Mock;

    beforeEach(() => {
        state = {
            ...initStoreState,
            application: TEST_APPLICATION_STATE,
            job: TEST_JOB_STATE,
            candidate: TEST_CANDIDATE_STATE
        };
        mockUseLocation.mockReturnValue(mockLocation);
        getFeatureFlagValueMock.mockReset();
    });

    it("should match snapshot", () => {
        const shallowWrapper = shallow(<ShiftPreferences/>);
        expect(shallowWrapper).toMatchSnapshot();
    });

    it("should render the application object ShiftPreference component when enable candidate shift preferences is false", () => {
        getFeatureFlagValueMock.mockReturnValueOnce(false);
        window.location.hash = `#/${PAGE_ROUTES.SHIFT_PREFERENCE}`;

        const wrapper = mountWithStencil(
            <Provider store={store}>
                <ShiftPreferencesWrapperWithStore />
            </Provider>);

        expect(wrapper.find(ApplicationShiftPreferences)).toHaveLength(1);
        expect(getFeatureFlagValueMock).toHaveBeenCalledWith("ENABLE_CANDIDATE_SHIFT_PREFERENCES")
    });

    it("should render the application object ShiftPreference component when enable candidate shift preferences is true", () => {
        getFeatureFlagValueMock.mockReturnValueOnce(true);
        window.location.hash = `#/${PAGE_ROUTES.SHIFT_PREFERENCE}`;

        const wrapper = mountWithStencil(
            <Provider store={store}>
                <ShiftPreferencesWrapperWithStore />
            </Provider>);

        expect(wrapper.find(CandidateShiftPreferences)).toHaveLength(1);
        expect(getFeatureFlagValueMock).toHaveBeenCalledWith("ENABLE_CANDIDATE_SHIFT_PREFERENCES")
    });
});