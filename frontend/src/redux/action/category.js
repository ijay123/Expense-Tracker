import axios from "axios";

import {
  CREATE_CATEGORY_ERROR,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  GET_CATEGORY_ERROR,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
} from "../constants/category";

// import { toast } from "react-toastify";

const userInfoFromLocalStorage = localStorage.getItem("expenseUserInfo")
  ? JSON.parse(localStorage.getItem("expenseUserInfo"))
  : null;

const baseUrl = "http://localhost:5000";

export const createCategoryAction =
  (formData) =>
  async (dispatch, state) => {

    // const {
    //   loggedInUser: { user},
    // } = state();
    //1. before the API call
    dispatch({
      type: CREATE_CATEGORY_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${ userInfoFromLocalStorage.token}`,
      },
    };

    try {
      //make API call
      const { data } = await axios.post(
        `${baseUrl}/category`,
        formData,
        config
      );
      //2. after the API call success
      console.log(data, "data");
      dispatch({
        type: CREATE_CATEGORY_SUCCESS,
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
        type: CREATE_CATEGORY_ERROR,
        payload: message,
      });
    }
  };

export const getCategoryAction = () => async (dispatch, state) => {


  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${userInfoFromLocalStorage.token}`,
    },
  };
  try {
    console.log(dispatch, "dispatch");
    dispatch({
      type: GET_CATEGORY_REQUEST,
    });
    // make the call
    const { data } = await axios.get(`${baseUrl}/category`, config);
    console.log(data, "data");
    //if we get here, then request is a success case
    dispatch({
      type: GET_CATEGORY_SUCCESS,
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
      type: GET_CATEGORY_ERROR,
      payload: message,
    });
  }
};

export const getCategoriesAction = () => async (dispatch, state) => {

const {
    loggedInUser: { user },
  } = state();

  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${user.token}`,
    },
  };
  try {
    console.log(dispatch, "dispatch");
    dispatch({
      type: GET_CATEGORY_REQUEST,
    });
    // make the call
    const { data } = await axios.get(`${baseUrl}/category?id=${userInfoFromLocalStorage.data?._id}`, config);
    console.log(data, "data");
    //if we get here, then request is a success case
    dispatch({
      type: GET_CATEGORY_SUCCESS,
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
      type: GET_CATEGORY_ERROR,
      payload: message,
    });
  }
};
