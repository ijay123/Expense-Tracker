import axios from "axios";

import {
  CREATE_EXPENSE_ERROR,
  CREATE_EXPENSE_REQUEST,
  CREATE_EXPENSE_SUCCESS,
  GET_EXPENSE_ERROR,
  GET_EXPENSE_REQUEST,
  GET_EXPENSE_SUCCESS,
  GET_EXPENSES_ERROR,
  GET_EXPENSES_REQUEST,
  GET_EXPENSES_SUCCESS,
} from "../constants/expenses";

// import { toast } from "react-toastify";

const userInfoFromLocalStorage = localStorage.getItem("expenseUserInfo")
  ? JSON.parse(localStorage.getItem("expenseUserInfo"))
  : null;

const baseUrl = "https://expense-tracker-backend-2ge0.onrender.com";

export const createExpenseAction = (formData) => async (dispatch, state) => {
  //1. before the API call
  dispatch({
    type: CREATE_EXPENSE_REQUEST,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${userInfoFromLocalStorage.token}`,
    },
  };

  try {
    //make API call
    const { data } = await axios.post(`${baseUrl}/expenses`, formData, config);
    //2. after the API call success
    console.log(data, "data");
    dispatch({
      type: CREATE_EXPENSE_SUCCESS,
      payload: data.data,
    });
    console.log(data, "expenseData");
    // localStorage.setItem(
    //   "expenseUserInfo",
    //   JSON.stringify({ token: data.token })
    // );
  } catch (error) {
    //3. after the API call failure
    console.log(error);
    let message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CREATE_EXPENSE_ERROR,
      payload: message,
    });
  }
};

export const getExpensesAction = () => async (dispatch, action) => {
  // const {
  //   loggedInUser: { user },
  // } = state();

  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${userInfoFromLocalStorage.token}`,
    },
  };
  try {
    console.log(dispatch, "dispatch");
    dispatch({
      type: GET_EXPENSES_REQUEST,
    });
    // make the call
    const { data } = await axios.get(
      `${baseUrl}/expenses?id=${userInfoFromLocalStorage.data?._id}`,
      config
    );
    console.log(data, "payload");
    //if we get here, then request is a success case
    dispatch({
      type: GET_EXPENSES_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    console.log(error, "err")
    let message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    // console.log(error, "error");
    // if (message.toLowerCase().includes("jwt")) {
    //   dispatch(logout());
    // }
    dispatch({
      type: GET_EXPENSES_ERROR,
      payload: message,
    });
  }
};

export const getExpenseAction = () => async (dispatch, state) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${userInfoFromLocalStorage.token}`,
    },
  };
  try {
    console.log(dispatch, "dispatch");
    dispatch({
      type: GET_EXPENSE_REQUEST,
    });
    // make the call
    const { data } = await axios.get(
      `${baseUrl}/expenses?id=${userInfoFromLocalStorage.data?._id}`,
      config
    );
    console.log(data, "data");
    //if we get here, then request is a success case
    dispatch({
      type: GET_EXPENSE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    let message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    // console.log(error, "error");
    // if (message.toLowerCase().includes("jwt")) {
    //   dispatch(logout());
    // }
    dispatch({
      type: GET_EXPENSE_ERROR,
      payload: message,
    });
  }
};
