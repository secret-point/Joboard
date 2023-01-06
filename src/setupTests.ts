// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import { configure, shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import * as React from "react";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {}
    };
  };

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
window.MetricsPublisher = {
  /* eslint-disable  @typescript-eslint/no-unused-vars */
  newChildActionPublisherForMethod: (methodName: string, additionalContext?: any): any => {
    return {
      /* eslint-disable  @typescript-eslint/no-unused-vars */
      publishCounter: (name: string, value: number) => {},
      /* eslint-disable  @typescript-eslint/no-unused-vars */
      publishTimer: (name: string, value: number) => {},
      /* eslint-disable  @typescript-eslint/no-unused-vars */
      publishCounterMonitor: (name: string, value: number) => {},
      /* eslint-disable  @typescript-eslint/no-unused-vars */
      publishTimerMonitor: (name: string, value: number) => {}
    };
  }
};

global.React = React;
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
global.shallow = shallow;
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
global.mount = mount;
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
global.render = render;

configure({ adapter: new Adapter() });
