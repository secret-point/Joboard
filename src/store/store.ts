import { applyMiddleware, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import { createHashHistory } from "history";
import { createEpicMiddleware } from "redux-observable";
import createRootReducer from "../reducers/root.reducer";
import rootEpic from "../epics/root.epic";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

/* TODO remove any from functions */
const logger = () => (next: any) => (action: any) => {
  // eslint-disable-next-line no-console
  // console.log("dispatching", action);
  const result = next(action);
  // console.log("next state", store.getState());
  // eslint-disable-next-line no-console
  return result;
};

export const history = createHashHistory();

const persistConfig = {
  key: 'root',
  storage, // defaults to localStorage for web
  whitelist: ['request']
};

export const configureStore = (preloadedState: any) => {
  const epicMiddleware = createEpicMiddleware();
  const middlewares: any = [epicMiddleware, routerMiddleware(history), logger];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers: any = composeWithDevTools(...enhancers);
  const persistedReducer = persistReducer(persistConfig, createRootReducer(history));

  const store = createStore(
    persistedReducer,
    preloadedState,
    composedEnhancers
  );

  epicMiddleware.run(rootEpic);

  return store;
};

const store = configureStore({});

export const persistor = persistStore(store);

export default store;
