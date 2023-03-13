import * as React from "react";
import { shallow } from "enzyme";
import { useLocation } from "react-router-dom";
import { ThankYouRedirectToAsh } from "../../../../../src/components/uk/thankYou/ThankYouRedirectToAsh";
import { CountryCode } from "../../../../../src/utils/enums/common";
import * as helper from "../../../../../src/utils/helper";
import {
    TEST_APPLICATION_ID, TEST_APPLICATION_STATE, TEST_CANDIDATE_STATE,
    TEST_JOB_ID, TEST_JOB_STATE,
    TEST_SCHEDULE_ID,
} from "../../../../test-utils/test-data";
import {PAGE_ROUTES} from "../../../../../src/components/pageRoutes";
import {mountWithStencil} from "@amzn/stencil-react-components/tests";
import {Provider} from "react-redux";
import store from "../../../../../src/store/store";

describe("ThankYouRedirectToAsh", () => {
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

    // Unit test can't get Katal {{Country}} development value.
    const mockGetCountryCode = jest.spyOn(helper, "getCountryCode");
    mockGetCountryCode.mockReturnValue(CountryCode.US);

    const mockRedirectToASHChecklist = jest.spyOn(helper,"redirectToASHChecklist");

    beforeEach(() => {
        state = {
            ...initStoreState,
            application: TEST_APPLICATION_STATE,
            job: TEST_JOB_STATE,
            candidate: TEST_CANDIDATE_STATE
        };
    });

    it("should match snapshot", () => {
        const shallowWrapper = shallow(<ThankYouRedirectToAsh/>);

        expect(shallowWrapper).toMatchSnapshot();
    });

    it("should redirect to ash",()=>{
        window.location.hash = `#/${PAGE_ROUTES.THANK_YOU}`;

        mountWithStencil(
            <Provider store={store}>
                <ThankYouRedirectToAsh/>
            </Provider>);
        expect(mockRedirectToASHChecklist).toHaveBeenCalledWith("test-app-id", "JOB-US-0000001234", undefined);
    });
});
