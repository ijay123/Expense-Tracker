import {
  CREATE_EXPENSE_SUCCESS,
  CREATE_EXPENSE_REQUEST,
  CREATE_EXPENSE_RESET,
  CREATE_EXPENSE_CLEAR_ERROR,
  CREATE_EXPENSE_ERROR,
  GET_EXPENSES_REQUEST,
  GET_EXPENSES_CLEAR_ERROR,
  GET_EXPENSES_ERROR,
  GET_EXPENSES_SUCCESS,
  GET_EXPENSES_RESET,
} from "../constants/expenses";

export const registerExpenseReducer = (
  state = { expens: null, loading: false, error: null, success: false },
  action
) => {
  switch (action.type) {
    case CREATE_EXPENSE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_EXPENSE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        expens: action.payload,
      };

    case CREATE_EXPENSE_RESET:
      return {
        loading: false,
        success: false,
        expens: null,
        error: null,
      };

    case CREATE_EXPENSE_CLEAR_ERROR:
      return {
        ...state,
        error: null,
        loading: false,
      };

    case CREATE_EXPENSE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getExpensesReducer = (
  state = { expenses: null, loading: false, error: null, success: false },
  action
) => {
  switch (action.type) {
    case GET_EXPENSES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_EXPENSES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        expenses: action.payload,
      };

    case GET_EXPENSES_RESET:
      return {
        loading: false,
        success: false,
        expenses: null,
        error: null,
      };

    case GET_EXPENSES_CLEAR_ERROR:
      return {
        ...state,
        error: null,
        loading: false,
      };

    case GET_EXPENSES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
