import { combineReducers } from "redux";
import appReducer from "./app-reducer";
import { routerReducer } from "react-router-redux";


export default combineReducers({
  app: appReducer,
  routing: routerReducer
});