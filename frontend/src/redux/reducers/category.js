import {
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_RESET,
  CREATE_CATEGORY_CLEAR_ERROR,
  CREATE_CATEGORY_ERROR,
  GET_CATEGORY_CLEAR_ERROR,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_RESET,
  GET_CATEGORY_ERROR,
} from "../constants/category";

export const registerCategoryReducer = (
  state = { name: null, loading: false, error: null, success: false },
  action
) => {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        name: action.payload,
      };

    case CREATE_CATEGORY_RESET:
      return {
        loading: false,
        success: false,
        name: null,
        error: null,
      };

    case CREATE_CATEGORY_CLEAR_ERROR:
      return {
        ...state,
        error: null,
        loading: false,
      };

    case CREATE_CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getCategoryReducer = (
  state = { name: null, loading: false, error: null, success: false },
  action
) => {
  switch (action.type) {
    case GET_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_CATEGORY_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        success: true,
        name: action.payload,
      };

    case GET_CATEGORY_RESET:
      return {
        loading: false,
        success: false,
        name: null,
        error: null,
      };

    case GET_CATEGORY_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case GET_CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
