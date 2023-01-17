import React from "react";
import {shallow} from "enzyme";
import {DuplicateWindowError} from "../../../../src/components/common/DuplicateWindowError";
import {WORKFLOW_ERROR_CODE} from "../../../../src/utils/enums/common";

describe("DuplicateWindowError", () => {
    it("should render nothing when there is no step function error code", () => {
        const shallowWrapper = shallow(<DuplicateWindowError workflow={{loading:false,failed:false,workflowErrorCode:undefined}}/>);

        expect(shallowWrapper).toMatchSnapshot();
    });
    it("should render the multiple tabs error modal when the step function error is duplicate-window", () => {
        const shallowWrapper = shallow(<DuplicateWindowError workflow={{loading:false, failed:false,workflowErrorCode:WORKFLOW_ERROR_CODE.DUPLICATE_WINDOW}}/>);

        expect(shallowWrapper).toMatchSnapshot();
    });
});
