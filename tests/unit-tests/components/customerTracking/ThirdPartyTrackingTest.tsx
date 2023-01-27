import React from "react";
import ThirdPartyTracking from "../../../../src/components/customerTracking/ThirdPartyTracking";
import { mount } from "enzyme";
import { TEST_JOB } from "../../../test-utils/test-data";
import { APP_CAST_EVENT_NUMBER } from "../../../../src/utils/enums/common";
import { mountWithStencil } from "@amzn/stencil-react-components/tests";
import * as appCastHelper from "../../../../src/components/customerTracking/appCast";

const getItemSpy = jest.spyOn(window.localStorage, "getItem");
const pushAppCastEventSpy = jest.spyOn(appCastHelper, "pushAppCastEvent");

describe("ThirdPartyTracking", () => {

  beforeEach(() => {
    getItemSpy.mockReset();
    pushAppCastEventSpy.mockReset();
  });

  it("should match snapshot on bb", () => {
    const url = "https://beta-us.devo.jobsatamazon.hvh.a2z.com/application/";
    Object.defineProperty(window, "location", {
      value: new URL(url)
    } );
    getItemSpy.mockReturnValue("nhe");
    const wrapper = mount(<ThirdPartyTracking jobId={TEST_JOB.jobId} appCastEventId={APP_CAST_EVENT_NUMBER.CONTINGENT_OFFER} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should call pushAppCastEvent on page load ", () => {
    mountWithStencil(<ThirdPartyTracking jobId={TEST_JOB.jobId} appCastEventId={APP_CAST_EVENT_NUMBER.CONTINGENT_OFFER} />);

    expect(pushAppCastEventSpy).toHaveBeenCalledWith(APP_CAST_EVENT_NUMBER.CONTINGENT_OFFER, TEST_JOB.jobId);
  });
});
