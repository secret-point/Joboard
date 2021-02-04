import * as helper from "../log-helper"

describe("Unit tests for log helper", () =>{
    beforeEach(() => {
        let logger = helper.initLogger("url");
        window.log = logger;
        window.loggerUrl = "url";
    });
    afterEach(() => {
        window.log = undefined;
        window.loggerUrl = undefined;
    });
    test("test logger", () => {
        helper.log("log info", {}, helper.LoggerType.INFO);
        helper.log("log warn", {}, helper.LoggerType.WARN);
        helper.log("log error", {}, helper.LoggerType.ERROR);
        helper.log("log debug", {}, helper.LoggerType.DEBUG);
        helper.log("log default", {}, undefined);
    });
    test("test logger with logger not initiated", () => {
        window.log = undefined;
        helper.log("log info", {}, helper.LoggerType.INFO);
    });

    test("test log error with cookie", () => {
        let date = new Date();
        date.setTime(date.getTime() + (60 * 1000));
        document.cookie = "%20hvhcid=7890; expires="+date.toUTCString()+"; path=/";

        helper.logError("error", new Error(), helper.LoggerType.ERROR);
        date = new Date();
        date.setTime(date.getTime() - (60 * 1000));
        document.cookie = "hvhcid=; expires="+date.toUTCString()+"; path=/";
    });

    test("test log error with no cookie", () => {
        helper.logError("error", new Error(), helper.LoggerType.ERROR);
    });

});