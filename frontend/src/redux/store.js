//dependencies for redux store setup
/* @redux-devtools/extension, react-redux, redux-thunk, redux   */
import { createStore, applyMiddleware } from "redux";
import { combined } from "./combinedReducers";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
const middlewares = [thunk];

const setMiddleware =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(applyMiddleware(...middlewares))
    : applyMiddleware(...middlewares);

export const store = createStore(combined, setMiddleware);
