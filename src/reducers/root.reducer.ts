import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import appConfigReducer from "./appConfig.reducer";
import uiReducer from "./ui.reducer";
import jobReducer from "./job.reducer";
import requisitionReducer from "./requisition.reducer";
import applicationReducer from "./application.reducer";

const createRootReducer = (history: any) =>
    combineReducers({
        appConfig: appConfigReducer,
        ui: uiReducer,
        job: jobReducer,
        application: applicationReducer,
        requisition: requisitionReducer,
        router: connectRouter(history),
    });

export default createRootReducer;
