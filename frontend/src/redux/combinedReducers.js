import { combineReducers } from "redux";
import { registerUserReducer } from "./reducers/user";
import { loginUserReducer } from "./reducers/user";
import { registerExpenseReducer } from "./reducers/expenses";
import {
  getCategoryReducer,
  registerCategoryReducer,
} from "./reducers/category";

export const combined = combineReducers({
  createdUser: registerUserReducer,
  loggedInUser: loginUserReducer,
  expenses: registerExpenseReducer,
  categories: registerCategoryReducer,
  AllCategories: getCategoryReducer,
});
