import axios from "axios";

import {
  COUNCIL_ADD_FAIL,
  COUNCIL_ADD_REQUEST,
  COUNCIL_ADD_RESET,
  COUNCIL_ADD_SUCCESS,
  COUNCIL_LIST_FAIL,
  COUNCIL_LIST_REQUEST,
  COUNCIL_LIST_SUCCESS,
  COUNCIL_DELETE_REQUEST,
  COUNCIL_DELETE_SUCCESS,
  COUNCIL_DELETE_FAIL,
  COUNCIL_DETAILS_REQUEST,
  COUNCIL_DETAILS_SUCCESS,
  COUNCIL_DETAILS_FAIL,
} from "../constants/councilConstants";
import {
  USER_DETAILS_RESET,
  USER_LIST_RESET,
  USER_LOGOUT,
} from "../constants/userConstants";

export const getCouncils = (keyword = "", pageNumber = "") => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: COUNCIL_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/councils/list?keyword=${keyword}&pageNumber=${pageNumber}`,
      config
    );

    // console.log("List Success : " + JSON.stringify(data));
    dispatch({
      type: COUNCIL_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    // if (message === "Not authorized, token failed") {
    //   dispatch(logout());
    // }
    dispatch({
      type: COUNCIL_LIST_FAIL,
      payload: message,
    });
  }
};

export const addCouncil = (values) => async (dispatch, getState) => {
  try {
    const { authorityName, authorityURL, authorityType, dateTypes } = values;
    console.log(
      "addCouncil " +
        JSON.stringify(
          { authorityName, authorityURL, authorityType, dateTypes },
          null,
          2
        )
    );

    dispatch({
      type: COUNCIL_ADD_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/councils/add`,
      {
        authorityName,
        authorityURL,
        authorityType,
        dateTypes,
      },
      config
    );

    console.log("Add Success : " + JSON.stringify(data));
    dispatch({
      type: COUNCIL_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: COUNCIL_ADD_FAIL,
      payload: message,
    });
  }
};

export const deleteCouncil = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUNCIL_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/councils/${id}`, config);

    dispatch({
      type: COUNCIL_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: COUNCIL_DELETE_FAIL,
      payload: message,
    });
  }
};

export const addReset = () => (dispatch) => {
  dispatch({ type: COUNCIL_ADD_RESET });
};

export const getCouncilDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COUNCIL_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/councils/${id}`, config);

    dispatch({
      type: COUNCIL_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: COUNCIL_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_LIST_RESET });
  document.location.href = "/";
};
