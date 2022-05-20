import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import appConfigReducer from "./appConfig.reducer";
import uiReducer from "./ui.reducer";

const createRootReducer = (history: any) =>
    combineReducers({
        appConfig: appConfigReducer,
        ui: uiReducer,
        router: connectRouter(history),
    });

export default createRootReducer;
