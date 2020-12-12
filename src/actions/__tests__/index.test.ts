import * as actions from './../index';
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createHashHistory } from "history";
import { routerMiddleware } from "react-router-redux";
import cloneDeep from "lodash/cloneDeep";
import { 
    TEST_PAYLOAD
  } from "../../../tests/test-data";

describe("Test for Actions", () => {
    let store: any;
    let payload: any;

    const mockStore = configureStore([
        thunk,
        routerMiddleware(createHashHistory())
    ]);
    const getStore = () => {
        const initState = {};
        return mockStore(initState);
    };

    beforeEach(() => {
        store = getStore();
        payload = cloneDeep(TEST_PAYLOAD)
    });

    test("Test OnAction with actionName as EXECUTE_ACTIONS", async () => {
        
        actions.onAction("EXECUTE_ACTIONS", payload)(store.dispatch);
        expect(store.getActions().length).toBe(0);
    });

    test("Test OnAction with other actionName", async () => {
        
        actions.onAction("ON_VALUE_CHANGE", payload)(store.dispatch);
        //it calls onValueChange action so it should be 1
        expect(store.getActions().length).toBe(1);
        expect(store.getActions()[0].type).toBe("UPDATE_VALUE_CHANGE");
    });

    test("Test OnAction with invalid actionName", async () => {
        
        actions.onAction("SOMETHING_ELSE", payload)(store.dispatch);
        expect(store.getActions().length).toBe(0);
    });

    test("Test OnAction with other actionName with empty currentPage", async () => {
        payload.currentPage = null;
        actions.onAction("ON_VALUE_CHANGE", payload)(store.dispatch);
        //it calls onValueChange action so it should be 1
        expect(store.getActions().length).toBe(1);
        expect(store.getActions()[0].type).toBe("UPDATE_VALUE_CHANGE");
    });

    test("Test OnAction with invalid actionName with empty curremtPage", async () => {
        payload.currentPage = null;
        actions.onAction("SOMETHING_ELSE", payload)(store.dispatch);
        expect(store.getActions().length).toBe(0);
    });

    test("Test onExecuteMultipleActions async option with empty actions should not dispatch", async () => {
        payload.options.async = true;
        await actions.onExecuteMultipleActions(payload);
        expect(store.getActions().length).toBe(0);
    });

    test("Test onExecuteMultipleActions async option with actions should execute multiple", async () => {
        payload.options.async = true;
        payload.options.actions = [
            {
                action: "ON_VALUE_CHANGE",
            },
            {
                action: "ON_VALUE_CHANGE",
            }
        ]
        await actions.onExecuteMultipleActions(payload)(store.dispatch);
        expect(store.getActions().length).toBe(2);
        expect(store.getActions()[0].type).toBe("UPDATE_VALUE_CHANGE");
        expect(store.getActions()[1].type).toBe("UPDATE_VALUE_CHANGE");
    });

    test("Test onExecuteMultipleActions sync option with empty actions should not dispatch", async () => {
        payload.options.async = false;
        await actions.onExecuteMultipleActions(payload);
        expect(store.getActions().length).toBe(0);
    });

    test("Test onExecuteMultipleActions sync option with actions should execute multiple", async () => {
        payload.options.async = false;
        payload.options.actions = [
            {
                action: "ON_VALUE_CHANGE",
            },
            {
                action: "ON_VALUE_CHANGE",
            }
        ]
        await actions.onExecuteMultipleActions(payload)(store.dispatch);
        expect(store.getActions().length).toBe(2);
        expect(store.getActions()[0].type).toBe("UPDATE_VALUE_CHANGE");
        expect(store.getActions()[1].type).toBe("UPDATE_VALUE_CHANGE");
    });

    test("Test onInitialLoadActions async with empty actions should not dispatch", async() => {
        const initialLoadActions: any = {
            async: true,
            actions:[]
        };

        await actions.onInitialLoadActions(initialLoadActions, payload)(store.dispatch);
        expect(store.getActions().length).toBe(0);
    });

    test("Test onInitialLoadActions async with actions should execute multiple", async() => {
        const initialLoadActions: any = {
            async: true,
            actions:[
                {
                    action: "ON_VALUE_CHANGE",
                },
                {
                    action: "ON_VALUE_CHANGE",
                }
            ]
        };

        await actions.onInitialLoadActions(initialLoadActions, payload)(store.dispatch);
        expect(store.getActions().length).toBe(2);
        expect(store.getActions()[0].type).toBe("UPDATE_VALUE_CHANGE");
        expect(store.getActions()[1].type).toBe("UPDATE_VALUE_CHANGE");
    });

    test("Test onInitialLoadActions sync with empty actions should not dispatch", async() => {
        const initialLoadActions: any = {
            async: false,
            actions:[]
        };

        await actions.onInitialLoadActions(initialLoadActions, payload)(store.dispatch);
        expect(store.getActions().length).toBe(0);
    });

    test("Test onInitialLoadActions sync with actions should execute multiple", async() => {
        const initialLoadActions: any = {
            async: false,
            actions:[
                {
                    action: "ON_VALUE_CHANGE",
                },
                {
                    action: "ON_VALUE_CHANGE",
                }
            ]
        };

        await actions.onInitialLoadActions(initialLoadActions, payload)(store.dispatch);
        expect(store.getActions().length).toBe(2);
        expect(store.getActions()[0].type).toBe("UPDATE_VALUE_CHANGE");
        expect(store.getActions()[1].type).toBe("UPDATE_VALUE_CHANGE");
    });
});