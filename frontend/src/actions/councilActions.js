import axios from "axios";

import {
  COUNCIL_LIST_FAIL,
  COUNCIL_LIST_REQUEST,
  COUNCIL_LIST_SUCCESS,
} from "../constants/councilConstants";

export const getCouncils = () => async (dispatch, getState) => {
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

    const { data } = await axios.get(`/api/councils/list`, config);

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
