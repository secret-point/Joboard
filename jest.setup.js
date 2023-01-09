import { MediaQueryRules } from "./tests/test-utils/constants";
import { mockUseBreakPoint } from "./tests/test-utils/test-helper";

// Fixing jest test errors when rendering dangerously-set-html-content
// 1. TypeError: document.createRange is not a function
// 2. TypeError: document.createRange(...).createContextualFragment is not a function.
// https://panzerstadt.github.io/prng/Misc/20191106_testing-document-createRange/

const createContextualFragment = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.children[0];
};

document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: "BODY",
    ownerDocument: document,
  },
  createContextualFragment
});

const storageMock = (function () {
  var store = {};

  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
    removeItem: function (key, value) {
      delete store[key];
    }
  };

})();


Object.defineProperty(window, "localStorage", {
  value: storageMock
});

Object.defineProperty(window, "sessionStorage", {
  value: storageMock
});

mockUseBreakPoint(MediaQueryRules["s"], true);

// Mock katal logger
window.log = {
  debug: () => {},
  info: () => {},
  warn: () => {},
  error: () => {},
};

const originalWindowLocation = window.location;
delete window.location;
window.location = Object.defineProperties(
  {},
  {
    ...Object.getOwnPropertyDescriptors(originalWindowLocation),
    assign: {
      configurable: true,
      writable: true,
      value: jest.fn(),
    },
  },
);
