import { combineReducers } from "redux";
import { registerUserReducer } from "./reducers/user";
import { loginUserReducer } from "./reducers/user";
import {
  registerExpenseReducer,
  getExpensesReducer,
} from "./reducers/expenses";
import {
  getCategoryReducer,
  registerCategoryReducer,
  updateCategoryReducer,
  deleteCategoryReducer,
} from "./reducers/category";

export const combined = combineReducers({
  createdUser: registerUserReducer,
  loggedInUser: loginUserReducer,
  expenses: registerExpenseReducer,
  allExpenses: getExpensesReducer,
  categories: registerCategoryReducer,
  AllCategories: getCategoryReducer,
  updatedCategory: updateCategoryReducer,
  deletedCategory: deleteCategoryReducer,
});
