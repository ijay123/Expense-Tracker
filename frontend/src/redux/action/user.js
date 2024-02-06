import axios from "axios";

import {
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  CREATE_USER_REQUEST,
  LOGIN_USER_ERROR,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_RESET,
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
} from "../constants/user";
import { toast } from "react-toastify";



const baseUrl = "https://expense-tracker-backend-2ge0.onrender.com";

export const createUserAction =
  ({ email, password, username }) =>
  async (dispatch, state) => {
    //1. before the API call
    dispatch({
      type: CREATE_USER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      //make API call
      const { data } = await axios.post(
        `${baseUrl}/users`,
        { email, password, username },
        config
      );
      //2. after the API call success
      console.log(data, "data");
      dispatch({
        type: CREATE_USER_SUCCESS,
        payload: data.data,
      });
      console.log(data);
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
        type: CREATE_USER_ERROR,
        payload: message,
      });
    }
  };

export const loginUserAction =
  ({ email, password }) =>
  async (dispatch, state) => {
    //1. before the API call
    dispatch({
      type: LOGIN_USER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      //make API call
      const { data } = await axios.post(
        `${baseUrl}/users/login`,
        { email, password },
        config
      );
      //2. after the API call success
      console.log(data, "data");
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { data: data.data, token: data.token },
      });
      console.log(data);
      localStorage.setItem(
        "expenseUserInfo",
        JSON.stringify({ data: data.data, token: data.token })
      );
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
        type: LOGIN_USER_ERROR,
        payload: message,
      });
    }
  };

export const logout = () => async (dispatch, state) => {
  console.log("logged out");
  dispatch({ type: LOGIN_USER_RESET });
  localStorage.setItem("userInfo", null);
  toast.success("logged out");
};

export const getUsersAction = () => async (dispatch, state) => {
  // const {
  //   loginUser: { user },
  // } = state();

  const config = {
    headers: {
      "Content-Type": "application/json",
      // authorization: `Bearer ${user.token}`,
    },
  };
  try {
    console.log(dispatch, "dispatch");
    dispatch({
      type: GET_USER_REQUEST,
    });
    // make the call
    const { data } = await axios.get(`${baseUrl}/users`, config);
    console.log(data, "data");
    //if we get here, then request is a success case
    dispatch({
      type: GET_USER_SUCCESS,
      payload: data.payload,
    });
  } catch (error) {
    let message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    console.log(error, "error");
    // if (message.toLowerCase().includes("jwt")) {
    //   dispatch(logout());
    // }
    dispatch({
      type: LOGIN_USER_ERROR,
      payload: message,
    });
  }
};
