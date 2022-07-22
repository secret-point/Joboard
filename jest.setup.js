import { mockUseBreakPoint } from "./tests/test-utils/test-helper";
import { MediaQueryRules } from "./tests/test-utils/constants";

const localStorageMock = (function() {
    var store = {};

    return {
        getItem: function(key) {
            return store[key] || null;
        },
        setItem: function(key, value) {
            store[key] = value.toString();
        },
        clear: function() {
            store = {};
        },
        removeItem: function(key,value) {
            delete store[key]
        }
    };

})();


Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

mockUseBreakPoint(MediaQueryRules['s'], true);
