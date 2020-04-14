import { createStore, applyMiddleware, compose  } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import { createHashHistory } from "history";
import { routerMiddleware  } from "react-router-redux";
import { createLogger } from "redux-logger";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const middleware = [thunk, routerMiddleware(createHashHistory()), createLogger()];
const store = createStore(rootReducer, {} , composeEnhancers(applyMiddleware(...middleware)));
export default store;