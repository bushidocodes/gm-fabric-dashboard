// Commented out imports are used by currently disabled local storage functionality
import { CreateJumpstateMiddleware } from "jumpstate";
import { routerReducer, routerMiddleware } from "react-router-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";

import history from "../AppHistory";

import dashboards from "./states/dashboards";
import fabric from "./states/fabric";
import instance from "./states/instance";
import settings from "./states/settings";
import threadsTable from "./states/threadsTable";

// Prepare Redux Middlewares
const middlewares = [];
middlewares.push(CreateJumpstateMiddleware());
middlewares.push(routerMiddleware(history));
if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

// Create the Redux store using reducers and middlewares
const reducers = {
  dashboards,
  fabric,
  instance,
  settings,
  routing: routerReducer,
  threadsTable
};

export default createStore(
  combineReducers(reducers),
  applyMiddleware(...middlewares)
);
