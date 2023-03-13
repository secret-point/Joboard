import { shallow } from "enzyme";
import React from "react";
import { mountWithStencil } from "@amzn/stencil-react-components/tests";
import { PAGE_ROUTES } from "../../../../../src/components/pageRoutes";
import {getFeatureFlagValue} from "../../../../../src/utils/helper";
import {
    TEST_APPLICATION_ID,
    TEST_APPLICATION_STATE,
    TEST_CANDIDATE_STATE, TEST_JOB,
    TEST_JOB_ID,
    TEST_JOB_STATE, TEST_SCHEDULE_ID
} from "../../../../test-utils/test-data";
import store from "../../../../../src/store/store";
import { Provider } from "react-redux";
import { useLocation } from "react-router-dom";
import ThankYouWithStore,{ThankYou} from "../../../../../src/components/uk/thankYou/ThankYou";
import {ThankYouSummary} from "../../../../../src/components/uk/thankYou/ThankYouSummary";
import {ThankYouRedirectToAsh} from "../../../../../src/components/uk/thankYou/ThankYouRedirectToAsh";

import Mock = jest.Mock;

jest.mock('../../../../../src/utils/helper',()=>{
    const actual = jest.requireActual('../../../../../src/utils/helper');
    return {
        ...actual,
        getFeatureFlagValue:jest.fn(),
    }
});

describe("ThankYouWrapper Component", () => {
    let getFeatureFlagValueMock = getFeatureFlagValue as Mock;
    const initStoreState = store.getState();
    let state: any;
    store.getState = () => state;

    const mockLocation = {
        pathname: "/thank-you",
        search: `?jobId=${TEST_JOB_ID}&applicationId=${TEST_APPLICATION_ID}&scheduleId=${TEST_SCHEDULE_ID}`,
        hash: "",
        state: null
    };
    const mockUseLocation = useLocation as jest.Mock;
    mockUseLocation.mockReturnValue(mockLocation);

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
        const shallowWrapper = shallow(<ThankYou job={TEST_JOB_STATE}/>);
        expect(shallowWrapper).toMatchSnapshot();
    });

    it("should render the thank you summary component when enable thank you redirect is false", () => {
        getFeatureFlagValueMock.mockReturnValueOnce(false);
        window.location.hash = `#/${PAGE_ROUTES.THANK_YOU}`;
        state = {
            ...initStoreState,
            application: TEST_APPLICATION_STATE,
            job: {
                ...TEST_JOB_STATE,
                results:{
                    ...TEST_JOB,
                    dspEnabled:true,
                }
            },
            candidate: TEST_CANDIDATE_STATE
        };
        const wrapper = mountWithStencil(
            <Provider store={store}>
                <ThankYouWithStore />
            </Provider>);

        expect(wrapper.find(ThankYouSummary)).toHaveLength(1);
        expect(getFeatureFlagValueMock).toHaveBeenCalledWith("ENABLE_THANK_YOU_REDIRECT_TO_ASH")
    });

    it("should render the thank you summary component when enable thank you redirect is true but the job is not dsp enabled", () => {
        getFeatureFlagValueMock.mockReturnValueOnce(false);
        window.location.hash = `#/${PAGE_ROUTES.THANK_YOU}`;
        state = {
            ...initStoreState,
            application: TEST_APPLICATION_STATE,
            job: {
                ...TEST_JOB_STATE,
                results:{
                    ...TEST_JOB,
                    dspEnabled:false,
                }
            },
            candidate: TEST_CANDIDATE_STATE
        };
        const wrapper = mountWithStencil(
            <Provider store={store}>
                <ThankYouWithStore />
            </Provider>);

        expect(wrapper.find(ThankYouSummary)).toHaveLength(1);
        expect(getFeatureFlagValueMock).toHaveBeenCalledWith("ENABLE_THANK_YOU_REDIRECT_TO_ASH")
    });

    it("should render thank you redirect component when enable thank you redirect is true and the job has dsp enabled", () => {
        getFeatureFlagValueMock.mockReturnValueOnce(true);
        window.location.hash = `#/${PAGE_ROUTES.THANK_YOU}`;
        state = {
            ...initStoreState,
            application: TEST_APPLICATION_STATE,
            job: {
                ...TEST_JOB_STATE,
                results:{
                    ...TEST_JOB,
                    dspEnabled:true,
                }
            },
            candidate: TEST_CANDIDATE_STATE
        };
        const wrapper = mountWithStencil(
            <Provider store={store}>
                <ThankYouWithStore />
            </Provider>);

        expect(wrapper.find(ThankYouRedirectToAsh)).toHaveLength(1);
        expect(getFeatureFlagValueMock).toHaveBeenCalledWith("ENABLE_THANK_YOU_REDIRECT_TO_ASH")
    });
});